#!/usr/bin/env node
/**
 * restore-users.js
 * --------------------------------------------------------------------------
 * Restaure les comptes utilisateurs perdus à partir des CSV de `new_exports/`.
 *
 *  - Parcourt tous les `new_exports/*.csv` (colonnes: email,firstname,lastname)
 *  - Dédoublonne par email (insensible à la casse)
 *  - Ignore les comptes déjà présents en base (aucune modification, aucun email)
 *  - Crée les comptes manquants :
 *        role = 'user' (permanent, NON soumis au nettoyage des demo_user)
 *        mot de passe temporaire aléatoire, hashé bcrypt
 *        dossier uploads/<uuid> créé
 *  - Envoie à chaque nouveau compte un email avec son mot de passe temporaire
 *    et le lien de connexion http://demo.cadviewer.com/
 *
 * MODES
 *  - dry-run (DÉFAUT) : aucune écriture base, aucun envoi. Produit un rapport
 *    CSV + un aperçu HTML de l'email. Interroge quand même la base (lecture
 *    seule) pour classer nouveaux / existants.
 *  - --execute        : crée réellement les comptes et envoie les emails.
 *
 * USAGE
 *   node scripts/restore-users.js                 # dry-run
 *   node scripts/restore-users.js --execute       # exécution réelle
 *   node scripts/restore-users.js --limit 5       # ne traite que 5 comptes
 *   node scripts/restore-users.js --only-email a@b.com   # cible un seul email
 *   node scripts/restore-users.js --execute --delay 600  # délai (ms) entre emails
 *
 * ⚠️  À lancer avec la config/env de PRODUCTION (base + SMTP), sinon le script
 *     vise le localhost/maildev de dev. Le rapport CSV contient les mots de
 *     passe temporaires en clair : fichier sensible (déjà gitignoré).
 * --------------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const conn = require("../libs/mysql.js");
const transporter = require("../libs/mail.js").transporter;
const getHotConfig = require("../libs/config").getHotConfig;

const config = getHotConfig();

// ── Constantes ──────────────────────────────────────────────────────────────
const APP_ROOT = path.resolve(__dirname, "..");
const EXPORTS_DIR = path.join(APP_ROOT, "new_exports");
const UPLOADS_DIR = path.join(APP_ROOT, "uploads");
const LOGIN_URL = "http://demo.cadviewer.com/";
const NEW_ACCOUNT_ROLE = "user"; // rôle permanent (pas de purge demo_user)
const BCRYPT_ROUNDS = 10;

// ── Parsing des arguments CLI ────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {
    execute: false,
    limit: null,
    onlyEmail: null,
    delay: 400, // ms entre deux envois d'email
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--execute") args.execute = true;
    else if (a === "--dry-run") args.execute = false;
    else if (a === "--limit") args.limit = parseInt(argv[++i], 10);
    else if (a === "--only-email") args.onlyEmail = (argv[++i] || "").toLowerCase().trim();
    else if (a === "--delay") args.delay = parseInt(argv[++i], 10);
    else if (a === "--help" || a === "-h") {
      console.log(fs.readFileSync(__filename, "utf8").split("\n").slice(1, 38).join("\n"));
      process.exit(0);
    } else {
      console.warn(`Argument inconnu ignoré: ${a}`);
    }
  }
  return args;
}

// ── Utilitaires ──────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Parse une ligne CSV avec champs éventuellement entre guillemets ("" = ").
 */
function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

/**
 * Lit tous les CSV de new_exports/ et renvoie une Map email(lowercased) -> {email, firstname, lastname}.
 * Conserve le premier firstname/lastname non vide rencontré (fichiers triés par nom).
 */
function loadUsersFromCsv() {
  if (!fs.existsSync(EXPORTS_DIR)) {
    throw new Error(`Dossier introuvable: ${EXPORTS_DIR}`);
  }
  const files = fs
    .readdirSync(EXPORTS_DIR)
    .filter((f) => f.startsWith("users-export-") && f.endsWith(".csv"))
    .sort(); // ordre déterministe

  const map = new Map();
  let totalRows = 0;
  let invalid = 0;

  for (const file of files) {
    const content = fs.readFileSync(path.join(EXPORTS_DIR, file), "utf8");
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      if (!line.trim()) continue;
      if (line.startsWith("email,firstname,lastname")) continue; // header
      const cols = parseCsvLine(line);
      const email = (cols[0] || "").trim();
      const firstname = (cols[1] || "").trim();
      const lastname = (cols[2] || "").trim();
      if (!email) continue;
      totalRows++;
      const key = email.toLowerCase();
      if (!EMAIL_RE.test(email)) {
        if (!map.has(key)) {
          map.set(key, { email, firstname, lastname, invalid: true });
          invalid++;
        }
        continue;
      }
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { email, firstname, lastname, invalid: false });
      } else if (!existing.invalid) {
        // complète les noms manquants si on les trouve plus tard
        if (!existing.firstname && firstname) existing.firstname = firstname;
        if (!existing.lastname && lastname) existing.lastname = lastname;
      }
    }
  }

  return { map, files, totalRows, invalid };
}

