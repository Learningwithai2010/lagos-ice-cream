'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, MapPin, Phone, Star, PartyPopper } from 'lucide-react'
import { motion } from 'framer-motion'
import { business, getOpenStatus } from '../lib/business-data'

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function StatusPill({ status }: { status: ReturnType<typeof getOpenStatus> }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
        status.isOpen ? 'bg-green-50 text-green-800 border-green-200' : 'bg-gold-soft text-gold-dark border-gold-light'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-green-500 animate-pulse' : 'bg-gold-dark'}`} />
      {status.label}
    </span>
  )
}

export default function Hero() {
  const [status, setStatus] = useState(getOpenStatus())

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* ───────────────── MOBILE: stacked, readability-first ───────────────── */}
      <section className="md:hidden bg-cream-100 pt-20 pb-8 px-5">
        {/* 1 · Award badge */}
        <motion.p variants={fade} custom={0} initial="hidden" animate="show" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-soft text-gold-dark text-[11px] font-bold uppercase tracking-wide mb-4">
          <Star className="w-3 h-3 fill-gold-dark" />
          13× NH&apos;s Best Ice Cream
        </motion.p>

        {/* 2 · Headline */}
        <motion.h1
          variants={fade}
          custom={1}
          initial="hidden"
          animate="show"
          className="font-display font-bold text-ink leading-[1.05] tracking-tight mb-3"
          style={{ fontSize: 'clamp(2.25rem, 11vw, 3rem)' }}
        >
          Handcrafted on the Seacoast <span className="text-raspberry-500">since 1981.</span>
        </motion.h1>

        {/* 3 · Description */}
        <motion.p variants={fade} custom={2} initial="hidden" animate="show" className="text-[15px] text-ink-light leading-relaxed mb-5">
          Over 50 homemade flavors, scooped fresh in Rye, NH. Four generations, one family recipe.
        </motion.p>

        {/* Photo card — present but not competing with text */}
        <motion.div variants={fade} custom={3} initial="hidden" animate="show" className="relative h-44 rounded-2xl overflow-hidden shadow-card mb-5">
          <Image
            src="/images/real/storefront-banner.jpeg"
            alt="A row of freshly scooped homemade ice cream flavors at Lago's"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute top-2.5 left-2.5 flex gap-2">
            <StatusPill status={status} />
          </div>
        </motion.div>

        {/* 4 · CTAs */}
        <motion.div variants={fade} custom={4} initial="hidden" animate="show" className="flex flex-col gap-2.5 mb-6">
          <Link href="/flavors" className="btn-primary w-full justify-center py-3 text-[15px]">
            See Today&apos;s Flavors
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/#catering" className="btn-gold w-full justify-center py-3 text-[15px]">
            <PartyPopper className="w-4 h-4" />
            Book Catering
          </Link>
        </motion.div>

        {/* 5 · Contact */}
        <motion.div variants={fade} custom={5} initial="hidden" animate="show" className="space-y-2 text-sm font-medium text-ink-light">
          <span className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-gold-dark flex-shrink-0" />
            Open Daily · 1–9 PM (Seasonal)
          </span>
          <a href="tel:+16039649880" className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-gold-dark flex-shrink-0" />
            (603) 964-9880
          </a>
          <span className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-gold-dark flex-shrink-0" />
            71 Lafayette Road, Rye, NH
          </span>
        </motion.div>
      </section>

      {/* ───────────────── DESKTOP: photographic hero ───────────────── */}
      <section className="hidden md:flex relative min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real/storefront-banner.jpeg"
            alt="A row of freshly scooped homemade ice cream flavors at Lago's"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(251,247,239,0.985) 0%, rgba(251,247,239,0.96) 40%, rgba(251,247,239,0.78) 58%, rgba(27,45,77,0.12) 80%, rgba(27,45,77,0.32) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-24">
          <div className="max-w-xl">
            <motion.div variants={fade} custom={0} initial="hidden" animate="show" className="flex flex-wrap items-center gap-2.5 mb-6">
              <StatusPill status={status} />
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 border border-stone-border text-ink">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                {business.rating} · {business.reviewCount.toLocaleString()} reviews
              </span>
            </motion.div>

            <motion.p variants={fade} custom={1} initial="hidden" animate="show" className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark mb-4">
              13× NH&apos;s Best Ice Cream — NH Magazine
            </motion.p>

            <motion.h1
              variants={fade}
              custom={2}
              initial="hidden"
              animate="show"
              className="font-display font-bold text-ink leading-[1.02] tracking-tight mb-5 text-balance"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)' }}
            >
              Handcrafted on the<br /> Seacoast <span className="text-raspberry-500">since 1981.</span>
            </motion.h1>

            <motion.p variants={fade} custom={3} initial="hidden" animate="show" className="text-lg text-ink-light leading-relaxed mb-8 max-w-md">
              Over 50 homemade flavors, scooped fresh in Rye, New Hampshire.
              Four generations. One family recipe.
            </motion.p>

            <motion.div variants={fade} custom={4} initial="hidden" animate="show" className="flex flex-row gap-3 mb-9">
              <Link href="/flavors" className="btn-primary text-base py-3.5 px-7">
                See Today&apos;s Flavors
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/#catering" className="btn-gold text-base py-3.5 px-7">
                <PartyPopper className="w-4 h-4" />
                Book Catering
              </Link>
            </motion.div>

            <motion.div variants={fade} custom={5} initial="hidden" animate="show" className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-ink-light">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-dark flex-shrink-0" />
                Open Daily · 1–9 PM (Seasonal)
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-dark flex-shrink-0" />
                71 Lafayette Road, Rye, NH
              </span>
              <a href="tel:+16039649880" className="flex items-center gap-2 hover:text-raspberry-600 transition-colors">
                <Phone className="w-4 h-4 text-gold-dark flex-shrink-0" />
                (603) 964-9880
              </a>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-100 to-transparent z-[5]" />
      </section>
    </>
  )
}
