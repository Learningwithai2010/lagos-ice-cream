'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Award, Trophy, Crown } from 'lucide-react'

// Curated to the four moments that build trust fastest (story in <15s).
const MILESTONES = [
  { year: '1981', icon: Sparkles, title: 'The Beginning', line: 'The Lago family opens the stand in Rye, NH.' },
  { year: '1987', icon: Award, title: "New England's Best Flavor", line: 'Kahlua Fudge Brownie wins on WBZ TV4 Boston.' },
  { year: '2009', icon: Trophy, title: 'First NH Magazine Win', line: 'Named NH’s Best Ice Cream for the first time.' },
  { year: '2025', icon: Crown, title: '13× NH’s Best', line: 'The most decorated ice cream shop in the state.' },
]

export default function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-cream-200 overflow-hidden">
      <div className="container-tight">
        <div className="text-center mb-12">
          <p className="section-label !text-gold-dark">Our History</p>
          <h2 className="font-display text-display-md font-bold text-ink">
            45 Years of Homemade
          </h2>
          <p className="text-stone-warm mt-3 max-w-xl mx-auto">
            From a family dream in 1981 to 13× NH&apos;s Best Ice Cream.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {MILESTONES.map(({ year, icon: Icon, title, line }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white rounded-3xl border border-stone-border shadow-card p-7 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-raspberry-50 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-raspberry-500" />
              </div>
              <p className="font-display font-bold text-3xl text-gold-dark mb-1.5">{year}</p>
              <h3 className="font-semibold text-ink text-base leading-snug mb-2">{title}</h3>
              <p className="text-sm text-stone-warm leading-relaxed">{line}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/our-story" className="btn-secondary text-sm">
            Read the full story
          </a>
        </div>
      </div>
    </section>
  )
}
