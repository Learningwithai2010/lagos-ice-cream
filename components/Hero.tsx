'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

function getOpenStatus(): { isOpen: boolean; label: string; sublabel: string } {
  const now = new Date()
  const et = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  const h = et.getHours()
  const totalMins = h * 60 + et.getMinutes()
  const isOpen = totalMins >= 780 && totalMins < 1260
  if (isOpen) {
    const minsLeft = 1260 - totalMins
    const hoursLeft = Math.floor(minsLeft / 60)
    return { isOpen: true, label: 'Open Now', sublabel: hoursLeft > 0 ? 'Open until 9 PM' : 'Closing soon' }
  }
  if (totalMins < 780) return { isOpen: false, label: 'Opens at 1 PM', sublabel: 'Come back soon!' }
  return { isOpen: false, label: 'Closed for Today', sublabel: 'Opens tomorrow at 1 PM' }
}

const SPRINKLES = [
  { x: 52, y: 30, rot: -35, color: '#2E5090' },
  { x: 84, y: 22, rot: 18,  color: '#D4A574' },
  { x: 110, y: 38, rot: -55, color: '#2E5090' },
  { x: 40,  y: 52, rot: 25,  color: '#1B2D4D' },
  { x: 115, y: 60, rot: -20, color: '#D4A574' },
  { x: 65,  y: 18, rot: 45,  color: '#1B2D4D' },
  { x: 98,  y: 26, rot: -10, color: '#2E5090' },
  { x: 45,  y: 72, rot: 60,  color: '#D4A574' },
]

function IceCreamSVG({
  spin,
  reduced,
  idPrefix = 'svg',
}: {
  spin: boolean
  reduced: boolean
  idPrefix?: string
}) {
  const clipId   = `${idPrefix}-cone-clip`
  const scoopId  = `${idPrefix}-scoop-grad`
  const coneId   = `${idPrefix}-cone-grad`

  return (
    <motion.div
      className="w-full"
      animate={spin ? { rotate: 360 } : reduced ? {} : { y: [0, -10, 0] }}
      transition={
        spin
          ? { duration: 8, repeat: Infinity, ease: 'linear' }
          : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
      }
    >
      <svg
        viewBox="0 0 160 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M 22 148 L 138 148 L 80 258 Z" />
          </clipPath>
          <radialGradient id={scoopId} cx="40%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#F5C8DE" />
            <stop offset="100%" stopColor="#E8B4D0" />
          </radialGradient>
          <radialGradient id={coneId} cx="50%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#E8C09A" />
            <stop offset="100%" stopColor="#D4A574" />
          </radialGradient>
        </defs>

        {/* Cone body */}
        <path d="M 22 148 L 138 148 L 80 258 Z" fill={`url(#${coneId})`} />
        {/* Waffle cross-hatch */}
        <g clipPath={`url(#${clipId})`} stroke="#B8883A" strokeWidth="1.2" opacity="0.45">
          <line x1="-10" y1="148" x2="80"  y2="258" />
          <line x1="20"  y1="148" x2="110" y2="258" />
          <line x1="50"  y1="148" x2="138" y2="232" />
          <line x1="80"  y1="148" x2="138" y2="204" />
          <line x1="110" y1="148" x2="138" y2="178" />
          <line x1="170" y1="148" x2="80"  y2="258" />
          <line x1="140" y1="148" x2="50"  y2="258" />
          <line x1="110" y1="148" x2="22"  y2="232" />
          <line x1="80"  y1="148" x2="22"  y2="204" />
          <line x1="50"  y1="148" x2="22"  y2="178" />
        </g>
        {/* Cone rim */}
        <rect x="22" y="143" width="116" height="10" rx="5" fill="#D4A574" />
        <rect x="22" y="143" width="116" height="10" rx="5" fill={`url(#${coneId})`} opacity="0.6" />

        {/* Scoop shadow */}
        <ellipse cx="80" cy="152" rx="44" ry="7" fill="rgba(27,45,77,0.12)" />

        {/* Scoop */}
        <circle cx="80" cy="88" r="64" fill={`url(#${scoopId})`} />
        <circle cx="58" cy="66" r="18"  fill="rgba(255,255,255,0.28)" />
        <circle cx="72" cy="56" r="8"   fill="rgba(255,255,255,0.18)" />

        {/* Sprinkles */}
        {SPRINKLES.map((s, i) => (
          <rect
            key={i}
            x={s.x - 6} y={s.y - 2}
            width="12" height="4" rx="2"
            fill={s.color}
            transform={`rotate(${s.rot} ${s.x} ${s.y})`}
          />
        ))}
      </svg>
    </motion.div>
  )
}

const contentVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVars = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export default function Hero() {
  const [status, setStatus]         = useState(getOpenStatus())
  const reduced                      = useReducedMotion() ?? false
  const [mounted, setMounted]       = useState(false)
  const [introPlayed, setIntroPlayed] = useState(false)

  useEffect(() => {
    const played = sessionStorage.getItem('lago-intro-played') === '1'
    setMounted(true)
    if (played || reduced) {
      setIntroPlayed(true)
      return
    }
    const t = setTimeout(() => {
      sessionStorage.setItem('lago-intro-played', '1')
      setIntroPlayed(true)
    }, 1900)
    return () => clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    const interval = setInterval(() => setStatus(getOpenStatus()), 60000)
    return () => clearInterval(interval)
  }, [])

  // showIntro: first visit this session, client-side, full-motion
  const showIntro   = mounted && !introPlayed && !reduced
  // showContent: visible during SSR and once intro finishes
  const showContent = !mounted || introPlayed

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80&auto=format"
          alt="Scoops of homemade ice cream"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Mobile: solid warm wash so the image never bleeds through text */}
        <div className="absolute inset-0 bg-cream-100/92 md:hidden" />
        {/* Desktop: 97 % opaque for the full text column, fades only on the far right */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(255,250,245,0.98) 0%, rgba(255,250,245,0.97) 52%, rgba(255,250,245,0.70) 70%, rgba(255,250,245,0.10) 88%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100/60 via-transparent to-transparent" />
      </div>

      {/* ── Cinematic intro overlay ────────────────────────────────────
          z-40 keeps the navbar (z-50) readable throughout.
          Backdrop fades; cone springs toward hero column on exit.
      ──────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-backdrop"
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ background: 'rgba(255,250,245,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          />
        )}
        {showIntro && (
          <motion.div
            key="intro-content"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 pointer-events-none"
            initial={{ opacity: 0, scale: 0.72, y: 30 }}
            animate={{
              opacity: 1, scale: 1, y: 0,
              transition: { type: 'spring', stiffness: 210, damping: 20, delay: 0.1 },
            }}
            exit={{
              opacity: 0,
              scale: 0.82,
              transition: { duration: 0.55, ease: 'easeInOut' },
            }}
          >
            <div className="w-[min(40vh,240px)] drop-shadow-2xl">
              <IceCreamSVG spin={true} reduced={false} idPrefix="intro" />
            </div>
            <motion.p
              className="font-display text-2xl font-bold text-ink tracking-tight select-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.55 } }}
            >
              Handcrafted Since&nbsp;1981.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero content ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20 w-full">
        <div className="flex items-center justify-between gap-8">

          {/* Text column — stagger-reveals as intro exits */}
          <motion.div
            className="max-w-2xl"
            variants={contentVars}
            initial="hidden"
            animate={showContent ? 'show' : 'hidden'}
          >
            {/* Open/Closed status badge */}
            <motion.div variants={itemVars} className="inline-flex items-center gap-2 mb-6">
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                status.isOpen
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                {status.label}
              </span>
              <span className="text-xs text-stone-warm">{status.sublabel}</span>
            </motion.div>

            {/* Award strip */}
            <motion.div variants={itemVars} className="flex items-center gap-1.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm font-medium text-stone-warm ml-1">
                13× NH&apos;s Best Ice Cream — <em>NH Magazine</em>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVars}
              className="font-display font-bold text-ink leading-[1.05] tracking-tight mb-6 text-balance"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)' }}
            >
              Handcrafted
              <br />
              <em className="text-raspberry-500 not-italic">Since 1981.</em>
            </motion.h1>

            <motion.p variants={itemVars} className="text-lg md:text-xl text-ink-light leading-relaxed mb-8 max-w-xl">
              Over 50 homemade flavors on the NH Seacoast. Come for the scoop,
              stay for the summer.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#scooping-today" className="btn-primary text-base py-3.5 px-7">
                Today&apos;s Flavors
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/flavors" className="btn-outline text-base py-3.5 px-7">
                All 50+ Flavors
              </Link>
            </motion.div>

            {/* Quick info */}
            <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-4 text-sm text-stone-warm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-raspberry-400 flex-shrink-0" />
                Open Daily · 1–9 PM (Seasonal)
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-raspberry-400 flex-shrink-0" />
                71 Lafayette Road, Rye, NH
              </span>
              <a href="tel:+16039649880" className="flex items-center gap-2 hover:text-raspberry-600 transition-colors">
                <Phone className="w-4 h-4 text-raspberry-400 flex-shrink-0" />
                (603) 964-9880
              </a>
            </motion.div>
          </motion.div>

          {/* Ice cream illustration — desktop right column
              Springs in from slightly above once intro is done. */}
          <div className="hidden md:flex flex-shrink-0 items-center justify-center pr-4 lg:pr-8">
            <AnimatePresence>
              {showContent && (
                <motion.div
                  key="hero-cone"
                  className="w-[140px] md:w-[170px] lg:w-[200px]"
                  initial={mounted && !reduced ? { opacity: 0, scale: 1.3, y: -24 } : { opacity: 1, scale: 1, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <IceCreamSVG spin={false} reduced={reduced} idPrefix="hero" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  )
}
