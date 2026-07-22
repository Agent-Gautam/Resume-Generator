# Review — TeamViewer / Software Engineer - Front End
Generated: 2026-07-05 | JD: https://careers.teamviewer.com/jobs/7569868-software-engineer-front-end | Resume: resume.pdf

## Match score: 64/100
*(updated 2026-07-05: MUI + Jest added to Skills at the user's attestation — user is learning them; keyword coverage improves, but there is no project evidence behind either, so interviews will probe.)*
*(honesty amendment 2026-07-11: removed a fabricated "Chart.js analytics dashboards" claim from the Blood Link UI bullet — a code audit found those chart components are unwired dead code that never render. The bullet now claims only real shipped work (Radix UI, MapLibre/Leaflet maps, geolocation, skeleton loading). Score unchanged: the removed phrase wasn't a JD must-have, so match strength is unaffected — but the resume is now defensible.)*

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | 29 | React/TS/JS/HTML/CSS/REST/ESLint/Prettier/responsive/Git/agile all evidenced. MUI + Jest now present as keywords (user-attested, unevidenced). Still missing: CSS-in-JS (Emotion/Styled Components), React Testing Library, Vite/Webpack, GraphQL, WCAG-specific experience. |
| Experience level & domain | 25 | 15 | "Strong commercial React experience" vs. a 1-year internship + 3-month contract — junior-level, and the JD reads mid-level. Frontend domain fit itself is good. Role is Noida hybrid; candidate is in Phagwara (relocation unaddressed). |
| Nice-to-haves | 15 | 3 | No MUI theming, no micro-frontends, minimal verifiable CI/CD, design-tool (Figma) experience implied at Pixels and Grids but not claimable as a skill. |
| Education / certs | 10 | 9 | B.Tech CS (2026), CGPA 8.6/10 — directly relevant, current-year graduate. |
| Evidence quality | 10 | 8 | Claims are concrete and verifiable (70+ PRs, 38 tests, named libraries, public GitHub). Weak spot: no live demo URLs on the resume. |

## Keyword coverage
| JD keyword | On resume? | Where / why not |
|---|---|---|
| React (Hooks, Context API, functional components) | YES | Skills row, exact phrasing; KoinX + both projects |
| TypeScript | YES | Skills + every entry |
| JavaScript (ES6+) | YES | Skills, exact spelling |
| MUI Base | PARTIAL | "MUI" in Skills row (user-attested 2026-07-05, learning in progress; no project evidence). shadcn/ui (Radix UI) remains the evidenced component-library claim. |
| Reusable components / component library | YES | KoinX bullet 1 ("reusable, responsive UI components", "component-driven architecture") |
| HTML5 / CSS3 | YES | Skills row |
| CSS-in-JS / Emotion / Styled Components | NO | Candidate's styling stack is Tailwind CSS + CVA — not claimable |
| REST | YES | Skills + Pixels and Grids bullet; API integration in both projects |
| GraphQL | NO | No evidence anywhere — JD says "REST or GraphQL", so REST satisfies the clause |
| ESLint, Prettier | YES | Skills row (both verified in repos) |
| Jest / React Testing Library | PARTIAL | "Jest" in Skills row (user-attested 2026-07-05; no tests exist in any repo yet). No RTL. The 38 Vitest tests are backend — no project bullet claims frontend testing. |
| Vite / Webpack | NO | All projects are Next.js (bundler abstracted) — not claimable as hands-on |
| Responsive design | YES | Skills + KoinX bullet 1 + Blood Link bullet 1 |
| Accessibility / WCAG | PARTIAL | "accessible Radix UI primitives" (Blood Link) — honest phrasing; no WCAG audit experience claimed |
| Git / agile | YES | Skills + KoinX bullet 3 |
| Design collaboration (Figma) | PARTIAL | Pixels and Grids bullet mentions designer collaboration; Figma itself not claimed |

## Gaps (honest)
1. **MUI Base / MUI theming** — now a keyword on the resume but zero project evidence; an interviewer asking "what did you build with MUI?" currently has no good answer. Close the gap before interviews.
2. **Frontend testing** — "Jest" is now a keyword but no component tests exist in any repo (the public repos are one click from the resume). The 38 Vitest tests are backend.
3. **Seniority** — "strong commercial experience" likely means 2+ years; the candidate has 12 months of internship + 3 months contract.
4. **CSS-in-JS** — Tailwind-only styling history.
5. **Location** — Noida hybrid; candidate in Phagwara. Willingness to relocate should be stated in the application form/cover note.

## Likely rejection reasons (ranked)
1. **Experience level**: internship-titled experience against a "strong commercial experience" bar.
2. **Skills-vs-evidence mismatch in interviews**: MUI and Jest are on the resume but appear in no project — a technical interviewer probing either will notice quickly unless the user covers them first.
3. Relocation ambiguity for a hybrid Noida role.
4. No React Testing Library / component-test evidence in the linked public repos.

## What would raise the score
- **Build one small project (or port a Blood Link page) with MUI Base + a custom theme** — directly erases the #1 rejection reason and upgrades the nice-to-have "MUI theming" too. 1–2 days of work.
- **Add Jest + React Testing Library tests to buddy-frontend or Blood Link** (even 10–15 component tests) — converts the testing gap into a verified claim and updates the project docs' honesty notes.
- Add a **GitHub Actions CI workflow** (lint + test on push) to one repo — makes "CI/CD pipelines" claimable.
- State **willing to relocate to Noida** in the application form.
- Get the CryptoTax Buddy / Blood Link **live URLs** onto the resume once stable — verifiable demos beat descriptions.
