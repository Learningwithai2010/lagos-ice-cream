'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Inbox, UserPlus, CalendarCheck, BadgeCheck } from 'lucide-react'

const STATS = [
  { icon: Inbox, label: 'Applications Received', value: '38', tint: 'text-raspberry-500 bg-raspberry-50' },
  { icon: UserPlus, label: 'New This Week', value: '9', tint: 'text-gold-dark bg-gold-soft' },
  { icon: CalendarCheck, label: 'Interviews Scheduled', value: '4', tint: 'text-raspberry-500 bg-raspberry-50' },
  { icon: BadgeCheck, label: 'Hired This Season', value: '6', tint: 'text-green-700 bg-green-50' },
]

const PIPELINE = [
  { name: 'Maya R.', role: 'Ice Cream Scooper', stage: 'New', stageTint: 'bg-raspberry-50 text-raspberry-600' },
  { name: 'Devon P.', role: 'Seasonal Team Member', stage: 'Reviewing', stageTint: 'bg-gold-soft text-gold-dark' },
  { name: 'Sam K.', role: 'Shift Lead', stage: 'Interview', stageTint: 'bg-blue-50 text-blue-700' },
  { name: 'Jordan L.', role: 'Catering Team', stage: 'Hired', stageTint: 'bg-green-50 text-green-700' },
]

export default function HiringDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-pad bg-cream-200">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="section-label !text-gold-dark">For the Owner</p>
          <h2 className="font-display text-display-md font-bold text-ink mb-3">
            Every application, organized in one place.
          </h2>
          <p className="text-stone-warm">
            Applications don&apos;t pile up in a paper stack or a shared inbox. The owner sees
            them on a simple dashboard — review, schedule, and hire without the chaos.
          </p>
        </div>

        {/* Mock dashboard window */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-stone-border bg-white shadow-card-hover overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-stone-border bg-cream-100">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-gold" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs font-semibold text-stone-warm">Lago&apos;s · Hiring Dashboard</span>
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-stone-light">Demo preview</span>
          </div>

          <div className="p-5 md:p-7">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
              {STATS.map(({ icon: Icon, label, value, tint }) => (
                <div key={label} className="rounded-2xl border border-stone-border p-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${tint}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-display font-bold text-2xl text-ink leading-none">{value}</p>
                  <p className="text-xs text-stone-warm mt-1 leading-snug">{label}</p>
                </div>
              ))}
            </div>

            {/* Pipeline */}
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-warm mb-2">Recent applicants</p>
            <div className="rounded-2xl border border-stone-border divide-y divide-stone-border overflow-hidden">
              {PIPELINE.map((p) => (
                <div key={p.name} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-raspberry-gradient text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {p.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink leading-tight">{p.name}</p>
                    <p className="text-xs text-stone-warm truncate">{p.role}</p>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${p.stageTint}`}>
                    {p.stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs text-stone-light mt-5">
          Illustrative preview of the owner dashboard. The same system powers catering leads and flavor alerts.
        </p>
      </div>
    </section>
  )
}
