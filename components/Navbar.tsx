'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, IceCream2 } from 'lucide-react'

const NAV_LINKS = [
  { href: '/flavors', label: 'Flavors' },
  { href: '/menu', label: 'Menu' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/our-dogs', label: 'Our Dogs' },
  { href: '/visit', label: 'Visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome || open
          ? 'bg-cream-100/95 backdrop-blur-md shadow-sm border-b border-stone-border/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Lago's Ice Cream — Home">
          <span className="w-8 h-8 rounded-full bg-raspberry-500 flex items-center justify-center group-hover:bg-raspberry-600 transition-colors">
            <IceCream2 className="w-4 h-4 text-white" />
          </span>
          <span className="font-display font-bold text-lg text-ink leading-tight">
            Lago&apos;s
            <span className="block text-[10px] font-body font-medium tracking-widest uppercase text-stone-warm -mt-0.5">
              Ice Cream
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  pathname === href
                    ? 'text-raspberry-600 bg-raspberry-50'
                    : 'text-ink-light hover:text-raspberry-600 hover:bg-raspberry-50'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:6039649880" className="text-sm font-medium text-stone-warm hover:text-raspberry-600 transition-colors">
            603-964-9880
          </a>
          <Link href="/flavors" className="btn-primary py-2 px-5 text-sm">
            Today&apos;s Flavors
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-xl text-ink hover:bg-raspberry-50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream-100/98 backdrop-blur-md border-t border-stone-border/40 px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-1 mb-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === href
                      ? 'text-raspberry-600 bg-raspberry-50'
                      : 'text-ink hover:bg-raspberry-50 hover:text-raspberry-600'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="tel:6039649880" className="block text-center py-3 px-4 rounded-2xl border-2 border-stone-border text-sm font-semibold text-ink-light mb-2">
            Call 603-964-9880
          </a>
          <Link href="/flavors" className="btn-primary w-full text-sm justify-center">
            See Today&apos;s Flavors
          </Link>
        </div>
      )}
    </header>
  )
}
