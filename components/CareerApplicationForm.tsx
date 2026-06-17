'use client'

import { useState, useRef } from 'react'
import { CheckCircle, Upload, Send } from 'lucide-react'
import { positions } from '../lib/careers-data'

const inputClass =
  'w-full px-4 py-3 rounded-2xl border border-stone-border bg-cream-100 text-sm text-ink placeholder:text-stone-light focus:outline-none focus:ring-2 focus:ring-raspberry-300 focus:border-raspberry-300 transition-colors'
const labelClass = 'block text-xs font-semibold text-ink-light uppercase tracking-wide mb-1.5'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CareerApplicationForm({ defaultPosition = '' }: { defaultPosition?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [days, setDays] = useState<Set<string>>(new Set())
  const [resumeName, setResumeName] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const toggleDay = (d: string) =>
    setDays((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d)
      else next.add(d)
      return next
    })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const fd = new FormData(e.currentTarget)
    fd.set('daysAvailable', Array.from(days).join(', '))
    try {
      const res = await fetch('/api/careers', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please call us at (603) 964-9880.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please call us at (603) 964-9880.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="font-display font-bold text-2xl text-ink mb-2">Application received!</h3>
        <p className="text-stone-warm max-w-sm mx-auto">
          Thanks for applying to Lago&apos;s. We review every application and will reach out if it&apos;s a good fit.
          See you at the stand! 🍦
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
      {/* Honeypot (hidden from humans) */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* Personal */}
      <fieldset className="space-y-4">
        <legend className="font-display font-bold text-lg text-ink mb-1">Personal Information</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="firstName">First Name *</label>
            <input id="firstName" name="firstName" required className={inputClass} placeholder="First name" />
          </div>
          <div>
            <label className={labelClass} htmlFor="lastName">Last Name *</label>
            <input id="lastName" name="lastName" required className={inputClass} placeholder="Last name" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="you@email.com" />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">Phone *</label>
            <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="(603) 555-0100" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="address">Address</label>
            <input id="address" name="address" className={inputClass} placeholder="Town, NH" />
          </div>
          <div>
            <label className={labelClass} htmlFor="age">Age (must be 14+)</label>
            <input id="age" name="age" className={inputClass} placeholder="e.g. 16" />
          </div>
        </div>
      </fieldset>

      {/* Availability */}
      <fieldset className="space-y-4">
        <legend className="font-display font-bold text-lg text-ink mb-1">Availability</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="startDate">Earliest Start Date</label>
            <input id="startDate" name="startDate" type="date" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="employmentType">Looking For</label>
            <select id="employmentType" name="employmentType" className={inputClass} defaultValue="">
              <option value="">Select…</option>
              <option>Seasonal</option>
              <option>Part-Time</option>
              <option>Full-Time</option>
            </select>
          </div>
        </div>
        <div>
          <span className={labelClass}>Days Available</span>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => toggleDay(d)}
                aria-pressed={days.has(d)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                  days.has(d)
                    ? 'bg-raspberry-500 text-white border-raspberry-500'
                    : 'bg-white text-stone-warm border-stone-border hover:border-raspberry-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="hoursAvailable">Hours Available</label>
          <input id="hoursAvailable" name="hoursAvailable" className={inputClass} placeholder="e.g. afternoons & weekends, 20 hrs/week" />
        </div>
      </fieldset>

      {/* Employment */}
      <fieldset className="space-y-4">
        <legend className="font-display font-bold text-lg text-ink mb-1">Employment</legend>
        <div>
          <label className={labelClass} htmlFor="position">Position Applying For *</label>
          <select id="position" name="position" required className={inputClass} defaultValue={defaultPosition}>
            <option value="">Select a position…</option>
            {positions.map((p) => (
              <option key={p.title} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="previousEmployer">Most Recent Employer</label>
          <input id="previousEmployer" name="previousEmployer" className={inputClass} placeholder="Employer (if any)" />
        </div>
        <div>
          <label className={labelClass} htmlFor="experience">Relevant Experience</label>
          <textarea id="experience" name="experience" rows={2} className={`${inputClass} resize-none`} placeholder="Tell us about any related experience." />
        </div>
        <div>
          <label className={labelClass} htmlFor="customerService">Customer Service Experience</label>
          <textarea id="customerService" name="customerService" rows={2} className={`${inputClass} resize-none`} placeholder="Any experience working with customers?" />
        </div>
      </fieldset>

      {/* Short answers */}
      <fieldset className="space-y-4">
        <legend className="font-display font-bold text-lg text-ink mb-1">A Little About You</legend>
        <div>
          <label className={labelClass} htmlFor="whyLagos">Why do you want to work at Lago&apos;s?</label>
          <textarea id="whyLagos" name="whyLagos" rows={3} className={`${inputClass} resize-none`} placeholder="We'd love to hear it." />
        </div>
        <div>
          <label className={labelClass} htmlFor="goodFit">What would make you a great fit?</label>
          <textarea id="goodFit" name="goodFit" rows={3} className={`${inputClass} resize-none`} placeholder="Your strengths, personality, anything." />
        </div>
      </fieldset>

      {/* Resume */}
      <fieldset>
        <legend className="font-display font-bold text-lg text-ink mb-3">Resume (optional)</legend>
        <label
          htmlFor="resume"
          className="flex items-center gap-3 px-4 py-4 rounded-2xl border-2 border-dashed border-stone-border bg-cream-100 cursor-pointer hover:border-raspberry-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-stone-border flex items-center justify-center flex-shrink-0">
            <Upload className="w-5 h-5 text-raspberry-500" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">
              {resumeName || 'Upload your resume'}
            </p>
            <p className="text-xs text-stone-warm">PDF, DOC, DOCX · up to 4 MB</p>
          </div>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,.rtf,.txt"
            className="sr-only"
            onChange={(e) => setResumeName(e.target.files?.[0]?.name || '')}
          />
        </label>
      </fieldset>

      {status === 'error' && (
        <p className="text-sm text-red-600 text-center" role="alert">{errorMsg}</p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60">
        <Send className="w-4 h-4" />
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>
      <p className="text-xs text-stone-light text-center">
        Lago&apos;s is an equal-opportunity employer. We review every application.
      </p>
    </form>
  )
}
