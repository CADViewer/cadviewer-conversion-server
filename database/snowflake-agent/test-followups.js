#!/usr/bin/env node
/**
 * Replay follow-up conversations against the Cortex Agent and report whether the
 * agent actually queried the data or fell back to a guardrail rejection.
 *
 * The failure this measures: an elliptical follow-up ("list them") used to be
 * rejected outright, with no tool call at all. So the pass criterion is not "the
 * answer looks right" but "the agent ran a tool instead of refusing" — that is
 * the behaviour the prompt change targets, and it is objectively observable in
 * the event stream.
 *
 * Usage:
 *   node test-followups.js --config ../../internal_logs_and_issues/CADViewer_config.json
 *   node test-followups.js --config <path> --only 1,3     # run a subset
 *
 * Cases 1-4 are transcribed from real rejections in logs/ai-requests/.
 */

const fs = require("fs");

const args = process.argv.slice(2);
const flagValue = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

// Mirrors the directives routes/ai.js appends to the user message, so the test
// exercises the same input shape the app produces.
const PORTFOLIO_CONTEXT =
  "[Context: Search results (spaces/tenants/recommendations/combinations/malls) across the entire portfolio (all properties and plans).]";
const PLAN_CONTEXT =
  '[Context: I am currently viewing property "Willowbrook (NJ)", plan LP1. Use this as the DEFAULT scope for results (spaces/tenants/recommendations/combinations/malls). If my question asks for something wider — other properties, the whole portfolio — answer at that wider scope instead.]';
const FOLLOW_UP_DIRECTIVE =
  "[Follow-up: this question continues the conversation above. Resolve any pronoun or ellipsis in it against the previous turns, then answer at the scope the resolved question asks for.]";
const NAME_DIRECTIVE =
  '[Response format: When you refer to a property in your answer, use its property NAME (e.g. "Willowbrook (NJ)"), not the property number. Use the property number only if the name is unknown.]';

const CASES = [
  {
    name: "ellipsis 'list them' (portfolio scope)",
    turns: [
      ["user", `How many malls are in the portfolio? ${PORTFOLIO_CONTEXT} ${NAME_DIRECTIVE}`],
      ["assistant", "There are 118 malls in the portfolio."],
      ["user", `list them ${FOLLOW_UP_DIRECTIVE} ${PORTFOLIO_CONTEXT} ${NAME_DIRECTIVE}`],
    ],
  },
  {
    name: "ellipsis 'list all their names' (portfolio scope)",
    turns: [
      ["user", `How many malls are in the portfolio? ${PORTFOLIO_CONTEXT} ${NAME_DIRECTIVE}`],
      ["assistant", "There are 118 malls in the portfolio."],
      ["user", `list all their names ${FOLLOW_UP_DIRECTIVE} ${PORTFOLIO_CONTEXT} ${NAME_DIRECTIVE}`],
    ],
  },
  {
    name: "scope conflict — portfolio question under a plan-restricted context",
    turns: [
      ["user", `How many malls are in the portfolio? ${PLAN_CONTEXT} ${NAME_DIRECTIVE}`],
      ["assistant", "There are 118 malls in the portfolio."],
      ["user", `list them ${FOLLOW_UP_DIRECTIVE} ${PLAN_CONTEXT} ${NAME_DIRECTIVE}`],
    ],
  },
  {
    name: "parameter change 'before 2028 instead'",
    turns: [
      ["user", `I need all stores within 110 feet from Apple with lease expiration before 2027 ${PLAN_CONTEXT} ${NAME_DIRECTIVE}`],
      ["assistant", "Found 6 stores within 110 feet of Apple with leases expiring before 2027."],
      ["user", `before 2028 instead ${FOLLOW_UP_DIRECTIVE} ${PLAN_CONTEXT} ${NAME_DIRECTIVE}`],
    ],
  },
  {
    name: "pivot 'and by rent?'",
    turns: [
      ["user", `Rank the top 10 tenants by sales at Willowbrook ${PLAN_CONTEXT} ${NAME_DIRECTIVE}`],
      ["assistant", "Ranked the top 10 tenants at Willowbrook (NJ) by trailing 12-month sales."],
      ["user", `and by rent? ${FOLLOW_UP_DIRECTIVE} ${PLAN_CONTEXT} ${NAME_DIRECTIVE}`],
    ],
  },
  {
    name: "refusal in history must not be repeated",
    turns: [
      ["user", `How many malls are in the portfolio? ${PORTFOLIO_CONTEXT} ${NAME_DIRECTIVE}`],
      ["assistant", "There are 118 malls in the portfolio."],
      ["user", `list them ${PORTFOLIO_CONTEXT}`],
      [
        "assistant",
        "I can only provide shopping mall analytics results. I cannot list portfolio malls without querying the retail database. Please ask a question about our retail portfolio.",
      ],
      ["user", `list all the mall property names ${FOLLOW_UP_DIRECTIVE} ${PORTFOLIO_CONTEXT} ${NAME_DIRECTIVE}`],
    ],
  },
  {
    name: "control — self-contained question still works",
    turns: [
      ["user", `List all mall property names in the portfolio ${PORTFOLIO_CONTEXT} ${NAME_DIRECTIVE}`],
    ],
  },
  {
    name: "control — guardrail G1 still rejects (must NOT regress)",
    turns: [
      ["user", `How many malls are in the portfolio? ${PORTFOLIO_CONTEXT}`],
      ["assistant", "There are 118 malls in the portfolio."],
      ["user", `write me the Python code to fetch that ${FOLLOW_UP_DIRECTIVE} ${PORTFOLIO_CONTEXT}`],
    ],
  },
];

