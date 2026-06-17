'use client'

import { useRef } from 'react'
import { Trophy, Award, Newspaper, CalendarDays } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const SIGNALS = [
  {
    icon: CalendarDays,
    stat: '45 Years',
    label: 'Family-owned since 1981',
  },
  {
    icon: Award,
    stat: "NE's Best Flavor",
    label: 'Kahlua Fudge Brownie · WBZ TV4, 1987',
  },
  {
    icon: Trophy,
    stat: '2× Best Frappe',
    label: 'In all of New England · NECN',
  },
  {
    icon: Newspaper,
    stat: 'WSJ & Yankee',
    label: 'Featured in national press · 2022',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function AwardWall() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative bg-navy-gradient overflow-hidden">
      {/* subtle gold glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Headline stat */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-gold-light text-xs font-semibold uppercase tracking-[0.18em] mb-3">
            The Gold Standard of NH Ice Cream
          </p>
          <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
            Voted <span className="text-gold-light">NH&apos;s Best Ice Cream</span> 13 times.
          </h2>
          <p className="text-white/70 mt-4 text-base leading-relaxed">
            New Hampshire Magazine has named Lago&apos;s the state&apos;s best ice cream
            13 times since 2009 — more than any other shop in New Hampshire. When you
            scoop here, you&apos;re tasting four decades of award-winning craft.
          </p>
        </motion.div>

        {/* Credibility grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {SIGNALS.map(({ icon: Icon, stat, label }) => (
            <motion.div
              key={stat}
              variants={item}
              className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 md:p-6 text-center backdrop-blur-sm hover:bg-white/[0.1] transition-colors duration-200"
            >
              <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-gold-light" />
              </div>
              <p className="font-display font-bold text-white text-lg md:text-xl leading-tight">{stat}</p>
              <p className="text-white/55 text-xs mt-1.5 leading-snug">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
