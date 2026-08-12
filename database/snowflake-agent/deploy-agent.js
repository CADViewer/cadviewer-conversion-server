#!/usr/bin/env node
/**
 * Deploy the versioned Cortex Agent instructions to Snowflake.
 *
 * The agent spec lives in Snowflake, not in git, so it used to be impossible to
 * review or roll back a prompt change. This script keeps `orchestration.md` and
 * `response.md` in this folder as the source of truth: it fetches the live spec,
 * swaps only the two instruction blocks, and writes it back. Everything else
 * (tools, tool_resources, sample questions, model) is preserved untouched.
 *
 * Usage:
 *   node deploy-agent.js --dry-run            # show what would change
 *   node deploy-agent.js                      # apply
 *   node deploy-agent.js --backup             # fetch live spec into backup/ only
 *   node deploy-agent.js --restore <file>     # push a backup file back
 *
 * Credentials resolve from (in order): environment variables, then --config
 * <path-to-CADViewer_config.json>.
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const hasFlag = (f) => args.includes(f);
const flagValue = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

const DRY_RUN = hasFlag("--dry-run");
const BACKUP_ONLY = hasFlag("--backup");
const RESTORE_FILE = flagValue("--restore");

function loadConfig() {
  const configPath = flagValue("--config");
  let fileCfg = {};
  if (configPath) {
    fileCfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  }
  const pick = (key) => process.env[key] || fileCfg[key];

  // Altering an agent needs ownership, so prefer the admin token — but these are
  // programmatic access tokens with an expiry, and a stale admin token should not
  // block a deploy the runtime token is allowed to make. Try admin, fall back.
  const tokens = [
    { label: "SNOWFLAKE_BEARER_TOKEN-ADMIN", value: pick("SNOWFLAKE_BEARER_TOKEN-ADMIN") },
    { label: "SNOWFLAKE_BEARER_TOKEN", value: pick("SNOWFLAKE_BEARER_TOKEN") },
  ].filter((t) => t.value && !String(t.value).startsWith("your-"));

  const cfg = {
    baseUrl: pick("SNOWFLAKE_BASE_URL"),
    tokens,
    token: tokens[0] && tokens[0].value,
    database: pick("SNOWFLAKE_AGENT_DATABASE"),
    schema: pick("SNOWFLAKE_AGENT_SCHEMA"),
    name: pick("SNOWFLAKE_AGENT_NAME"),
    // Needed only by the SQL path (ALTER AGENT); same warehouse the proxy uses.
    warehouse: flagValue("--warehouse") || pick("SNOWFLAKE_WAREHOUSE") || "WH_STANDARD_USERS",
  };

  const missing = ["baseUrl", "database", "schema", "name"].filter(
    (k) => !cfg[k] || String(cfg[k]).startsWith("your-"),
  );
  if (!cfg.tokens.length) missing.push("SNOWFLAKE_BEARER_TOKEN");
  if (missing.length) {
    console.error(
      `Missing credentials: ${missing.join(", ")}.\n` +
        `Set them as environment variables or pass --config <CADViewer_config.json>.`,
    );
    process.exit(1);
  }
  return cfg;
}

/** Run `attempt` with each configured token until one is accepted. */
async function withToken(cfg, attempt) {
  let lastErr;
  for (const t of cfg.tokens) {
    try {
      return await attempt(t.value);
    } catch (err) {
      lastErr = err;
      if (!/\((401|403)\)/.test(err.message)) throw err;
      console.warn(`  token ${t.label} rejected — ${err.message.split("\n")[0]}`);
    }
  }
  throw lastErr;
}

function agentUrl(cfg) {
  const base = cfg.baseUrl.replace(/\/+$/, "");
  return `${base}/api/v2/databases/${cfg.database}/schemas/${cfg.schema}/agents/${cfg.name}`;
}

function headers(token) {
  return {
    "X-Snowflake-Authorization-Token-Type": "PROGRAMMATIC_ACCESS_TOKEN",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "CADViewer-Agent-Deploy/1.0.0",
  };
}

