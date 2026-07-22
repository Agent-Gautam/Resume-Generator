---
name: faculty-feedback
repos:
  - path: D:\repos\faculty-feedback-refactor
    synced: 5e6a172
synced-date: 2026-07-05
---

# Faculty Feedback Platform — Resume Source Brief

> **Purpose of this file.** A factual, non-exaggerated inventory of the work done on this
> project, written so that a downstream AI can extract and re-weight material for different
> resume variants (e.g. a "backend/Prisma-heavy" resume, a "full-stack" resume, a
> "testing/quality" resume). Everything below is grounded in the actual codebase. Where a
> capability is partial or deliberately deferred, it is labeled as such so no variant overclaims.

> **Claim tags (see `.claude/commands/update-project.md`):** `[shipped]` = wired end-to-end and grep-verifiable — **the only tag a resume may use**. `[partial]` = real but incomplete. `[planned]` / `[stub]` = intent/placeholder. Audited 2026-07-11 — clean, no overclaims; see `faculty-feedback.audit.md`. Note the §8 caveats (email is `[partial]`/scaffolded, SHA-256 hashing, no admin CRUD UI, no tests) — those stay off resumes.

---

## 1. One-line summaries (pick by resume length)

- **Shortest:** Built a multi-tenant college faculty-feedback platform (Next.js 16, React 19, TypeScript, PostgreSQL, Prisma 7) with five role-based portals and real-time analytics dashboards.
- **One sentence:** Designed and built a full-stack, multi-tenant faculty-feedback web app where students rate teachers per course during time-boxed feedback cycles, and teachers, HODs, and admins consume aggregated analytics — spanning a 14-model relational schema, JWT/OTP authentication with role-based access for five user types, transactional feedback submission, and server-computed analytics dashboards.
- **Framing note:** This is a **ground-up rewrite** of an earlier prototype (JavaScript + MongoDB, single-tenant, incomplete). The rewrite re-platformed onto TypeScript + PostgreSQL + Prisma with a multi-tenant architecture — a legitimate "migration / re-architecture" talking point.

---

## 2. What the product is (domain)

A feedback system for colleges/universities:

- An **Institute** (the tenant) contains **Departments**, each with **Programs** (degrees), which have **Subjects**.
- A **Course Offering** is a specific subject taught by a specific teacher to a section in a given semester/academic year — this is the unit students actually rate.
- An admin opens a time-boxed **Feedback Cycle** (e.g. Mid-Sem / End-Sem). The system generates one **Feedback Entry** (a form) per eligible student × course offering.
- A student submits **Feedback Responses** — a 1–5 rating against each configurable **Feedback Question**.
- Teachers, HODs, admins, and platform super-admins each get a distinct dashboard that aggregates those responses into averages, distributions, submission rates, leaderboards, and cross-cycle trends.

**Five roles:** Student, Teacher, HOD (head of department), Institute Admin, Platform Super-Admin.

---

## 3. Tech stack (verified from `package.json` / code)

| Layer | Technology |
|---|---|
| Language | TypeScript (strict), end-to-end |
| Framework | Next.js 16 (App Router), React 19 |
| Server logic | Next.js **Server Actions** (`"use server"`) — no separate REST layer |
| Database | PostgreSQL |
| ORM | **Prisma 7** with the `@prisma/adapter-pg` driver adapter (`pg`) |
| Auth | `jsonwebtoken` (JWT sessions in httpOnly cookies); OTP + password flows; Node `crypto` |
| UI | Tailwind CSS v4, shadcn/ui on Radix UI primitives (dialog, popover, tabs, tooltip, separator, slot) |
| Data viz | Recharts (bar, vertical bar, donut/pie) |
| UX libs | `input-otp` (OTP entry), `sonner` (toasts), `next-themes` (dark mode), `framer-motion` / `motion` (animation), `lucide-react` / `react-icons` |
| Email (scaffolded) | `nodemailer` (wired as dependency; delivery not yet enabled — see §8) |
| Tooling | ESLint 9, `tsx` for scripts, Tailwind PostCSS, Docker Compose for Postgres |

---

## 4. Backend / data engineering (the heaviest weight)

