---
name: cryptax
repos:
  - path: D:\repos\buddy-backend
    synced: 1cbe6ca
  - path: D:\repos\buddy-frontend
    synced: cbae215
synced-date: 2026-07-04
---

# CryptoTax Buddy — Resume Source Document

> **Purpose of this file.** A single, factual, non-exaggerated reference describing the CryptoTax Buddy project (backend + frontend) so that different resume variants can be generated from it — emphasizing whatever skill set a given job asks for (e.g. testing, Prisma, authentication, AI integration, TypeScript, systems design). Every claim below is verifiable in the codebase. Nothing here is invented; where something is partial or deferred, it is labelled as such.

> **Claim tags (see `.claude/commands/update-project.md`):** `[shipped]` = wired end-to-end and grep-verifiable — **the only tag a resume may use**. `[partial]` = real but incomplete. `[planned]` / `[stub]` = intent/placeholder. Audited 2026-07-11 — clean, no overclaims; see `cryptax.audit.md`. (OAuth is `[partial]` — never on a resume.)

---

## 1. One-line & one-paragraph descriptions

**One line:** A full-stack web application that calculates Indian crypto (VDA) tax from exchange CSV exports using a deterministic FIFO tax engine, with an AI assistant that answers questions strictly from computed data.

**One paragraph:** CryptoTax Buddy lets Indian crypto investors upload transaction CSVs from an exchange, normalizes them into a unified schema, and runs a deterministic FIFO cost-basis engine that computes per-transaction capital gains, tax (30% flat under §115BBH), and TDS (1%) with exact decimal arithmetic and Indian financial-year bucketing. Results are stored in PostgreSQL and surfaced through a paginated query/aggregation API and a Next.js dashboard. A conversational AI assistant (Google Gemini via the Vercel AI SDK) answers plain-English questions, but is architecturally forbidden from computing numbers itself — it can only call whitelisted backend tools that return real, database-computed figures, which eliminates financial hallucination.

**Project type:** Solo-built full-stack project (personal / portfolio). Deployed to Railway. Two repositories: `buddy-backend` (Express/TypeScript API) and `buddy-frontend` (Next.js).

---

## 2. Tech stack (verified from package manifests)

**Backend (`buddy-backend`)**
- Language/runtime: TypeScript (strict, native ESM with `.js` import specifiers), Node.js 22
- Framework: Express 5
- Database: PostgreSQL via Prisma ORM 7 (`@prisma/client`, `@prisma/adapter-pg` driver adapter)
- Validation: Zod 4
- Auth: `jsonwebtoken` (JWT), `bcrypt` (password hashing), `cookie-parser` (httpOnly refresh cookie)
- File ingestion: `busboy` (streaming multipart), `csv-parser`
- AI: Vercel AI SDK v6 (`ai`) + `@ai-sdk/google` (Google Gemini)
- Utilities: `date-fns`, `uuid`, `cors`, `dotenv`
- Testing: Vitest + `@vitest/coverage-v8`
- Tooling: `tsx` (dev/watch), Prettier, TypeScript build (`tsc --build`)
- Email: Brevo transactional HTTPS API (migrated from Resend → nodemailer/Gmail SMTP → Brevo API)

**Frontend (`buddy-frontend`)**
- Framework: Next.js 16 (App Router), React 19, TypeScript
- Data layer: TanStack React Query 5, Axios (custom instance with interceptors)
- AI chat: Vercel AI SDK v6 (`ai`, `@ai-sdk/react` `useChat`) with a custom transport
- Forms/validation: React Hook Form + `@hookform/resolvers` + Zod 4
- UI: shadcn/ui (Radix-based) + Tailwind CSS 4, `next-themes` (light/dark), `sonner` (toasts), `lucide-react` / `react-icons`
- Styling utilities: `class-variance-authority`, `clsx`, `tailwind-merge`

**Rough scale (for context, not a headline metric):** backend ≈ 3.7k lines of hand-written TypeScript across ~70 source files (excludes generated Prisma client); frontend ≈ 8.5k lines across the App Router. ~60 commits combined.

---

## 3. Architecture & design decisions (the "why", useful for senior/systems framing)

