# Review — WisdomAI / Software Engineer, Frontend/Fullstack
Generated: 2026-07-05 | JD: https://jobs.ashbyhq.com/Wisdom-AI/9dc24174-86ef-496d-9957-6012e6e49097 | Resume: resume.pdf

> **Honesty amendment (2026-07-11):** The original resume claimed *"Built Chart.js analytics dashboards (blood-type breakdown, collection trends, donor demographics)"* and *"XP/level gamification to drive donor retention"* on Blood Link. A code audit found the Chart.js charts are **unwired dead code** (never rendered) and XP is **never incremented** (permanently zero) — both fabrications. Since this JD is data-viz-centric, Blood Link was **replaced with Faculty Feedback**, whose Recharts dashboards and 5-role analytics are genuinely shipped and grep-verified. Chart.js was removed from Skills (no shipped evidence anywhere); Recharts added (real). Score revised from 58 → 59 — data-viz evidence is now real rather than fabricated.

## Match score: 59/100
| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | 27 | React, TypeScript, Node all evidenced (KoinX internship + both projects). "Product instinct" and "high agency" are soft requirements — the solo, self-directed projects are the closest proxy, but there's no way to hard-verify this from a resume. |
| Experience level & domain | 25 | 7 | JD explicitly targets mid-to-senior, "room for staff engineers." Candidate has one ~1-year frontend internship and one 3-month full-stack gig — this is an entry-level profile against a mid/senior bar. Domain (AI-powered analytics / GenUI) has no direct match; closest analog is dashboard-building in two personal projects. |
| Nice-to-haves | 15 | 7 | Real Recharts dashboards across 5 role-based portals (Faculty Feedback) plus a tax-summary/disposals dashboard (CryptoTax Buddy) show genuine data-viz/dashboarding work. No GenUI, BI-tool, or design-system-craft experience. No early-stage/founding-team time. |
| Education / certs | 10 | 8 | B.Tech CS on track to complete 2026, CGPA 8.6/10 — satisfies "Bachelor's in CS or equivalent." |
| Evidence quality | 10 | 10 | Both projects are concrete and verifiable: real schemas, real tests (27 unit tests), a real anti-hallucination AI tool-calling design — not generic bootcamp-clone projects. |

## Keyword coverage
| JD keyword | On resume? | Where / why not |
|---|---|---|
| React | Yes | Skills, KoinX experience, both projects |
| TypeScript | Yes | Skills, KoinX experience, both projects |
| Node(.js) | Yes | Skills, CryptoTax Buddy (Express backend) |
| Data viz / dashboarding | Yes | Real Recharts dashboards across 5 role portals (Faculty Feedback), tax/disposals dashboard (CryptoTax Buddy) |
| Generative UI / GenUI | No | No project touches AI-generated charts/visuals from natural language — this is the JD's core differentiator and the resume can't claim it |
| BI | Partial | Dashboards exist but no analytics/BI-tool domain experience |
| Product instinct / high agency | Implied only | Solo-built, self-directed projects are the evidence; not a literal keyword match since it's not a technology |
| Early-stage / founding team | No | KoinX and Pixels and Grids are neither framed nor known to be early-stage; omitted rather than overclaimed |
| Bachelor's in CS | Yes | Education section, on track for 2026 |

## Gaps (honest)
- **Seniority mismatch is the biggest gap.** The JD wants mid-to-senior engineers with room for staff-level candidates; this resume represents roughly 1.5 years of combined internship/junior experience. No amount of resume tailoring closes that gap — it's the most likely single rejection driver.
- **No generative-UI or AI-driven visualization experience.** The JD's actual open problems (AI-generated chart specs, parameterized live-preview editing, streaming an agent's tool-call trace as UX) are not something either project demonstrates. CryptoTax Buddy's AI assistant is tool-calling for Q&A, not UI generation — a related but distinct skill.
- **No early-stage/founding-team time**, which the JD flags as a plus.
- **Location:** JD is on-site in Bengaluru; candidate is currently in Phagwara, Punjab. Resume doesn't state relocation willingness — flagged as an assumption, not fabricated.

## Likely rejection reasons (ranked)
1. Seniority/experience-level mismatch against a mid-to-senior (with staff-level headroom) bar.
2. No demonstrated generative-UI / AI-driven visualization work — the JD's stated core problem space.
3. On-site Bengaluru requirement with no stated relocation intent from a candidate based in Punjab.
4. No early-stage or founding-team background, which the JD calls out as a plus signal.

## What would raise the score
- Build or extend a project where an LLM generates a chart/visualization spec (not just tool-calling for data lookup) — this directly targets the JD's "generative UI" thesis and would be the single highest-leverage addition.
- State relocation availability for Bengaluru explicitly in a cover note or application form (not fabricated on the resume, but worth clarifying to the recruiter).
- Accumulate more full-time (not internship) experience, or contribute meaningfully to an early-stage team, before targeting mid/senior-level listings — this specific req may be a stretch application rather than a strong-fit one.
- If applying anyway, lead with the CryptoTax Buddy AI-tool-calling work in a cover letter and frame it explicitly as a stepping stone toward generative UI (tool-calling → structured output → visual generation is a defensible narrative arc).
