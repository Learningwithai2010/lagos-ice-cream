'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const stats = [
  { stat: '25+', label: 'Years Open' },
  { stat: 'Daily', label: 'Fresh Batches' },
  { stat: 'Rye, NH', label: 'Home Base' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 md:py-36 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — photography column */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main cone photo */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4] lg:h-[560px] shadow-card-hover">
              <Image
                src="/images/about-cone.jpg"
                alt="Hand-scooped waffle cone at Lago's Ice Cream, Rye NH"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Warm vignette */}
              <div
                className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
                style={{ background: 'linear-gradient(0deg, rgba(15,32,39,0.4) 0%, transparent 100%)' }}
                aria-hidden="true"
              />
              {/* Est. badge */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="inline-block font-body text-[10px] font-bold tracking-[0.18em] uppercase text-white/90 bg-ink/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
                  Est. 1998 · Rye, NH
                </span>
              </div>
            </div>

            {/* Floating storefront image — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.55 }}
              className="absolute -bottom-8 -right-4 md:-right-8 w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-cream"
            >
              <Image
                src="/images/real/banner.png"
                alt="Lago's Ice Cream stand at sunset, Rye NH"
                fill
                className="object-cover"
                sizes="176px"
              />
            </motion.div>

            {/* Floating stat card — top right */}
            <motion.div
              initial={{ opacity: 0, x: -16, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="absolute -top-4 -right-2 md:-right-6 bg-white rounded-2xl px-5 py-4 shadow-card-hover border border-stone-border/50"
            >
              <p className="font-display text-3xl font-bold text-raspberry-500 leading-none">40+</p>
              <p className="font-body text-xs text-stone-warm mt-1">Rotating Flavors</p>
            </motion.div>
          </motion.div>

          {/* Right — story + stats */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-raspberry-500" aria-hidden="true" />
                <span className="font-body text-xs font-bold tracking-[0.15em] uppercase text-raspberry-500">
                  Our Story
                </span>
              </div>

              <blockquote className="relative">
                <span
                  className="absolute -top-4 -left-3 font-display font-bold text-raspberry-100 select-none leading-none"
                  style={{ fontSize: '5rem' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="font-display font-bold text-ink leading-[1.15] tracking-tight relative z-10"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
                >
                  We&apos;ve been scooping since before you could{' '}
                  <span className="text-raspberry-500">Google us.</span>
                </p>
              </blockquote>

              <div className="flex items-center gap-3 mt-6" aria-hidden="true">
                <div className="w-10 h-[3px] rounded-full bg-raspberry-500" />
                <div className="w-4 h-[3px] rounded-full bg-gold" />
                <div className="w-2 h-[3px] rounded-full bg-gold/40" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-body text-base md:text-lg text-ink-light leading-relaxed">
                Lago&apos;s started as a single window off Ocean Boulevard in Rye, NH — the kind of place
                where the smell of fresh waffle cones drifted all the way to Rye Beach on a warm July afternoon.
                We&apos;ve been part of that summer ritual ever since.
              </p>
              <p className="font-body text-base md:text-lg text-ink-light leading-relaxed">
                Everything is made in small batches using real ingredients — NH maple from sugarhouses just
                a few towns inland, wild berries sourced when they&apos;re actually in season. On the Seacoast,
                summer arrives fast and leaves faster. Lago&apos;s is how a lot of people mark it.
              </p>
            </div>

            {/* Stat trio */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {stats.map(({ stat, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center bg-white rounded-2xl py-4 px-2 shadow-card border border-stone-border/50 hover:shadow-card-hover transition-shadow duration-200"
                >
                  <span className="font-display text-xl font-bold text-raspberry-500">{stat}</span>
                  <span className="font-body text-[11px] text-stone-light mt-1">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
