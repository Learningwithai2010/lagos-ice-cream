import { Trophy, Star, Newspaper } from 'lucide-react'

const AWARDS = [
  { icon: Trophy, text: '13× NH\'s Best Ice Cream', sub: 'NH Magazine · 2009–2025' },
  { icon: Star, text: 'New England\'s Best Flavor', sub: 'WBZ TV4 Boston · 1987' },
  { icon: Trophy, text: 'Best Frappe in New England', sub: 'NECN · 2010 & 2011' },
  { icon: Newspaper, text: 'Wall Street Journal', sub: 'Featured · 2022' },
  { icon: Newspaper, text: 'Yankee Magazine', sub: 'Featured · 2022' },
  { icon: Star, text: 'Penn State Certified', sub: 'Ice Cream School · 1986' },
]

// Duplicate for seamless marquee
const ALL = [...AWARDS, ...AWARDS]

export default function AwardWall() {
  return (
    <section className="py-10 bg-raspberry-gradient overflow-hidden">
      <div className="relative flex">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-raspberry-700 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-raspberry-700 to-transparent z-10" />

        <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {ALL.map((award, i) => {
            const Icon = award.icon
            return (
              <div key={i} className="flex items-center gap-3 px-6">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm whitespace-nowrap">{award.text}</p>
                  <p className="text-white/60 text-xs whitespace-nowrap">{award.sub}</p>
                </div>
                <span className="text-white/30 mx-4">·</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Center featured stat */}
      <div className="text-center mt-8 px-4">
        <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">
          The Gold Standard of NH Ice Cream
        </p>
        <p className="font-display font-bold text-white text-4xl md:text-5xl">
          13× Best in New Hampshire
        </p>
        <p className="text-white/60 mt-1 text-sm">
          NH Magazine · 2009, &apos;10, &apos;13, &apos;16–&apos;25
        </p>
      </div>
    </section>
  )
}
