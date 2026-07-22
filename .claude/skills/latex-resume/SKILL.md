---
name: latex-resume
description: Author and compile one-page LaTeX resumes. Covers template macros, character escaping, the compile-to-PDF loop, and the page-fitting playbook. Use whenever writing or editing a resume .tex file or converting one to PDF.
---

# LaTeX Resume Authoring

Resumes in this workflow are always written in LaTeX and delivered as PDF.

## Templates

- Templates live in `templates/`. The default is `templates/default.tex`.
- A different template may be passed as an argument; look it up by name in `templates/` (e.g. `modern` -> `templates/modern.tex`).
- **Never edit files in `templates/`** when producing a resume. Copy the template to the output folder as `resume.tex`, then edit the copy.
- Only edit below the `CONTENT` marker of the template. The macro definitions above it are the layout engine — leave them alone unless fixing a compile error or doing deliberate page-fitting.

## Macro API (templates/default.tex)

| Macro | Purpose |
|---|---|
| `\ResumeHeader{Name}{contact line}` | Name + one contact line, centered |
| `\Entry{Bold title}{dates}{italic subtitle}{location}` | Two-line entry (jobs, education) |
| `\EntryLine{Bold title}{right side}` | One-line entry (projects, certs) |
| `\begin{Bullets} \item ... \end{Bullets}` | Bullet list under an entry |
| `\SkillRow{Category}{skill, skill, skill}` | One skills line |

## Escaping — the #1 source of compile failures

Escape these in ALL content text: `&` → `\&`, `%` → `\%`, `$` → `\$`, `#` → `\#`, `_` → `\_`. Also: `~` → `\textasciitilde{}`, `^` → `\textasciicircum{}`. Common traps: company names ("AT\&T"), percentages ("30\% tax"), money ("\$50K"), snake\_case identifiers, URLs with underscores (inside `\href{}{...}` the display text still needs escaping; the URL argument does not).

Keep content ASCII. No Unicode arrows, en/em dashes typed as characters (write `--` for en dash), no emoji, no icon fonts — they break engines and confuse ATS parsers.

## Compile loop

From the project root:

```
npm run pdf -- "companies/<company>/<role>/resume.tex"
```

- The PDF lands next to the `.tex` file. The script auto-picks an engine (bundled Tectonic first; first-ever run downloads packages and is slow — that is normal).
- **On failure:** read the `.log` file next to the `.tex`. Find the first line starting with `!` — that is the real error; everything after is noise. Fix, recompile. Never hand-edit the PDF.
- **On success:** the script prints `[compile-latex] pages: N`. It must say 1.

## One-page fitting playbook (apply in this order)

1. Cut the weakest bullet(s) — the ones least relevant to the JD.
2. Tighten wording: merge two thin bullets, remove filler words, shorten a two-line bullet to one line.
3. Reduce vertical space: `itemsep` 1.5pt → 1pt, trim `\titlespacing` values by 1–2pt.
4. Margins: 0.55in → down to 0.5in minimum. Never below.
5. Font: 10.5pt → 10pt minimum. Never below.

If content underfills the page badly, do the reverse: add a relevant bullet or slightly increase spacing — a resume that ends at 60% page height looks thin.

## Don'ts

- Don't add `\usepackage` lines unless the compile actually requires it.
- Don't use `\\` for layout spacing; use the template's macros and lengths.
- Don't put content in headers/footers or floats.
- Don't leave placeholder text ("Your Name", "Placeholder bullet") in a final PDF — grep the `.tex` for `Placeholder` and `Your Name` before the final compile.

## Done means

- [ ] Compiles with exit code 0.
- [ ] Exactly 1 page.
- [ ] No placeholder text left.
- [ ] Links (`\href`) point to real URLs from the profile.
- [ ] Special characters escaped (grep the `.tex` for unescaped `&`, `%`, `_`, `#`, `$` outside of comments and macros).
