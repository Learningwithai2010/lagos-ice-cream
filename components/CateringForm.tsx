'use client'

import { useState } from 'react'
import { PartyPopper, CheckCircle } from 'lucide-react'

export default function CateringForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    eventSize: '',
    halfGallons: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'catering', ...form }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please call us at (603) 964-9880.')
      }
    } catch {
      setError('Network error. Please call us at (603) 964-9880.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-display font-bold text-2xl text-ink mb-2">Request Received!</h3>
        <p className="text-stone-warm">
          We&apos;ll be in touch within 24 hours to discuss your event. We can&apos;t wait to bring
          Lago&apos;s to your party!
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-2xl border border-stone-border bg-cream-100 text-sm text-ink placeholder:text-stone-light focus:outline-none focus:ring-2 focus:ring-raspberry-300 focus:border-raspberry-300 transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
            Name *
          </label>
          <input type="text" name="name" value={form.name} onChange={set('name')} required
            placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
            Phone *
          </label>
          <input type="tel" name="phone" value={form.phone} onChange={set('phone')} required
            placeholder="603-555-0100" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
          Email
        </label>
        <input type="email" name="email" value={form.email} onChange={set('email')}
          placeholder="your@email.com" className={inputClass} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
            Event Date *
          </label>
          <input type="date" name="date" value={form.date} onChange={set('date')} required
            className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
            Estimated Guests *
          </label>
          <select name="eventSize" value={form.eventSize} onChange={set('eventSize')} required
            className={inputClass}>
            <option value="">Select...</option>
            <option>Under 25</option>
            <option>25–50</option>
            <option>50–100</option>
            <option>100–200</option>
            <option>200+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
          Half-Gallon Pre-Order Interest?
        </label>
        <select name="halfGallons" value={form.halfGallons} onChange={set('halfGallons')}
          className={inputClass}>
          <option value="">Not sure yet</option>
          <option>Yes, 1–5 half gallons</option>
          <option>Yes, 6–12 half gallons</option>
          <option>Yes, 12+ half gallons</option>
          <option>No</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
          Additional Notes
        </label>
        <textarea name="notes" value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Flavor requests, allergies to note, any other details..."
          rows={3} className={`${inputClass} resize-none`} />
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-3.5 text-base disabled:opacity-50"
      >
        <PartyPopper className="w-4 h-4" />
        {loading ? 'Sending...' : 'Send Catering Request'}
      </button>
      <p className="text-xs text-stone-light text-center">
        We typically respond within 24 hours.
      </p>
    </form>
  )
}