- **Feature-folder (vertical slice) architecture.** Backend is organized under `src/features/<feature>/` with a consistent `routes → controller → service → repository` layering (features: `auth`, `upload`, `calculate`, `results`, `profile`, `assistant`). Types are colocated and promoted upward only when shared. The frontend mirrors this: each route owns `_components`, `_hooks`, `_schema`, and `helpers`.
- **Deterministic core, thin edges.** The tax engine is a **pure function** (`calculateTax(transactions) → { summaries, taxableEvents, issues }`) with no I/O, which is why it is exhaustively unit-testable. Controllers stay thin; repositories own all Prisma access.
- **AI grounded on deterministic tools (anti-hallucination).** The assistant's tools are thin wrappers over the *same* `results` services the REST API uses. The model plans over data shapes; the server always decides *whose* data (the `userId` is captured in a closure and is never part of any tool input schema — a deliberate authorization boundary). A system-prompt contract forbids the model from computing/rounding numbers; all totals go through DB-side aggregation tools so the database does the arithmetic.
- **Money is never a float.** All monetary/quantity fields use Prisma `Decimal(30,18)`; the engine computes with `Decimal` throughout and every money value is serialized to the client as a **raw string** to avoid precision loss.
- **Idempotent recalculation.** `saveTaxResults` runs inside a single Prisma `$transaction` that wipes and recreates a user's taxable events, issues, and summaries — so re-running the calculation is safe and consistent.
- **Streaming ingestion with backpressure.** Uploads are parsed as a stream (Busboy → csv-parser), buffered into batches, and the parser is paused/resumed around async DB writes so a large file never loads fully into memory. Failures roll the upload back and mark it `FAILED`.
- **Exchange registry as single source of truth.** `exchanges.config.ts` declares each supported exchange, its file types, and per-file-type normalizer. The upload validator, the "supported exchanges" catalog endpoint, and the processing pipeline all read from it — adding an exchange/file type is a config change, not scattered edits.
- **Consistent API contract.** Uniform `{ success, message, data }` envelope via `sendSuccess`/`sendError`; a centralized error middleware maps `AppError`, `ZodError`, and `http-errors` to the right status codes. Express 5's automatic async-error forwarding removes per-handler try/catch boilerplate.
- **Stateless auth with server-side revocation.** Short-lived JWT access tokens + rotating opaque refresh tokens stored **hashed** in the DB (never plaintext), each tied to a device (`userAgent`) so sessions can be listed and revoked individually.

---

## 4. Feature-by-feature work (with the concrete skills each demonstrates)

### 4.1 Tax calculation engine — *core algorithmic work*
- Pure FIFO cost-basis matching: sells are matched against the oldest buy lots, handling partial-lot consumption and multi-lot sells; produces one `TaxableEvent` per matched slice.
- Implements Indian VDA rules: 30% flat tax (§115BBH), **no loss offset** against gains, 1% TDS with a rule-based fallback (uses the exchange-provided TDS when present, otherwise computes 1% of sale value only after the TDS effective date), and out-of-scope handling for pre-regulation dates.
- **Indian financial-year bucketing** (April–March, labelled by start year) via UTC month/year logic.
- **Data-quality issue detection**: emits typed issues with `code` + `severity` (e.g. `MISSING_PRICE_ON_SELL`, `SELL_INSUFFICIENT_LOTS`, `SELL_BEFORE_ANY_BUY`, `OUT_OF_SCOPE_DATE`) instead of silently producing wrong numbers — surfaced to the user as a data-health panel.
- Exact-precision arithmetic with `Decimal` throughout.
- *Skills: algorithms/data structures, financial-domain modelling, pure-function design, decimal precision, edge-case reasoning.*

### 4.2 Automated testing — *testing / TDD emphasis*
- **27 unit tests** for the tax engine (Vitest) covering BUY handling, single-/multi-lot sells, FIFO ordering, SELL error paths, TDS handling (provided vs. computed vs. zero vs. pre-effective-date), financial-year bucketing, the no-loss-offset rule, deposits/withdrawals, cross-asset isolation, deferred transaction types, and decimal precision — driven by reusable fixtures.
- **11 tests** for the CSV normalizers (deposits/withdrawals + INR deposits/withdrawals).
- Coverage tooling wired up (`vitest run --coverage`, v8 provider); test scripts split into `test` / `test:run` / `test:coverage`.
- *Skills: unit testing, Vitest, test fixtures, coverage, testing a financial domain against a spec.*