### 4.1 Relational schema design — `prisma/schema.prisma`
- **14 models**: `Institute`, `Admin`, `SuperAdmin`, `Otp`, `Department`, `Program`, `Subject`, `Student`, `Teacher`, `CourseOffering`, `FeedbackCycle`, `FeedbackQuestion`, `FeedbackEntry`, `FeedbackResponse`.
- **Multi-tenant modeling**: `Institute` is the tenant root; nearly every entity carries an `instituteId` and tenant-scoped queries enforce isolation.
- **Composite uniqueness constraints** used correctly throughout, e.g. `@@unique([rollNo, instituteId])`, `@@unique([email, instituteId])`, `@@unique([subjectId, teacherId, semester, section, academicYear, instituteId])` for course offerings, and `@@unique([studentId, courseOfferingId, feedbackCycleId])` to guarantee one feedback form per student per course per cycle (idempotency at the DB level).
- **Self-referential / named relation**: a Department's HOD is a `Teacher` via the named relation `"DepartmentHod"` — an HOD is a teacher who also heads a department (modeled without duplicating the user).
- **Enums**: `UserRole`, `FeedbackStatus` (PENDING / SUBMITTED).
- Code-generated Prisma client output to `lib/generated/prisma`.

### 4.2 Migrations & seeding
- **3 SQL migrations** under `prisma/migrations/` (initial, iteration, and an `add_auth_hod` migration adding auth tables + HOD support) — demonstrates schema evolution over time, not a single dump.
- **Idempotent seed script** (`prisma/seed.ts`): re-runnable, handling Prisma unique-violation error codes (`P2002`) gracefully, using `upsert` for admin/super-admin credentials and `createMany({ skipDuplicates: true })` for bulk rows, and printing a verification summary of row counts.
- Seed produces a realistic demo dataset: **1 institute, 2 departments, 2 programs, 12 subjects, 10 teachers, 20 students, 24 course offerings, 1 feedback cycle, 11 feedback questions, 120 feedback entries, 297 feedback responses.**

### 4.3 Server-side business logic (Server Actions)
- **Feedback submission** (`app/actions/feedback-management.ts`): validates ownership (entry belongs to the authenticated student), validates every rating is an integer in 1–5, and writes atomically inside a **`prisma.$transaction`** (delete prior responses → bulk `createMany` new responses → flip entry status to SUBMITTED with timestamp). Triggers Next.js `revalidatePath` cache invalidation across all affected dashboards.
- **Feedback cycle creation** (admin-only): validates title and date range (end after start), verifies the department belongs to the admin's institute.
- **Bulk feedback-entry generation** (admin-only): fans out course offerings → eligible students (matched by program + section), builds the candidate set, then **de-duplicates against already-existing entries using a `Set` of composite keys** before `createMany({ skipDuplicates: true })` — safe to run repeatedly without creating duplicate forms.

### 4.4 Analytics / aggregation layer — `lib/dashboard-data.ts`
A dedicated read/aggregation module (~640 lines) that turns raw relational data into dashboard-ready shapes, keeping computation out of the UI:
- **Student dashboard**: groups entries by cycle, computes per-cycle completion rate, splits pending vs submitted, computes per-form average rating.
- **Teacher dashboard**: overall average, response count, per-course breakdown with submission rate, per-question average scores, rating distribution (1★–5★ histogram), and a **cross-cycle trend** series.
- **HOD dashboard**: department-wide teacher **leaderboard**, per-course teacher comparison, and **subject-level competitions** (same subject taught by multiple teachers, ranked).
- **Admin dashboard**: institute-wide counts, per-cycle completion cards, per-department roll-ups.
- **Platform (super-admin) dashboard**: cross-institute aggregate stats and per-institute completion rates.
- Careful numeric handling: safe division (guards against divide-by-zero on empty sets), consistent rounding helper, and a `getWindowState` helper deriving `scheduled` / `live` / `closed` from a cycle's date window.

