'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react'
import Image from 'next/image'

function getOpenStatus(): { isOpen: boolean; label: string; sublabel: string } {
  const now = new Date()
  const et = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  const h = et.getHours()
  const totalMins = h * 60 + et.getMinutes()
  const isOpen = totalMins >= 780 && totalMins < 1260
  if (isOpen) {
    const minsLeft = 1260 - totalMins
    const hoursLeft = Math.floor(minsLeft / 60)
    return {
      isOpen: true,
      label: 'Open Now',
      sublabel: hoursLeft > 0 ? `Open until 9 PM` : `Closing soon`,
    }
  }
  if (totalMins < 780) {
    return { isOpen: false, label: 'Opens at 1 PM', sublabel: 'Come back soon!' }
  }
  return { isOpen: false, label: 'Closed for Today', sublabel: 'Opens tomorrow at 1 PM' }
}

export default function Hero() {
  const [status, setStatus] = useState(getOpenStatus())

  useEffect(() => {
    const interval = setInterval(() => setStatus(getOpenStatus()), 60000)
    return () => clearInterval(interval)
  }, [])

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
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100/97 via-cream-100/85 to-cream-100/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20">
        <div className="max-w-2xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-up" style={{ animationDelay: '0ms' }}>
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              status.isOpen
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
              {status.label}
            </span>
            <span className="text-xs text-stone-warm">{status.sublabel}</span>
          </div>

          {/* Award strip */}
          <div className="flex items-center gap-1.5 mb-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-medium text-stone-warm ml-1">
              13× NH&apos;s Best Ice Cream — <em>NH Magazine</em>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-ink leading-[1.05] tracking-tight mb-6 text-balance animate-fade-up"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)', animationDelay: '140ms' }}
          >
            Handcrafted
            <br />
            <em className="text-raspberry-500 not-italic">Since 1981.</em>
          </h1>

          <p className="text-lg md:text-xl text-ink-light leading-relaxed mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '200ms' }}>
            Over 50 homemade flavors on the NH Seacoast. Come for the scoop,
            stay for the summer.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-up" style={{ animationDelay: '260ms' }}>
            <a href="#scooping-today" className="btn-primary text-base py-3.5 px-7">
              Today&apos;s Flavors
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/flavors" className="btn-outline text-base py-3.5 px-7">
              All 50+ Flavors
            </Link>
          </div>

          {/* Quick info */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-stone-warm animate-fade-up" style={{ animationDelay: '320ms' }}>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-raspberry-400 flex-shrink-0" />
              Open Daily · 1–9 PM (Seasonal)
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-raspberry-400 flex-shrink-0" />
              71 Lafayette Road, Rye, NH
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  )
}
