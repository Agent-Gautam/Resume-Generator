Gautam Anand
Software Engineer
Bengaluru, India | +91 7717484812 | gautam.anand.ptu@gmail.com
github.com/Agent-Gautam | linkedin.com/in/gautam-anand-ptu

27 July 2026

Hiring Team
Teal India
Bengaluru

Dear Hiring Team,

I'm applying for the Software Engineer - Full Stack role at Teal India. I work day to day in Node.js, Express, and Next.js, and I'm relocating to Bengaluru for this role — I can be in the office from day one.

The requirement I'd point at first is hands-on LLM work with API-based integration. I built the AI assistant in Cryptax, my crypto-tax application: a streaming chat endpoint on the Vercel AI SDK with Google Gemini, running an agentic tool-calling loop over eight whitelisted, Zod-typed tools that read from PostgreSQL. The design decision I care about is that the model cannot compute anything — it may only report figures a tool returned, digit for digit, and every tool is closure-scoped to the requesting user's ID so authorization is enforced server-side rather than trusted to the prompt. Making an LLM useful and non-hallucinatory over real financial data was the actual engineering problem; the API call was the easy part.

Since Teal works in property data and geospatial, the other project worth mentioning is BloodLink, where I hand-wrote four PL/pgSQL PostGIS stored procedures — ST_Distance ranking on geography columns, with search, dynamic sort direction, and keyset pagination all pushed down into SQL — alongside row-level security across thirteen tables. On the production side, I spent a year interning on the frontend at KoinX, shipping 11 features across 7 repositories in React, TypeScript, and Next.js, and I got there by tracing a large unfamiliar codebase's existing patterns before extending them. That's the habit I'd bring to a small team that expects people to gather context quickly and work through ambiguity.

One thing I'll say plainly: my deepest database work is PostgreSQL and Prisma, not MongoDB. My real MongoDB exposure is a JavaScript/MongoDB codebase I re-architected onto TypeScript and PostgreSQL — so I know the document model and where its trade-offs bite, but I'd be ramping up rather than arriving an expert. The rest of your stack is what I already build in every day.

I'd welcome the chance to talk. Thank you for your time and consideration.

Sincerely,
Gautam Anand
