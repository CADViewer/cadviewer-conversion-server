# Snowflake Cortex Agent — versioned instructions

The agent spec lives inside Snowflake, so before this folder existed a prompt
change could not be reviewed, diffed or rolled back. `orchestration.md` and
`response.md` are now the source of truth for the two instruction blocks of
`CADVIEWER_TEST.CADVIEWER.CADVIEWER_AGENT_TEST`; everything else in the spec
(tools, tool_resources, sample questions, model) is owned by Snowflake and is
preserved untouched by the deploy script.

## Files

| File | Role |
|---|---|
| `orchestration.md` | Orchestration instructions — guardrails, follow-up resolution, mode classification, SQL rules, output formats |
| `response.md` | Response instructions — JSON contract, size limits, rejection and clarification formats |
| `deploy-agent.js` | Push the two files to Snowflake (snapshots the live spec first) |
| `test-followups.js` | Hits the agent directly: does a follow-up query, or refuse? |
| `test-e2e.js` | Hits the running conversion server: full chat flow, history handling included |
| `backup/*.original.*` | The spec as it stood before the July 2026 follow-up fix — the rollback point |

## Deploy

```bash
# preview: writes pending-spec.json, sends nothing
node deploy-agent.js --dry-run --config /path/to/CADViewer_config.json

# apply (backs up the live spec into backup/ first, then reads back to verify)
node deploy-agent.js --config /path/to/CADViewer_config.json

# roll back
node deploy-agent.js --restore backup/CADVIEWER_AGENT_TEST.original.json --config /path/to/CADViewer_config.json
```

Credentials resolve from environment variables first, then from the `--config`
JSON. The script prefers `SNOWFLAKE_BEARER_TOKEN-ADMIN` and falls back to
`SNOWFLAKE_BEARER_TOKEN` when the admin token is expired or rejected.

The write goes through `ALTER AGENT … MODIFY LIVE VERSION SET SPECIFICATION`,
not the REST `PUT /agents/<name>` — the latter answers `200` while silently
leaving the spec unchanged.

## Test

Two suites, deliberately at different levels.

**`test-followups.js`** — talks to the agent directly, so it isolates the prompt.

```bash
node test-followups.js --config /path/to/CADViewer_config.json
node test-followups.js --config /path/to/CADViewer_config.json --only 1,3
```

Eight cases, six transcribed from real rejections in `logs/ai-requests/`. The
pass criterion is `tool_use` in the event stream, not answer quality: the bug
guarded against is the agent refusing without ever querying. Two are controls —
a self-contained question must keep working, and a G1 code-generation request
must still be rejected.

**`test-e2e.js`** — goes through the running conversion server, so it also covers
history handling in `routes/ai.js`. Requires the server up (Docker or `node app.js`).

```bash
node test-e2e.js                          # all cases against localhost:3000
node test-e2e.js --url http://host:3000
node test-e2e.js --repeat 3               # flakiness check
```

Ten cases. Six reproduce a defect reported from real use — follow-up rejected,
elliptical parameter change, a standalone question inheriting the thread, a
previous "no results" priming the next answer, a mall-level question coming back
as null-padded space rows, and a property scoped by number returning nothing.
Four more cover the features the prompt rules also touch and that would otherwise
go unwatched: Mode B (recommendations), Mode C (combinations), chart mode, and
selected spaces. Checks assert observable behaviour (row counts, container count,
null ratio, presence of a visualization), never exact wording, so they survive
the agent rephrasing itself.

Case 10 is self-verifying: spaces 1585 + 1560 + 1465 are 7000 + 6401 + 3008 SF,
so the answer must total 16,409 SF.

Each case costs one agent run (~15-90 s), so a full pass takes several minutes.
The agent is non-deterministic: re-run a single failure before treating it as a
regression, and prefer `--repeat` when judging stability.

## Why the follow-up fix was needed

Elliptical follow-ups ("list them", "before 2028 instead") were answered with a
guardrail rejection and **no tool call at all**. Three causes, all in the prompt:

1. The instructions were written entirely for single-turn use — no coreference
   resolution rule anywhere, and the only mention of history discouraged using it.
2. The only legal outputs were Formats 1A/1B/2/3 (which require tool data) or a
   rejection, so a question that was not immediately translatable to SQL had
   exactly one available exit: refuse.
3. The model rationalised its way into refusals of the form "I cannot list X
   without querying the database" — treating the need for a query as an obstacle
   rather than as the instruction to call a tool.

The fix adds Step 0 (rewrite an elliptical question into a self-contained one
before applying guardrails), Format 0 (clarification, so ambiguity has an exit
that is not a rejection), and an explicit ban on the "I cannot without querying"
rejection. Server-side, `routes/ai.js` stopped replaying refusals back as
conversation history, which had been priming the agent to refuse again.

## The second round: the thread poisoning the well

Fixing the refusals surfaced a worse family of bugs — wrong answers rather than
no answer. All four are now covered by `test-e2e.js`:

1. **A standalone question inherited the thread.** History was attached to every
   request, not just follow-ups, so a fresh question answered the previous topic.
   Clearing the chat "fixed" it. History now travels only with an explicit
   follow-up, capped at 6 turns.
2. **A previous "no results" primed the next answer.** "No stores have a future
   tenant" in the history led an unrelated query to also answer "no stores".
   Empty-result answers are now dead-end turns and never replayed.
3. **Dropping a dead-end answer orphaned its question.** Two consecutive user
   turns read as one compound request, and the agent returned their intersection —
   empty. Dead-end answers are now dropped *with* the question that produced them.
4. **`PROPERTY_NUMBER` matched without its prefix.** The prompt's own examples
   said `'4279'`; the stored value is `p0004279`. Strict equality matched nothing
   and reported "no stores found" for a property full of stores. Worse, the agent
   ANDed that broken condition with a *correct* name match, so one bad predicate
   wiped out a working query — this alone silently broke Mode C, selected spaces
   and any property-scoped question. The context marker now leads with the
   property NAME, and the prompt forbids joining property identifiers with `AND`.

Two more, on the formatting side: the agent emitted `exact_matches` **and**
`tables` for the same answer (doubling the payload until the JSON was truncated
mid-object), and padded mall-level rows with null space-level fields. The prompt
now mandates exactly one result container and forbids null padding. As a
backstop, the client salvages the complete rows out of a truncated payload
(`salvageTruncatedJSON`) instead of dumping raw JSON into the chat.
