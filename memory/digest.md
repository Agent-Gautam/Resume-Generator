# Memory Digest — read this INSTEAD of scanning the repo

> **Protocol.** Each entry below carries a stamp: `(size-bytes, YYYY-MM-DD last-write)` of its source file. Staleness check = run one quick dir listing (`Get-ChildItem profile, projects, templates | Select Name, Length, LastWriteTime`) and compare against the stamps. Rebuild only entries whose stamp mismatches, then update the stamp. Never rebuild everything blindly.

## Profile digest — `profile/general-resume.md` *(8945 bytes, 2026-07-27)*
**Gautam Anand** — Software Engineer, Mohali, Punjab, India. +91 7717484812, gautam.anand.ptu@gmail.com. GitHub: github.com/Agent-Gautam · LinkedIn: linkedin.com/in/gautam-anand-ptu. Both jobs were Remote. Available immediately; open to remote or relocation anywhere in India.
- **⚠️ Resume header location = the JD's location** (JD "Bengaluru" → `Bengaluru, India`; "Noida" → `Noida, India`). Use `Mohali, Punjab, India` when (a) the JD names no city, or (b) the role is **remote** and its city is **outside north India** (beyond Delhi/Gurgaon/Noida — e.g. a Bengaluru/Hyderabad/Mumbai remote job). On-site/hybrid anywhere, and remote within north India, use the JD city. Never default to the home city. (Rule: `resume-writing` skill ATS mechanics + `write-resume` step 5.)
- **Education:** B.Tech CS, I.K. Gujral Punjab Technical University, 2022–2026, CGPA 8.6/10; NIELIT Full Stack Web Dev Training, Grade S, 2024.
- **Experience:** (1) SWE Intern (Frontend), KoinX, Jun 2025–Jun 2026. (2) Full Stack Developer, Pixels and Grids, Dec 2024–Feb 2025. **⚠️ Experience bullets are now a fixed VERBATIM library** (8 KoinX + 7 P&G bullets, in `general-resume.md`, synced from `source.json`). Build a resume by *selecting* a JD-relevant subset that fits one page and pasting it **unchanged** — never reword/trim/merge an experience bullet. Not all fit; count is a space decision. (Reword rule still applies to project bullets + skills rows, not experience.) See the binding rule at the top of the Work-experience section.
- **Skills:** C, C++, Python, JS (ES6), TypeScript; DSA/OOP; React, Next.js, Node.js, Redux; HTML5/CSS/Sass/Tailwind/shadcn; SQL, PostgreSQL, MongoDB; Git/GitHub, Agile, REST. **User-attested, skills-list only (no repo evidence — never a project bullet):** MUI, Jest (2026-07-05), **Bootstrap incl. v4/v5 (2026-07-27)**.
- **Achievements:** runner-up Code Hunt (GNA Univ, 20 colleges) and Byte Battle DSA (IKGPTU); 4-star HackerRank C; 200+ LeetCode/GFG problems.
- **Certs (issuers verified vs source.json 2026-07-11):** Google Cloud Foundations (Google Cloud), JavaScript Algorithms & DS (freeCodeCamp), Node.js/Express.js/SQL (Scrimba). Resume preference: show Certifications, omit the LeetCode/GFG problem-count + HackerRank C-rating.
- **Honesty:** KoinX = internship, never full-time. (All three projects — cryptax, blood-link, faculty-feedback — now have full tagged+audited source docs.)
- `source.json` in root = original raw import; NOT read by the pipeline; canonical file is `profile/general-resume.md`.

## Project digests

### cryptax — `projects/cryptax.md` *(22909 bytes, 2026-07-11; synced: backend@1cbe6ca, frontend@cbae215)* — TAGGED + audited (`cryptax.audit.md`, clean)
**Cryptax** — solo full-stack crypto-tax web app (Indian VDA rules), deployed on Railway. **Canonical display name is "Cryptax" — never "CryptoTax Buddy".**
- **Stack:** TypeScript strict/ESM, Node 22, Express 5, PostgreSQL + Prisma 7, Zod 4, Vitest; frontend Next.js 16 App Router, React 19, TanStack Query 5, shadcn/Tailwind 4; AI via Vercel AI SDK v6 + Google Gemini. ~12k LoC total.
- **Core:** deterministic pure-function FIFO tax engine (30% §115BBH, 1% TDS, no loss offset, Indian FY bucketing, Decimal(30,18) precision) — 27 unit tests; +11 normalizer tests (38 total).
- **Distinctives:** streaming CSV ingestion w/ manual backpressure (1 GB cap, transactional rollback); full auth (OTP registration, JWT + rotating hashed refresh tokens, per-device session revocation); AI assistant that CANNOT compute numbers — 8 whitelisted Zod-typed DB-backed tools, userId closure-scoped (authorization boundary); whitelisted dynamic Prisma groupBy/aggregate endpoint; 8-model schema w/ deliberate indexing; idempotent recalculation via transactional wipe-and-recreate.
- **Best for JDs emphasizing:** backend/Node/TS, Prisma/SQL, testing, auth/security, AI/LLM tool-calling, React/Next.js, fintech domain, data pipelines/ETL, API design. (Doc has a skill→evidence table + pre-written bullets per variant.)
- **Honesty:** solo portfolio project, no user-base claims; Google OAuth is `[partial]` (no working flow) — **never on a resume, not even "designed for"**; exchange coverage = **Giottus only** (Binance/CoinDCX/etc. are `[planned]`); refresh token 7 days; 38 tests at time of writing.

