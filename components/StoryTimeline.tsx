'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import timelineData from '../data/timeline.json'
import { Trophy, Star, Medal, Newspaper, IceCream2 } from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  star: Star,
  medal: Medal,
  press: Newspaper,
  scoop: IceCream2,
  award: Trophy,
}

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-cream-200 overflow-hidden">
      <div className="container-tight">
        <div className="text-center mb-12">
          <p className="section-label">Our History</p>
          <h2 className="font-display text-display-md font-bold text-ink">
            44 Years of Homemade
          </h2>
          <p className="text-stone-warm mt-3 max-w-xl mx-auto">
            From a family dream in 1981 to 13× NH&apos;s Best Ice Cream — here&apos;s how we got here.
          </p>
        </div>

        {/* Horizontal scroll on mobile, visible grid on desktop */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-raspberry-200" />

          <div ref={sectionRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-6">
            {timelineData.map((item, i) => {
              const Icon = ICON_MAP[item.icon] || Star
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 48, scale: 0.94 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex-shrink-0 w-56 md:w-auto relative ${
                    item.highlight ? 'md:col-span-1' : 'md:col-span-1'
                  }`}
                >
                  {/* Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 mx-auto mb-4 ${
                    item.highlight
                      ? 'bg-raspberry-500 border-raspberry-500 shadow-raspberry'
                      : 'bg-white border-raspberry-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${item.highlight ? 'text-white' : 'text-raspberry-400'}`} />
                  </div>

                  <div className={`text-center p-4 rounded-2xl ${
                    item.highlight ? 'bg-white shadow-card border border-raspberry-100' : ''
                  }`}>
                    <p className={`font-display font-bold text-lg mb-1 ${
                      item.highlight ? 'text-raspberry-600' : 'text-raspberry-400'
                    }`}>
                      {item.year}
                    </p>
                    <h3 className="font-semibold text-ink text-sm leading-snug mb-2">
                      {item.title}
                    </h3>
                    {item.highlight && (
                      <p className="text-xs text-stone-warm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
