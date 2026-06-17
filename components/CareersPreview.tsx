'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { perks } from '../lib/careers-data'

export default function CareersPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-pad bg-cream">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label !text-gold-dark">We&apos;re Hiring</p>
            <h2 className="font-display font-bold text-ink leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Join the Lago&apos;s team.
            </h2>
            <p className="text-ink-light text-lg leading-relaxed mb-6">
              Spend your summer scooping the Seacoast&apos;s favorite ice cream. We hire seasonal
              and year-round, work around your schedule, and train you on everything — no
              experience needed, just a great attitude.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/careers" className="btn-primary">
                See Open Positions
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/careers#apply" className="btn-outline">
                Apply Now
              </Link>
            </div>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {perks.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white border border-stone-border shadow-card p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200">
                <span className="text-2xl">{p.emoji}</span>
                <p className="font-semibold text-ink text-sm mt-3">{p.title}</p>
                <p className="text-xs text-stone-warm mt-1 leading-snug">{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