async function fetchSpec(cfg) {
  return withToken(cfg, async (token) => {
    const res = await fetch(agentUrl(cfg), { method: "GET", headers: headers(token) });
    if (!res.ok) {
      throw new Error(`GET agent failed (${res.status}): ${await res.text()}`);
    }
    return res.json();
  });
}

async function putSpec(cfg, spec) {
  // The REST PUT on /agents/<name> answers 200 but silently leaves the spec
  // untouched, so the write goes through SQL instead. The spec is emitted as
  // JSON, which ALTER AGENT accepts since JSON is valid YAML flow style.
  // Safe because neither instruction file contains a `$` (checked at deploy time).
  const specJson = JSON.stringify(spec, null, 2);
  if (specJson.includes("$$")) {
    throw new Error("Spec contains '$$', which would terminate the SQL literal early.");
  }
  const statement =
    `ALTER AGENT ${cfg.database}.${cfg.schema}.${cfg.name} ` +
    `MODIFY LIVE VERSION SET SPECIFICATION = $$\n${specJson}\n$$`;

  const base = cfg.baseUrl.replace(/\/+$/, "");
  return withToken(cfg, async (token) => {
    const res = await fetch(`${base}/api/v2/statements?async=false`, {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify({ statement, warehouse: cfg.warehouse }),
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`ALTER AGENT failed (${res.status}): ${text}`);
    }
    return text;
  });
}

function timestamp() {
  return new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
}

async function main() {
  const cfg = loadConfig();
  const here = __dirname;

  console.log(`Agent: ${cfg.database}.${cfg.schema}.${cfg.name}`);

  const live = await fetchSpec(cfg);
  const liveSpec = JSON.parse(live.agent_spec);

  // Always snapshot the live spec before touching anything.
  const backupDir = path.join(here, "backup");
  fs.mkdirSync(backupDir, { recursive: true });
  const snapshot = path.join(backupDir, `${cfg.name}.${timestamp()}.json`);
  fs.writeFileSync(snapshot, JSON.stringify(live, null, 2));
  console.log(`Live spec backed up to ${path.relative(here, snapshot)}`);

  if (BACKUP_ONLY) return;

  let nextSpec;
  if (RESTORE_FILE) {
    const restored = JSON.parse(fs.readFileSync(RESTORE_FILE, "utf8"));
    nextSpec = typeof restored.agent_spec === "string"
      ? JSON.parse(restored.agent_spec)
      : restored.agent_spec || restored;
    console.log(`Restoring instructions from ${RESTORE_FILE}`);
  } else {
    const orchestration = fs.readFileSync(path.join(here, "orchestration.md"), "utf8");
    const response = fs.readFileSync(path.join(here, "response.md"), "utf8");
    nextSpec = {
      ...liveSpec,
      instructions: { ...liveSpec.instructions, orchestration, response },
    };
  }

  const before = liveSpec.instructions || {};
  const after = nextSpec.instructions || {};
  for (const key of ["orchestration", "response"]) {
    const b = (before[key] || "").length;
    const a = (after[key] || "").length;
    const delta = a - b;
    console.log(
      `  instructions.${key}: ${b} -> ${a} chars (${delta >= 0 ? "+" : ""}${delta})`,
    );
  }
  const preserved = Object.keys(liveSpec).filter((k) => k !== "instructions");
  console.log(`  preserved untouched: ${preserved.join(", ")}`);

  if (DRY_RUN) {
    const out = path.join(here, "pending-spec.json");
    fs.writeFileSync(out, JSON.stringify(nextSpec, null, 2));
    console.log(`\nDry run — nothing sent. Payload written to ${path.relative(here, out)}`);
    return;
  }

  await putSpec(cfg, nextSpec);

  // Read back so the reported state is what Snowflake actually stored.
  const verify = JSON.parse((await fetchSpec(cfg)).agent_spec);
  const ok = ["orchestration", "response"].every(
    (k) => verify.instructions[k] === after[k],
  );
  console.log(ok ? "\nDeployed and verified." : "\nDeployed but read-back MISMATCH — investigate.");
  if (!ok) process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
