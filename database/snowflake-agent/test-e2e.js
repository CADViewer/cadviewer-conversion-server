#!/usr/bin/env node
/**
 * End-to-end regression suite for the chat flow, driven through the running
 * conversion server (not the agent directly) so it exercises the proxy's history
 * handling as well as the agent prompt.
 *
 * Every case here reproduces a defect reported from real use:
 *   1. a follow-up used to be rejected outright instead of querying
 *   2. an elliptical parameter change ("before 2028 instead") was rejected
 *   3. a standalone question asked after a follow-up inherited the thread and
 *      answered the previous topic — clearing the chat "fixed" it
 *   4. a previous "no results" answer primed the next query to also say "none"
 *   5. a follow-up silently widened the scope to the whole portfolio
 *   6. a mall-level question came back as space-level rows full of nulls, with
 *      two result containers, blowing the token budget and truncating the JSON
 *   7. property_number matched without its p000 prefix → empty result set
 *
 * Usage:
 *   node test-e2e.js                     # all cases against http://localhost:3000
 *   node test-e2e.js --url http://host:3000 --only 3,4
 *   node test-e2e.js --repeat 3          # run each case N times (flakiness check)
 */

const args = process.argv.slice(2);
const flag = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

const BASE_URL = flag("--url") || "http://localhost:3000";
const REPEAT = Number(flag("--repeat") || 1);

const WILLOWBROOK = {
  planName: "LP1",
  propertyNumber: "p0004279",
  propertyName: "Willowbrook (NJ)",
};

/**
 * Each case declares the payload the UI would send plus a `check` returning
 * { ok, detail }. Checks assert observable behaviour, never exact wording.
 */
