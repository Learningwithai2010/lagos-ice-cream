'use client'

import { useState, FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  message: string
}

interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * "Send a Message" form → POST /api/contact. Stores the message in Supabase
 * (contact_requests, surfaced in the /admin "Messages" tab) and emails the
 * owner via Resend. Both are best-effort; the visitor always gets a clear
 * success/error state.
 */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [apiMessage, setApiMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data: ApiResponse = await res.json()
      if (data.success) {
        setStatus('success')
        setApiMessage(data.message ?? "Thanks! We'll be in touch soon.")
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setApiMessage(data.error ?? 'Something went wrong. Please call us at (603) 964-9880.')
      }
    } catch {
      setStatus('error')
      setApiMessage('Network error. Please call us at (603) 964-9880.')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-2xl border border-stone-border bg-cream-100 text-sm text-ink placeholder:text-stone-light focus:outline-none focus:ring-2 focus:ring-raspberry-300 focus:border-raspberry-300 transition-colors'

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-raspberry-50 border border-raspberry-200 p-6 text-center" role="alert">
        <div className="w-12 h-12 rounded-full bg-raspberry-100 flex items-center justify-center mx-auto mb-3" aria-hidden="true">
          <svg className="w-6 h-6 text-raspberry-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-display text-lg font-bold text-raspberry-800 mb-1">Message Sent!</p>
        <p className="font-body text-sm text-raspberry-700">{apiMessage}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 font-body text-sm font-medium text-raspberry-500 hover:text-raspberry-400 underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-xs font-semibold text-ink-light block mb-1.5" htmlFor="contact-name">
            Name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input id="contact-name" name="name" type="text" placeholder="Your name" value={form.name}
            onChange={handleChange} required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-ink-light block mb-1.5" htmlFor="contact-email">
            Email <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input id="contact-email" name="email" type="email" placeholder="you@email.com" value={form.email}
            onChange={handleChange} required autoComplete="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="font-body text-xs font-semibold text-ink-light block mb-1.5" htmlFor="contact-message">
          Message <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea id="contact-message" name="message" placeholder="Tell us what you're looking for..." rows={5}
          value={form.message} onChange={handleChange} required className={`${inputClass} resize-none`} />
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5" role="alert">
          {apiMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-raspberry-500 hover:bg-raspberry-600 disabled:bg-raspberry-300 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 mt-1 cursor-pointer disabled:cursor-not-allowed"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
