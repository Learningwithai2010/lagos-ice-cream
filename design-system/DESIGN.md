# Lago's Ice Cream — Design System
## Source: ui-ux-pro-max + manual lock for coastal NH ice cream brand

---

## Color Tokens (4-color palette, locked)
| Token | Hex | Role |
|---|---|---|
| `--brand-teal` | `#0D9488` | Primary brand, CTA buttons, active nav underline, icons |
| `--brand-navy` | `#0F2027` | Hero dark overlay, footer, dark section bg |
| `--brand-cream` | `#FDF6EC` | Page background, light sections |
| `--brand-coral` | `#F97316` | Accent ONLY — one word in hero headline, tag badges |
| `--brand-slate` | `#1E293B` | Chalkboard section background |
| `--brand-chalk-card` | `#263548` | Chalkboard flavor card background |
| `--text-primary` | `#0F172A` | Headings on cream |
| `--text-body` | `#475569` | Body copy |
| `--text-muted` | `#94A3B8` | Captions, metadata |
| `--text-on-dark` | `#F8FAFC` | All text on navy/chalkboard |

## NO: purple, pink, magenta, synthwave gradients, iridescent effects.
## Hero gradient: teal #0D9488 → navy #0F2027 ONLY (or real photo + dark overlay).

---

## Typography
| Level | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| Display XL | Playfair Display | 80px | 700 | 1.05 | -0.02em |
| Display LG | Playfair Display | 56–72px | 700 | 1.1 | -0.02em |
| Display MD | Playfair Display | 40px | 700 | 1.15 | -0.01em |
| Heading LG | Playfair Display | 32px | 600 | 1.2 | -0.01em |
| Heading MD | Playfair Display | 24px | 600 | 1.25 | 0 |
| Body LG | DM Sans | 18px | 400 | 1.65 | 0 |
| Body MD | DM Sans | 16px | 400 | 1.6 | 0 |
| Body SM | DM Sans | 14px | 400 | 1.55 | 0 |
| Label MD | DM Sans | 13px | 600 | 1 | 0.08em (uppercase) |
| Label SM | DM Sans | 11px | 700 | 1 | 0.10em (uppercase) |

---

## Spacing Scale (8pt grid)
- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px
- 2xl: 48px | 3xl: 64px | 4xl: 80px | 5xl: 120px
- Section vertical padding: min 80px (py-20 md:py-32)

---

## Signature Element
**The FlavorBoard** is the visual centerpiece. Dark #1E293B chalkboard background, 8 chalk-card flavor tiles with staggered Framer Motion entrance, Playfair Display flavor names in white, colored tag badges. Must be bold, unforgettable, the moment the user says "oh, this is it."

---

## Section Map
| Section | Background | Layout | Notes |
|---|---|---|---|
| Navbar | transparent → white/90 blur | Logo left, links right, pill CTA | Teal underline on active link |
| Hero | navy overlay on real photo | Full viewport, centered text | Playfair 72px headline, ONE coral word |
| FlavorBoard | #1E293B dark slate | 4-col grid, 8 cards | SIGNATURE — bold, memorable |
| About | #FDF6EC cream | 2-col asymmetric: image left, quote right | Large pull quote in Playfair |
| Menu | #F8FAFC slate-50 | Bento grid (not uniform 3-col) | Cones card featured/large |
| WhyUs | #FDF6EC cream | 3-col horizontal + dark CTA strip | SVG icons, no emoji |
| Testimonials | #F8FAFC slate-50 | 3-col cards, stagger animation | Google badge, star ratings |
| Contact | #FDF6EC cream | 2-col: info left, form right | Tappable phone number |
| Footer | #0F2027 navy | Brand left, nav center, contact right | Display font logo |

---

## Animation Rules
- Scroll entrance: `opacity: 0→1`, `y: 32→0`, duration 0.55s, ease `[0.22, 1, 0.36, 1]`
- Stagger children: 80ms between items
- Hover transitions: 150ms on all interactive elements
- FlavorBoard cards: stagger 80ms, fade-up from y:24

---

## Component Tokens
- **Button primary**: `bg-teal-600 hover:bg-teal-500 text-white rounded-full px-8 py-4 font-semibold transition-colors duration-150`
- **Button ghost**: `border-2 border-white/40 hover:border-white/70 text-white rounded-full px-8 py-4 hover:bg-white/10`
- **Card**: `bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200`
- **Chalk card**: `bg-[#263548] border border-white/10 rounded-2xl hover:border-white/20`
- **Input**: `bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-150`
- **Nav link**: `text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors duration-150`
- **Section label**: `text-xs font-bold tracking-widest uppercase text-teal-600`
