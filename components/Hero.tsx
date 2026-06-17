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

export default function Hero() {
  const [status, setStatus] = useState(getOpenStatus())

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Real Lago's scoops photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/real/storefront-banner.jpeg"
          alt="A row of freshly scooped homemade ice cream flavors at Lago's"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Readability overlay — opaque cream on the left for the text column,
            clearing toward the right so the real scoops stay visible.
            Tuned so every word passes WCAG AA. */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(100deg, rgba(251,247,239,0.985) 0%, rgba(251,247,239,0.96) 40%, rgba(251,247,239,0.78) 58%, rgba(27,45,77,0.12) 80%, rgba(27,45,77,0.32) 100%)',
          }}
        />
        {/* Mobile: near-solid cream wash so text is always legible over the photo */}
        <div className="absolute inset-0 md:hidden bg-cream-100/94" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 md:pt-24">
        <div className="max-w-xl">
          {/* Trust row: open status + rating */}
          <motion.div variants={fade} custom={0} initial="hidden" animate="show" className="flex flex-wrap items-center gap-2.5 mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                status.isOpen
                  ? 'bg-green-50 text-green-800 border-green-200'
                  : 'bg-gold-soft text-gold-dark border-gold-light'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-green-500 animate-pulse' : 'bg-gold-dark'}`} />
              {status.label}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 border border-stone-border text-ink">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              {business.rating} · {business.reviewCount.toLocaleString()} reviews
            </span>
          </motion.div>

          {/* Award line */}
          <motion.p variants={fade} custom={1} initial="hidden" animate="show" className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark mb-4">
            13× NH&apos;s Best Ice Cream — NH Magazine
          </motion.p>

          {/* Headline (real fact) */}
          <motion.h1
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="font-display font-bold text-ink leading-[1.02] tracking-tight mb-5 text-balance"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)' }}
          >
            Handcrafted on the<br className="hidden sm:block" /> Seacoast{' '}
            <span className="text-raspberry-500">since 1981.</span>
          </motion.h1>

          <motion.p variants={fade} custom={3} initial="hidden" animate="show" className="text-lg text-ink-light leading-relaxed mb-8 max-w-md">
            Over 50 homemade flavors, scooped fresh in Rye, New Hampshire.
            Four generations. One family recipe.
          </motion.p>

          {/* CTAs — clear hierarchy: navy primary, gold revenue action */}
          <motion.div variants={fade} custom={4} initial="hidden" animate="show" className="flex flex-col sm:flex-row gap-3 mb-9">
            <Link href="/flavors" className="btn-primary text-base py-3.5 px-7">
              See Today&apos;s Flavors
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/#catering" className="btn-gold text-base py-3.5 px-7">
              <PartyPopper className="w-4 h-4" />
              Book Catering
            </Link>
          </motion.div>

          {/* Quick info */}
          <motion.div variants={fade} custom={5} initial="hidden" animate="show" className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-ink-light">
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

      {/* Soft fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-100 to-transparent z-[5]" />
    </section>
  )
}