### 4.5 Authentication & authorization
- **Two auth mechanisms**: passwordless **OTP** (email-based) for students/teachers/HODs, and **email + password** for institute admins and platform super-admins. Role of a faculty login (TEACHER vs HOD) is resolved at verify time by checking whether the teacher heads any department.
- **JWT sessions** (`lib/auth/session.ts`): signed tokens with 8-hour expiry, stored in an **httpOnly, sameSite=lax, secure-in-production cookie**; dev/prod secret handling with a guarded fallback that throws in production if `AUTH_SECRET` is unset.
- **Role-based route guarding** (`lib/auth/get-session.ts`): `requireSession(allowedRoles)` redirects unauthenticated users to `/login` and wrong-role users to their own default route.
- **OTP security details** (`lib/otp.ts`, `app/actions/auth/otp.ts`): SHA-256-hashed OTPs stored (never plaintext), **timing-safe comparison** via `crypto.timingSafeEqual`, 5-minute TTL, expiry checks, and **attempt-limiting/lockout** after 5 failed tries. OTP row is `upsert`ed on resend and deleted on success.
- Password verification also uses `timingSafeEqual` to avoid timing side channels.
- **Defensive validation** at the edges (e.g. trimming/normalizing emails, rejecting blank identifiers, filtering malformed institute rows out of the public login picker).

---

## 5. Frontend / UX

- **App Router architecture** cleanly split between React **Server Components** (data-fetching pages that call the aggregation layer directly) and **Client Components** (interactive forms, charts, theme toggle).
- **Five role-specific dashboards** (`/student`, `/teacher`, `/hod`, `/admin`, `/platform`), each with its own layout, stat cards, and charts.
- **Data visualization** with Recharts: rating-distribution histograms, horizontal score-ranking bars, and completion donut charts, wrapped in reusable chart components.
- **Design system** on shadcn/ui + Radix primitives: reusable `Button`, `Card`, `Dialog`, `Tabs`, `Popover`, `Tooltip`, `Sidebar`, `Sheet`, `Skeleton`, `Badge`, plus an app shell with a responsive sidebar and a `use-mobile` hook.
- **Considered auth UX**: tabbed student/faculty login, a **searchable institute combobox** (filter by name or code), dedicated OTP-entry component, separate admin/super-admin login portals, and toast feedback via `sonner`.
- **Polished feedback flow**: a per-teacher rating form and a gamified reward/"quest" completion screen that tracks "X of Y teachers rated" progress and links the student to the next pending form (built from cycle-sibling data computed server-side).
- **Dark mode** via `next-themes` with a theme toggle; motion/animation via `framer-motion`.
- **Portfolio landing page** (`components/landing/*`): hero, features, how-it-works, role-based-views, tech, and demo-access sections — the product's own marketing/demo surface.

---

## 6. Architecture & engineering decisions (talking points)

- **Re-platformed MongoDB → PostgreSQL** because the domain is intrinsically relational (institute → dept → program → subject → offering → entry → response, with many-to-one and unique-constraint invariants). Relational integrity and composite uniqueness are enforced in the schema rather than in application code.
- **Server Actions instead of a REST/GraphQL API layer** — end-to-end type safety from DB to component, less boilerplate, and colocated mutations. Cache coherence handled via `revalidatePath`.
- **Multi-tenant schema kept latent while shipping a single-institute demo** — a deliberate scope decision: the tenancy model (`Institute` root, tenant-scoped keys, a platform super-admin role) is fully modeled, but onboarding/self-serve tenant provisioning was intentionally deferred for a portfolio/demo target. Shows judgment about scope vs. over-engineering.
- **Separation of concerns**: a single aggregation module (`dashboard-data.ts`) owns all read/compute logic; components stay presentational; Server Actions own writes/validation.
- **DB-level idempotency**: uniqueness constraints + `skipDuplicates` + set-based de-duplication make destructive-free re-runs (seeding, entry generation) safe.
- **Prisma driver adapter** (`@prisma/adapter-pg`) rather than the default engine — modern Prisma 7 setup.

---

## 7. Quantifiable facts (safe to cite)

- 14 Prisma models; 5 user roles; 2 authentication mechanisms (OTP + password).
- 3 database migrations; 1 idempotent seed script generating ~500 rows of realistic demo data (120 feedback forms, 297 responses).
- 5 distinct role-based dashboards; ~690-line dedicated analytics/aggregation module (`lib/dashboard-data.ts`).
- Transactional multi-step feedback write; bulk generation with composite-key de-duplication.
- TypeScript throughout, strict mode. (Note: as of this writing the working tree has one
  outstanding type error in `prisma.config.ts` — do **not** claim "typecheck passing" until
  it is resolved; see §8.)

---

## 8. Honest scope / limitations (so no variant overclaims)

These are deliberately **not** to be presented as finished production features:

