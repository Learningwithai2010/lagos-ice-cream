'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

function IconFresh() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 7.5v5.5l3.5 1.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 13.5C6.5 9.91 9.41 7 13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconLocal() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13 3C9.134 3 6 6.134 6 10c0 5.523 7 15 7 15s7-9.477 7-15c0-3.866-3.134-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="10" r="2.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function IconEveryone() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 21c0-3.5 2.5-5.5 5.5-5.5h1.5m5 0H15c3 0 5.5 2 5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 15.5C10 14.12 11.12 13 12.5 13S15 14.12 15 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.5 18v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const differentiators = [
  {
    title: 'Always Fresh',
    body: 'Every batch is made the morning it goes on the board. No freezer stockpiles, no week-old bases. If it ran out, it ran out — we’ll have something new tomorrow.',
    icon: <IconFresh />,
  },
  {
    title: 'Local Ingredients',
    body: 'NH maple from sugarhouses just inland. Wild blueberries when they’re actually in season. Cream from New England dairies. We source local when we can, and we won’t cut corners when we can’t.',
    icon: <IconLocal />,
  },
  {
    title: 'Something for Everyone',
    body: 'We keep at least two dairy-free options on the board every single day of the year — not as an afterthought, but as a commitment. Great ice cream shouldn’t require an asterisk.',
    icon: <IconEveryone />,
  },
]

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why-us"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'linear-gradient(160deg, #0F2027 0%, #0a1a22 60%, #0d2030 100%)' }}
    >
      {/* Ambient teal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(13,148,136,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-teal-500/60" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.18em] uppercase text-teal-400">
              The Lago&apos;s Difference
            </span>
          </div>
          <h2
            className="font-display font-bold text-white leading-tight max-w-xl"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3rem)', lineHeight: 1.1 }}
          >
            Why People Keep{' '}
            <span className="text-teal-400">Coming Back.</span>
          </h2>
        </motion.div>

        {/* Cards grid + photo */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Three differentiator cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.14,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="group relative rounded-2xl border border-white/[0.07] p-7 bg-white/[0.04] hover:bg-white/[0.07] hover:border-teal-500/25 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-600/15 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:bg-teal-600/25 transition-colors duration-200">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 leading-snug">
                  {item.title}
                </h3>
                <div
                  className="w-8 h-px bg-teal-500/40 mb-4 group-hover:w-12 transition-all duration-300"
                  aria-hidden="true"
                />
                <p className="font-body text-slate-300 leading-relaxed text-sm">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Photo panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden h-64 lg:h-full min-h-[280px] border border-white/10"
          >
            <Image
              src="/images/happy-customer.jpg"
              alt="Customer enjoying ice cream at Lago's on the NH Seacoast"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy/65 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block font-body text-[10px] font-bold tracking-[0.15em] uppercase text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                Making summer memories
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 border-t border-white/[0.08] pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <p
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)' }}
          >
            Swing by today. Bring the whole crew.
          </p>
          <a
            href="#find-us"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold font-body text-sm px-7 py-3.5 rounded-full transition-colors duration-150 shadow-teal"
          >
            Find Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
