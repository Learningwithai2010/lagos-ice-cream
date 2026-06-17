'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Award, Truck, Users, Leaf, Star } from 'lucide-react'
import CateringForm from './CateringForm'

const BENEFITS = [
  { icon: Award, title: 'Award-winning ice cream', desc: "13× NH's Best — your guests get the real thing." },
  { icon: Truck, title: 'We bring the whole setup', desc: 'Scooping, toppings, and service — you just enjoy the party.' },
  { icon: Users, title: 'Any size event', desc: 'From backyard birthdays to 200+ guest weddings.' },
  { icon: Leaf, title: 'Allergy-friendly', desc: 'Dairy-free and no-sugar-added options always available.' },
]

const EVENT_TYPES = ['Weddings', 'Birthdays', 'Corporate', 'Graduations', 'Fundraisers']

export default function Catering() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="catering" ref={ref} className="relative section-pad bg-cream-200 overflow-hidden scroll-mt-20">
      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="section-label !text-gold-dark">Events & Catering</p>
          <h2 className="font-display font-bold text-ink leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}>
            Bring Lago&apos;s to your <span className="text-raspberry-500">next event.</span>
          </h2>
          <p className="text-ink-light mt-4 text-lg leading-relaxed">
            A homemade ice cream bar is the moment everyone remembers. We&apos;ve been the
            sweetest part of Seacoast weddings, parties, and celebrations for 45 years.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: value prop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Real photo */}
            <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden shadow-card mb-7">
              <Image
                src="/images/real/storefront-banner.jpeg"
                alt="A row of Lago's homemade ice cream flavors ready to serve"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="text-sm font-semibold drop-shadow">Trusted by Seacoast families since 1981</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-7">
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-border flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-raspberry-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm leading-snug">{title}</p>
                    <p className="text-stone-warm text-xs mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Event types */}
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map((t) => (
                <span key={t} className="px-3.5 py-1.5 rounded-full bg-white border border-stone-border text-xs font-semibold text-ink-light">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl border border-stone-border shadow-card-hover p-7 md:p-9"
          >
            <h3 className="font-display text-2xl font-bold text-ink mb-1">Request a Free Quote</h3>
            <p className="text-stone-warm text-sm mb-6">
              Tell us about your event and we&apos;ll reply within 24 hours. No deposit to inquire.
            </p>
            <CateringForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
