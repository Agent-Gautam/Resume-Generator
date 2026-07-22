---
name: blood-link
repos:
  - path: D:\repos\blood-link-supabase
    synced: 83cbb65
synced-date: 2026-07-11
---

# BloodLink — Resume Project Profile

> **Purpose of this document:** A single, factual source of truth about the BloodLink project, written so that a resume-generating AI can extract accurate, tailored bullet points for different job targets (e.g. "highlight testing", "highlight databases/PostGIS", "highlight React/frontend", "highlight full-stack"). Everything below is grounded in the actual codebase — nothing is invented. Where a feature is partial or scaffolding, it is labeled as such so it is never overstated.

> **Claim tags (see `.claude/commands/update-project.md`):** `[shipped]` = wired end-to-end and grep-verifiable — **the only tag a resume may use**. `[partial]` = real but incomplete (code exists, not fully wired). `[planned]` = intent only. `[stub]` = placeholder. Last audited 2026-07-11 against HEAD `83cbb65` — see `blood-link.audit.md`.

---

## 1. One-line summaries (pick by resume tone)

- **Concise:** Built a full-stack, location-aware blood-donation platform (Next.js 15 + Supabase/PostgreSQL) connecting donors, hospitals/blood banks, and an admin authority.
- **Technical:** Engineered a role-based, geospatially-searchable blood-donation marketplace on Next.js 15 App Router with React Server Components, Supabase Auth, PostGIS distance ranking, custom PL/pgSQL RPCs, and row-level-security across 13+ tables.
- **Impact-oriented:** Designed a three-sided platform that shortens the distance — literally, via geo-search — between people who need blood and the donors and organisations who can supply it. *(Avoid "gamification to drive retention" — the XP system is display-only; see §8.)*

---

## 2. What the project is

**BloodLink** is a three-sided web platform with three authenticated roles plus a public tier:

| Actor | Role | Core capability |
|---|---|---|
| **Donor** | `DONOR` | Discover nearby camps by geolocation, donate, track history/eligibility, view XP/level progress (display-only), share per-donation certificates, request blood in emergencies |
| **Organisation** (hospital / blood bank / NGO) | `ORGANISATION` | Run donation camps, check in/record walk-in donors, manage blood inventory with expiry, view collection analytics, triage incoming requests |
| **Admin** | `ADMIN` | Verify organisations before they are trusted/visible in the network (gatekeeping trust layer) |
| **Public visitor** | (none) | Browse public camp/org/donor profiles, marketing landing page, sign up/in |

### The core product loops
1. **Donor → Camp:** donors find nearby camps by geolocation → donate → the organisation records the donation → this builds the donor's history, **56-day eligibility timer**, and per-donation **certificates**. A **gamified XP/level UI** is shown, but note the XP *award* logic is not implemented — the display is `[partial]` (see §8).
2. **Donor → Organisation (emergency request):** a donor needing blood searches for nearby organisations that *currently hold* the required blood type and unit count, then fans a request out to multiple organisations at once, optionally flagged urgent.
3. **Organisation operations:** organisations run camps, register/check in walk-in donors on the spot, track blood **inventory/stock with expiry**, and view a blood-collection **summary table**. (Chart.js pie/bar chart components for blood-type breakdown, collection trend, and demographics exist in the codebase but are **not wired into the UI** — `[partial]`, see §8; the Overview tab currently renders the table only.)
4. **Admin trust layer:** organisations must be **verified by an admin** before being trusted in the network.

---

## 3. Technology stack (verbatim from the codebase)

**Framework / language**
- **Next.js 15.5** (App Router, React Server Components, Server Actions, middleware)
- **React 19**
- **TypeScript 5.7** (strict typing across shared domain types, generic `ApiResponse<T>` envelope pattern)

**Backend / data**
- **Supabase** — Postgres database, Auth, Storage, and PostgREST RPC layer
- **PostgreSQL + PostGIS** — geography/geometry columns, spatial distance queries
- **PL/pgSQL** — custom stored-procedure RPCs for geo-search and aggregation
- **Row-Level Security (RLS)** — per-table policies for all three roles
- **SQL migrations** — versioned, timestamped migration files (RLS, RPC restore, data realignment, constraint enforcement, XP column). *Note: the base-schema `CREATE TABLE` migration is not in the repo — base tables were created outside version control; the committed migrations are ALTER/RLS/RPC/realignment.*
- `@supabase/ssr` for cookie-based server-side auth; `@supabase/supabase-js`; service-role client for privileged storage writes