/**
 * Génère un mot de passe temporaire sûr et lisible (sans caractères ambigus).
 */
function generateTempPassword(length = 12) {
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%";
  const bytes = crypto.randomBytes(length);
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += charset[bytes[i] % charset.length];
  }
  return pwd;
}

/**
 * Dérive un username depuis l'email, unique en base et dans le lot courant.
 */
async function deriveUniqueUsername(email, usedInRun) {
  let base = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 40);
  if (!base) base = "user";

  let candidate = base;
  let n = 1;
  // boucle jusqu'à trouver un username libre (base + en cours de run)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!usedInRun.has(candidate)) {
      const [rows] = await conn
        .promise()
        .execute("SELECT id FROM `users` WHERE `username` = ? LIMIT 1", [candidate]);
      if (rows.length === 0) break;
    }
    n++;
    candidate = `${base}${n}`;
  }
  usedInRun.add(candidate);
  return candidate;
}

// ── Template email ───────────────────────────────────────────────────────────
function buildRestoreEmailHtml(user, tempPassword) {
  const greetingName = user.firstname || user.email;
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px; background: #ea580c; color: white; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
        .button { display: inline-block; padding: 12px 24px; background: #ea580c; color: white !important; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .creds { background: #fff; border: 1px dashed #ea580c; border-radius: 5px; padding: 15px; margin: 15px 0; }
        .creds code { font-size: 16px; font-weight: bold; color: #ea580c; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your CADViewer account has been restored</h1>
        </div>
        <div class="content">
          <p>Hello ${greetingName},</p>
          <p>Following a technical issue, your CADViewer account was recreated.
             We have set a <strong>temporary password</strong> so you can sign in again.</p>
          <div class="creds">
            <p style="margin:0 0 8px 0;">Email: <code>${user.email}</code></p>
            <p style="margin:0;">Temporary password: <code>${tempPassword}</code></p>
          </div>
          <p>Please sign in and change your password right away:</p>
          <p style="text-align: center;">
            <a href="${LOGIN_URL}" class="button">Sign in to CADViewer</a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${LOGIN_URL}</p>
          <p>Sorry for the inconvenience, and thank you for using CADViewer!</p>
        </div>
        <div class="footer">
          <p>This email was sent automatically, please do not reply.</p>
        </div>
      </div>
    </body>
  </html>`;
}

async function sendRestoreEmail(user, tempPassword) {
  const html = buildRestoreEmailHtml(user, tempPassword);
  await transporter.sendMail({
    from: config.smtpFrom,
    to: user.email,
    subject: "Your CADViewer account has been restored",
    text:
      `Hello ${user.firstname || user.email},\n\n` +
      `Your CADViewer account was recreated following a technical issue.\n` +
      `Email: ${user.email}\n` +
      `Temporary password: ${tempPassword}\n\n` +
      `Sign in here and change your password: ${LOGIN_URL}\n\n` +
      `This email was sent automatically, please do not reply.`,
    html,
  });
}

// ── Rapport CSV ──────────────────────────────────────────────────────────────
function csvCell(v) {
  const s = v == null ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

function timestamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}${p(
    d.getMinutes()
  )}${p(d.getSeconds())}`;
}

// ── Programme principal ──────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv);
  const mode = args.execute ? "EXECUTE (création + envoi réels)" : "DRY-RUN (aucune écriture)";

  console.log("──────────────────────────────────────────────────────────");
  console.log(" Restauration des comptes utilisateurs CADViewer");
  console.log(` Mode      : ${mode}`);
  console.log(` Login URL : ${LOGIN_URL}`);
  console.log(` SMTP from : ${config.smtpFrom}  (host: ${config.smtpHost}:${config.smtpPort})`);
  console.log(` DB        : ${config.mysqlDatabase}@${config.mysqlHost}`);
  if (args.limit) console.log(` Limite    : ${args.limit}`);
  if (args.onlyEmail) console.log(` Filtre    : ${args.onlyEmail}`);
  console.log("──────────────────────────────────────────────────────────");

  // 1) Chargement CSV
  const { map, files, totalRows, invalid } = loadUsersFromCsv();
  let users = Array.from(map.values());
  if (args.onlyEmail) {
    users = users.filter((u) => u.email.toLowerCase() === args.onlyEmail);
  }
  console.log(
    `CSV: ${files.length} fichiers, ${totalRows} lignes, ${map.size} emails uniques, ${invalid} invalides.`
  );

  // 2) S'assurer que le dossier uploads existe (mode execute)
  if (args.execute && !fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const usedUsernames = new Set();
  const results = [];
  const stats = { new: 0, exists: 0, invalid: 0, created: 0, emailed: 0, errors: 0 };

  let processed = 0;
  for (const user of users) {
    if (args.limit && processed >= args.limit) break;
    processed++;

    const row = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      status: "",
      username: "",
      temp_password: "",
      email_sent: "",
      error: "",
    };

    // emails invalides
    if (user.invalid) {
      row.status = "invalid";
      stats.invalid++;
      results.push(row);
      continue;
    }

    try {
      // existence en base ?
      const [rows] = await conn
        .promise()
        .execute("SELECT id FROM `users` WHERE `email` = ? LIMIT 1", [user.email]);

      if (rows.length > 0) {
        row.status = "exists";
        stats.exists++;
        results.push(row);
        continue;
      }

      // → nouveau compte à recréer
      stats.new++;
      const username = await deriveUniqueUsername(user.email, usedUsernames);
      row.username = username;
      const tempPassword = generateTempPassword();

      if (!args.execute) {
        // DRY-RUN : on ne crée rien, on ne génère pas de mot de passe affiché
        row.status = "would_create";
        row.temp_password = "(dry-run)";
        results.push(row);
        continue;
      }

      // EXECUTE : création réelle
      const folderName = crypto.randomUUID();
      const userDirPath = path.join(UPLOADS_DIR, folderName);
      if (!fs.existsSync(userDirPath)) fs.mkdirSync(userDirPath, { recursive: true });

      const cryptedPassword = await bcrypt.hash(tempPassword, BCRYPT_ROUNDS);

      await conn.promise().execute(
        "INSERT INTO `users` " +
          "(`username`, `email`, `crypted_password`, `role`, `is_enabled`, `validation_token`, " +
          "`created_at`, `updated_at`, `folder_name`, `first_name`, `last_name`) " +
          "VALUES (?, ?, ?, ?, 1, NULL, NOW(), NOW(), ?, ?, ?)",
        [
          username,
          user.email,
          cryptedPassword,
          NEW_ACCOUNT_ROLE,
          folderName,
          user.firstname || null,
          user.lastname || null,
        ]
      );
      stats.created++;
      row.status = "created";
      row.temp_password = tempPassword;

      // envoi email
      try {
        await sendRestoreEmail(user, tempPassword);
        stats.emailed++;
        row.email_sent = "yes";
        console.log(`✓ ${user.email} — créé + email envoyé (${username})`);
      } catch (mailErr) {
        row.email_sent = "no";
        row.error = `email: ${mailErr.message}`;
        stats.errors++;
        console.warn(`⚠ ${user.email} — créé mais ÉCHEC envoi email: ${mailErr.message}`);
      }

      if (args.delay > 0) await sleep(args.delay);
    } catch (err) {
      row.status = row.status || "error";
      row.error = err.message;
      stats.errors++;
      console.error(`✗ ${user.email} — erreur: ${err.message}`);
    }

    results.push(row);
  }

  // 3) Rapport CSV
  const ts = timestamp();
  const reportPath = path.join(__dirname, `restore-users-report-${ts}.csv`);
  const header = "email,firstname,lastname,status,username,temp_password,email_sent,error\n";
  const body = results
    .map((r) =>
      [
        r.email,
        r.firstname,
        r.lastname,
        r.status,
        r.username,
        r.temp_password,
        r.email_sent,
        r.error,
      ]
        .map(csvCell)
        .join(",")
    )
    .join("\n");
  fs.writeFileSync(reportPath, header + body + "\n");

  // 4) Aperçu HTML de l'email (un exemple)
  const sample = users.find((u) => !u.invalid) || { email: "user@example.com", firstname: "Jane" };
  const previewPath = path.join(__dirname, "restore-users-email-preview.html");
  fs.writeFileSync(previewPath, buildRestoreEmailHtml(sample, "Ex4mple#Pwd"));

  // 5) Résumé
  console.log("──────────────────────────────────────────────────────────");
  console.log(" Résumé");
  console.log(`  Traités            : ${processed}`);
  console.log(`  Déjà en base       : ${stats.exists}  (ignorés)`);
  console.log(`  Invalides          : ${stats.invalid}`);
  console.log(`  Nouveaux détectés  : ${stats.new}`);
  if (args.execute) {
    console.log(`  Comptes créés      : ${stats.created}`);
    console.log(`  Emails envoyés     : ${stats.emailed}`);
    console.log(`  Erreurs            : ${stats.errors}`);
  } else {
    console.log("  (DRY-RUN : aucun compte créé, aucun email envoyé)");
  }
  console.log(`  Rapport CSV        : ${reportPath}`);
  console.log(`  Aperçu email HTML  : ${previewPath}`);
  if (!args.execute) {
    console.log("");
    console.log("  → Pour exécuter réellement : node scripts/restore-users.js --execute");
  }
  console.log("──────────────────────────────────────────────────────────");
}

main()
  .then(async () => {
    await conn.promise().end().catch(() => {});
    if (transporter && typeof transporter.close === "function") transporter.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error("Erreur fatale:", err);
    await conn.promise().end().catch(() => {});
    process.exit(1);
  });