### 4.3 CSV upload & normalization pipeline — *streaming / data-engineering emphasis*
- Streaming multipart upload (Busboy) piped into a CSV parser with **manual backpressure** (pause on batch full / during async writes, resume after), a 1 GB size cap, and single-file enforcement.
- Batch inserts (`createMany`) sized by a constant; per-batch normalization then persistence.
- **Normalizer contract** returns `{ cleanRows, errorRows }`; any error rows reject the whole upload as corrupt (422) rather than importing partial/garbage data.
- Validation helpers for dates, coins, decimals, transfer types, and fees; only settled rows imported; unsupported row types skipped intentionally.
- Upload lifecycle tracked as `PROCESSING → COMPLETED / FAILED`, with transactional rollback on failure.
- Dedup strategy: exchange-provided TXID/reference used as `exchangeTxId`, enforced by a composite unique constraint `(userId, exchange, exchangeTxId)`.
- *Skills: Node streams, backpressure, multipart parsing, ETL/normalization, data integrity.*

### 4.4 Authentication & account management — *security / auth emphasis*
- Email+password registration gated by **email OTP verification** (hashed 6-digit codes with attempt caps and expiry, stored in a dedicated `EmailOtp` table keyed by email before the user exists).
- Login with bcrypt verification; distinct handling for Google-sign-in accounts (no password hash).
- **JWT access tokens + rotating refresh tokens**: refresh tokens are random, stored **hashed**, rotated on every refresh, expire after 7 days, and carry the device `userAgent`.
- **Session management**: list active sessions, revoke a specific session, "log out other devices"; password and email changes **revoke all other sessions**.
- **Account deletion** and **password/email change** require password re-authentication; email change additionally requires an OTP to the new address and is guarded against duplicates before consuming the code.
- Transactional email delivery via Brevo's HTTPS API (migrated across three providers — demonstrates dependency/vendor iteration).
- *Skills: JWT, refresh-token rotation, bcrypt, OTP flows, session/device management, secure account lifecycle, threat-aware design.*

### 4.5 Results / query & aggregation API — *API design & DB emphasis*
- Read layer exposing financial years, per-year summaries, a dashboard overview (summary + issue counts), paginated disposals (taxable events), paginated transactions, and data issues.
- **Page-based (offset) pagination** helpers (`page`/`limit`, returning `total` + `totalPages`), fiscal-year range filtering, and reusable decimal serialization.
- **Generic whitelisted aggregation** endpoint/tool: builds Prisma `groupBy`/`aggregate` queries dynamically from a closed enum of metrics (`count|sum|avg|min|max`), fields, and group-by dimensions — so the database performs all arithmetic and the result is safe to expose to the AI.
- *Skills: REST API design, pagination, Prisma aggregation/groupBy, query safety, DTO design.*

### 4.6 AI assistant — *AI/LLM integration emphasis*
- Streaming chat endpoint using the Vercel AI SDK's `streamText` with an **agentic tool-calling loop** bounded by a step budget (`stepCountIs(4)`), streamed to the client over the Data Stream Protocol.
- **8 typed tools** (Zod-validated input schemas) mapping to existing services: `get_years`, `get_tax_summary`, `get_year_overview`, `list_disposals`, `list_transactions`, `get_data_issues`, `aggregate_transactions`, `aggregate_disposals`.
- Careful schema bridging: swaps a Zod `date` field for an ISO-string field where the AI SDK needs JSON-Schema-renderable tool descriptors, converting back before calling the service.
- Anti-hallucination system prompt: the model may only *report* tool-returned figures (digit-for-digit), never compute them; totals/counts must go through aggregation tools.
- Frontend chat UI (`useChat`) with a **custom transport** that injects the bearer token per request and does a silent one-shot refresh-and-retry on 401, plus tool-call badges and streaming rendering.
- *Skills: LLM tool-use / function calling, agent design, streaming, prompt engineering, guardrails, Vercel AI SDK (server + client).*

### 4.7 Frontend application — *React / Next.js / UX emphasis*
- Next.js App Router with **route groups** (`(marketing)`, `(auth)`, `(app)`) and an authenticated app shell (responsive sidebar / bottom-nav / dock, theme toggle, auth guard).
- **TanStack React Query** for all server state, with structured query-key factories and per-feature hooks (`use-results`, `use-disposals`, `use-transactions`, `use-import`, `use-profile`).
- **Axios instance with interceptors**: attaches the bearer token to protected routes only, and on a 401 performs a **single shared in-flight refresh** (deduping concurrent 401s) + retry, falling back to a redirect to `/login`. Access token persisted in `localStorage`; refresh token in a browser-managed httpOnly cookie sent via `withCredentials`.
- Pages: dashboard (FY selector, stat cards, tax headline, issues panel), disposals (filters + table + tax info), transactions (filters + cards), imports (exchange rail, upload-type grid, imported-files management, calculate CTA), profile (identity, security, sessions list, change email/password dialogs, connected exchanges, danger zone), auth (login/register with OTP), and a marketing landing page.
- Forms via React Hook Form + Zod resolvers; toasts via sonner; shadcn/ui component library (~19 primitives) themed with Tailwind 4 and light/dark support.
- *Skills: Next.js App Router, React 19, React Query, client-side auth/token refresh, component architecture, forms, accessible UI, responsive design.*