**Frontend / UI**
- **Tailwind CSS 3.4** + `tailwind-merge` + `tailwindcss-animate`
- **shadcn/ui** component system built on **Radix UI primitives** (dialog, dropdown, select, tabs, accordion, popover, tooltip, radio, checkbox, avatar, progress, command palette, sidebar, etc.)
- **Framer Motion** — animations/transitions
- **Chart.js** `[partial]` — pie/bar chart components written (blood-type breakdown, collection-trend, donor-demographics) but **imported-and-never-rendered**; not wired into any tab and would currently throw without `Chart.register`. Do NOT present as a shipped feature. evidence: `app/organisation/components/{blood-type-chart,collection-trend-chart,donor-demographics-chart}.tsx`
- **next-themes** — light/dark theming
- **Sonner** — toast notifications
- **lucide-react** / **react-icons** — iconography
- **cmdk** — command-menu UX

**Maps / geolocation**
- **MapLibre GL** (`@vis.gl/react-maplibre`, `maplibre-gl`, `@maplibre/maplibre-gl-geocoder`)
- **Leaflet** / **react-leaflet** (with default-icon compatibility)
- **react-geolocated** — browser geolocation ("Use My Location")
- Reverse/forward geocoding (coordinates ↔ location name) server actions

**Utilities / tooling**
- `date-fns`, `lodash.debounce`, `class-variance-authority`, `clsx`
- Prettier, PostCSS, Autoprefixer

---

## 4. Architecture & notable engineering decisions

These are the parts worth bragging about — each is a concrete, defensible technical decision found in the code.

### 4.1 "Pattern A" identity model — profile PK *is* the auth user id
A deliberate schema decision (migrations `..._realign_entity_ids_to_user_id_pattern_a.sql` and `..._enforce_pattern_a_profile_identity.sql`): `donors.id` and `organisations.id` are made **equal to the Supabase auth user id**, with `DEFAULT auth.uid()` and a `FOREIGN KEY … REFERENCES users(id) ON DELETE CASCADE`.
- **Why it matters:** makes "a profile belongs to exactly one user" structurally un-violable, simplifies every RLS policy to `id = auth.uid()`, and auto-binds a new profile to the logged-in user.
- **Migration craftsmanship:** the realignment migration remaps all child foreign keys under `SET session_replication_role = replica` (disabling triggers + FK enforcement inside the transaction), updates children from the parent's old id *before* updating parents, so the final state is fully consistent when enforcement is restored — a careful, correctness-preserving data migration.

### 4.2 Geospatial search via custom PL/pgSQL RPCs (PostGIS)
Four hand-written stored procedures power all "nearby" features:
- `get_nearby_donation_camps` — accepts either a donor id *or* raw lat/lng, computes `ST_Distance` on `geography` columns, and supports **search, org-filtering, dynamic sort direction, and keyset pagination (LIMIT/OFFSET)** — all in SQL.
- `get_organisations_with_blood` — joins `blood_inventory` and `organisations` to return only orgs that **actually hold ≥ the requested units** of a blood type, distance-ranked.
- `get_nearby_organisations` — distance-ranked org list for filters.
- `get_donation_camp_with_latlon` — returns a single camp as JSON with lat/lon extracted from the geography point (`ST_X`/`ST_Y`) for the edit form.
- All are `STABLE`, explicitly `GRANT`ed to `anon`/`authenticated`, and written to be resolvable by PostgREST (every param defaulted).

### 4.3 Full Row-Level Security across the data model
Every application table has explicit `SELECT/INSERT/UPDATE/DELETE` policies encoding the real cross-role rules — e.g. a donor edits only their own row, an organisation can read any donor (to record donations) and create walk-in donor rows, camp registrations are visible to the donor *and* the owning camp's organisation, blood requests are visible only to the donor and the targeted org. A `SECURITY DEFINER` `user_role()` helper (with pinned `search_path`) avoids RLS recursion when checking roles. Demonstrates real understanding of least-privilege authorization at the database layer, not just in application code.

