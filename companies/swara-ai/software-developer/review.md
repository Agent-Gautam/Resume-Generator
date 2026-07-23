# Review — SWARA AI / Software Developer (SWE)
Generated: 2026-07-22 | JD: https://wellfound.com/jobs?job_listing_slug=4475642-software-developer | Resume: resume.pdf

## Match score: 71/100
| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | 30 | Strong: TypeScript, React, Next.js, RESTful APIs, PostgreSQL, full-stack, data-ingestion pipelines, testable code (38 Vitest tests). Missing: **Python** (skills-listed only, zero project evidence — JD's #1 language) and **MongoDB** (candidate is PostgreSQL-only). |
| Experience level & domain | 25 | 19 | Role is entry-level ("No experience required") — candidate fits: 1-yr KoinX internship + studio stint + 3 shipped portfolio projects. Domain is adjacent (fintech + LLM tool-calling + streaming data pipelines) but not the exact job-search / ATS / resume-parsing domain. |
| Nice-to-haves | 15 | 5 | Real LLM integration (Vercel AI SDK + Google Gemini, agentic tool-calling) partially covers the "LLM" ask, and KoinX's AI transaction search reinforces it. But **not** OpenAI/LangChain, no vector databases, no web scrapers, no ATS/resume-parsing background. |
| Education / certs | 10 | 9 | B.Tech CS (2022–2026, CGPA 8.6) matches the degree requirement exactly; certs (Google Cloud, freeCodeCamp JS DSA, Scrimba Node/SQL) are on-theme. |
| Evidence quality | 10 | 8 | Claims are concrete and code-verifiable: 38 tests, 8 LLM tools, 8-/14-model schemas, 1 GB streaming pipeline. Solo/portfolio scale (no production traffic) is the only softness. |

## Keyword coverage
| JD keyword | On resume? | Where / why not |
|---|---|---|
| Python | PARTIAL | Skills row only — profile-attested, interview-defensible, but **no project/experience bullet** (all shipped work is TS/JS). This is the headline gap. |
| TypeScript | YES | Skills + KoinX bullets + cryptax + faculty. |
| React / Next.js | YES | Skills + every experience/project entry. |
| RESTful APIs | YES | cryptax "versioned REST API"; Skills row. |
| PostgreSQL | YES | cryptax (8-table Prisma schema), faculty; Skills row. |
| MongoDB | NO | Candidate is PostgreSQL-only; not claimed. |
| Data pipelines (ingest/parse/process) | YES | cryptax "streaming data-ingestion pipeline that ingests, parses, and normalizes… up to 1 GB". |
| Scalable back-end services | YES (soft) | cryptax Express backend; scale is portfolio-level, not high-traffic — framed honestly. |
| LLMs | YES | cryptax "integrated a large language model (Vercel AI SDK, Gemini)"; KoinX AI search. |
| Vector databases | NO | No shipped vector-DB work; dropped, logged as gap. |
| OpenAI / LangChain | NO | LLM work used Google Gemini via Vercel AI SDK, not OpenAI/LangChain — not claimed. |
| Web scrapers / large-scale ingestion | PARTIAL | Streaming CSV ingestion is adjacent, but no scraping — not claimed as such. |
| ATS / resume parsing | NO | No domain experience; dropped. |
| Testable / clean code | YES | cryptax "38 Vitest unit tests". |

## Gaps (honest)
- **Python depth.** JD's first-named language; the candidate has it as a listed skill (interview-defensible) but no shipped Python code. Every project is TypeScript/JavaScript. A Python-heavy team would see this immediately.
- **MongoDB / NoSQL.** All database work is relational (PostgreSQL/Prisma/Supabase). No document-DB experience.
- **Vector databases + retrieval.** SWARA's AI matching engine leans on embeddings/vector search; the candidate has LLM *tool-calling* (structured, deterministic) but no vector-DB / RAG work.
- **OpenAI / LangChain / ML infrastructure.** LLM experience is via Google Gemini + Vercel AI SDK — transferable, but not the named stack, and no ML-training/infra background.
- **Web scraping & the ATS/resume-parsing domain.** No experience building scrapers or parsing resumes/job postings — the literal problem SWARA solves.

## Likely rejection reasons (ranked)
1. **Python is a hard filter.** If the backend/matching engine is Python and they screen on it, the TS-only project history is the most probable auto-reject.
2. **No AI-matching / vector-search / RAG evidence.** The core product is embeddings-based matching; the candidate's LLM work is structured tool-calling, a different competency.
3. **No domain overlap** with job-boards, scraping, or resume/ATS parsing — an early-stage team hiring one SWE may want someone who can hit their exact problem faster.
4. **Solo/portfolio scale.** "Scalable services… thousands of resumes daily" vs. portfolio-scale projects with no production-traffic proof.

## What would raise the score
- **Ship a Python service.** Even one real project — a FastAPI microservice or a data-ingestion/parsing script — converts Python from a skills-row word into evidence and neutralizes the #1 gap.
- **Build a small RAG / vector-search feature** (e.g. add embeddings + pgvector or a vector DB to cryptax's assistant, or a resume↔JD semantic-match demo). Directly mirrors SWARA's matching engine and vector-DB requirement.
- **Add a scraper + parser project**: ingest job postings from a board, parse them into a schema — the exact SWARA data-pipeline shape, and it name-drops "web scraper / large-scale ingestion".
- **Try OpenAI + LangChain once** so the nice-to-have stack is real, not just "an LLM SDK".
