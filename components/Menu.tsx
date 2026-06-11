'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const items = [
  {
    title: 'Hand-Scooped Cones',
    description:
      'The original. Single, double, or triple — your call. Piled into a house-made waffle cone or a classic sugar cone fresh off the rack. Eight to twelve flavors rotating daily.',
    note: 'Waffle cones made fresh every morning',
    accentBg: 'bg-teal-600',
    noteColor: 'text-teal-600 bg-teal-50 border-teal-100',
    dotColor: 'bg-teal-500',
    badge: 'Signature',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-100',
    image: '/images/waffle-cone-closeup.jpg',
    imageAlt: "Fresh hand-scooped waffle cone at Lago's Ice Cream",
    featured: true,
  },
  {
    title: 'Ice Cream Cakes',
    description:
      'Custom cakes built to order — your flavors, your frosting, your occasion. Birthdays, graduations, or a Tuesday in July.',
    note: '48-hour advance order required',
    accentBg: 'bg-coral',
    noteColor: 'text-orange-600',
    dotColor: 'bg-coral',
    badge: '',
    badgeColor: '',
    image: '/images/ice-cream-cake.jpg',
    imageAlt: "Custom decorated ice cream cake from Lago's",
  },
  {
    title: 'Sundaes & Splits',
    description:
      'Built the old-fashioned way. House-made hot fudge, fresh whipped cream, and a banana split that actually earns the name.',
    note: '',
    accentBg: 'bg-slate-700',
    noteColor: '',
    dotColor: '',
    badge: '',
    badgeColor: '',
    image: '/images/sundae.jpg',
    imageAlt: 'Ice cream sundae with toppings',
  },
  {
    title: 'Dairy-Free & Sorbet',
    description:
      'At least two dairy-free options on the board every single day. Not as an afterthought — as a commitment.',
    note: 'Year-round, not seasonal',
    accentBg: 'bg-emerald-600',
    noteColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    dotColor: 'bg-emerald-500',
    badge: '',
    badgeColor: '',
    image: '/images/dairy-free.jpg',
    imageAlt: "Vibrant dairy-free sorbet at Lago's Ice Cream",
    featured: true,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [cones, cakes, sundaes, dairyFree] = items

  return (
    <section id="menu" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-600" aria-hidden="true" />
            <span className="font-body text-[11px] font-bold tracking-[0.15em] uppercase text-teal-600">
              What We Serve
            </span>
          </div>
          <h2
            className="font-display font-bold text-slate-900 leading-tight mb-4"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
          >
            More Than a Scoop.
          </h2>
          <p className="font-body text-slate-500 text-base leading-relaxed">
            Everything starts with the same commitment: real ingredients, made with care, served with
            a generous pour.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Featured cones — 2/3 width, split layout */}
          <motion.div
            variants={cardAnim}
            className="md:col-span-2 relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 group"
          >
            <div className={`h-1.5 w-full ${cones.accentBg}`} aria-hidden="true" />
            <div className="flex flex-col md:flex-row min-h-[280px] md:min-h-[320px]">
              <div className="p-8 md:p-10 flex flex-col justify-between flex-1 relative">
                <span
                  className="absolute bottom-4 right-6 font-display font-bold text-slate-100 select-none leading-none pointer-events-none"
                  style={{ fontSize: '7rem' }}
                  aria-hidden="true"
                >
                  01
                </span>
                <div>
                  <span className={`inline-block font-body text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full border mb-4 ${cones.badgeColor}`}>
                    {cones.badge}
                  </span>
                  <h3
                    className="font-display font-bold text-slate-900 leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                  >
                    {cones.title}
                  </h3>
                  <p className="font-body text-slate-500 text-base leading-relaxed max-w-xs">
                    {cones.description}
                  </p>
                </div>
                {cones.note && (
                  <div className="mt-6 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cones.dotColor}`} aria-hidden="true" />
                    <span className="font-body text-sm text-teal-600 font-medium">{cones.note}</span>
                  </div>
                )}
              </div>
              <div className="relative md:w-52 lg:w-64 h-48 md:h-auto flex-shrink-0">
                <Image
                  src={cones.image}
                  alt={cones.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              </div>
            </div>
          </motion.div>

          {/* Ice cream cakes — 1/3 width, photo top */}
          <motion.div
            variants={cardAnim}
            className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 group"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={cakes.image}
                alt={cakes.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${cakes.accentBg}`} aria-hidden="true" />
            </div>
            <div className="p-6 flex flex-col justify-between min-h-[160px]">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{cakes.title}</h3>
                <p className="font-body text-sm text-slate-500 leading-relaxed">{cakes.description}</p>
              </div>
              {cakes.note && (
                <div className="mt-4 flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cakes.dotColor}`} aria-hidden="true" />
                  <span className="font-body text-xs text-orange-600 font-medium">{cakes.note}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sundaes — 1/3 width */}
          <motion.div
            variants={cardAnim}
            className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 group"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={sundaes.image}
                alt={sundaes.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${sundaes.accentBg}`} aria-hidden="true" />
            </div>
            <div className="p-6 min-h-[160px]">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{sundaes.title}</h3>
              <p className="font-body text-sm text-slate-500 leading-relaxed">{sundaes.description}</p>
            </div>
          </motion.div>

          {/* Dairy-free — 2/3 width, split layout */}
          <motion.div
            variants={cardAnim}
            className="md:col-span-2 relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 group"
          >
            <div className={`h-1.5 w-full ${dairyFree.accentBg}`} aria-hidden="true" />
            <div className="flex flex-col md:flex-row">
              <div className="p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-5 flex-1">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{dairyFree.title}</h3>
                  <p className="font-body text-sm text-slate-500 leading-relaxed">{dairyFree.description}</p>
                </div>
                {dairyFree.note && (
                  <div className={`flex-shrink-0 inline-flex items-center gap-2 border px-4 py-2.5 rounded-full ${dairyFree.noteColor}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${dairyFree.dotColor}`} aria-hidden="true" />
                    <span className="font-body text-sm font-semibold whitespace-nowrap">{dairyFree.note}</span>
                  </div>
                )}
              </div>
              <div className="relative md:w-48 h-40 md:h-auto flex-shrink-0">
                <Image
                  src={dairyFree.image}
                  alt={dairyFree.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />
    </section>
  )
}
