'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, MapPin, IceCream2 } from 'lucide-react'
import { business } from '../lib/business-data'

/**
 * Mobile-only sticky action bar. Appears after the user scrolls past the hero
 * so the three highest-intent actions are always one tap away.
 */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-stone-border shadow-[0_-4px_20px_rgba(27,45,77,0.12)] grid grid-cols-3">
        <a
          href={`tel:${business.phoneTel}`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-ink-light active:bg-cream-200"
        >
          <Phone className="w-5 h-5 text-raspberry-500" />
          <span className="text-[11px] font-semibold">Call</span>
        </a>
        <a
          href={business.links.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-ink-light border-x border-stone-border/70 active:bg-cream-200"
        >
          <MapPin className="w-5 h-5 text-raspberry-500" />
          <span className="text-[11px] font-semibold">Directions</span>
        </a>
        <Link
          href="/flavors"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-ink-light active:bg-cream-200"
        >
          <IceCream2 className="w-5 h-5 text-raspberry-500" />
          <span className="text-[11px] font-semibold">Flavors</span>
        </Link>
      </div>
    </div>
  )
}
