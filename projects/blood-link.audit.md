# Audit — blood-link

Doc audited: `projects/blood-link.md`
Repo: `D:\repos\blood-link-supabase` @ HEAD `83cbb65` (doc was synced at `4a2e54f` against an uncommitted tree; that work is now committed at/before HEAD).
Method: usage-grep against the working tree — installed ≠ used ≠ shipped.

## Overclaims (claimed shipped → true status)

1. **Chart.js analytics dashboards → `[partial]` (unwired dead code).** The three components are real Chart.js render code but are **never mounted in the UI**. `BloodTypeChart` (`app/organisation/components/blood-type-chart.tsx`), `CollectionTrendsChart` (`collection-trend-chart.tsx`), `DonorDemographicsChart` (`donor-demographics-chart.tsx`) are imported into `camp-tabs.tsx` (lines 6–8) but never used in JSX — the Overview tab renders only `<BloodCollection>` (a table via `InventoryDetails`). A repo-wide grep for JSX usage of those component names finds only the dead imports. Secondary defect: they `import { Chart } from "chart.js"` and never call `Chart.register(...)`, so even if wired they'd throw `"pie"/"bar" is not a registered controller` in Chart.js v4. **Not resume-eligible.** Affected claims: doc §3, §5 camp-control-panel Overview, §7 skill index, §9 frontend bullet.

2. **"Donors earn XP" → split.** The gamification *UI* is genuinely `[shipped]` — `XPLevel` (`app/donor/components/xp-level.tsx`) renders 4 tiers with an animated Framer Motion progress bar; the `xp` column exists (`supabase/migrations/20260613172936_add_xp_to_donors.sql`). But **no code path ever increments `xp`** — `addDonation` (`app/organisation/camps/actions.ts`) writes only `last_donation_date`/`next_eligible_date`. So "donors *earn* XP / level up through use" is `[partial]` (award logic not implemented); "gamified XP/level UI (4 tiers, animated progress)" is `[shipped]`, display-only.

3. **Minor wording — middleware redirect.** Doc §4.4 says cross-role users go to `/unauthorized`; actual `utils/supabase/middleware.ts` sends **unauthenticated → `/unauthorized`** but **cross-role → `/not-found`**. Defense-in-depth claim holds; fix the destination.

4. **Minor wording — "schema migrations" / inventory trigger.** No base-schema `CREATE TABLE` migration is in the repo (the six files are an ALTER, RLS, RPC-restore, realign, enforce, relax) — base tables were created outside VC. And the inventory-sync DB trigger (§4.6) is only *referenced in a comment*, its body not committed → describe as designed/not-independently-verifiable, not a shipped trigger.

## Verified shipped (claim → evidence anchor)

- **4 custom PL/pgSQL PostGIS RPCs** — evidence: `get_nearby_donation_camps`, `get_nearby_organisations`, `get_organisations_with_blood`, `get_donation_camp_with_latlon` in `supabase/migrations/20260613174304_restore_rpc_functions_after_migration.sql` (`ST_Distance`/`ST_MakePoint`, `STABLE`, `GRANT ... TO anon, authenticated`). Called from app: evidence: `app/donor/request/actions.ts`, `app/donor/donation-camps/actions.ts`, `app/organisation/camps/actions.ts`.
- **Full RLS across the data model** — evidence: `supabase/migrations/20260614080948_enable_rls_and_policies.sql` (per-table SELECT/INSERT/UPDATE/DELETE + `SECURITY DEFINER` `user_role()` helper with pinned `search_path`).
- **"Pattern A" identity-realignment migration** — evidence: `supabase/migrations/20260614075645_realign_entity_ids_to_user_id_pattern_a.sql` (`session_replication_role = replica`, children remapped before parents).
- **Role-based middleware route gating** — evidence: `updateSession` in `utils/supabase/middleware.ts`.
- **Emergency blood-request fan-out (per-org rows, urgency flag)** — evidence: `submitRequestAction` in `app/donor/request/actions.ts`.
- **56-day eligibility + walk-in + record-donation** — evidence: `addDonation` in `app/organisation/camps/actions.ts`.
- **Certificate share via Web Share API + clipboard fallback** — evidence: `app/donor/components/certificate.tsx` (`navigator.share` / `navigator.clipboard.writeText`). (Download-is-toast-only already disclosed in §8.)
- **Typed `ApiResponse<T>` envelope + server-side re-auth** — evidence: `app/types.ts` + `getUser()` re-checks in actions.
- **Forward/reverse geocoding server actions** — evidence: `app/actions/map-actions/coordinates-to-location.tsx`, `location-to-coordinates.tsx`.
- **Parallelized queries** — evidence: `Promise.all` in `app/donor/components/donor-stats.tsx`, `app/organisation/actions.ts`.
- **Honest-scope items confirmed accurate (§8)** — `app/organisation/settings/page.tsx` is a one-line stub; hardcoded upcoming-camps in `app/page.tsx`; no test runner/files.

## Underclaims (real strong work → candidate `[shipped]` bullets)

1. **Self-correcting migration discipline** — recovered from a migration that dropped the RPCs (`20260613174304_restore_rpc_functions...`, comment "Recreates the 4 custom RPCs that were not carried over") plus a follow-up tuning migration (`20260613174411_relax_nearby_camps_date_filter.sql`). Real migration debugging, not happy-path SQL. Evidence: `supabase/migrations/`.
2. **In-SQL dynamic sort (column + direction)** — `get_nearby_donation_camps` implements a 7-branch `CASE` `ORDER BY` toggling both column and direction. Evidence: `restore_rpc_functions_after_migration.sql`.
3. **Typed enum params across the DB boundary** — RPCs consume Postgres enums (`organisation_type`, `blood_type`) as typed params/returns, not loose text. Evidence: same RPC file / `app/organisation/types.ts`.
4. **`audit_logs` with append-only, admin-read RLS** — least-privilege audit surface exists in schema (`audit_select` admin-only, `audit_insert WITH CHECK (true)`), though not yet written from app code → mention as schema design only. Evidence: `enable_rls_and_policies.sql`.

## Stale tags
None yet (doc pre-dates the tagging system). After remediation, re-audit on next sync.
