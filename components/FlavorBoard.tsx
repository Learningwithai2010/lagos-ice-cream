'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  RefreshCw, IceCream2, IceCreamCone, IceCreamBowl,
  Grape, Cherry, Leaf, Coffee, Nut, Citrus, Croissant,
  type LucideIcon,
} from 'lucide-react'
import allFlavors from '../data/flavors.json'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

type Flavor = typeof allFlavors[0]

// One flavor-style map: a curated Lucide icon plus a soft tint + accent color
// per flavor hint. The accent hex values match FlavorExplorer's COLOR_MAP so
// both flavor surfaces share a single visual language.
const FLAVOR_STYLE: Record<string, { icon: LucideIcon; tint: string; color: string }> = {
  purple:    { icon: Grape,        tint: 'bg-purple-50',  color: '#7C3AED' },
  chocolate: { icon: IceCream2,    tint: 'bg-amber-50',   color: '#92400E' },
  cream:     { icon: IceCreamCone, tint: 'bg-amber-50',   color: '#B45309' },
  pink:      { icon: Cherry,       tint: 'bg-pink-50',    color: '#DB2777' },
  green:     { icon: Leaf,         tint: 'bg-emerald-50', color: '#059669' },
  brown:     { icon: Coffee,       tint: 'bg-stone-100',  color: '#78350F' },
  amber:     { icon: Nut,          tint: 'bg-amber-50',   color: '#D97706' },
  yellow:    { icon: Citrus,       tint: 'bg-yellow-50',  color: '#CA8A04' },
  blue:      { icon: IceCreamBowl, tint: 'bg-blue-50',    color: '#2563EB' },
  orange:    { icon: Citrus,       tint: 'bg-orange-50',  color: '#EA580C' },
  tan:       { icon: Croissant,    tint: 'bg-amber-50',   color: '#A16207' },
}

const DEFAULT_STYLE = { icon: IceCream2, tint: 'bg-cream-200', color: '#2E5090' }

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function FlavorBoard() {
  const [activeFlavors, setActiveFlavors] = useState<string[] | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [tick, setTick] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const fetchBoard = useCallback(async () => {
    try {
      const res = await fetch('/api/flavor-board', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setActiveFlavors(data.flavors)
        setUpdatedAt(data.updatedAt)
      }
    } catch {
      // silently fail — show featured flavors
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBoard() }, [fetchBoard, tick])

  // Poll so visitors pick up the owner's /admin changes without a manual refresh.
  // 15s keeps it live-feeling for a demo while staying well inside the Upstash free tier.
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 15000)
    return () => clearInterval(timer)
  }, [])

  const defaultFlavors: Flavor[] = [
    ...allFlavors.filter((f) => f.featured),
    ...allFlavors.filter((f) => !f.featured).slice(0, 10),
  ]

  // Guard: treat empty array same as null so the board is never blank
  const displayFlavors: Flavor[] =
    activeFlavors && activeFlavors.length > 0
      ? allFlavors.filter((f) => activeFlavors.includes(f.id))
      : defaultFlavors

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York',
      })
    } catch { return '' }
  }

  return (
    <section ref={sectionRef} id="scooping-today" className="section-pad bg-white">
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 section-label">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Live from the Stand
            </span>
            <h2 className="font-display text-display-md font-bold text-ink">Scooping Today</h2>
            <p className="text-stone-warm mt-2 text-sm">
              {activeFlavors
                ? `${activeFlavors.length} flavors available today`
                : 'Our most popular flavors'}
              {updatedAt && (
                <span className="ml-2 text-stone-light">· Updated {formatTime(updatedAt)}</span>
              )}
            </p>
          </div>
          <button
            onClick={() => setTick((t) => t + 1)}
            className="flex items-center gap-2 text-sm text-stone-warm hover:text-raspberry-600 transition-colors self-start sm:self-auto"
            aria-label="Refresh flavor board"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-stone-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {displayFlavors.map((flavor) => {
              const style = FLAVOR_STYLE[flavor.colorHint] || DEFAULT_STYLE
              const Icon = style.icon
              return (
              <motion.div
                key={flavor.id}
                variants={cardVariants}
                className="group flex flex-col items-start p-5 rounded-2xl bg-white border border-stone-border/70 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-stone-border"
              >
                <span
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${style.tint}`}
                >
                  <Icon className="h-6 w-6" style={{ color: style.color }} strokeWidth={1.75} />
                </span>
                <span className="font-semibold text-ink text-[15px] leading-tight">{flavor.name}</span>
                {(flavor.isOriginal || (flavor.tags as string[]).includes('dairy-free')) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {flavor.isOriginal && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-raspberry-50 text-raspberry-600">
                        Lago&apos;s Original
                      </span>
                    )}
                    {(flavor.tags as string[]).includes('dairy-free') && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700">
                        Dairy Free
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
              )
            })}
          </motion.div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-light text-center sm:text-left">
            Flavors vary seasonally. Call{' '}
            <a href="tel:+16039649880" className="text-raspberry-500 font-medium">603-964-9880</a>{' '}
            for today&apos;s full list.
          </p>
          <Link href="/flavors" className="btn-secondary text-sm py-2 px-5 whitespace-nowrap">
            <IceCream2 className="w-4 h-4" />
            See All 50+ Flavors
          </Link>
        </div>
      </div>
    </section>
  )
}