const CASES = [
  {
    name: "follow-up: ellipsis 'list them' resolves and queries",
    payload: {
      userQuery: "list them",
      conversationHistory: [
        { role: "user", content: "How many malls are in the portfolio?" },
        { role: "assistant", content: "There are 118 malls in the portfolio." },
      ],
      followUpContext: "There are 118 malls in the portfolio.",
    },
    check: (r) => ({
      ok: !r.rejected && r.rows > 1,
      detail: `rows=${r.rows}`,
    }),
  },
  {
    name: "follow-up: parameter change 'before 2028 instead'",
    payload: {
      userQuery: "before 2028 instead",
      planInfo: WILLOWBROOK,
      conversationHistory: [
        { role: "user", content: "Which tenants have leases expiring before 2027?" },
        {
          role: "assistant",
          content: "Found 14 tenants at Willowbrook (NJ) on plan LP1 with leases expiring before 2027.",
        },
      ],
      followUpContext:
        "Found 14 tenants at Willowbrook (NJ) on plan LP1 with leases expiring before 2027.",
    },
    // Widening 2027 -> 2028 can only ever return MORE rows, never zero.
    check: (r) => ({
      ok: !r.rejected && r.rows >= 14,
      detail: `rows=${r.rows} (must be >= 14, the 2027 count)`,
    }),
  },
  {
    name: "standalone question after a thread ignores the history",
    payload: {
      userQuery: "show me the 10 best performing stores based on R12 sales",
      planInfo: WILLOWBROOK,
      // No followUpContext: the user typed this, they did not click "Follow up".
      conversationHistory: [
        { role: "user", content: "Which stores have a future tenant? list current and future tenants" },
        {
          role: "assistant",
          content: "No stores at Willowbrook (NJ) on plan LP1 have a future tenant on file.",
        },
      ],
    },
    check: (r) => ({
      ok: !r.rejected && r.rows > 0,
      detail: `rows=${r.rows} (0 means the negative history leaked through)`,
    }),
  },
  {
    name: "negative answer in history does not prime a negative answer",
    payload: {
      userQuery: "show me the 10 best performing stores based on R12 sales",
      planInfo: WILLOWBROOK,
      conversationHistory: [
        { role: "user", content: "Which stores have a future tenant?" },
        {
          role: "assistant",
          content: "No stores at Willowbrook (NJ) on plan LP1 have a future tenant on file.",
        },
      ],
      followUpContext: "No stores at Willowbrook (NJ) on plan LP1 have a future tenant on file.",
    },
    check: (r) => ({
      ok: !r.rejected && r.rows > 0,
      detail: `rows=${r.rows} (0 means the "no results" answer was carried over)`,
    }),
  },
  {
    name: "mall-level question returns ONE container and no null padding",
    payload: {
      userQuery: "which ones are in the NorthEast?",
      conversationHistory: [
        { role: "user", content: "List all malls in the portfolio ordered by decreasing store count" },
        { role: "assistant", content: "Malls in the portfolio ordered by decreasing store count." },
      ],
      followUpContext: "Malls in the portfolio ordered by decreasing store count.",
    },
    check: (r) => ({
      ok: r.parsed && r.containers.length === 1 && r.nullRatio < 0.5,
      detail: `parsed=${r.parsed} containers=[${r.containers}] nullRatio=${r.nullRatio.toFixed(2)}`,
    }),
  },
  {
    name: "property scoped by number still finds its stores (p000 prefix)",
    payload: {
      userQuery: "list the tenants with the highest rent per square foot",
      planInfo: WILLOWBROOK,
    },
    check: (r) => ({
      ok: !r.rejected && r.rows > 0,
      detail: `rows=${r.rows} (0 usually means PROPERTY_NUMBER was matched without its p000 prefix)`,
    }),
  },
  // The "exactly one container" and field-inclusion rules apply to Mode B and C
  // too, so both need their own regression cover.
  {
    name: "Mode B: tenant recommendation returns `recommendations`",
    payload: {
      userQuery:
        "Recommend a prospective tenant for Space 1485 based on the size of the space and frequent co-tenants within 200 feet of the store-front",
      planInfo: WILLOWBROOK,
    },
    check: (r) => ({
      ok: !r.rejected && r.containers.includes("recommendations") && r.containers.length === 1 && r.rows > 0,
      detail: `containers=[${r.containers}] rows=${r.rows}`,
    }),
  },
  {
    name: "Mode C: space combination returns `combinations`",
    payload: {
      userQuery:
        "Provide the best options to combine adjacent spaces between 7,000 and 12,000 SF based on total rent and lease expiration",
      planInfo: WILLOWBROOK,
    },
    check: (r) => ({
      ok: !r.rejected && r.containers.includes("combinations") && r.containers.length === 1 && r.rows > 0,
      detail: `containers=[${r.containers}] rows=${r.rows}`,
    }),
  },
  {
    name: "chart mode still produces a visualization",
    payload: {
      userQuery: "Compare total rent per plan across the portfolio",
      isChartMode: true,
    },
    check: (r) => ({
      ok: !r.rejected && r.hasVisualization,
      detail: `visualizations=${r.hasVisualization} containers=[${r.containers}]`,
    }),
  },
  {
    name: "selected spaces are honoured as the analysis subject",
    payload: {
      userQuery: "what is the total area of these spaces?",
      planInfo: WILLOWBROOK,
      selectedSpaces: ["1585", "1560", "1465"],
    },
    check: (r) => ({
      ok: !r.rejected && r.rows > 0,
      detail: `rows=${r.rows} containers=[${r.containers}]`,
    }),
  },
];

