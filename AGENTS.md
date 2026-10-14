# AGENTS.md

## Goal

A professional personal resume website for Siddharth Begwani, built from
`Siddharth Begwani - CV May 2026.pdf`. Runs locally for now, deployable to the
internet later with no rework.

## Content sections (derived from the CV)

- **Hero / About Me** — name, title line ("22+ years' experience | CRM & CX
  Transformation | Large Program Governance | AI/ML Strategy"), location,
  remote availability, contact.
- **Professional Summary** — the summary paragraph from the CV.
- **Highlights of Work Done** — Business Development & Revenue Generation and
  People Leadership & Practice Development bullets.
- **Key Projects Executed** — the Key Client Engagements (BNY Mellon, Zurich
  Insurance, Reliance JIO, Luminus, Cargill, Riverside Company, IDP Education),
  each with client, role, year(s), value, and a one-line description.
- **Professional Experience** — career progression at Cognizant, Tata
  Strategic Management Group.
- **Skillsets** — Core Competencies and Technical Skills (CRM Platforms,
  AI/ML, Data & Analytics, Cloud, Delivery Methodology).
- **Education & Certifications**.
- **Digital Twin Chatbot** — a chat widget that answers questions about
  Siddharth's professional background using only the resume content. For
  anything unrelated to his professional life, or not covered in the resume,
  it must say it cannot provide that information. It must not answer general
  knowledge, personal/private, or off-topic questions.

## Technology stack

- **Next.js** (App Router, latest stable), TypeScript.
- Tailwind CSS for styling.
- A single API route (`app/api/chat/route.ts`) that calls Groq's
  chat-completions endpoint server-side, so the API key never reaches the
  browser. Transient failures (429/5xx/network errors) are retried with
  exponential backoff.
- Model: `openai/gpt-oss-120b` via Groq
  (`https://api.groq.com/openai/v1/chat/completions`).
- `GROQ_API_KEY` read from `.env` (already present, gitignored).
- The resume's structured content lives in a single local data file (e.g.
  `lib/resume-data.ts`) that both the page components and the chat API route
  import, so the chatbot's system prompt and the displayed content never
  drift apart.
- No database, no auth, no external services beyond Groq.

## Guardrails for the chatbot

- System prompt restricts answers strictly to the resume content.
- If a question is off-topic (not about Siddharth's professional life) or the
  answer isn't in the resume, respond that the information cannot be
  provided — do not guess or use outside knowledge.

## Running locally

- `npm install`
- `npm run dev`

## Deploying later

- Standard Next.js app; deployable as-is to Vercel or any Node host. Set
  `GROQ_API_KEY` as an environment variable on the host. See README.md
  "Deploying → Vercel" for the step-by-step dashboard/CLI flow, including the
  `maxDuration` consideration for the chat route's retry budget.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
