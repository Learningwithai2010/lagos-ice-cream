import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import CareerApplicationForm from '@/components/CareerApplicationForm'
import HiringDashboard from '@/components/HiringDashboard'
import { positions } from '@/lib/careers-data'
import { Clock, Heart, CalendarRange, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: "Careers | Lago's Ice Cream — Jobs in Rye, NH",
  description:
    "Join the Lago's Ice Cream team in Rye, NH. Seasonal and year-round openings — scoopers, shift leads, catering crew. Flexible scheduling, friendly team, free ice cream. Apply online.",
}

const HIGHLIGHTS = [
  { icon: CalendarRange, title: 'Seasonal & year-round', desc: 'Summer gigs and longer-term roles.' },
  { icon: Heart, title: 'Friendly team culture', desc: 'A family-run crew that has fun.' },
  { icon: Clock, title: 'Flexible scheduling', desc: 'Built around school and summer.' },
  { icon: Sparkles, title: 'No experience needed', desc: 'We train you on everything.' },
]

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-cream-100 section-pad pb-10">
          <div className="container-tight pt-6 text-center max-w-2xl mx-auto">
            <p className="section-label !text-gold-dark">Careers at Lago&apos;s</p>
            <h1 className="font-display font-bold text-ink leading-tight mb-4" style={{ fontSize: 'clamp(2.25rem, 6vw, 3.75rem)' }}>
              Join the Lago&apos;s team.
            </h1>
            <p className="text-ink-light text-lg leading-relaxed mb-8">
              Spend your season scooping the Seacoast&apos;s most-loved homemade ice cream.
              We&apos;re a family-run shop, four generations strong — and we&apos;d love to have you.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl bg-white border border-stone-border shadow-card p-4 text-left">
                  <div className="w-9 h-9 rounded-xl bg-gold-soft flex items-center justify-center mb-2.5">
                    <Icon className="w-5 h-5 text-gold-dark" />
                  </div>
                  <p className="font-semibold text-ink text-sm leading-snug">{title}</p>
                  <p className="text-xs text-stone-warm mt-1 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
            <a href="#apply" className="btn-primary mt-8">Apply Now</a>
          </div>
        </section>

        {/* Open positions */}
        <section className="section-pad bg-cream-200">
          <div className="container-tight">
            <div className="text-center mb-10">
              <p className="section-label !text-gold-dark">Open Positions</p>
              <h2 className="font-display text-display-md font-bold text-ink">Where do you fit in?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {positions.map((p) => (
                <div key={p.title} className="flex flex-col bg-white rounded-3xl border border-stone-border shadow-card p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200">
                  <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full bg-gold-soft text-gold-dark text-[11px] font-bold uppercase tracking-wide mb-3">
                    {p.type}
                  </span>
                  <h3 className="font-display font-bold text-xl text-ink mb-1.5">{p.title}</h3>
                  <p className="text-sm text-stone-warm leading-relaxed flex-1">{p.blurb}</p>
                  <a href="#apply" className="mt-4 text-sm font-semibold text-raspberry-600 hover:text-raspberry-700">
                    Apply for this role →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id="apply" className="section-pad bg-cream scroll-mt-20">
          <div className="container-tight max-w-2xl">
            <div className="text-center mb-10">
              <p className="section-label !text-gold-dark">Apply</p>
              <h2 className="font-display text-display-md font-bold text-ink mb-3">Tell us about you</h2>
              <p className="text-stone-warm">
                Takes about 5 minutes. Resume optional — we care more about your attitude.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-stone-border shadow-card-hover p-6 md:p-9">
              <CareerApplicationForm />
            </div>
          </div>
        </section>

        {/* Owner-value demo */}
        <HiringDashboard />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