/** Parse the SSE stream and reduce it to the few facts the checks need. */
function analyse(raw) {
  let final = null;
  for (const chunk of raw.split("\n\n")) {
    if (!chunk.startsWith("event: response\n")) continue;
    try {
      const obj = JSON.parse(chunk.slice(chunk.indexOf("data: ") + 6));
      const text = (obj.content || [])
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("");
      if (text) final = text;
    } catch {
      /* partial event */
    }
  }
  if (!final) {
    return { parsed: false, rejected: false, rows: 0, containers: [], nullRatio: 0, length: 0, message: "(no final response)" };
  }

  const rejected = /I can only provide shopping mall analytics results/i.test(final);
  let data;
  let truncated = false;
  try {
    data = JSON.parse(final);
  } catch {
    // Mirror the client: recover the complete rows out of a truncated payload
    // instead of scoring the whole answer as a loss.
    data = salvageTruncatedJSON(final);
    truncated = true;
    if (!data) {
      return { parsed: false, truncated, rejected, rows: 0, containers: [], nullRatio: 0, length: final.length, message: "(unparseable JSON, nothing salvageable)" };
    }
  }

  const containers = ["exact_matches", "tables", "recommendations", "combinations"].filter(
    (k) => k in data,
  );
  const rowsOf = (k) => {
    const v = data[k];
    if (Array.isArray(v)) return v.length;
    if (v && Array.isArray(v.data)) return v.data.length;
    return 0;
  };
  const rows = containers.reduce((n, k) => n + rowsOf(k), 0);

  // How much of the first row is null padding — the mall-level-as-space-level bug.
  let nullRatio = 0;
  const firstRow = Array.isArray(data.exact_matches)
    ? data.exact_matches[0]
    : data.tables && Array.isArray(data.tables.data)
      ? data.tables.data[0]
      : null;
  if (firstRow && typeof firstRow === "object") {
    const vals = Object.values(firstRow);
    if (vals.length) nullRatio = vals.filter((v) => v === null).length / vals.length;
  }

  const hasVisualization =
    Array.isArray(data.visualizations) && data.visualizations.length > 0;

  return {
    parsed: true,
    truncated,
    rejected,
    rows,
    containers,
    nullRatio,
    hasVisualization,
    message: data.message || "",
    length: final.length,
  };
}

/**
 * Same recovery the client performs on a payload cut off mid-write: cut back to
 * the last complete element and close whatever is still open.
 */
function salvageTruncatedJSON(jsonString) {
  const stack = [];
  let inString = false;
  let escaped = false;
  let safeEnd = -1;
  let safeStack = [];

  for (let i = 0; i < jsonString.length; i++) {
    const ch = jsonString[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\") { if (inString) escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{" || ch === "[") stack.push(ch);
    else if (ch === "}" || ch === "]") {
      stack.pop();
      if (stack.length > 0) { safeEnd = i + 1; safeStack = [...stack]; }
    }
  }
  if (safeEnd === -1) return null;
  let candidate = jsonString.slice(0, safeEnd);
  for (let i = safeStack.length - 1; i >= 0; i--) candidate += safeStack[i] === "{" ? "}" : "]";
  try { return JSON.parse(candidate); } catch { return null; }
}

async function runCase(testCase) {
  const body = {
    provider: "snowflake-agent",
    mode: "Test",
    isChartMode: false,
    ...testCase.payload,
  };
  const res = await fetch(`${BASE_URL}/ai/proxy`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return analyse(await res.text());
}

async function main() {
  const only = flag("--only");
  const selected = only
    ? only.split(",").map((n) => CASES[Number(n) - 1]).filter(Boolean)
    : CASES;

  console.log(`Target: ${BASE_URL}`);
  console.log(`${selected.length} case(s) × ${REPEAT} run(s)\n`);

  let passed = 0;
  let total = 0;
  const failures = [];

  for (const [i, testCase] of selected.entries()) {
    for (let run = 1; run <= REPEAT; run++) {
      total++;
      const label = REPEAT > 1 ? `${i + 1}.${run}` : `${i + 1}`;
      let verdict;
      try {
        const r = await runCase(testCase);
        verdict = testCase.check(r);
        if (verdict.ok) passed++;
        else failures.push(`${label} ${testCase.name} — ${verdict.detail}`);
        console.log(`${label}. ${verdict.ok ? "PASS" : "FAIL"}  ${testCase.name}`);
        console.log(
          `     ${verdict.detail}${r.truncated ? ` [TRUNCATED, salvaged — ${r.length} chars]` : ""}`,
        );
        if (r.message) console.log(`     "${r.message.replace(/\s+/g, " ").slice(0, 120)}"`);
      } catch (err) {
        failures.push(`${label} ${testCase.name} — ERROR ${err.message}`);
        console.log(`${label}. ERROR ${testCase.name}\n     ${err.message}`);
      }
    }
  }

  console.log(`\n${passed}/${total} passed`);
  if (failures.length) {
    console.log("\nFailures:");
    failures.forEach((f) => console.log(`  - ${f}`));
  }
  process.exit(passed === total ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
