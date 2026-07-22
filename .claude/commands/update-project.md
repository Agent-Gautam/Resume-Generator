---
description: Create or sync a project source doc (and its memory digest) from the project's local git repo
argument-hint: <project-name> [repo-path | audit | notes about what changed]
---

Arguments: `$ARGUMENTS` — the FIRST token is the project name; anything after it is either a repo path, the literal keyword `audit` (→ Mode D), or free-text notes about what changed. If the tokens look mangled (paths with missing backslashes), reconstruct the obvious intent before proceeding.

Keep the project's source doc truthful and current with minimal token spend. The repo's git history is the changelog — never ask the user to rebuild or paste a doc.

Target doc: `projects/<project-name>.md`. Pick the mode that applies:

- Mode A — doc exists, sync it from new commits.
- Mode B — no doc yet, scaffold from the repo.
- Mode C — repo not on this machine, interview the user.
- Mode D — **audit** an existing doc against the code (invoke with `audit` as the second token, e.g. `/update-project blood-link audit`). Also runs automatically at the end of Mode A and Mode B.

## Claim tagging — the honesty ledger (read before any mode)

Every concrete capability claim in a project doc — each feature-breakdown line, each skill/keyword-index entry, and **every pre-written bullet** — carries a status tag. Shipped claims also carry a greppable evidence anchor. This is what makes the doc verifiable instead of trusted-on-faith.

**Status vocabulary:**

| Tag | Meaning | Resume-eligible? |
|---|---|---|
| `[shipped]` | Feature is wired end-to-end and actually runs — a component renders it, a route serves it, a function executes it — verifiable by grepping the synced repo. | **Yes — the only eligible tag.** |
| `[partial]` | Real but incomplete: designed-for, scaffolded, or prototyped (data-model support exists, a handler is stubbed, a flow is half-wired). | No — never written on a resume, in any framing. |
| `[planned]` | Documented intent, no working code. | No. |
| `[stub]` | Placeholder UI/route with no real behavior. | No — honest scope note only. |

**The golden test for `[shipped]` — installed ≠ used ≠ shipped.** A dependency in `package.json`, an `import`, or a data-model field is NOT evidence a feature exists. Tag `[shipped]` only when there is code that actually renders/serves/executes it. (This is exactly how "Chart.js is a dependency" got mis-written as "ships three analytics charts.")

**Evidence anchors:** after every `[shipped]` claim, add `` evidence: `Symbol` `` or `` evidence: `path/to/file` `` — greppable symbol names or file paths, **never line numbers** (line numbers rot on the next edit and the ledger silently goes stale). A reader must be able to `grep` the anchor in the synced repo and land on the real code. `[partial]` claims should note what exists vs. what's missing.

## Mode A — doc exists: incremental sync

1. Read the doc. Its frontmatter lists each repo as `path` + `synced` (the commit hash the doc is accurate through).
2. For each repo run: `git -C <path> log <synced>..HEAD --oneline --stat` (add `--no-color`; if huge, drop `--stat`). If empty for all repos, say "already in sync" and stop.
3. Investigate only what the log implies is resume-relevant: new features/endpoints/models, new or swapped dependencies, test-count changes, shipped things that were previously "planned", scale/performance changes. Read changed files selectively — never the whole repo.
4. Patch the doc **in place, only the affected sections**: stack lists, feature sections, counts ("38 tests" may now be wrong — recount via the test files touched), pre-written bullets if their facts changed.
5. **Honesty notes maintain in BOTH directions.** A shipped feature may delete a caveat (e.g. "OAuth designed-for, not shipped" dies the day OAuth ships). New half-finished work adds one. Stale honesty notes are as damaging as missing ones — they suppress true claims.
6. Update frontmatter: each repo's `synced` hash to its current HEAD, plus `synced-date`.
7. **Run the audit pass (Mode D) before finishing** — a sync that adds a claim without verifying it re-creates the exact drift this ledger exists to prevent. Re-tag any claim the audit reclassifies.
8. Refresh this project's digest entry and stamp in `memory/digest.md`.
9. Report a short change list: `tests 38 -> 45`, `added: Binance normalizer section`, `honesty note removed: ...`, `retagged: charts [shipped] -> [planned]`. If nothing resume-relevant changed (pure refactors/chores), say so — an in-place hash bump is still required so the next sync starts later.

