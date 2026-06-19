'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { IceCream2, CalendarHeart, Search, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    icon: IceCream2,
    title: 'Know before you go',
    desc: "No more guessing what's in the case. Our live flavor board shows exactly what's scooping today, updated straight from the stand.",
    cta: { label: "See today's flavors", href: '/#scooping-today' },
  },
  {
    icon: CalendarHeart,
    title: 'Book catering in minutes',
    desc: 'Planning a wedding or party? Send us the details and we reply within 24 hours — every request lands in one place, so nothing slips through.',
    cta: { label: 'Request a quote', href: '/#catering' },
  },
  {
    icon: Search,
    title: 'Find your flavor',
    desc: 'Search all 50+ homemade flavors by name, filter for dairy-free or no-sugar-added, and check allergens before you visit.',
    cta: { label: 'Explore the menu', href: '/#flavor-explorer' },
  },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="section-label">Built around your visit</p>
          <h2 className="font-display text-display-md font-bold text-ink">Making ice cream runs easier</h2>
          <p className="text-ink-light mt-4 text-lg leading-relaxed">
            Forty-five years of scooping, now a little simpler to plan around — so you spend
            less time wondering and more time enjoying.
          </p>
        </motion.div>

        <motion.div
          variants={grid}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid gap-5 md:grid-cols-3"
        >
          {STEPS.map(({ icon: Icon, title, desc, cta }) => (
            <motion.div
              key={title}
              variants={card}
              className="group flex flex-col rounded-3xl border border-stone-border/70 bg-cream-50 p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-stone-border"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-raspberry-50 text-raspberry-500 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">{title}</h3>
              <p className="text-stone-warm text-sm leading-relaxed mb-5 flex-1">{desc}</p>
              <Link
                href={cta.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-raspberry-600 transition-colors hover:text-raspberry-500"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