### 4.4 Role-based route gating in middleware
`utils/supabase/middleware.ts` refreshes the Supabase session on every request and redirects based on `role` in user metadata: unauthenticated users hitting `/donor`, `/organisation`, `/admin`, or `/protected` are redirected to `/unauthorized`; cross-role access (e.g. a donor visiting `/organisation`) is blocked and redirected to `/not-found`. Auth is enforced at the edge, at the database (RLS), and in server actions — defense in depth. `[shipped]` evidence: `updateSession` in `utils/supabase/middleware.ts`

### 4.5 Server Actions + typed response envelope
Data mutations/queries run as Next.js **Server Actions** (`"use server"`) returning a consistent generic `ApiResponse<T>` (`{ success, data?, error?, message? }`), giving a uniform client-side handling contract across the whole app. Server actions also re-check auth (`getUser()`) and validate inputs server-side even when the UI already validates — guarding against bypassed clients.

### 4.6 Inventory as an aggregate maintained separately from stock lots
Two-tier inventory model: `blood_stocks` holds individual stock lots (units + expiry per organisation, private via RLS), while `blood_inventory` holds the per-blood-type aggregate that donors search against. The two-tier split (write model = lots with expiry; read model = searchable totals) is real and corroborated by distinct RLS policies. *Caveat: the intended sync mechanism is a database trigger, but its `CREATE TRIGGER`/function body is only referenced in a migration comment, not committed to the repo — describe the two-tier design, not a verified running trigger.*

### 4.7 Atomic upload-after-insert & orphan prevention (from the fix log)
Image uploads to Supabase Storage were reordered to run **only after a successful DB insert**, preventing orphaned storage objects on failure; upload results are checked and surfaced to the user. Storage writes use a **service-role client** scoped to server actions, with per-entity bucket routing (`donor-photo` / `organisation-photo` / `camp-banner`) and deterministic paths.

---

## 5. Feature-by-feature breakdown (with the skills each demonstrates)

### Authentication & onboarding
- Email/password sign-up capturing **role** (donor vs organisation), name, phone → role-specific `/register` redirect.
- Sign-in resolves role from the DB and routes to the correct dashboard.
- Password recovery / reset flow, email verification callback route (`/auth/callback`).
- **Skills:** Supabase Auth, SSR cookie sessions, server actions, redirect flows.

### Donor experience
- **Dashboard** with profile card, quick actions, donation stats, recent requests/history; graceful "complete your profile" fallback. *(An **XP/level gamification UI** exists (`app/donor/components/xp-level.tsx`, 4 tiers + animated bar) but the whole feature is `[partial]`: no code path increments `xp`, so it renders permanently at "New Donor" — not resume-eligible in any form; see §8.)*
- **Find camps** — geolocation ("Use My Location"), distance-ranked cards, search/sort/filter-by-organisation, map view of all camps, infinite "Load More" pagination, skeleton loading states.
- **Emergency blood request** — pick blood type + units → live-fetch nearby orgs that hold that stock → multi-select → **fan-out** one request per selected org, with an urgent flag.
- **History & profile** — request history table, full donation history, eligibility dates, per-donation **certificates** (styled certificate component with **Web Share API** sharing + clipboard fallback).
- **Skills:** React 19, client-side geolocation, debounced search, pagination, optimistic UX, Framer Motion, Web Share API, gamification logic.

### Organisation experience
- **Dashboard** — stats (total donations / camps / donors), ongoing camps, recent requests, inventory overview.
- **Camp management** — create/edit camps with map location picker, date ranges, blood-bank association, banner upload.
- **Camp control panel** — tabbed **Overview** and **Donors** tab. The Overview tab renders a blood-collection **summary table** (`InventoryDetails`). *Note: three Chart.js components (blood-type breakdown, collection-trend, donor-demographics) are written and imported into `camp-tabs.tsx` but **never rendered** — `[partial]`, not a shipped analytics dashboard.*
- **On-site donor flow** — search a donor by email/phone → show details + **56-day eligibility check** → or register a **walk-in donor** on the spot → **record a donation immediately**, which updates the donor's `last_donation_date` and `next_eligible_date`.
- **Inventory** — summary dashboard by blood type, full stock table with add/update of individual lots (units + expiry).
- **Requests** — incoming blood requests from donors with donor names, for triage.
- **Skills:** multi-step forms, tabbed interfaces, parallelized DB queries (`Promise.all`), relational joins via Supabase select, business rules (eligibility, expiry). *(Not data-visualization — the charts are unwired; see §8.)*

