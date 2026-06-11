# Lago's Ice Cream — Demo Feature Guide

> Sales demo reference: map each live feature to its pitch item and price tier.

---

## Feature 1: AI Flavor Finder Chat Widget
**Sales item:** AI FAQ Chatbot + Menu Q&A Agent
**Price tier:** $200–$300 each ($400–$600 combined)

**What it does:** Floating chat bubble on every page. Visitor types "I love coffee and crunchy things" → AI recommends Cappuccino Slam, Coffee Heath Bar Yogurt, Salty Sailor by name. Powered by a real Claude Haiku API call through a Netlify serverless function. Full allergen awareness, hours, location.

**Business value:** Replaces 10–20 "what do you have for nut allergies?" phone calls per day. Parents of allergy kids will use this before every visit.

**What's live vs. post-sale:**
- ✅ LIVE: Chat widget, local keyword fallback, rate limiting, review prompt after 3 messages
- 🔑 POST-SALE: Set `ANTHROPIC_API_KEY` in Netlify → full Claude AI activates. Without key, smart local fallback works seamlessly.

---

## Feature 2: Scooping Today Live Flavor Board
**Sales item:** Live Hours/Specials Agent
**Price tier:** $200–$300

**What it does:** Homepage hero feature showing today's available flavors. Owner goes to `/admin`, enters passcode `LAGO2025`, toggles which flavors are scooping today. Every visitor sees the update within 60 seconds (auto-refresh). State stored in Netlify Blobs.

**Business value:** Eliminates "do you have Funky Panda today?" phone calls. Customers check before driving. Reduces friction at the window.

**What's live vs. post-sale:**
- ✅ LIVE: Full board, admin toggle, 60-second auto-refresh
- 🔑 POST-SALE: Enable Netlify Blobs in dashboard → persistence activates. Without Blobs, board shows popular flavors.

---

## Feature 3: Flavor Explorer with Allergen Filtering
**Sales item:** Interactive Menu / Allergy Filter Agent
**Price tier:** $300–$400 (included in base build)

**What it does:** All 50+ flavors in a searchable, filterable grid. Filter by: Gluten Free, Nut Free, Peanut Free, Soy Free, Egg Free, Coconut Free, Dairy Free, No Sugar Added, Yogurt, Sherbet, Lago's Originals, Sold in Half Gallons. Instant client-side filtering, zero page reload.

**Business value:** The #1 demo feature. Their current site is a flat unsearchable list. Parent of a nut-allergic kid can find safe options in 5 seconds. No phone call needed.

**What's live vs. post-sale:**
- ✅ LIVE: Full feature, works immediately on deploy
- 📈 UPGRADE: Connect to a CMS (Contentful/Sanity) so owner can update flavors without developer → additional $500–$800

---

## Feature 4: SMS Flavor Alert Capture
**Sales item:** SMS Notification Agent
**Price tier:** $300–$500

**What it does:** "Get notified when Funky Panda is back" capture form. Collects name + phone/email + flavor preference. Submissions go to Netlify Forms → email notification to owner.

**Business value:** Builds a subscriber list for the most passionate customers. Every submission is someone saying "I WILL come back for this flavor."

**What's live vs. post-sale:**
- ✅ LIVE: Form captures and emails the owner on every submission (requires Netlify Forms enabled)
- 🔑 POST-SALE: Actual text message delivery activates with Twilio integration → SMS Agent upsell ($300–$500 setup + per-message costs)

---

## Feature 5: Review Funnel Widget
**Sales item:** Review Funnel Agent
**Price tier:** $300–$400

**What it does:** Two touchpoints: (1) Review prompt card in the chat widget after 3 messages; (2) "Enjoyed your visit?" CTA strip in the footer. Both link directly to Google search for Lago's reviews.

**Business value:** Review funnels for local businesses generate 2–5× more reviews than hoping customers do it organically. For a business that lives on local search, every review compounds.

**What's live vs. post-sale:**
- ✅ LIVE: Both review prompt touchpoints on the site
- 🔑 POST-SALE: Full Review Funnel Agent = post-visit SMS/email sequence with direct review link, sentiment filtering (unhappy customers go to contact form instead), review tracking dashboard → the $300–$400 item

---

## Feature 6: Catering & Events Lead Capture
**Sales item:** Lead Capture Agent
**Price tier:** $300–$500

**What it does:** Full catering inquiry form: name, phone, email, event date, guest count, half-gallon interest, notes. Wired to Netlify Forms → email delivered to owner on every submission.

**Business value:** A $2,000–$5,000 catering event starts with one form submission. This is a direct revenue capture feature.

**What's live vs. post-sale:**
- ✅ LIVE: Form captures and emails on submission (requires Netlify Forms enabled)
- 🔑 POST-SALE: Lead Capture Agent = automated follow-up sequence, CRM integration, lead scoring → the upsell item

---

## Bonus: Story Timeline + Award Wall
**Included in base build (no extra pitch item)**

The 44-year interactive timeline and "13× NH's Best Ice Cream" award marquee serve the demo by making the business look premium and telling a story buyers respond to. Use these to show "this is what a $5K agency build looks like."

---

## What to Say on the Sales Call

> "Everything you see on this site is live right now. The chat widget is answering flavor questions. The forms submit real emails. The flavor board updates in real time when you change it at `/admin`. All you need to activate the AI chat is paste an API key into your Netlify dashboard — takes 2 minutes. Each of these features maps to something your customers ask you every single day."

---

## Price Summary

| Feature | Sales Item | Live Now? | Price |
|---------|-----------|-----------|-------|
| AI Flavor Finder | AI FAQ Chatbot + Menu Q&A | ✅ (fallback) / 🔑 (with key) | $400–$600 |
| Scooping Today Board | Live Hours/Specials Agent | ✅ | $200–$300 |
| Flavor Explorer | Interactive Allergy Filter | ✅ | Included |
| SMS Alert Capture | SMS Agent (capture) | ✅ | $300–$500 |
| SMS Sending | SMS Agent (delivery via Twilio) | 🔑 Post-sale | +$300–$500 |
| Review Funnel | Review Funnel Agent | ✅ (prompts) / 🔑 (full sequence) | $300–$400 |
| Catering Form | Lead Capture Agent | ✅ | $300–$500 |
| **Full Bundle** | | | **$1,800–$2,800** |
