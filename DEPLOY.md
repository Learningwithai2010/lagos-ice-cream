# Deploy — Lago's Ice Cream

Next.js 14 (App Router) on **Vercel**. Auto-deploys on push to `main`.

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and in
`.env.local` for local dev — see `.env.local.example`).

| Variable | Used by | Required? | Notes |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | `/api/chat` (concierge chat) | Recommended | Without it, chat uses the built-in offline keyword fallback — never looks broken. |
| `ADMIN_PASSCODE` | `/api/flavor-board` POST, `/admin` | Recommended | Owner's passcode for the "Scooping Today" board. Defaults to `LAGO2025` if unset. |
| `OWNER_EMAIL` | `/api/lead`, `/api/contact` | Recommended | Where catering / alert / contact leads are emailed. Use `lagosicecream@yahoo.com`. |
| `RESEND_API_KEY` | `/api/lead`, `/api/contact` | Recommended | From resend.com. Without it, leads are logged server-side and the form still succeeds. |
| `LEAD_FROM_EMAIL` | `/api/lead`, `/api/contact` | Optional | Verified Resend sender. Defaults to `onboarding@resend.dev` (fine for testing). |
| `UPSTASH_REDIS_REST_URL` | `/api/flavor-board` | Recommended | Durable shared state for the live board. Without it, falls back to in-memory (resets on cold start, not shared across instances). |
| `UPSTASH_REDIS_REST_TOKEN` | `/api/flavor-board` | Recommended | Pair with the URL above. |

### Quick setup notes
- **Upstash**: add via Vercel → Storage → Upstash (2-click integration). It injects
  `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` automatically.
- **Resend**: create a key at resend.com, add a verified sending domain for production
  (the `onboarding@resend.dev` default works for testing but not custom domains).

## Graceful degradation (so a demo never breaks)
- No `ANTHROPIC_API_KEY` → chat answers from the offline keyword fallback.
- No `RESEND_API_KEY` / `OWNER_EMAIL` → leads are logged and the form still confirms success.
- No Upstash vars → board uses in-memory state (works in one instance; not shared).

## Deployment protection
Ensure **production is public**: Vercel → Settings → Deployment Protection →
disable Vercel Authentication for Production. A 401 on a cold-email link kills the pitch.

## Local dev
```bash
npm install
cp .env.local.example .env.local   # fill in what you have
npm run dev
```
`/admin` passcode defaults to `LAGO2025` unless `ADMIN_PASSCODE` is set.