### blood-link — `projects/blood-link.md` *(22441 bytes, 2026-07-11; synced: 83cbb65)* — TAGGED + audited (`blood-link.audit.md`)
**BloodLink** — solo full-stack, location-aware blood-donation platform: three-sided role-gated marketplace (donor / organisation / admin + public tier).
- **Stack:** Next.js 15 App Router, React 19, TypeScript 5.7, Server Actions w/ generic `ApiResponse<T>` envelope; Supabase (Auth SSR cookies, PostgreSQL + PostGIS, Storage, PostgREST); Tailwind + shadcn/Radix, Framer Motion; MapLibre GL + Leaflet maps; 27 pages, 21 server-action files.
- **Distinctives:** 4 hand-written PL/pgSQL PostGIS RPCs (distance-ranked nearby camps/orgs, orgs-that-hold-requested-stock search, in-SQL dynamic sort + keyset pagination); full RLS — **41 policies across 13 tables** + `SECURITY DEFINER user_role()` helper; "Pattern A" identity (profile PK = auth uid; FK-remap migration under `session_replication_role=replica`); self-correcting migration recovery (restored dropped RPCs); two-tier inventory schema (stock lots w/ expiry vs searchable aggregate); defense-in-depth auth (edge middleware + RLS + server-action re-auth); 56-day eligibility rule, donation certificates (Web Share API); documented hardening pass (`fixes.md`).
- **Best for JDs emphasizing:** SQL/PostgreSQL/PostGIS, geospatial, security/RBAC, React/Next.js, full-stack, Supabase, product/domain thinking. (Doc §9 has `[shipped]`-tagged bullets w/ evidence anchors.)
- **Honesty:** ⚠️ **Chart.js analytics charts are `[partial]`/unwired dead code — NEVER claim charts / data-viz / analytics dashboards.** XP gamification is `[partial]` — **keep off resumes entirely** (UI renders permanently-zero since `xp` is never incremented; fails an interview demo, same hollowness as the charts). Inventory sync-trigger body not committed (schema design only). NO automated tests (position as type-safety + server-side validation — never claim tests); solo portfolio, no user metrics; org settings page is a stub; landing "upcoming camps" hardcoded; certificate download not implemented (share only).

### faculty-feedback — `projects/faculty-feedback.md` *(17687 bytes, 2026-07-11; synced: 5e6a172 + uncommitted working tree)* — TAGGED + audited (`faculty-feedback.audit.md`, clean)
**Faculty Feedback Platform** — solo multi-tenant college feedback system: students rate teachers 1–5 per course offering during time-boxed feedback cycles; 5 role-based portals (student / teacher / HOD / institute admin / platform super-admin). Ground-up **rewrite of a JS+MongoDB prototype onto TS+PostgreSQL** (legit re-architecture talking point).
- **Stack:** Next.js 16 App Router, React 19, TypeScript strict, Server Actions (no REST layer); PostgreSQL + Prisma 7 w/ `@prisma/adapter-pg`; JWT httpOnly-cookie sessions + email-OTP (students/teachers/HODs) and password (admins) auth; Tailwind 4 + shadcn/Radix; Recharts dashboards; Docker Compose Postgres.
- **Distinctives:** 14-model multi-tenant schema (Institute = tenant root, composite uniques like `(studentId, courseOfferingId, feedbackCycleId)` = DB-level idempotency; HOD via named self-relation "DepartmentHod"); transactional feedback submit (`$transaction`: delete → bulk create → status flip) + `revalidatePath`; bulk entry generation w/ Set-based composite-key dedup + `skipDuplicates`; ~690-line aggregation module (subject-level teacher comparisons, leaderboards, histograms, cross-cycle trends, safe division); Recharts dashboards (genuinely wired — unlike blood-link); gamified keyboard-navigable "rate-quest" flow; OTP security (SHA-256 hashed, `crypto.timingSafeEqual`, 5-min TTL, attempt lockout); `requireSession(allowedRoles)` route guards; 3 migrations + idempotent seed (~500 rows: 120 entries, 297 responses).
- **Best for JDs emphasizing:** Prisma/PostgreSQL/data modeling, multi-tenancy, Next.js/React Server Components, RBAC/auth flows, analytics/data viz, full-stack TS, migration/re-architecture stories.
- **Honesty:** NO automated tests; email delivery scaffolded not live (OTPs print to stdout); SHA-256 without salt/KDF — say "designed the auth flow", not production-hardened; no admin CRUD UI (seed-driven setup); 1 known type error in `prisma.config.ts` — never claim clean typecheck; solo portfolio/demo, single-institute; doc reflects uncommitted working tree as of 2026-07-05 (HEAD `5e6a172`).

