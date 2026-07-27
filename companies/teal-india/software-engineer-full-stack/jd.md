# Software Engineer - Full Stack — Teal India

- **URL:** https://wellfound.com/jobs/4246030-software-engineer-full-stack
  (original link: https://wellfound.com/jobs?job_listing_slug=4246030-software-engineer-full-stack)
- **Fetched:** 2026-07-27 (via Chrome — Wellfound blocks WebFetch with 403)
- **Company:** Teal India — "Re-engineering property due diligence using big data and machine learning". 51–200 employees, Growth Stage. Website tealindia.in. Markets: Real Estate, Machine Learning, Geospatial, Big Data Analytics, Real Estate Technology, Property.
- **Location:** Bangalore Urban / Bengaluru
- **Remote policy:** In office — WFH flexibility (hybrid)
- **Job type:** Full Time
- **Compensation:** Rs 9L – Rs 12L, no equity
- **Experience:** 1+ years
- **Visa sponsorship:** Not available. **Relocation:** Allowed.
- **Posted:** 1 day before fetch. Recruiter recently active.
- **Apply note:** "To be considered, please submit your application through our applicant tracking system: Apply Here" — application goes through the company's own ATS, not the Wellfound Apply button.

## About the job (verbatim)

We are a small, fast-paced team of all-rounders who engineer solutions to a diverse set of problems. We build reliable systems that perform various functions across the product surface of our company. We value people who take ownership, navigate ambiguity and care about making real progress.

As a Software Engineer - Full Stack you will:
- Learn and move fast (you'll have lots of help but we expect initiative)
- Contribute ideas to improve user experience and product's performance
- Work across the stack: backend, frontend, applied AI (our stack includes MongoDB, Node.js, Express.js, and Next.js)
- Write maintainable, flexible code with empathy for your fellow developers
- Grow into a self contained powerhouse, who can gather requirements, brainstorm solutions and implement elegant solutions

You'll be a good fit if you:
- Have a strong grasp of software engineering fundamentals
- Are generally thoughtful and care about doing things well
- Can gather context on problems quickly
- Think in terms of both user experience and code
- Are comfortable with ambiguity and can figure things out
- Love building things, websites, tools and automations
- Have hands on experience with LLMs which includes API-based integration

Bonus: Experience with JS/TS, React, and building servers.

## Skills tag block (Wellfound auto-generated metadata — keyword hints, not prose requirements)

Javascript, MongoDB, Node.js, Authentication, Automation, AI, System Design, Full Stack Development, API, Express.js, OAuth, Stripe API, Docker, React.js, AWS, Stripe Payments, Artificial Intelligence, "OAuth2, Token Authentication, JWT (JSON Web Token)", Razorpay Payment gateway, Next.js, "MERN Stack - Javascript (ES5 & ES6), MongoDB, Express.js, React, Node.js", Large Language Models (LLMs), Kubernetes (K8s)

## Extraction summary

**Must-haves (from prose):**
- Full-stack across backend + frontend + applied AI
- Node.js, Express.js, Next.js, MongoDB
- Hands-on LLM experience including API-based integration
- Software engineering fundamentals; ownership; comfort with ambiguity
- 1+ years experience

**Nice-to-haves:** JS/TS, React, building servers (explicit "Bonus"). From the tag block: authentication/JWT, API design, system design, automation, Docker/Kubernetes/AWS, Stripe/Razorpay payments, OAuth.

**Unusual / notable:** small team of "all-rounders"; domain is property due diligence with big data, ML and geospatial; application must go through the company's external ATS; no visa sponsorship (irrelevant — candidate is in India); relocation allowed.

## Fit notes (added 2026-07-27 during the cover-letter run — reuse for a future resume)

**Strong, `[shipped]`-verified matches**

- **LLM API integration** (the JD's only hard AI requirement) — Cryptax AI assistant: Vercel AI SDK v6 + Google Gemini, agentic tool-calling loop (`stopWhen: stepCountIs(4)`), 8 Zod-typed whitelisted DB-backed tools, `buildTools(userId)` closure-scoped authorization, anti-hallucination system prompt. Evidence: `assistant/services/tools.ts`, `assistant.service.ts`.
- **Geospatial** (Teal's core market — Real Estate / Geospatial / Big Data) — BloodLink: 4 hand-written PL/pgSQL PostGIS RPCs, `ST_Distance` ranking on geography columns, in-SQL dynamic sort + keyset pagination; 41 RLS policies across 13 tables.
- **Node.js / Express / Next.js / React / TypeScript** — Cryptax backend (Express 5, Node 22, TS strict) + the KoinX year + all three projects.
- **Auth / JWT** (tag block) — Cryptax: OTP registration, JWT access + rotating hashed refresh tokens, per-device session revocation.
- **Razorpay** (tag block) — Pixels and Grids: integrated Razorpay checkout on KollaBee.
- **Testing** — Cryptax has 38 real Vitest tests (BloodLink and Faculty Feedback have none).

**Gaps / honesty flags**

- **MongoDB** is the JD's named datastore; deepest real work is PostgreSQL + Prisma. The genuine touchpoint is the JS+MongoDB prototype re-architected onto TS+PostgreSQL (faculty-feedback). State it, don't paper over it.
- **Docker / Kubernetes / AWS / Stripe** — not claimable. Cryptax deploys on Railway; Faculty Feedback uses Docker Compose only for a local Postgres.
- **"Big Data Analytics"** must NOT pull in BloodLink's charts — dead code, banned in every framing. Faculty Feedback's Recharts are real but add nothing to this JD.
- KoinX's "AI-powered transaction search" is a shipped **product surface**, not LLM API integration — Cryptax carries the LLM claim.
- Cryptax exchange coverage is **Giottus only** — never "multiple exchanges".
- JD is 1+ years and the candidate clears it — **do not import the early-career hedge** used in the Matrix Marketers letter (that one answered a 3+ year ask).
- Relocation to Bengaluru is required and must be stated explicitly in any letter (per the GammaStack lesson logged in `memory/applications.md`).
