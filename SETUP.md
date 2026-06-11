# Lago's Ice Cream — Setup & Deployment Guide

## Prerequisites

- Node.js 18+
- Netlify CLI (`npm install -g netlify-cli`)
- An Anthropic API key (for the AI Flavor Finder)

---

## 1. Local Development

```bash
cd lagos-ice-cream
npm install
npm run dev
# → http://localhost:3000
```

The chat widget will use the local keyword fallback (no API key needed for dev).

---

## 2. Deploy to Netlify

### Connect the Repo
1. Push to GitHub: `git push origin main`
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
3. Connect your GitHub repo
4. Build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Click **Deploy**

### Install the Next.js Plugin
Netlify needs the Next.js plugin for SSR/functions to work:

```bash
netlify plugins:install @netlify/plugin-nextjs
```

Or add to `netlify.toml` (already included):
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 3. Environment Variables

In the Netlify dashboard → **Site settings → Environment variables**, add:

| Variable | Value | Required |
|----------|-------|----------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | For AI chat (fallback works without) |
| `ADMIN_PASSCODE` | `LAGO2025` (or change it) | For `/admin` flavor board |

**How to set `ANTHROPIC_API_KEY`:**
1. Get your key at [console.anthropic.com](https://console.anthropic.com)
2. Netlify dashboard → Site → **Settings** → **Environment variables**
3. Click **Add variable** → Name: `ANTHROPIC_API_KEY` → Value: paste your key
4. **Re-deploy the site** for the variable to take effect

---

## 4. Enable Netlify Forms

Netlify Forms are enabled automatically when Netlify detects `data-netlify="true"` in your HTML. To confirm they're working:

1. After deploy, go to **Netlify dashboard → Forms**
2. You should see two forms: `catering` and `flavor-alerts`
3. **Set up email notifications:** Click each form → **Form notifications** → **Add notification** → Email to `lagosicecream@yahoo.com`

To test: Submit the catering form on the live site, then check the Netlify Forms dashboard.

---

## 5. Enable Netlify Blobs (Flavor Board)

Netlify Blobs store the "Scooping Today" board state.

1. Go to **Netlify dashboard → Your site → Blobs** tab
2. Blobs are enabled by default on all Netlify sites — no action needed!
3. The `flavor-board` store is created automatically on first use

**Without Blobs:** The board shows your most popular featured flavors as a fallback. Still looks great in a demo.

---

## 6. The `/admin` Flavor Board

URL: `https://your-site.netlify.app/admin`

**Default passcode:** `LAGO2025`

**To change the passcode:**
1. Set `ADMIN_PASSCODE` environment variable in Netlify dashboard
2. Re-deploy

**How to use:**
1. Go to `/admin`
2. Enter passcode
3. Toggle flavors on/off
4. Click **Save Flavor Board**
5. Every visitor's board updates within 60 seconds

---

## 7. Verify the Chat Function

After deploy with `ANTHROPIC_API_KEY` set:

```bash
# Test the function directly
curl -X POST https://your-site.netlify.app/netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What flavors do you have for nut allergies?", "sessionCount": 0}'
```

Expected: JSON response with `{ "response": "..." }`

If you get `{ "error": "Chat service unavailable", "fallback": true }`, the API key isn't set correctly.

---

## 8. Cost Controls (Important)

The chat function has built-in cost protection:
- **Max 300 tokens per response** (Claude Haiku ~$0.001/call)
- **30 requests/hour per IP** (server-side rate limit)
- **10 messages per visitor session** (client-side limit)
- **Automatic fallback** to keyword engine if API fails or key is missing

Estimated cost at 100 chat sessions/day: **~$3–5/month** with Claude Haiku.

---

## 9. Quick Checklist Before Demo

- [ ] Site is deployed to Netlify
- [ ] `ANTHROPIC_API_KEY` is set → chat responds with AI
- [ ] Netlify Forms are enabled → catering + alert forms submit emails
- [ ] Test the chat widget with "Do you have anything nut-free?"
- [ ] Test the Scooping Today board at `/admin` → toggle a flavor → visitor page updates
- [ ] Catering form submits and appears in Netlify Forms dashboard
- [ ] All pages load: `/`, `/flavors`, `/menu`, `/our-story`, `/our-dogs`, `/visit`
- [ ] Mobile looks great at 390px width

---

## Support

- Netlify Functions docs: [docs.netlify.com/functions](https://docs.netlify.com/functions/overview/)
- Netlify Blobs docs: [docs.netlify.com/blobs](https://docs.netlify.com/blobs/overview/)
- Anthropic API docs: [docs.anthropic.com](https://docs.anthropic.com)
- Claude Haiku model: `claude-haiku-4-5-20251001`
