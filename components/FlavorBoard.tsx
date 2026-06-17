'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RefreshCw, IceCream2 } from 'lucide-react'
import allFlavors from '../data/flavors.json'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

type Flavor = typeof allFlavors[0]

const COLOR_MAP: Record<string, string> = {
  purple: 'bg-purple-50 border-purple-200',
  chocolate: 'bg-amber-50 border-amber-300',
  cream: 'bg-yellow-50 border-yellow-200',
  pink: 'bg-pink-50 border-pink-200',
  green: 'bg-emerald-50 border-emerald-200',
  brown: 'bg-stone-100 border-stone-300',
  amber: 'bg-amber-50 border-amber-200',
  yellow: 'bg-yellow-50 border-yellow-200',
  blue: 'bg-blue-50 border-blue-200',
  orange: 'bg-orange-50 border-orange-200',
  tan: 'bg-stone-50 border-stone-200',
}

const EMOJI_MAP: Record<string, string> = {
  purple: '🫐', chocolate: '🍫', cream: '🍦', pink: '🍓',
  green: '🌿', brown: '☕', amber: '🍯', yellow: '🍋',
  blue: '🫐', orange: '🍊', tan: '🥐',
}

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
            <p className="section-label">Live from the Stand</p>
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
              <div key={i} className="h-24 rounded-2xl bg-stone-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {displayFlavors.map((flavor) => (
              <motion.div
                key={flavor.id}
                variants={cardVariants}
                className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                  COLOR_MAP[flavor.colorHint] || 'bg-cream-100 border-stone-border'
                }`}
              >
                <span className="text-2xl mb-2">{EMOJI_MAP[flavor.colorHint] || '🍦'}</span>
                <span className="font-semibold text-ink text-sm leading-tight">{flavor.name}</span>
                {flavor.isOriginal && (
                  <span className="mt-1 text-[10px] font-bold tracking-wider uppercase text-raspberry-500">
                    Lago&apos;s Original
                  </span>
                )}
                {(flavor.tags as string[]).includes('dairy-free') && (
                  <span className="mt-1 text-[10px] font-semibold uppercase text-green-700">
                    Dairy Free
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-light text-center sm:text-left">
            Flavors vary seasonally. Call{' '}
            <a href="tel:6039649880" className="text-raspberry-500 font-medium">603-964-9880</a>{' '}
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