### Admin experience
- Dashboard listing **unverified organisations** with one-click **Verify** — the trust gate before an org is visible to donors.
- **Skills:** admin tooling, privileged actions guarded by RLS + middleware.

### Cross-cutting
- **Notifications** — per-user notifications with read / mark-all-read (drawer UI + skeletons).
- **Maps** — reusable MapLibre/Leaflet components for camp locations and "Get Directions" (donor coords → camp).
- **Storage** — banner/photo upload pipeline across donor, organisation, and camp entities.
- **Public info pages** — SEO-able public profiles for camps, organisations, and donors.
- **Theming** — full light/dark support; consistent design system via shadcn/Radix.

---

## 6. Code-quality & correctness work (from the documented fix log)

The repo includes a `fixes.md` documenting a **systematic hardening pass** — useful for resumes emphasizing code quality, debugging, and attention to detail. Representative fixes actually made:
- Eliminated **double form submission** (redundant `formAction`).
- Made **upload/DB atomic** to prevent orphaned storage objects (donor + org flows).
- Added **server-side validation** (required fields, enum checks for blood type / gender / org type, contact-number regex, min-age 18 check) — not just client-side.
- Fixed a **`postalCode`/`postcode` key mismatch** that silently dropped data before it reached the DB.
- Corrected client-vs-server navigation misuse (`redirect()` → `useRouter().push()`).
- Removed **debug logs leaking user IDs** in production paths.
- Removed `as any` casts by correctly extending return types.
- Fixed a controlled-state bug in the map dialog so it can be closed programmatically.
- Tracked one **deferred** issue honestly (an object-URL memory leak in the file-upload component) rather than silently ignoring it.

**Skills:** debugging, defensive programming, input validation, data-integrity thinking, honest issue tracking.

---

## 7. Skills / keyword index (for resume filtering)

Use this section to match a project bullet to a job's required skills. Every keyword here is backed by real code in the repo.

- **Languages:** TypeScript, JavaScript, SQL, PL/pgSQL, HTML, CSS
- **Frontend:** React 19, Next.js 15 App Router, React Server Components, Server Actions, Tailwind CSS, shadcn/ui, Radix UI, Framer Motion, responsive design, dark mode, skeleton/loading states, accessibility (aria labels, Radix a11y primitives). *(Chart.js is present but `[partial]`/unwired — not a shipped skill; omit from resumes.)*
- **Backend / data:** Supabase, PostgreSQL, PostGIS (geospatial), stored procedures (PL/pgSQL RPCs), database migrations, Row-Level Security, database triggers, relational modeling, foreign keys / cascade deletes, PostgREST
- **Auth & security:** Supabase Auth, SSR cookie sessions, role-based access control (RBAC), middleware route guards, least-privilege authorization, server-side input validation, defense-in-depth
- **Geospatial:** distance ranking (`ST_Distance`), geography/geometry columns, browser geolocation, forward/reverse geocoding, interactive maps (MapLibre, Leaflet)
- **Product / domain:** three-sided marketplace, eligibility business rules, inventory management with expiry, notification systems, certificate sharing (Web Share API). *(Gamification is UI-only — no XP award logic; analytics dashboards are unwired. Both `[partial]`; keep off resumes.)*
- **Practices:** typed API contracts (generic response envelope), parallelized async queries, pagination, debouncing, versioned migrations, systematic bug-fixing / code review, honest scope tracking

> **Note on testing:** The repository does **not** currently contain an automated test suite (no test runner or test files are configured). If a target role emphasizes testing, this project is best positioned for *manual verification*, *type-safety*, and *runtime validation* work rather than unit/integration test coverage — do not claim automated tests exist.

---

## 8. Honest scope notes (so nothing gets overstated)

