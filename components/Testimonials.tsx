'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const reviews = [
  {
    name: 'Sarah M.',
    location: 'Portsmouth, NH',
    rating: 5,
    text: "The Sea Salt Caramel Swirl is genuinely the best ice cream I've had in New Hampshire — and I've been coming to the Seacoast every summer for 15 years. The waffle cone is still warm when they hand it to you. There's just nothing like it after a day at Rye Beach.",
    date: 'July 2024',
    initial: 'S',
  },
  {
    name: 'Tom & Diane K.',
    location: 'Newburyport, MA',
    rating: 5,
    text: "We drove up from Newburyport specifically for this. The rotating board is the best part — they actually change it based on what's fresh. Got the Brown Butter Pecan and the Wild Maine Blueberry and had a hard time deciding which was better.",
    date: 'August 2024',
    initial: 'T',
  },
  {
    name: 'Jess R.',
    location: 'Exeter, NH',
    rating: 5,
    text: "As someone who's lactose intolerant, I usually resign myself to a sad cup of sorbet. Not here. Lago's has actual coconut-based options that taste like real ice cream, and they keep them rotating. We come every Friday.",
    date: 'June 2024',
    initial: 'J',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="reviews" className="relative py-24 md:py-32 overflow-hidden">
      {/* Seacoast photo background */}
      <Image
        src="/images/seacoast-summer.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-50/94 backdrop-blur-[2px]" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" aria-hidden="true" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-teal-600">
                What Locals Say
              </span>
            </div>
            <h2
              className="font-display font-bold text-slate-900 leading-tight"
              style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3rem)', lineHeight: 1.1 }}
            >
              Straight from the
              <br />
              Seacoast.
            </h2>
          </div>

          {/* Google badge */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-card self-start md:self-auto">
            <GoogleIcon />
            <div>
              <p className="font-body text-xs text-slate-500 leading-none mb-0.5">Reviews from</p>
              <p className="font-body text-sm font-semibold text-slate-800 leading-none">Google</p>
            </div>
            <div className="ml-2 pl-3 border-l border-slate-200">
              <p className="font-display text-xl font-bold text-slate-900 leading-none">4.9</p>
              <div className="flex gap-0.5 mt-0.5" aria-label="4.9 stars" role="img">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <motion.article
              key={review.name}
              variants={cardAnim}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-card flex flex-col gap-4 hover:shadow-card-hover hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
                    aria-hidden="true"
                  >
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-slate-900 text-sm leading-tight">{review.name}</p>
                    <p className="font-body text-xs text-slate-400 mt-0.5">{review.location}</p>
                  </div>
                </div>
                <GoogleIcon />
              </div>

              <Stars count={review.rating} />

              <p className="font-body text-slate-600 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <p className="font-body text-xs text-slate-400 border-t border-slate-100 pt-3">
                <time>{review.date}</time>
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
