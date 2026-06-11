'use client'

import { useState } from 'react'
import { Bell, CheckCircle } from 'lucide-react'

export default function SMSAlerts() {
  const [form, setForm] = useState({ name: '', contact: '', flavor: 'Funky Panda' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Netlify Forms submission
    setSubmitted(true)
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
    <div className="bg-raspberry-gradient rounded-3xl p-8 md:p-10">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
          Flavor Back in Stock Alerts
        </h3>
        <p className="text-white/80 mb-6 text-sm">
          Get notified when your favorite flavor is scooping. Drop your info below.
        </p>

        <form
          name="flavor-alerts"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <input type="hidden" name="form-name" value="flavor-alerts" />

          <input
            type="text"
            name="name"
            placeholder="Your first name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
          />

          <input
            type="text"
            name="contact"
            placeholder="Phone or email"
            value={form.contact}
            onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
          />

          <select
            name="flavor"
            value={form.flavor}
            onChange={(e) => setForm((f) => ({ ...f, flavor: e.target.value }))}
            className="w-full px-4 py-3 rounded-2xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
          >
            {POPULAR_FLAVORS.map((f) => (
              <option key={f} value={f} className="text-ink bg-white">
                {f}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-white text-raspberry-600 font-semibold text-sm hover:bg-cream-100 transition-colors"
          >
            Notify Me When It&apos;s Back
          </button>
        </form>
        <p className="text-white/50 text-xs mt-3">
          We&apos;ll only reach out about your flavor. No spam, ever.
        </p>
      </div>
    </div>
  )
}