- **Email delivery is scaffolded, not live**: OTPs are generated and hashed correctly but printed to server stdout for the demo; `nodemailer` is installed but sending is a TODO.
- **Password/OTP hashing is SHA-256 without a salt/KDF** (chosen for a low-stakes demo). A production framing should say "designed the auth flow" — not "hardened for production." No rate limiting on OTP requests beyond per-code attempt limits.
- **No admin/super-admin CRUD UI yet** for managing users/departments/subjects — the app relies on the seed for setup; cycle creation + entry generation are the implemented admin write paths.
- **Automated test suite is not present** — do not claim unit/integration test coverage. Manual verification is accurate to claim; a clean typecheck is **not** currently accurate (one error remains in `prisma.config.ts` in the working tree).
- **Working-tree note (2026-07-05):** this doc reflects the working tree INCLUDING uncommitted work (landing-page redesign, gamified `rate-quest` completion screen, untracked `design/` folder). Committed HEAD is `5e6a172`; when that work is committed, the next sync only needs a hash bump.
- Target audience is **portfolio/demo/single-institute**, not a hardened production SaaS.

---

## 9. Skill tags (for a resume generator to filter on)

`TypeScript` · `Next.js 16` · `React 19` · `React Server Components` · `Server Actions` ·
`PostgreSQL` · `Prisma 7` · `relational data modeling` · `database migrations` · `multi-tenancy` ·
`JWT authentication` · `OTP / passwordless auth` · `role-based access control (RBAC)` ·
`database transactions` · `data aggregation & analytics` · `Recharts / data visualization` ·
`Tailwind CSS v4` · `shadcn/ui` · `Radix UI` · `REST-less architecture` · `Docker Compose` ·
`legacy rewrite / re-architecture (MongoDB→Postgres)` · `idempotent seeding` · `cache revalidation`

All tags above are `[shipped]` **except** the §8 caveats — email delivery is `[partial]`/scaffolded (keep off resumes), and hashing is SHA-256 (frame as "designed the auth flow", never "production-hardened").

---

## 10. Pre-written résumé bullets (pick/adapt per variant)

Every bullet is `[shipped]` (audit-verified 2026-07-11). Do not add email delivery, "production-hardened" security, or admin-CRUD claims — those are `[partial]`/absent (§8).

**Backend / Prisma variant** `[shipped]`
- Modeled a 14-model multi-tenant PostgreSQL schema in Prisma 7 with tenant-scoped composite uniques (e.g. `@@unique([subjectId, teacherId, semester, section, academicYear, instituteId])`) and a self-referential HOD relation.  evidence: `prisma/schema.prisma`
- Wrote a transactional feedback-submission server action (ownership check, 1–5 validation, `$transaction` delete→create→status) plus bulk entry generation with Set-based de-duplication.  evidence: `submitFeedbackAction`, `generateFeedbackEntriesAction` in `app/actions/feedback-management.ts`
- Built an idempotent seed generating ~500 rows (120 feedback forms, 297 responses) via `upsert` + `createMany({ skipDuplicates: true })`, safe to re-run.  evidence: `prisma/seed.ts`

**Full-stack variant** `[shipped]`
- Re-platformed a single-tenant JS/MongoDB prototype into a multi-tenant TypeScript/Next.js 16 app on PostgreSQL + Prisma 7, with five role-based portals and server-computed analytics.

**Data / analytics variant** `[shipped]`
- Built a ~690-line server-side analytics module powering five role dashboards, including comparative logic that ranks the same subject taught by multiple teachers and a department leaderboard.  evidence: `subjectComparisons`, `teacherLeaderboard` in `lib/dashboard-data.ts`
- Shipped rating-distribution, score-ranking, and completion charts with Recharts, wired into all four dashboards.  evidence: `RatingDistributionChart`, `ScoreBarChart`, `CompletionPieChart` in `components/dashboard/charts.tsx`

**Security / auth variant** `[shipped]`
- Designed a JWT + OTP auth flow with an 8h httpOnly session cookie, role-guarded routing, and timing-safe OTP/password comparison (`crypto.timingSafeEqual`) with a 5-min TTL and attempt lockout.  evidence: `lib/auth/session.ts`, `lib/auth/get-session.ts`, `lib/otp.ts`, `lib/auth/password.ts`

**Frontend / interaction variant** `[shipped]`
- Built a gamified "rate-quest" feedback flow as a keyboard-navigable state machine with reduced-motion support that batches all ratings into a single server-action submit.  evidence: `components/dashboard/rate-quest.tsx`
