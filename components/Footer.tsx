import Link from 'next/link'
import { IceCream2, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { business } from '../lib/business-data'

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { label: 'Flavors', href: '/flavors' },
      { label: 'Menu', href: '/menu' },
      { label: 'Our Story', href: '/our-story' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { label: 'Directions & Hours', href: '/visit' },
      { label: 'Catering & Events', href: '/#catering' },
      { label: 'Apply for a Job', href: '/careers#apply' },
    ],
  },
]

const GOOGLE_REVIEW_URL = business.links.googleReviews

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Review CTA */}
      <div className="border-b border-white/10">
        <div className="container-tight px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-xl mb-1">Enjoyed your visit?</p>
            <p className="text-white/60 text-sm">Your review helps the next family find us. 30 seconds.</p>
          </div>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-ink font-semibold text-sm hover:bg-cream-100 transition-colors whitespace-nowrap flex-shrink-0">
            ⭐ Leave a Google Review
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main */}
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-full bg-raspberry-500 flex items-center justify-center">
              <IceCream2 className="w-5 h-5 text-white" />
            </span>
            <span className="font-display font-bold text-xl">Lago&apos;s</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Handcrafted homemade ice cream on the NH Seacoast since 1981. 13× NH&apos;s Best Ice Cream.
          </p>
          <div className="space-y-2 text-sm text-white/60">
            <a href="tel:6039649880" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" /> 603-964-9880
            </a>
            <a href="mailto:lagosicecream@yahoo.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /> lagosicecream@yahoo.com
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5" /> 71 Lafayette Road, Rye, NH
            </p>
          </div>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.title}>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">{group.title}</h4>
            <ul className="space-y-2.5">
              {group.links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">Hours</h4>
          <div className="space-y-1.5 text-sm text-white/70">
            <p className="font-medium text-white">Open Daily</p>
            <p>1:00 PM – 9:00 PM</p>
            <p className="text-white/40 text-xs">Seasonal · Call to confirm</p>
          </div>
          <div className="mt-5 p-3 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40 mb-0.5">Founded</p>
            <p className="font-display font-bold text-3xl">1981</p>
            <p className="text-xs text-white/40">Lago Family · Rye, NH</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© 2026 Lago&apos;s Ice Cream. All rights reserved.</p>
          <p>13× NH&apos;s Best Ice Cream — NH Magazine 2009–2025</p>
        </div>
      </div>
    </footer>
  )
}
