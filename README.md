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
- `app/api/chat/route.ts` calls Groq server-side (the API key never reaches
  the browser) using `openai/gpt-oss-120b`, with exponential-backoff retries
  on transient failures
- No database, auth or other external services

## Project layout

| Path | Purpose |
| --- | --- |
| `lib/resume-data.ts` | **Single source of truth** for all resume content. Edit this to update the site *and* the chatbot. |
| `lib/chat-prompt.ts` | System prompt and guardrails for the chatbot (built from `resume-data.ts`). |
| `app/page.tsx` | The resume page and its sections. |
| `app/api/chat/route.ts` | Chat endpoint that proxies to Groq. |
| `components/hero.tsx`, `sun-band.tsx` | Hero with the live "follow-the-sun" time-zone band. |
| `components/sections-main.tsx`, `sections-more.tsx` | About, Highlights, Projects, Experience, Skills, Education, footer. |
| `components/chat-widget.tsx` | The digital twin chat panel. |
| `app/globals.css` | Colour/type tokens and motion (all motion respects reduced-motion). |

## Running locally

1. Make sure `.env` in the project root contains your Groq key
   (see `.env.example`):

   ```
   GROQ_API_KEY=gsk_...
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

This is a standard Next.js app and deploys as-is.

### Vercel

1. Push the repository to GitHub (or GitLab/Bitbucket).
2. In the [Vercel dashboard](https://vercel.com/new), click **Add New → Project**
   and import the repo. Vercel auto-detects Next.js — no build settings to
   change (build command `next build`, output handled automatically).
3. Under **Environment Variables**, add:

   | Name | Value | Environments |
   | --- | --- | --- |
   | `GROQ_API_KEY` | your Groq key (`gsk_...`) | Production, Preview, Development |

4. Click **Deploy**. Every subsequent push to the default branch redeploys
   Production automatically; pushes to other branches / PRs get their own
   Preview deployment with the same env vars.

Alternatively, from the CLI:

```bash
npm i -g vercel
vercel link            # first time only, links this folder to a Vercel project
vercel env add GROQ_API_KEY production
vercel env add GROQ_API_KEY preview
vercel deploy --prod
```

Notes:

- The chat route retries failed Groq requests with backoff and can take up
  to ~75s in the worst case. Vercel's default serverless function timeout is
  shorter than that on some plans — if requests get cut off, either add
  `export const maxDuration = 60` (or your plan's max) to
  `app/api/chat/route.ts`, or raise the function's timeout in
  *Project → Settings → Functions*.
- `.env` is for local development only and is gitignored — it is never read
  by Vercel. Production secrets live solely in the dashboard/CLI env vars
  above.

### Any other Node host

```bash
npm install && npm run build && npm start
```

Set `GROQ_API_KEY` (and optionally `PORT`) in the host's environment.

## Troubleshooting

- *Styles look unstyled or stale after editing theme colours*: delete the
  `.next` folder and restart.
- *Chat says it isn't configured*: `GROQ_API_KEY` is missing; restart
  the dev server after editing `.env`.
- *Chat says it's busy*: the route retries transient 429/5xx errors with
  exponential backoff; if you still see this, Groq is rate-limiting the key —
  wait a minute and retry.