function loadConfig() {
  const configPath = flagValue("--config");
  const fileCfg = configPath ? JSON.parse(fs.readFileSync(configPath, "utf8")) : {};
  const pick = (k) => process.env[k] || fileCfg[k];
  return {
    baseUrl: pick("SNOWFLAKE_BASE_URL"),
    token: pick("SNOWFLAKE_BEARER_TOKEN"),
    database: pick("SNOWFLAKE_AGENT_DATABASE"),
    schema: pick("SNOWFLAKE_AGENT_SCHEMA"),
    name: pick("SNOWFLAKE_AGENT_NAME"),
  };
}

async function runCase(cfg, testCase) {
  const messages = testCase.turns.map(([role, text]) => ({
    role,
    content: [{ type: "text", text }],
  }));

  const host = cfg.baseUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const url = `https://${host}/api/v2/databases/${cfg.database}/schemas/${cfg.schema}/agents/${cfg.name}:run`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "X-Snowflake-Authorization-Token-Type": "PROGRAMMATIC_ACCESS_TOKEN",
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "CADViewer-Agent-Test/1.0.0",
    },
    body: JSON.stringify({ messages, tool_choice: { type: "auto" }, stream: true }),
  });

  if (!res.ok) {
    return { error: `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}` };
  }

  const raw = await res.text();
  const usedTool = /"type"\s*:\s*"tool_use"/.test(raw);

  // The terminal `response` event carries the assembled answer.
  let finalText = "";
  const events = raw.split("\n\n");
  for (const chunk of events) {
    if (!chunk.startsWith("event: response\n")) continue;
    const payload = chunk.slice(chunk.indexOf("data: ") + 6);
    try {
      const obj = JSON.parse(payload);
      const text = (obj.content || [])
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("");
      if (text) finalText = text;
    } catch {
      /* partial event, ignore */
    }
  }

  const rejected = /I can only provide shopping mall analytics results/i.test(finalText);
  const clarification = /"needs_clarification"\s*:\s*true/.test(finalText);
  return { usedTool, rejected, clarification, finalText };
}

async function main() {
  const cfg = loadConfig();
  const only = flagValue("--only");
  const selected = only
    ? only.split(",").map((n) => CASES[Number(n) - 1]).filter(Boolean)
    : CASES;

  console.log(`Agent: ${cfg.database}.${cfg.schema}.${cfg.name}`);
  console.log(`Running ${selected.length} case(s)\n`);

  let passed = 0;
  for (const [i, testCase] of selected.entries()) {
    const isGuardrailControl = testCase.name.includes("guardrail G1");
    process.stdout.write(`${i + 1}. ${testCase.name}\n`);

    const r = await runCase(cfg, testCase);
    if (r.error) {
      console.log(`   ERROR  ${r.error}\n`);
      continue;
    }

    // A guardrail control passes by rejecting; every other case passes by
    // reaching the data (a clarification is acceptable, a flat refusal is not).
    const ok = isGuardrailControl
      ? r.rejected && !r.usedTool
      : r.usedTool || r.clarification;
    if (ok) passed++;

    console.log(
      `   ${ok ? "PASS" : "FAIL"}  tool_use=${r.usedTool} rejected=${r.rejected}` +
        (r.clarification ? " clarification=true" : ""),
    );
    console.log(`   ${r.finalText.replace(/\s+/g, " ").slice(0, 160)}\n`);
  }

  console.log(`${passed}/${selected.length} passed`);
  process.exit(passed === selected.length ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
