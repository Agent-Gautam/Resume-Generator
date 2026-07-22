# Audit — faculty-feedback

Doc audited: `projects/faculty-feedback.md`
Repo: `D:\repos\faculty-feedback-refactor` @ `5e6a172` (working tree; landing redesign + `rate-quest.tsx` untracked).
Method: usage-grep — installed ≠ used ≠ shipped.

## Overclaims (claimed shipped → true status)

Essentially none. One internal inconsistency and one over-precise metric:

1. **"13-model" vs "14 models."** §1 says "13-model relational schema"; §4.1/§7 say 14. Actual count in `prisma/schema.prisma` is **14** (`Institute, Admin, SuperAdmin, Otp, Department, Program, Subject, Student, Teacher, CourseOffering, FeedbackCycle, FeedbackQuestion, FeedbackEntry, FeedbackResponse`). Fix §1 to 14.
2. **`prisma.config.ts` type error (§7/§8)** — not re-verified (didn't run `tsc`); plausible. Doc conservatively says *don't* claim "typecheck passing," so no overclaim risk either way.

## Verified shipped (claim → evidence anchor)

- **Charts / Recharts — SHIPPED (real, not a dependency).** evidence: `components/dashboard/charts.tsx` defines `RatingDistributionChart` (`<BarChart>`), `ScoreBarChart` (`<BarChart layout="vertical">`), `CompletionPieChart` (`<PieChart>/<Pie innerRadius={65}>`), all in `ResponsiveContainer`, consumed in `app/{teacher,student,hod,admin}/page.tsx`. *(Contrast with blood-link, where the analogous chart claim is dead code — here it's genuinely wired.)*
- **14-model multi-tenant schema with composite uniques** — evidence: `prisma/schema.prisma` (`@@unique([rollNo, instituteId])`, `@@unique([subjectId, teacherId, semester, section, academicYear, instituteId])`, self-referential HOD relation `"DepartmentHod"`).
- **3 migrations** — evidence: `prisma/migrations/` (`_init`, `_migration_1`, `_add_auth_hod`).
- **Idempotent seed, exact row counts** — evidence: `prisma/seed.ts` (`P2002` handling, `upsert`, `createMany({ skipDuplicates: true })`); counts from `prisma/data.json` verified: subjects 12, teachers 10, students 20, courseOfferings 24, feedbackEntries 120, feedbackResponses 297.
- **Transactional feedback submission** — evidence: `submitFeedbackAction` in `app/actions/feedback-management.ts` (ownership check, 1–5 integer validation, `prisma.$transaction` delete→create→status, multi-path `revalidatePath`).
- **Cycle creation + bulk entry generation with Set-dedup** — evidence: `createFeedbackCycleAction` + `generateFeedbackEntriesAction` (same file; `new Set(`${studentId}:${courseOfferingId}`)` then `createMany({ skipDuplicates: true })`).
- **Analytics/aggregation layer** — evidence: `lib/dashboard-data.ts` (`getStudentDashboard`…`getPlatformDashboard`, `getWindowState`, `buildDistribution`, `teacherLeaderboard`, `cycleTrendMap`/`trend`).
- **JWT sessions (8h, httpOnly)** — evidence: `lib/auth/session.ts` (`jwt.sign(..., { expiresIn: "8h" })`), cookie in `app/actions/auth/otp.ts`; `getSecret()` throws in prod if unset.
- **Role guard** — evidence: `requireSession(allowedRoles)` in `lib/auth/get-session.ts`.
- **OTP security** — evidence: `lib/otp.ts` (`hashOtp` SHA-256, `verifyOtpPlain` via `crypto.timingSafeEqual`), `app/actions/auth/otp.ts` (5-min TTL, `attempts >= 5` lockout).
- **Password timing-safe compare** — evidence: `verifyPassword` (`crypto.timingSafeEqual`) in `lib/auth/password.ts`, used in `institute-admin.ts` + `super-admin.ts`.
- **Gamified rate-quest (uncommitted)** — evidence: `components/dashboard/rate-quest.tsx`.

### Honesty notes (§8) — all VERIFIED accurate
- Email scaffolded not live: `nodemailer` in `package.json` only; zero `createTransport`/`sendMail`; `console.log("[OTP]", …)` + `// TODO`. Accurate.
- SHA-256 without salt/KDF: `crypto.createHash("sha256")`, no salt. Accurate.
- No admin/super-admin CRUD UI: only auth logins, OTP, sign-out, feedback submit, cycle create, entry generate exported. Accurate.
- No test suite: no test files/config/deps. Accurate.

## Underclaims (real strong work → candidate `[shipped]` bullets)

1. **HOD subject-level comparative analytics** — `subjectCompetitionMap`/`subjectComparisons` + `teacherLeaderboard` in `lib/dashboard-data.ts` rank the *same subject taught by multiple teachers* plus a department leaderboard. Non-trivial; could anchor its own bullet.
2. **Aggregation module is 690 lines, not ~640** (`lib/dashboard-data.ts`) — doc undersells its own metric.
3. **`rate-quest` is real interaction engineering** — state machine (`"intro"|"quest"|"submitting"|"reward"|"error"|"already"`), keyboard-driven option select (`[data-quest-opt]`), reduced-motion adaptation, auto-submit batching all ratings into one server action. Evidence: `components/dashboard/rate-quest.tsx`.
4. **Searchable institute combobox with malformed-row filtering** — evidence: `components/institute-search-select.tsx` + `app/actions/institutes.ts` (HEAD commit is literally "filter out malformed entries").
5. **Both password portals share the hardened `verifyPassword`** — doc credits OTP timing-safety but under-credits the equally-hardened password path.

## Stale tags
None yet (doc pre-dates the tagging system). Re-audit on next sync.