### 4.8 Data modelling & persistence — *Prisma / SQL emphasis*
- 8 Prisma models (`User`, `Upload`, `Transaction`, `Summary`, `Issue`, `TaxableEvent`, `RefreshToken`, `EmailOtp`) with enums for transaction type, upload status, issue code, and issue severity.
- Deliberate **indexing** for read patterns (`(userId, asset)`, `(userId, type)`, `(userId, date)`, `(asset, type, date)`, etc.), **cascade deletes** for user data, a **many-to-many** Issue↔Transaction relation, self-referential buy/sell relations on `TaxableEvent`, and unique constraints for dedup and per-year summaries.
- Managed migrations (`prisma migrate deploy`), driver-adapter (`@prisma/adapter-pg`) setup, and a seed script.
- *Skills: relational schema design, indexing, migrations, Prisma, referential integrity.*

### 4.9 Engineering practices & delivery — *general professionalism*
- Strict TypeScript everywhere, native ESM, Prettier-enforced style, terse/purposeful commenting convention.
- Centralized error handling and a uniform response envelope shared across backend and consumed type-safely on the frontend.
- Deployment to Railway with split `build` / `migrate` scripts and CORS configured for a separate frontend origin (including a trailing-slash normalization fix).
- Documented domain and architecture (`docs/`, `AGENTS.md`, sample CSVs, streaming guide).

---

## 5. Skill → evidence index (for keyword-targeted resume variants)

| If the job emphasizes… | Point to… |
|---|---|
| **TypeScript** | Strict TS across ~12k lines, native ESM, shared typed API contract front↔back |
| **Node.js / backend** | Express 5 API, streaming uploads, feature-folder architecture, centralized error handling |
| **Prisma / ORM** | 8-model schema, custom indexing, migrations, driver adapter, transactional writes, dynamic groupBy/aggregate |
| **SQL / databases** | Relational modelling, indexing strategy, cascade deletes, unique constraints, aggregation pushed to DB |
| **Testing / TDD** | 38 Vitest tests (27 engine + 11 normalizers), fixtures, coverage config |
| **Authentication / security** | JWT + rotating hashed refresh tokens, bcrypt, OTP email verification, session revocation, password re-auth, closure-scoped authorization on AI tools |
| **AI / LLM integration** | Vercel AI SDK tool-calling agent, 8 typed tools, streaming, anti-hallucination guardrails, Gemini |
| **React / Next.js** | Next.js 16 App Router, React 19, route groups, React Query, custom auth token-refresh, shadcn/Tailwind UI |
| **Systems / architecture design** | Deterministic pure-function engine, streaming backpressure, idempotent recalculation, exchange registry as SoT |
| **Data engineering / ETL** | CSV normalization pipeline, validation, error-row rejection, batch processing, dedup keys |
| **Fintech / domain modelling** | Indian VDA tax rules, FIFO cost basis, decimal precision, financial-year bucketing, TDS logic |
| **API design** | Consistent envelope, Zod validation middleware, pagination, DTOs, versioned routes (`/api/v1`) |

---

## 6. Achievements / talking points (honest, quantified where possible)

- Designed and built a **deterministic FIFO crypto-tax engine** implementing Indian VDA rules (30% tax, 1% TDS, no loss-offset, FY bucketing) as a pure, side-effect-free function, verified by **27 unit tests** covering normal paths, error paths, and precision.
- Solved AI financial hallucination structurally: the assistant **cannot compute numbers**, only call **8 whitelisted, database-backed tools** — so every figure it states is real and traceable, while user-data isolation is enforced server-side rather than trusted to the model.
- Implemented **memory-safe streaming CSV ingestion** with manual backpressure and batched, transactionally-rolled-back writes, tolerating files up to 1 GB.
- Built a complete **secure auth system** from scratch: OTP-verified registration, JWT + rotating hashed refresh tokens, per-device session listing/revocation, and password-re-authenticated account changes.
- Delivered a **full Next.js dashboard** (dashboard, disposals, transactions, imports, profile, streaming AI chat) with React Query data layer and a resilient client-side token-refresh mechanism that dedupes concurrent 401s.
- Made recalculation **idempotent** via a single transactional wipe-and-recreate, and kept exchange onboarding a **config-only change** via a central registry.
- Shipped to production on **Railway** with managed Prisma migrations.

