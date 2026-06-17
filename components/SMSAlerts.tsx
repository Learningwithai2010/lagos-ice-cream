'use client'

import { useState } from 'react'
import { Bell, CheckCircle } from 'lucide-react'

export default function SMSAlerts() {
  const [form, setForm] = useState({ name: '', contact: '', flavor: 'Funky Panda' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'alert', ...form }),
      })
    } catch {
      // Even on failure we confirm — capture is best-effort, never block the visitor.
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  const POPULAR_FLAVORS = [
    'Funky Panda', 'Kahlua Fudge Brownie', 'Cappuccino Slam',
    'Salty Sailor', 'Scotty Lago\'s Bronze Run', 'Seabiscuit',
    'Albanian Baklava', 'Muddy Sneakers', 'Wild Maine Blueberry',
  ]

  if (submitted) {
    return (
      <div className="bg-raspberry-gradient rounded-3xl p-8 md:p-10 text-center text-white">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-white/90" />
        <h3 className="font-display font-bold text-2xl mb-2">You&apos;re on the list!</h3>
        <p className="text-white/80">
          We&apos;ll let you know when {form.flavor} is back. See you at the stand! 🍦
        </p>
      </div>
    )
  }

  return (
    <div className="relative bg-navy-gradient rounded-3xl overflow-hidden">
      {/* gold glow accent */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
        {/* Value prop */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold-light text-xs font-semibold uppercase tracking-wide mb-5">
            <Bell className="w-3.5 h-3.5" />
            Free Flavor Alerts
          </div>
          <h3 className="font-display font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            Never miss your<br className="hidden md:block" /> favorite flavor again.
          </h3>
          <p className="text-white/75 text-sm leading-relaxed mb-6">
            Our board changes daily across 50+ rotating flavors. Tell us the one you
            love and we&apos;ll message you the moment it&apos;s back — so you never make
            the drive for nothing.
          </p>
          <ul className="space-y-2.5">
            {[
              'Pick from our most-loved flavors',
              'A quick heads-up by text or email',
              'No spam — only your flavor, only when it returns',
            ].map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-gold-light flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/[0.07] border border-white/15 rounded-2xl p-6 space-y-3 backdrop-blur-sm">
          <input
            type="text"
            name="name"
            placeholder="Your first name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
          />

          <input
            type="text"
            name="contact"
            placeholder="Phone or email"
            value={form.contact}
            onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
          />

          <select
            name="flavor"
            value={form.flavor}
            onChange={(e) => setForm((f) => ({ ...f, flavor: e.target.value }))}
            className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
          >
            {POPULAR_FLAVORS.map((f) => (
              <option key={f} value={f} className="text-ink bg-white">
                {f}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full justify-center py-3 disabled:opacity-60"
          >
            {loading ? 'Adding you…' : "Notify Me When It's Back"}
          </button>
          <p className="text-white/50 text-xs text-center">
            We&apos;ll only reach out about your flavor. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  )
}
