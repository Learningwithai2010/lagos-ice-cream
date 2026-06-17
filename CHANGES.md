# Changes

## Task 1 — Color palette swap

### Token layer (`tailwind.config.ts`)
- `raspberry` scale → Primary Blue centred on `#2E5090` (50–900)
- `cream` → `#FFFAF5` base; `cream-200` → `#FFF0F7` (Light Pink Wash, used by alternating sections)
- `ink` → `#1B2D4D`; `ink.light` → `#3D5070`
- Added `pink` scale (`#E8B4D0` base, `.wash`/50/100/200/300)
- Added `gold` scale (`#D4A574` base, `.light`, `.dark`)
- `boxShadow.raspberry/raspberry-lg` → rgba based on new primary blue
- `backgroundImage.raspberry-gradient` → `#2E5090 → #1E3870`

### CSS (`app/globals.css`)
- `body` background `#FFFAF5`, color `#1B2D4D`
- `::selection` → `#FFF0F7` bg / `#1B2D4D` text
- `:focus-visible` outline → `#2E5090`
- `.btn-primary` / `.btn-secondary` / `.btn-outline` → added `hover:scale-[1.03] duration-150`
- `.btn-secondary` → switched from `raspberry-50` tint to `pink-50/pink-200` accent

### Hardcoded teal/slate/navy cleanup
| File | What changed |
|---|---|
| `components/About.tsx` | teal-600/300 → raspberry-500/100; coral → `#E8B4D0`; slate → ink/stone tokens |
| `components/Testimonials.tsx` | teal → raspberry; slate → ink/stone/cream tokens; overlay bg → cream-100 |
| `components/WhyUs.tsx` | dark bg gradient → navy based on `#1B2D4D`; ambient glow → rgba primary blue; teal → raspberry-300/400/500; navy overlay → ink |
| `components/Contact.tsx` | all teal → raspberry; slate → ink/stone; focus ring → raspberry; form success state → raspberry |
| `components/Menu.tsx` | teal/slate/coral/navy → raspberry/ink/gold/stone tokens; section bg → `cream-200` |
| `components/FlavorExplorer.tsx` | fallback hex `#8B2F82` → `#2E5090` |

---

## Task 2 — Framer Motion animations

### Hero ice cream assembly (`components/Hero.tsx`)
- Added inline `IceCreamSVG` component — layered SVG (cone `#D4A574`, scoop `#E8B4D0`, 8 sprinkles)
- Cone: `opacity 0 → 1, y 24 → 0`, 400ms, delay 100ms
- Scoop: spring drop (`stiffness 280, damping 18`), delay 280ms
- Sprinkles: stagger `opacity + scale 0 → 1`, from 520ms, 55ms apart
- Continuous float loop: `y [0, -10, 0]`, 6s, starts at 1.6s
- `useReducedMotion()` → skips all animation, renders static assembled SVG
- SVG shown `md:` and up (right column); no layout shift on desktop

### Scroll-in reveals
| Component | Animation |
|---|---|
| `components/FlavorBoard.tsx` | Grid wrapped in `motion.div` with `staggerChildren: 0.08`; each flavor card fades + slides up 20px, 450ms, `useInView once: true margin: -60px` |
| `components/StoryTimeline.tsx` | Added `'use client'` + `useInView`; each node fades + slides up 24px, 500ms, staggered by index × 100ms |
| `components/About.tsx` | Already had Framer Motion — teal tokens replaced, animations untouched |
| `components/Testimonials.tsx` | Already had Framer Motion — teal tokens replaced, animations untouched |
| `components/WhyUs.tsx` | Already had Framer Motion — teal tokens replaced, animations untouched |
| `components/Contact.tsx` | Already had Framer Motion — teal tokens replaced, animations untouched |
| `components/Menu.tsx` | Already had Framer Motion — teal tokens replaced, animations untouched |

### Hover micro-interactions (CSS, no JS)
- `.btn-primary`, `.btn-secondary`, `.btn-outline` → `hover:scale-[1.03]` added in `globals.css`
- Existing `.card-hover` → already had `hover:-translate-y-1` (4px lift)

---

No new files except this one. No images replaced. No API routes, chat widget, admin, or flavors data touched.
