# Review — Henceforth Solutions / Full Stack Developer (MERN Stack)
Generated: 2026-07-23 | JD: https://in.indeed.com/viewjob?jk=4854ef6af43a28a1 | Resume: resume.pdf

## Match score: 68/100
| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | 26/40 | React.js, Next.js, Node.js, REST, Redux, Git, SSR/SSG/CSR, performance all strongly evidenced. **MongoDB is the weak point** — only genuine exposure is the migrated JS/MongoDB prototype; his real DB depth is PostgreSQL, not the "M" in MERN. |
| Experience level & domain | 25 | 15/25 | JD wants 3+ yrs; candidate has ~1 yr (KoinX internship) + 3-mo full-stack stint + solo projects. Full-stack domain fit is good; years and full-time depth are short. |
| Nice-to-haves | 15 | 9/15 | JWT + role-based access ✅ (strong); payment-gateway integration ✅ (Razorpay, shipped at P&G). NestJS ❌, WebSockets/Socket.IO ❌, background jobs/queues ❌, Firebase ❌, Google Maps ❌ (uses MapLibre/Leaflet instead). |
| Education / certs | 10 | 8/10 | B.Tech CS (8.6), NIELIT full-stack, relevant certs. No education bar in JD. |
| Evidence quality | 10 | 10/10 | Every matching claim is concrete and grep-verifiable; experience bullets verbatim from vetted library; no fabricated metrics. |

## Keyword coverage
| JD keyword | On resume? | Where / why not |
|---|---|---|
| React.js | YES | KoinX bullets, all projects, skills |
| Next.js | YES | Skills, all three projects |
| Node.js | YES | CryptoTax backend bullet, skills |
| REST API development | YES | CryptoTax REST/Express bullet, skills |
| MongoDB / NoSQL | PARTIAL | Faculty Feedback "JavaScript/MongoDB prototype → PostgreSQL" migration + skills. Genuine but shallow exposure — real strength is PostgreSQL. Flagged as gap. |
| Redux / Context API | YES | KoinX transaction-surface (Redux Toolkit); skills lists both |
| Git | YES | Skills |
| SSR / SSG / CSR | YES | Next.js App Router / RSC work (CryptoTax, Faculty); skills line |
| Performance optimization | YES | KoinX final-phase bundle/memoization bullet |
| JWT + role-based access *(nice)* | YES | CryptoTax JWT bullet, Faculty JWT/OTP, Blood Link 41 RLS policies |
| Payment gateway integration *(nice)* | YES | Pixels & Grids Razorpay checkout bullet |
| NestJS *(nice)* | NO | No experience — uses Express, not NestJS. Omitted (not fabricated). |
| WebSockets / Socket.IO *(nice)* | NO | No real-time work in any source doc. Genuine gap. |
| Background jobs / queues *(nice)* | NO | No evidence. Genuine gap. |
| Google Maps / Firebase *(nice)* | NO | Map work exists but via MapLibre/Leaflet (Blood Link), not Google Maps; no Firebase. |

## Gaps (honest)
1. **MongoDB depth.** This is a MERN role; his database expertise is PostgreSQL/Prisma. Only real Mongo touch is a prototype he migrated *off* of. Expect deep MongoDB questions (schema design, aggregation pipeline, indexing) he can't yet answer from production experience.
2. **Years of experience.** 3+ required; he has ~1 yr professional (internship) + a 3-month contract + portfolio projects.
3. **No real-time features.** WebSockets/Socket.IO is called out under backend responsibilities ("real-time features") and he has none.
4. **NestJS, background jobs/queues, Firebase** — all absent.

## Likely rejection reasons (ranked)
1. **MongoDB not a core skill** for an explicitly MERN role — likely the first technical filter.
2. **Under the 3-year bar**, and KoinX is an internship (not full-time), so effective full-time experience reads as short.
3. **No real-time / WebSockets** experience against a JD that lists real-time features as a backend duty.
4. NestJS/queues absence, if they weight the nice-to-haves.

## What would raise the score
- **Ship one real MongoDB feature** in an existing project (e.g. add a Mongo-backed module to CryptoTax or a new small app) so "MongoDB" is backed by shipped work, not a migration-away. Biggest single lever for this specific JD.
- **Add a WebSocket/Socket.IO real-time feature** (live notifications, a chat, or live inventory updates in Blood Link) — covers the one backend must-have-adjacent gap.
- A **MongoDB certification** (MongoDB University M001/M100) to signal deliberate coverage of the gap.
- Nothing dishonest raises this score — the ceiling here is genuinely the MongoDB + years mismatch, not presentation.