## Mode B — no doc yet: scaffold from the repo

1. Locate the repo: use the argument after the project name if it's a path; otherwise look for a name match under `D:\repos\`; otherwise ask. Before writing from scratch, check the repo root for an existing resume source doc (e.g. `<project>.md`, `PROJECT_OVERVIEW.md`) — if one exists in the right format, copy + verify + add frontmatter instead of re-deriving everything.
2. Explore the repo (package manifests, README, schema/models, routes or feature folders, test files) and write a new source doc **following the exact section structure of `projects/cryptax.md`**: one-line + one-paragraph description, verified tech stack, architecture decisions with the "why", feature-by-feature work with the skills each demonstrates, skill→evidence index table, honest quantified achievements, pre-written bullets per variant, honesty notes.
3. Every claim must be verifiable in the code. **Tag every feature line, skill-index entry, and pre-written bullet with a status tag, and add an evidence anchor to each `[shipped]` claim** (see "Claim tagging" above). Counts (tests, models, endpoints) must be counted, not estimated.
4. Add frontmatter with repo path(s) + current HEAD hash(es) + date.
5. **Run the audit pass (Mode D)** to confirm every `[shipped]` tag resolves and to catch underclaimed strong work before you finalize.
6. Add a digest entry to `memory/digest.md`, and if `profile/general-resume.md`'s project index marks this project's source doc as MISSING, flip it to point at the new doc.

## Mode D — audit an existing doc against the code

Reconcile the doc's claim ledger with the real code in the synced repo(s). Invoke directly with `audit`, or run automatically at the end of Modes A and B.

1. Read the doc and extract every tagged (or as-yet-untagged) capability claim from the feature sections, skill/keyword index, and pre-written bullets.
2. For each `[shipped]`/`[partial]` claim, **grep the synced repo for real usage** — apply the golden test (installed ≠ used ≠ shipped). Confirm the evidence anchor resolves to code that renders/serves/executes the feature. A dependency, import, or schema field alone fails the test.
3. Hunt for **underclaims**: genuinely impressive, fully-wired code the doc under-represents or omits (complex RLS/queries, real-time subscriptions, non-trivial algorithms, auth middleware, aggregation logic). These are candidate new `[shipped]` bullets — surfacing them is how the resume stays *powerful* without overclaiming.
4. Write findings to `projects/<project-name>.audit.md` with three sections: **Overclaims** (claimed done, evidence weak/absent → the true status it must be retagged to), **Underclaims** (real strong work not claimed → evidence anchor), **Stale tags** (status no longer matches code, e.g. a `[partial]` now fully wired → promote to `[shipped]`).
5. Apply the corrections to the doc: retag overclaims down, promote stale `[partial]`→`[shipped]`, and fold new/removed caveats into the honesty-notes section in BOTH directions. When invoked standalone (not from a sync), still refresh the digest honesty line if a tag changed.

## Mode C — repo not on this machine (e.g. employer/client work)

Interview the user briefly: what shipped, what tech, what's countable, what must NOT be claimed. Patch the doc with those facts, marking them `(user-reported <date>)`. Update digest as in Mode A.

## Rules

- Source docs are factual reference material, not resumes — keep the doc's neutral, verifiable tone; resume-speak belongs to `/write-resume` time.
- Never inflate on sync: if a metric can't be re-verified cheaply, keep the old number and its "at time of writing" qualifier.
- If the arguments contain user notes about what changed, treat them as pointers for step 3 — still verify against the code where possible.
