'use client'

import { useState, useRef, FormEvent } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

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

const hours = [
  { days: 'Mon – Sun', time: '1:00 PM – 9:00 PM' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

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
        setApiMessage(data.error ?? 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setApiMessage('Network error. Please try again.')
    }
  }

  const inputClass =
    'w-full font-body text-ink placeholder:text-stone-light text-sm bg-white border border-stone-border rounded-xl px-4 py-3 outline-none transition-all duration-150 focus:border-raspberry-500 focus:ring-2 focus:ring-raspberry-100 hover:border-stone-warm'

  return (
    <section id="find-us" className="py-24 md:py-32 bg-cream-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-raspberry-500/50" aria-hidden="true" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-raspberry-500">
              Find Us
            </span>
            <div className="w-8 h-px bg-raspberry-500/50" aria-hidden="true" />
          </div>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3rem)', lineHeight: 1.1 }}
          >
            Come Find a Cone.
          </h2>
          <p className="font-body text-ink-light mt-3 text-base max-w-md mx-auto leading-relaxed">
            We&apos;re on Lafayette Road, a short walk from the beach. You&apos;ll smell the waffle cones before you see us.
          </p>
        </motion.div>

        {/* Storefront photo banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative w-full h-56 md:h-72 rounded-3xl overflow-hidden mb-12 shadow-card-hover"
        >
          <Image
            src="/images/real/menu-promo.png"
            alt="Lago's Ice Cream at 71 Lafayette Road, Rye, NH"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-8 z-10">
            <p className="font-display text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
              71 Lafayette Road
            </p>
            <p className="font-body text-white/80 text-sm mt-1 drop-shadow">Rye, New Hampshire 03870</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: location info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Phone */}
            <div>
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-stone-light mb-2">Call Us</p>
              <a
                href="tel:+16039649880"
                className="font-display text-4xl md:text-5xl font-bold text-raspberry-500 hover:text-raspberry-400 transition-colors duration-150"
              >
                (603) 964-9880
              </a>
              <p className="font-body text-sm text-stone-warm mt-1">Tap to call — we love hearing from you.</p>
            </div>

            {/* Address */}
            <div>
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-stone-light mb-2">Address</p>
              <address className="not-italic">
                <p className="font-body text-lg font-semibold text-ink">71 Lafayette Road</p>
                <p className="font-body text-lg text-ink-light">Rye, NH 03870</p>
              </address>
              <a
                href="https://maps.google.com/?q=71+Lafayette+Rd+Rye+NH+03870"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 font-body text-sm font-medium text-raspberry-500 hover:text-raspberry-400 transition-colors duration-150"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Get directions on Google Maps
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-stone-light mb-3">Summer Hours</p>
              <div className="bg-white border border-stone-border rounded-2xl overflow-hidden shadow-card">
                <div className="bg-raspberry-500 px-5 py-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="font-body text-sm font-semibold text-white">Open Today</span>
                </div>
                {hours.map(({ days, time }) => (
                  <div key={days} className="px-5 py-4 flex items-center justify-between">
                    <span className="font-body text-sm font-semibold text-ink">{days}</span>
                    <span className="font-body text-sm text-ink-light">{time}</span>
                  </div>
                ))}
                <div className="px-5 pb-4">
                  <p className="font-body text-xs text-stone-light italic">
                    Hours may vary — follow us on Instagram for real-time updates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white border border-stone-border rounded-3xl p-8 shadow-card">
              <h3 className="font-display text-2xl font-bold text-ink mb-1">Send a Message</h3>
              <p className="font-body text-sm text-ink-light mb-7">
                Questions about catering, your next party, or just saying hello — we&apos;d love to hear from you.
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-raspberry-50 border border-raspberry-200 p-6 text-center"
                  role="alert"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-raspberry-100 flex items-center justify-center mx-auto mb-3"
                    aria-hidden="true"
                  >
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
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-ink-light block mb-1.5" htmlFor="name">
                        Name <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-ink-light block mb-1.5" htmlFor="email">
                        Email <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs font-semibold text-ink-light block mb-1.5" htmlFor="message">
                      Message <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us what you're looking for..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <p
                      className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5"
                      role="alert"
                    >
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
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
