# Audit — cryptax

Doc audited: `projects/cryptax.md`
Repos: `D:\repos\buddy-backend` @ `1cbe6ca`, `D:\repos\buddy-frontend` @ `cbae215` (working tree, trivial uncommitted changes only).
Method: usage-grep — installed ≠ used ≠ shipped.

## Overclaims (claimed shipped → true status)

None material. This is an unusually honest doc; every headline claim holds and the §8 honesty notes are all still accurate. Only precision nits:

1. **§4.6 terminology** — the server uses the AI SDK **UI Message Stream** (`result.pipeUIMessageStreamToResponse` in `assistant.controller.ts`), not the older "Data Stream Protocol" name. Functionally correct (real streaming tool-calling loop); dated term only.
2. **§4.3 / §8 spot-trades normalizer is NOT unit-tested** — `giottus.normalizer.ts` is real and wired into the registry but has no test; only the two deposits/withdrawals normalizers are tested. Doc already states this correctly — keep it precise, don't let it drift toward "spot trades tested."

## Verified shipped (claim → evidence anchor)

- **FIFO tax engine, pure function** — evidence: `calculateTax(sortedTransactions)` in `src/features/calculate/services/calculate/calculate.service.ts` (multi-lot consumption via `lotsByAsset[t.asset].shift()`, no I/O).
- **No-loss-offset §115BBH rule** — evidence: same file, `tax = !outOfScope && gain.greaterThan(0) ? gain.mul(TAX_RATE) : Decimal(0)`; losses accumulated for reporting, never subtracted from tax.
- **30% tax / 1% TDS with rule-based fallback** — evidence: `TAX_RATE`/`TDS_RATE` in `constants.ts`; TDS fallback `t.tds ?? (t.date >= TDS_EFFECTIVE_DATE ? price·qty·TDS_RATE : 0)`.
- **Indian FY (UTC, Apr–Mar) bucketing** — evidence: `month < NEW_FY_MONTH ? getUTCFullYear()-1 : getUTCFullYear()`.
- **Typed data-quality issue codes** — evidence: `IssueCode` enum in `prisma/schema.prisma` (9+ codes).
- **Test count = 38** — evidence: `calculate.service.test.ts` = 27, `giottusDepositsWithdrawals.normalizer.test.ts` = 6, `giottusInrDepositsWithdrawals.normalizer.test.ts` = 5. Doc's "38 (27 engine + 11 normalizers)" exact.
- **Streaming upload, manual backpressure, 1 GB cap** — evidence: `upload.controller.ts` (`Busboy({ limits: { fileSize: 1*1024*1024*1024 } })`, `parser.pause()/resume()` around batched `createMany`).
- **Exchange registry as source of truth (Giottus only)** — evidence: `SUPPORTED_EXCHANGES` / `getExchangeNormalizer` in `exchanges.config.ts`; only Giottus present (matches §8, no other exchanges claimed).
- **8 AI tools, `userId` in closure not schema** — evidence: `buildTools(userId)` in `assistant/services/tools.ts`.
- **Agentic loop bounded** — evidence: `stopWhen: stepCountIs(4)` in `assistant.service.ts`.
- **Zod→JSON-Schema date bridging** — evidence: `listTransactionsToolSchema`.
- **Generic whitelisted aggregation (DB does the math)** — evidence: `aggregationSelect()` in `results/services/aggregate.service.ts` over `sum|avg|min|max` + closed enum fields → `prisma.transaction.groupBy`.
- **OTP-gated registration** — evidence: `otp.service.ts` (`OTP_MAX_ATTEMPTS = 5`, `hashOtp()`, `EmailOtp` table).
- **Rotating hashed refresh tokens, 7-day** — evidence: `addDays(new Date(), 7)` + `rotateRefreshToken` in `token.service.ts`; cookie `maxAge: 7*24*60*60*1000` in `constants.ts`.
- **Session-management routes** — evidence: `GET /sessions`, `DELETE /sessions/:id`, `POST /logout-others` in `auth.routes.ts`.
- **8 Prisma models, 20 `@@index`, 13 `@db.Decimal`** — evidence: `schema.prisma`.
- **Frontend deduped 401-refresh** — evidence: `refreshPromise = refreshPromise ?? refreshAccessToken()` in `lib/api.ts`.
- **Custom AI transport with token inject + 401 retry** — evidence: `lib/ai/assistant-transport.ts`.
- **19 shadcn primitives** — evidence: `components/ui/` = 19 files.

## OAuth verdict → `[partial]`
No working flow: no `/auth/google` route, no passport/oauth client, no callback handler. Only data-model accommodation + two "use Google sign-in" error strings in `auth.service.ts`. §8's "designed for, not shipped" is accurate → `[partial]`, not resume-eligible.

## Underclaims (real strong work → candidate `[shipped]` bullets)

1. **Safe dynamic-query builder powering REST + AI from one impl** — `aggregationSelect()` / `extractValue()` in `aggregate.service.ts` builds Prisma selectors from a closed metric enum and backs both the REST endpoint and two AI tools. Strong "query safety / metaprogramming with a security boundary" bullet; currently one line.
2. **Richer issue taxonomy than documented** — 9+ typed codes with severity + structured `context` (incl. `DEPOSIT_WITHOUT_COST_BASIS`, `WITHDRAWAL_WITHOUT_DEPOSIT_MATCH`, `UNKNOWN_TRANSACTION_TYPE`). Doc lists 4. Evidence: `calculate.service.ts` + `IssueCode`.
3. **Deferred-but-handled transaction-type matrix** — engine explicitly no-ops on `FEE, FIAT_DEPOSIT, FIAT_WITHDRAWAL, STAKING_REWARD, AIRDROP, INTEREST, TRANSFER` → forward-designed domain coverage. Evidence: `calculate.service.ts` switch.
4. **Dual-consumption of results services (DRY)** — `results/services/*` back both REST and the AI tool layer with zero duplication. Evidence: imports in `tools.ts`.

## Stale tags
None yet (doc pre-dates the tagging system). Re-audit on next sync.
