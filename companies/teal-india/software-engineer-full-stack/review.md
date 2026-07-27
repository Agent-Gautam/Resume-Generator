# Review — Teal India / Software Engineer - Full Stack
Generated: 2026-07-27 | JD: https://wellfound.com/jobs/4246030-software-engineer-full-stack | Resume: resume.pdf

## Match score: 76/100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | 29 | Node.js, Express.js, Next.js, React, TypeScript and **LLM API integration** are all evidenced by shipped work (Cryptax backend + Gemini/Vercel AI SDK assistant; a year of React/Next.js at KoinX). The one named stack item that is *not* evidenced is **MongoDB** — the only honest touchpoint is having re-platformed a JS/MongoDB prototype onto PostgreSQL, which is on the resume but reads as "left MongoDB behind", not "works in MongoDB". "Backend, frontend, applied AI" as a triple is genuinely covered. |
| Experience level & domain | 25 | 18 | JD asks 1+ years; candidate has ~15 months across two roles (12-month KoinX internship + 3-month contract) — clears the bar, though both are internship/contract rather than full-time salaried. Domain (property due diligence, geospatial, big data/ML) is not the candidate's, but BloodLink's PostGIS distance-ranked search is real geospatial SQL and is the closest adjacency available. Fintech background (KoinX + Cryptax) is transferable "correctness matters" work. |
| Nice-to-haves | 15 | 10 | Explicit bonus (JS/TS, React, building servers) fully met. From the tag block: Authentication/JWT/token auth yes, API design yes, automation partly (bulk email feature), system design defensible via Cryptax architecture. Docker, Kubernetes, AWS, Stripe, OAuth all absent. Razorpay is a direct hit via the Pixels and Grids bullet. |
| Education / certs | 10 | 9 | B.Tech CS (CGPA 8.6/10, 2026) from IKGPTU — fresh graduate, matches a 1+ year startup role. Certifications include Node.js/Express.js/SQL (Scrimba) and Google Cloud Foundations, both aligned to the JD. No CS-from-a-tier-1 signal, which some Bengaluru startups screen on. |
| Evidence quality | 10 | 10 | Every project claim is code-verifiable, both project links (live demo + repo) are on the resume, and the numbers used (8 tools, 27 tests, 8 tables, 13 tables) come from audited source docs. A reviewer can click through and check. |

## Keyword coverage

| JD keyword | On resume? | Where / why not |
|---|---|---|
| Node.js | YES | Skills row; Cryptax backend bullet ("Node.js/Express.js backend in TypeScript") |
| Express.js | YES | Same bullet + Skills + Scrimba certification |
| Next.js | YES | Skills; KoinX bullet; all three project entries |
| MongoDB | PARTIAL | Listed in Skills (user-attested) and named in the Faculty Feedback re-platform bullet — but as the *source* of a migration to PostgreSQL. No project ships on MongoDB. Real gap, see below. |
| React.js / React | YES | Skills; KoinX bullets; BloodLink and Faculty Feedback entries |
| JavaScript (ES5 & ES6) | YES | Skills row, "JavaScript (ES6)". ES5 not called out separately. |
| TypeScript (JS/TS bonus) | YES | Skills; Cryptax, BloodLink, Faculty Feedback bullets |
| Large Language Models (LLMs) | YES | Dedicated "Applied AI" skills row + Cryptax lead bullet |
| API-based LLM integration | YES | Cryptax lead bullet — Google Gemini via Vercel AI SDK, agentic tool-calling loop over 8 DB-backed tools |
| AI / Artificial Intelligence | YES | Applied AI skills row; Cryptax; KoinX AI-powered transaction search |
| Full Stack Development | YES | Pixels and Grids title + bullets; all three projects are full-stack |
| API | YES | "REST APIs" and "API design" in Skills; Cryptax REST backend |
| Authentication | YES | Skills row "Authentication (JWT)"; Cryptax auth bullet; Pixels and Grids auth-layer bullet |
| OAuth / OAuth2 | NO | Cryptax Google OAuth is `[partial]` — no working flow exists, so it may not appear in any framing. JWT + rotating hashed refresh tokens is written instead, which covers the "Token Authentication, JWT" half of that tag. |
| System Design | PARTIAL | Not named as a phrase; implied by the Cryptax architecture bullets (pure-function engine, whitelisted tool boundary, transactional schema). No distributed-systems evidence. |
| Automation | PARTIAL | Closest shipped evidence is the bulk HTML email marketing feature (Pixels and Grids) and idempotent bulk entry generation (Faculty Feedback). No scripting/automation-tooling portfolio. |
| Docker | NO | Not in the profile's defensible skills list. Only real use is Docker Compose for a local Postgres in Faculty Feedback — too thin to claim; Cryptax deploys on Railway, not containers. |
| Kubernetes (K8s) | NO | No evidence of any kind. |
| AWS | NO | No evidence. Deployments are Vercel, Railway and Supabase. |
| Stripe API / Stripe Payments | NO | No Stripe work. Payments experience is Razorpay only. |
| Razorpay Payment gateway | YES | Pixels and Grids bullet 1 — integrated Razorpay checkout on KollaBee |
| MERN stack (as a unit) | PARTIAL | M-E-R-N minus the M: Express/React/Node all real, MongoDB is the missing leg. |

