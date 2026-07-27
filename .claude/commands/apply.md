---
description: Apply with a pre-built resume variant — pick it, set the city, log which resume went where
argument-hint: <company> <role> [variant] [city] [jd-url or notes]
---

Arguments: `$ARGUMENTS`. Free-form — parse company, role title, and any of: a variant slug
(`frontend-react` / `fullstack` / `generalist`), a city, a JD URL, extra notes. Only company and
role are required; ask for them if missing.

This is the **fast path**. It reuses a pre-built resume instead of writing one. Total work should be
well under a minute. If the job actually deserves a tailored resume, say so in one line and suggest
`/write-resume <jd-url>` — but do not silently upgrade; the user asked for fast.

## 1. Read the router

Read `variants/README.md` (small). Do NOT read `memory/digest.md`, `profile/`, or `projects/` —
the variants are pre-verified; re-deriving their content is exactly the cost this command exists to
avoid.

## 2. Pick the variant

If the user named one, use it. Otherwise route by the role title and — if a JD URL was given and
fetches cheaply (one WebFetch, don't fight a login wall) — the JD's first three must-have skills:

- React / Front End / Frontend / UI / Web Developer, JD leads with React-Next-Redux-CSS →
  `frontend-react`
- Full Stack / MERN / Node / Backend (JS-TS) / AI application roles, JD leads with
  APIs-databases-auth-LLM → `fullstack`
- Software Engineer / SDE / Trainee / Fresher, mixed or unclear stack, or **no JD at all** →
  `generalist`

State the choice and the reason in one short line. If the JD's must-haves fall outside all three
(Angular, Java, Python/Django, Go, DevOps, mobile), say so plainly — a variant is still sendable but
the fit is weak, and a bespoke resume would not add the missing skills either.

## 3. Header city

Read the city rule in `variants/README.md`. Then:

- **On-site or hybrid with a named city, or remote inside north India (Delhi/Gurgaon/Noida belt)** —
  the header must show that city. Create `companies/<company-kebab>/<role-kebab>/` — **if that
  folder already exists, add a `-2` suffix rather than overwriting; several of them hold the
  bespoke resumes the variants were harvested from, plus their review files** — copy the
  variant's `resume.tex` into it, change the single `\newcommand{\HeaderCity}{...}` line to the
  job's city, and compile: `npm run pdf -- "companies/<company>/<role>/resume.tex"`. Confirm the
  script prints `pages: 1`. That folder's `resume.pdf` is what gets sent.
- **No city named, or remote based outside north India** — send `variants/<slug>/resume.pdf`
  unchanged. Create no folder.

Never edit a file under `variants/` for a specific application. Those are masters.

## 4. Log it

Append one row to the table in `memory/applications.md`:

`| <date> | <Company> | <Role> | — | <variant-slug>@<date> | <folder or variants/<slug>/> | applied via <source>; <notes> |`

Columns are Date, Company, Role, Score, Variant, Folder, Status. Score is `—` for variant sends
(no review file is generated — that's the trade). The Variant cell records **what was sent**, slug
plus date, so a later edit to the variant doesn't rewrite history. If a city swap happened, note the
city in Status.

## 5. Report

Two or three lines, no more: the exact PDF path to upload, the variant and why, and the single
biggest gap for this role taken from the variant's `spec.md` "Known gaps" — so the user knows what
they may be asked about. Nothing else.