To keep any generated resume defensible (only `[shipped]` items may reach a resume):
- **Chart.js analytics charts are `[partial]` / unwired dead code.** The three components (`blood-type-chart`, `collection-trend-chart`, `donor-demographics-chart`) exist and are imported into `camp-tabs.tsx` but are **never rendered** in JSX (the Overview tab shows a table), and they lack `Chart.register(...)` so they'd throw in Chart.js v4. **Never claim shipped charts / analytics dashboards / data-visualization for this project.**
- **XP gamification is `[partial]` — keep it off resumes entirely.** The `XPLevel` UI renders, but no code path increments `donors.xp` (`addDonation` writes only `last_donation_date`/`next_eligible_date`), so every donor is permanently "New Donor" with an empty bar. Like the charts, it's code that's never functionally exercised — it fails an interview demo. Do not claim "donors earn XP", "XP-driven retention", *or* "built a gamified XP/level UI"; the underlying React/Tailwind/Framer-Motion skill is already evidenced by other shipped components.
- The two-tier inventory **sync trigger** body is not committed to the repo (comment-referenced only) — describe the schema design, not a verified trigger.
- `/organisation/settings` is a **stub** (placeholder page).
- The landing page's "upcoming camps" section uses **hardcoded** sample data.
- The certificate **download** button currently shows a toast only (sharing via Web Share API works; PDF/file download is not yet implemented).
- A few camp-detail actions (e.g. "View Registrations") are **placeholder buttons**.
- No automated test suite is configured (see note above).
- **Sync note (2026-07-11):** doc audited against committed HEAD `83cbb65`; the previously-uncommitted work is now committed. Only untracked change is `.claude/`.
- This is a **solo/portfolio-scale** project; there are no production user-base or uptime metrics to cite. Avoid inventing numbers (users, donations, latency, etc.).

---

## 9. Suggested resume bullet templates (ready to tailor)

Every bullet below is `[shipped]` — each sub-claim is grep-verifiable in the repo. Do NOT reintroduce Chart.js analytics, "data-visualization dashboards", "donors earn XP", or the **XP/level UI** (it renders permanently-zero — `[partial]`, fails an interview demo) — see §8.

Full-stack / general `[shipped]`:
- *Built a full-stack, role-based blood-donation platform (Next.js 15, React 19, TypeScript, Supabase/PostgreSQL) supporting donors, hospitals, and admins, with geolocation-driven camp discovery and emergency blood requests.*

Database / backend emphasis `[shipped]`:
- *Designed the PostgreSQL data model and wrote custom PL/pgSQL PostGIS stored procedures for distance-ranked search, plus full Row-Level Security policies and versioned SQL migrations — including a careful FK-remapping migration to make each profile's primary key its auth user id.*  evidence: `supabase/migrations/20260613174304_restore_rpc_functions_after_migration.sql`, `..._realign_entity_ids_to_user_id_pattern_a.sql`, `..._enable_rls_and_policies.sql`
- *Wrote a PostGIS RPC with an in-SQL 7-branch dynamic `ORDER BY` (column + direction), search, org-filtering and keyset pagination, consuming Postgres enums (`blood_type`, `organisation_type`) as typed params across the PostgREST boundary.*  evidence: `get_nearby_donation_camps` in the same RPC migration
- *Recovered a broken migration that dropped four custom RPCs by writing a restore migration plus a follow-up tuning migration — real migration debugging, not happy-path SQL.*  evidence: `supabase/migrations/` (`restore_rpc_functions...`, `relax_nearby_camps_date_filter`)

Frontend emphasis `[shipped]`:
- *Developed a responsive, themeable UI with React 19 and Tailwind/shadcn, interactive MapLibre/Leaflet maps, and geolocation-based camp search with debounced filtering and pagination.*  evidence: `app/donor/components/donor-stats.tsx`, `app/donor/donation-camps/`
  - *(XP/level UI deliberately excluded — it renders but `xp` is never incremented, so it's permanently zero; `[partial]`, see §8.)*

Security emphasis `[shipped]`:
- *Implemented defense-in-depth authorization: edge middleware route guards by role, Supabase Auth SSR sessions, database-level Row-Level Security across all tables, and server-side input validation in Next.js Server Actions.*  evidence: `utils/supabase/middleware.ts`, `..._enable_rls_and_policies.sql`

Code-quality emphasis `[shipped]`:
- *Ran a systematic hardening pass fixing data-integrity bugs (non-atomic uploads, silent key mismatches), adding server-side validation and business-rule guards, and eliminating unsafe type casts and production debug logging.*  evidence: `fixes.md`