## Gaps (honest)

1. **MongoDB.** The JD names it first in the stack list and it appears three times in the tag block. The candidate has never shipped a MongoDB application — the databases in all three projects are PostgreSQL, and one of the projects is literally a *migration away from* MongoDB. It is in the skills list as user-attested knowledge, not repo-backed experience. If a screener probes "walk me through a schema you designed in Mongo", there is no answer.
2. **Containers and cloud infrastructure.** Docker, Kubernetes and AWS are all in the tag block and none are claimable. Everything shipped so far runs on managed platforms (Vercel, Railway, Supabase) where deployment is a git push. For a "small team of all-rounders", not being able to touch infra is a real limitation.
3. **Payments beyond one integration.** Stripe is tagged twice. The candidate has integrated Razorpay checkout once, on a client project, as a feature — not payment systems design, webhooks, reconciliation or failure handling.
4. **No production-scale or team-scale evidence.** All three projects are solo portfolio work with no users, no traffic and no uptime numbers; the professional year was an internship on a frontend surface. The JD's "we build reliable systems" and "grow into a self contained powerhouse" implies someone who has carried something in production.
5. **The company's actual domain — geospatial big data / ML on property records — is untouched.** BloodLink's PostGIS work is genuine but is distance ranking on a small dataset, not big-data geospatial processing. No ML/data-pipeline work at all beyond CSV normalization.
6. **Full-time employment history is thin.** Two engagements, both non-permanent (12-month internship, 3-month contract).

## Likely rejection reasons (ranked)

1. **MongoDB/MERN keyword filter.** If the screen is literal about the stack, a PostgreSQL-only candidate gets cut before anyone reads the LLM work — this is the single highest-probability failure.
2. **"1+ years" read as "1+ years full-time".** ~15 months of internship + contract may be scored as fresher by a recruiter who wants someone who has already been on a real team through a release cycle, especially at Rs 9–12L.
3. **Location / on-site commitment.** The role is in-office in Bengaluru with WFH flexibility; the candidate is in Mohali. Relocation is allowed per the JD, but a recruiter with local applicants may not spend the effort. The resume header says Bengaluru to signal willingness — this should be made explicit in the cover letter or ATS form, not left implied.
4. **No infra/DevOps surface.** A small all-rounder team may want someone who can also deploy and debug the box; Docker/K8s/AWS being completely absent is visible.

## What would raise the score

- **Ship one real MongoDB feature.** Not a tutorial — add a genuinely document-shaped subsystem to an existing project (e.g. Cryptax audit/event log, or raw exchange-payload archival) on MongoDB with Mongoose, indexes and an aggregation pipeline. That converts the biggest gap into a bullet and makes "MERN" honest. This is the single highest-leverage action for this JD family.
- **Containerize Cryptax and put a Dockerfile + docker-compose in the repo**, then note the deployment path. Both backend and frontend already run as plain Node/Next apps; this is a weekend of work and unlocks the Docker keyword truthfully across many JDs.
- **Push the geospatial work further** — BloodLink already has PostGIS. Adding a bulk import of a public geodata set with spatial indexing and a measurable query improvement would create a bullet that speaks directly to Teal's property/geospatial domain.
- **Write up the Cryptax AI tool-calling design publicly** (README section or short post). This JD's only hard AI requirement is LLM API integration, and the anti-hallucination tool boundary is genuinely the strongest differentiator on the resume — a linkable write-up makes it survive a skim.
- **Apply through the company's own ATS**, not the Wellfound button, and state the Bengaluru relocation plainly in the application form or cover letter.

## Assumptions made

- Header city set to **Bengaluru, India** because the role is in-office/hybrid (per the location rule: on-site or hybrid anywhere → JD city). The JD says relocation is allowed, so this is a supported signal, but the candidate must be genuinely willing to relocate from Mohali.
- The Wellfound **Skills tag block** was treated as auto-generated keyword metadata, not as JD requirements. Scoring weighted the "About the job" prose; tags were used only for keyword coverage.
- BloodLink's Chart.js analytics and XP gamification were excluded despite Teal's "Big Data Analytics" market — both are `[partial]` dead code and are banned in every framing.
