# Deploy — Lago's Ice Cream

Next.js 14 (App Router) on **Vercel**. Auto-deploys on push to `main`.

- **Production:** https://lagos-ice-cream.vercel.app
- **Owner dashboard:** https://lagos-ice-cream.vercel.app/admin

## Owner dashboard (`/admin`)

Protected by a passcode (`ADMIN_PASSCODE`, default `LAGO2025`). Logging in sets
an httpOnly session cookie; all admin APIs verify it server-side.

The dashboard has five tabs:
- **Catering** — event requests · statuses: New / Contacted / Booked / Completed
- **Applications** — job applicants · statuses: New / Interviewing / Hired / Rejected
- **Messages** — contact form · statuses: New / Contacted / Completed
- **Flavor Alerts** — back-in-stock subscribers · statuses: Active / Notified / Unsubscribed
- **Flavor Board** — toggle today's "Scooping Today" flavors

Each submission tab supports search, status filter, per-row status change,
expandable details, and delete. **Change `ADMIN_PASSCODE` from the default
before sharing the site.**

## Supabase (stores all submissions)

1. Create a project at supabase.com.
2. **SQL Editor → New query →** paste `supabase/schema.sql` → **Run**. This
   creates `catering_requests`, `job_applications`, `contact_requests`,
   `flavor_alert_signups` (with statuses, timestamps, RLS on).
3. **Project Settings → API** → copy the Project URL, the `anon` key, and the
   `service_role` key into the env vars below.

All DB access is server-side via the service-role key (RLS stays on, no public
policies) — submission PII is never exposed to the browser.

## Environment variables

Set in **Vercel → Settings → Environment Variables** (and `.env.local` locally —
see `.env.local.example`).

| Variable | Used by | Required? | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase storage + dashboard | **For storage** | Project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side DB (inserts + dashboard) | **For storage** | Service-role key. Server-only — never shipped to the browser. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client (fallback) | Optional | Wired but not required (all DB ops are server-side). |
| `ADMIN_PASSCODE` | `/admin` login, `/api/flavor-board` | **Recommended** | Dashboard passcode. Defaults to `LAGO2025` — change it. |
| `OWNER_EMAIL` | lead + careers + contact emails | Recommended | Where notifications go. Use `lagosicecream@yahoo.com`. |
| `RESEND_API_KEY` | email notifications | Recommended | From resend.com. Without it, submissions still save + the form succeeds. |
| `LEAD_FROM_EMAIL` | email "from" | Optional | Verified Resend sender. Defaults to `onboarding@resend.dev` (testing only). |
| `ANTHROPIC_API_KEY` | `/api/chat` concierge | Optional | Without it (or with a non-working key), chat uses the offline keyword fallback. The route never errors — it always returns a helpful answer. |
| `UPSTASH_REDIS_REST_URL` | flavor board state | Optional (legacy) | No longer required — the board now persists in **Supabase**. Only used if set. |
| `UPSTASH_REDIS_REST_TOKEN` | flavor board state | Optional (legacy) | Pair with the URL. |

## Email notifications
On every catering request, job application, and contact message, an email is
sent to `OWNER_EMAIL` via Resend (job applications include the resume as an
attachment). Notifications and Supabase storage are independent — either can be
configured without the other.

## Graceful degradation (so a demo never breaks)
- No Supabase vars → forms still submit + email; dashboard shows a "not
  connected" notice instead of data.
- No `RESEND_API_KEY` / `OWNER_EMAIL` → submissions still save to Supabase; form confirms success.
- No `ANTHROPIC_API_KEY` → chat uses the offline keyword fallback.
- Flavor board persists in Supabase (run `supabase/schema.sql` so the
  `flavor_board` table exists). With no storage at all it falls back to
  in-memory state (works per-instance; not shared).

## Deployment protection
Keep **production public**: Vercel → Settings → Deployment Protection → disable
Vercel Authentication for Production. (Note: `/admin` is still passcode-gated.)

## Remaining setup checklist
- [ ] Run `supabase/schema.sql` in Supabase
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in Vercel
- [ ] Add `RESEND_API_KEY` + `OWNER_EMAIL` for notifications
- [ ] Change `ADMIN_PASSCODE` from the default
- [ ] (Optional) `ANTHROPIC_API_KEY`, Upstash pair
- [ ] Redeploy after adding env vars

## Local dev
```bash
npm install
cp .env.local.example .env.local   # fill in what you have
npm run dev
```
`/admin` passcode defaults to `LAGO2025` unless `ADMIN_PASSCODE` is set.