---

## 7. Pre-written résumé bullets (pick/adapt per variant)

All bullets below are `[shipped]` (audit-verified 2026-07-11). Do not add OAuth or non-Giottus exchange coverage — those are `[partial]` (§8).

**Backend-heavy variant** `[shipped]`
- Built a TypeScript/Express 5 backend for an Indian crypto-tax platform, featuring a pure-function FIFO tax engine (30% VDA tax, 1% TDS, FIFO cost basis) covered by 27 Vitest unit tests.  evidence: `calculateTax` in `src/features/calculate/services/calculate/calculate.service.ts`, `calculate.service.test.ts`
- Modelled 8 PostgreSQL tables with Prisma (custom indexing, cascade deletes, unique dedup constraints) and used transactional, idempotent writes for safe tax recalculation.  evidence: `prisma/schema.prisma` (20 `@@index`)
- Implemented streaming CSV ingestion (Busboy + csv-parser) with manual backpressure and batched inserts, rejecting corrupt uploads and rolling back on failure.  evidence: `upload.controller.ts`

**Security/auth variant** `[shipped]`
- Designed a full authentication system: OTP-verified email registration, JWT access tokens with rotating **hashed** refresh tokens, per-device session revocation, and password-re-authenticated account changes.  evidence: `otp.service.ts`, `token.service.ts`, `auth.routes.ts`

**AI variant** `[shipped]`
- Built a streaming AI tax assistant (Vercel AI SDK + Google Gemini) using an agentic tool-calling loop over 8 whitelisted, database-backed tools, with prompt-level guardrails that prevent the model from computing or hallucinating any financial figure.  evidence: `buildTools(userId)` in `assistant/services/tools.ts`, `stopWhen: stepCountIs(4)` in `assistant.service.ts`
- Built a safe dynamic-aggregation layer that compiles Prisma `groupBy` queries from a closed metric/field enum (`sum|avg|min|max`) and reuses one implementation to power both a REST endpoint and two AI tools.  evidence: `aggregationSelect()` in `results/services/aggregate.service.ts`

**Full-stack variant** `[shipped]`
- Solo-built a full-stack crypto-tax web app (Next.js 16 / React 19 frontend + Express/Prisma/PostgreSQL backend) with a deterministic tax engine, streaming CSV import, secure auth, and an AI assistant grounded on real computed data; deployed on Railway.

**Frontend variant** `[shipped]`
- Built a Next.js 16 App Router dashboard (React 19, TanStack React Query, shadcn/Tailwind) with route-group layouts, a resilient Axios token-refresh interceptor that dedupes concurrent 401s, and a streaming AI chat UI.  evidence: `refreshPromise` dedupe in `lib/api.ts`, `lib/ai/assistant-transport.ts`

**Data-modeling / domain variant** `[shipped]`
- Designed a typed data-quality issue taxonomy (9+ codes with severity and structured context, e.g. `SELL_INSUFFICIENT_LOTS`, `DEPOSIT_WITHOUT_COST_BASIS`) and a forward-designed transaction-type matrix that explicitly no-ops on income/staking/transfer types pending future tax rules.  evidence: `IssueCode` enum + the type switch in `calculate.service.ts`

---

## 8. Honesty notes (so no variant overclaims)

- This is a **solo portfolio/academic project**, not a team or high-traffic production system. It is deployed (Railway) but there is no claim of a large user base.
- **Google/OAuth sign-in** is `[partial]` — accounted for in the data model (nullable password hash, "use Google sign-in" messaging) but there is no working flow (no `/auth/google` route, no callback handler). Under the shipped-only rule it must **never appear on a resume in any framing** — not even "designed for."
- Exchange coverage is **Giottus only** (spot-trades normalizer `[shipped]` but untested; deposits/withdrawals normalizers `[shipped]` and tested). The registry is exchange-agnostic by design, but Binance/CoinDCX/WazirX/Coinbase are `[planned]` — never claim them as supported.
- Refresh-token lifetime is **7 days** in code (some earlier notes mention 30 days as a goal); cite 7 days if specific.
- Test count is **38 total** (27 engine + 11 normalizers) at the time of writing — recount if quoting exactly.
