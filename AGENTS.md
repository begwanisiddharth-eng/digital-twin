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
- A single API route (`app/api/chat/route.ts`) that calls OpenRouter's
  chat-completions endpoint server-side, so the API key never reaches the
  browser.
- Model: `nvidia/nemotron-3-ultra-550b-a55b:free` via OpenRouter
  (`https://openrouter.ai/api/v1/chat/completions`).
- `OPENROUTER_API_KEY` read from `.env` (already present, gitignored).
- The resume's structured content lives in a single local data file (e.g.
  `lib/resume-data.ts`) that both the page components and the chat API route
  import, so the chatbot's system prompt and the displayed content never
  drift apart.
- No database, no auth, no external services beyond OpenRouter.

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
  `OPENROUTER_API_KEY` as an environment variable on the host.
