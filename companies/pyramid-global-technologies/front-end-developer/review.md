# Review — Pyramid Global Technologies / Front End Developer
Generated: 2026-07-27 | JD: Glassdoor listing (https://www.glassdoor.co.in/Job/mohali-software-developer-jobs-SRCH_IL.0,6_IC4469455_KO7,25.htm) | Resume: resume.pdf | Cover letter: cover-letter.pdf

> **Read this first.** The posting states three technologies (React, Node JS, HTML) and nothing else — no responsibilities, no seniority, no team or product detail. The candidate matches all three with shipped, clickable evidence, so the skills score is near-full. **That is a fact about the JD's thinness, not proof of strong fit.** A three-word requirement list cannot discriminate between a good hire and a bad one, and the score below is deliberately held down in the dimensions the JD refuses to specify.

## Match score: 79/100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | 38 | All three stated requirements are evidenced by `[shipped]` work. **React** — a year on the frontend at KoinX plus React 19 across three personal projects. **Node JS** — the Cryptax Express API written in TypeScript, live on Railway. **HTML** — implicit in every frontend claim and listed as HTML5 in Skills; no JD signal about markup depth (semantics, accessibility, email HTML) so it cannot be scored more precisely. Points withheld only because "React" unqualified could mean anything from class components to a Next.js App Router shop, and the JD gives no way to check alignment. |
| Experience level & domain | 25 | 15 | Seniority is unstated; the Glassdoor **estimate** (Rs 3–8L, median Rs 5L) suggests junior-to-mid, which the candidate fits — ~15 months across a 12-month frontend internship and a 3-month contract. Domain is the weak part: Pyramid is a **managed IT services provider** (backup, network/security, procurement, unified communications) for Australian clients, not a web-product company. The candidate has no managed-services, IT-infrastructure or Australian-client exposure, and it is unclear what the frontend work even is — internal tooling, a client portal, or an outsourced engagement. |
| Nice-to-haves | 15 | 8 | **The posting states no nice-to-haves at all**, so there is nothing to score against. Half credit reflects adjacent strengths any frontend team would value — TypeScript, Next.js, Redux Toolkit, Tailwind/shadcn, real component-library ownership, responsive work — rather than credit for meeting a stated bar. Inventing full marks here would be fake precision. |
| Education / certs | 10 | 8 | B.Tech CS, CGPA 8.6/10, IKGPTU, 2026 — a fresh graduate matching a junior-to-mid frontend req. Certifications directly on-point: JavaScript Algorithms & Data Structures (freeCodeCamp) and Node.js, Express.js & SQL (Scrimba), plus NIELIT Full Stack Web Development (Grade S). |
| Evidence quality | 10 | 10 | Both projects carry live demo and repo links on the resume; every number (11 features, 7 repos, 19 PRs, 27 pages, 27 tests) traces to the profile or an audited project doc. A reviewer can verify the React and Node claims in about two minutes of clicking. |

## Keyword coverage

| JD keyword | On resume? | Where / why not |
|---|---|---|
| React | YES | Skills row (first entry); KoinX bullets 1–4; Cryptax dashboard bullet (React 19); Blood Link camp-discovery bullet (React 19) |
| Node JS / Node.js | YES | Skills "Backend" row; Cryptax bullet — "Built the Node.js/Express.js API behind it in TypeScript". Written as **Node.js** (standard spelling) rather than the posting's "Node JS"; ATS tokenizers match both, and Node.js is the form the Scrimba certification uses. |
| HTML | YES | Skills row, written as **HTML** to mirror the posting's exact spelling. The profile records this as HTML5; HTML is a subset of that claim, not an upgrade, and it avoids a whole-word ATS match missing the "HTML5" token. |
| *(no other keywords)* | — | The posting names nothing else. Everything else on the resume is inferred relevance for a frontend role, not JD mirroring. |

Nothing was dropped for `[partial]`/`[planned]` reasons on this one — the JD is too narrow to reach any of the banned material. Blood Link's Chart.js analytics and XP gamification stayed off the page as always; Faculty Feedback's genuinely-wired Recharts dashboards were drafted in and then cut purely for space (the page went to 2), not for honesty reasons.

## Gaps (honest)

1. **Nobody can tell what this job actually is.** No responsibilities, no product, no team size, no stack beyond three words. The candidate may be a strong fit or completely mismatched and neither side can tell from the posting. This is the dominant risk in the whole application.
2. **No managed-IT-services or enterprise-infrastructure context.** Pyramid's public identity is backup/recovery, network and security management, procurement and unified communications for Australian clients. The candidate's background is consumer/fintech product frontend. If the role means building admin consoles over infrastructure tooling, that's unfamiliar territory.
3. **Location is genuinely unresolved.** The description says "Front End Developer in Sydney" while Glassdoor files it under Mohali. If it is Sydney-based, the candidate has no work rights for Australia and the application is void. The cover letter asks this directly.
4. **Thin professional tenure.** ~15 months, both engagements non-permanent (internship + contract). No experience being the frontend owner on a client-billed delivery, which is what a services company usually needs.
5. **No stated design-system, testing or accessibility bar to demonstrate against.** The candidate has real component-library work but no automated frontend tests anywhere (Cryptax's 27 tests are backend engine tests; Blood Link and Faculty Feedback have no test suite at all). If the team expects Jest/RTL coverage, that is a genuine hole.
6. **Nothing verifiable about the employer's engineering.** No public product, no engineering blog, no GitHub presence found — so the resume could not be tailored toward their actual codebase, only toward generic frontend competence.

## Likely rejection reasons (ranked)

1. **The role turns out to be Sydney-based** (or requires Australian work rights / overlap with AEST hours), making the application a non-starter regardless of skills. The JD text points this way more strongly than the Glassdoor location tag does.
2. **The listing is stale or recruiter-sourced.** It is 30d+ old, the salary is a Glassdoor estimate rather than employer-provided, and it is written informally ("Let me know if you have any questions"). The position may be filled, speculative, or a pipeline-building post that never converts.
3. **Experience bar higher than the posting implies.** A services company billing client work often wants someone who can be put in front of a client immediately; ~15 months of internship and contract time may read as too junior even though the stated requirements are met.
4. **Competition on a generic req.** Three-keyword frontend postings in Mohali attract very high applicant volume (the same search returned 547 roles), and with no differentiating requirements there is nothing to stand out on except the portfolio links.

## What would raise the score

- **Get the location question answered before investing further.** The cover letter asks it explicitly; if the answer is Sydney, spend the effort on one of the other Mohali listings from the same search instead (Softobiz MERN, Evervent Full Stack, eNest Software Developer were all Mohali-filed with employer-provided pay).
- **Add frontend tests to one project.** React Testing Library plus Vitest over Blood Link's camp-search filtering, or Cryptax's token-refresh interceptor, would close the only concrete technical gap visible here and is worth a resume bullet across every frontend JD, not just this one.
- **Ship an accessibility pass on Blood Link or Faculty Feedback** — keyboard navigation, focus management, ARIA labelling, a Lighthouse score before/after. "HTML" as a stated requirement usually means someone cares about markup quality, and right now there is no bullet that speaks to it directly.
- **Build one small piece of internal-tooling-shaped UI** — a dashboard over logs, inventory or device status. It maps to what a managed-services provider actually needs a frontend for, and no current project resembles it.
- **Apply via the employer site, not Glassdoor's aggregator**, and reference the Mohali listing explicitly so the application is routed to the right req.

## Assumptions made

- Header city set to **Mohali, Punjab, India**: the listing's location is Mohali and the role is on-site, so the JD-city rule applies. It coincides with the candidate's home city — the rule and the default agree here, they were not conflated.
- The role was treated as **frontend-led** despite Node JS being named. The JD's own noun is "Front End Developer", so the resume leads with React/UI work and carries exactly one Node.js/Express bullet to evidence that leg.
- Company background in `jd.md` came from **web research, not the posting** (corporate site, LinkedIn, ZoomInfo, D&B). It is used for context and for the cover letter's framing; no claim about their stack or team appears on the resume.
- Wrote **Node.js** rather than the posting's "Node JS" — standard spelling, matches the candidate's certification, and tokenizes the same.
