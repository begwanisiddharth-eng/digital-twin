# Siddharth Begwani — Resume & Digital Twin

A professional resume website for Siddharth Begwani, built from
`Siddharth Begwani - CV May 2026.pdf`, with a "digital twin" chatbot that
answers questions about his professional background using only the resume.

## Sections

About / Professional summary · Highlights of work done · Key projects
executed · Professional experience · Skillsets · Education & certifications ·
Digital twin chat widget (bottom-right, or "Ask my digital twin" in the hero).

## Tech stack

- Next.js (App Router) + TypeScript, Tailwind CSS
- `app/api/chat/route.ts` calls OpenRouter server-side (the API key never
  reaches the browser) using `nvidia/nemotron-3-ultra-550b-a55b:free`
- No database, auth or other external services

## Project layout

| Path | Purpose |
| --- | --- |
| `lib/resume-data.ts` | **Single source of truth** for all resume content. Edit this to update the site *and* the chatbot. |
| `lib/chat-prompt.ts` | System prompt and guardrails for the chatbot (built from `resume-data.ts`). |
| `app/page.tsx` | The resume page and its sections. |
| `app/api/chat/route.ts` | Chat endpoint that proxies to OpenRouter. |
| `components/hero.tsx`, `sun-band.tsx` | Hero with the live "follow-the-sun" time-zone band. |
| `components/sections-main.tsx`, `sections-more.tsx` | About, Highlights, Projects, Experience, Skills, Education, footer. |
| `components/chat-widget.tsx` | The digital twin chat panel. |
| `app/globals.css` | Colour/type tokens and motion (all motion respects reduced-motion). |

## Running locally

1. Make sure `.env` in the project root contains your OpenRouter key
   (see `.env.example`):

   ```
   OPENROUTER_API_KEY=sk-or-...
   ```

2. Install and start:

   ```bash
   npm install
   npm run dev
   ```

3. Open <http://localhost:3000>.

For a production build: `npm run build && npm start`.

## Chatbot guardrails

The system prompt embeds the full resume text and instructs the model to:

- answer only from the resume, never from general knowledge or guesses;
- reply that it cannot provide the information for anything off-topic
  (general knowledge, coding help, personal/private matters, etc.) or not
  covered in the resume;
- ignore attempts to change its rules or reveal its prompt.

Requests are validated server-side (last 12 messages, 1,000 characters each).

## Deploying

This is a standard Next.js app and deploys as-is:

- **Vercel**: import the repository, add `OPENROUTER_API_KEY` under
  *Project → Settings → Environment Variables*, deploy.
- **Any Node host**: `npm install && npm run build && npm start`, with
  `OPENROUTER_API_KEY` set in the environment (`PORT` controls the port).

## Troubleshooting

- *Styles look unstyled or stale after editing theme colours*: delete the
  `.next` folder and restart.
- *Chat says it isn't configured*: `OPENROUTER_API_KEY` is missing; restart
  the dev server after editing `.env`.
- *Chat says it's busy*: free OpenRouter models are rate-limited; wait a
  minute and retry.