All three profile projects now have source docs — none missing.

## Templates
- `default.tex` *(3777 bytes, 2026-07-04)* — ATS-safe single-column, macros: `\ResumeHeader`, `\Entry`, `\EntryLine`, `Bullets` env, `\SkillRow`. 10.5pt/0.55in baseline.
- `jake.tex` *(7995 bytes, 2026-07-04)* — Jake Gutierrez classic. Macros: `\resumeSubheading{bold}{dates}{italic}{loc}`, `\resumeProjectHeading{left}{right}`, `\resumeItem{...}` inside `\resumeItemListStart/End`, lists wrapped in `\resumeSubHeadingListStart/End`. 11pt. Patched with `\ifPDFTeX` guards around glyphtounicode so it compiles under Tectonic — keep those guards.

## Tooling notes
- Compile: `npm run pdf -- "<path>.tex"` from project root. Engine = bundled `tools/tectonic/tectonic.exe` (auto-detected; system latex as fallback). LaTeX packages already cached — compiles take ~5–15 s. Script prints `[compile-latex] pages: N` — must be 1.
- On compile failure: read the `.log` next to the `.tex`, first line starting with `!`.
- pdfTeX-only commands (`\pdfgentounicode`, `\input{glyphtounicode}`) break Tectonic (XeTeX) — wrap in `\ifPDFTeX ... \fi` (needs `\usepackage{iftex}`).
- Project-doc maintenance: `/update-project <name>` mines `git log <synced>..HEAD` per the doc's frontmatter (`repos:` paths + `synced:` hashes), patches the doc in place, refreshes its digest entry. User's repos live under `D:\repos\`.
- **Claim tagging / honesty ledger (added 2026-07-11):** every project doc tags capabilities `[shipped]` / `[partial]` / `[planned]` / `[stub]` with grep evidence anchors on shipped claims (spec in `.claude/commands/update-project.md`). **Only `[shipped]` work may reach a resume** — `write-resume` step 5 + the `resume-writing` skill enforce this; partial/planned/stub never appears in any framing (user rule). `/update-project <name> audit` (Mode D, also auto-runs on every sync) greps the repo to verify shipped claims (usage, not dependency presence) and surfaces underclaimed strong work; findings land in `projects/<name>.audit.md`. Golden test: **installed ≠ used ≠ shipped** — a `package.json` dep is NOT a shipped feature (that's how blood-link's unwired Chart.js became a false "charts" claim).

## Resume variants — the fast path (added 2026-07-27)

Three pre-built, honesty-checked, one-page resumes in `variants/`, each harvested from the best-scoring bespoke resume in its cluster. Router + city rule live in `variants/README.md` (read that, not this, when applying). Send one with `/apply <company> <role>`; `/write-resume` stays the escape hatch for jobs worth 20 minutes.

| Slug | Template | Use for | Harvested from |
|---|---|---|---|
| `frontend-react` | default.tex | ReactJS / Front End / UI / Web Developer; JD leads with React-Next-Redux-CSS | kaspro-it-solutions/reactjs-developer (84) |
| `fullstack` | default.tex | Full Stack / MERN / Node / Backend-JS / AI-application; JD leads with APIs-DB-auth-LLM | teal-india/software-engineer-full-stack (76) |
| `generalist` | jake.tex | SDE / Trainee / Fresher **and any application with no real JD** (Wellfound, Naukri, Easy Apply) | gammastack/software-engineer-trainee (90) |

- Each folder holds `resume.tex`, `resume.pdf`, `spec.md` (use-for / don't-use-for / keyword list / known gaps / honesty check). All three compile to `pages: 1` as of 2026-07-27.
- **City:** each `.tex` has one `\newcommand{\HeaderCity}{Mohali, Punjab, India}` line. Shipped PDFs use the Mohali fallback. For an on-site/hybrid role with a named city (or remote inside north India), change that one line and recompile — `/apply` does this into `companies/<company>/<role>/`. Never edit a `variants/` file for a specific application.
- **Staleness:** variants are frozen snapshots. Any edit to `profile/general-resume.md` or a `projects/*.md` doc makes all three potentially stale — refresh, recompile, re-check each `spec.md` honesty line in the same session.
- `companies/general/all-purpose/` is the retired predecessor of `generalist` — history only, do not send.

## Applications
See `memory/applications.md` for the per-application log (avoid re-deriving company folder names — check there for prior runs against the same company). The log now carries a **Variant** column recording what was actually sent (`<slug>@<date>`, or `bespoke`).
