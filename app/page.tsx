import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FlavorBoard from '@/components/FlavorBoard'
import AwardWall from '@/components/AwardWall'
import FlavorExplorer from '@/components/FlavorExplorer'
import StoryTimeline from '@/components/StoryTimeline'
import VisitSection from '@/components/VisitSection'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import CateringForm from '@/components/CateringForm'
import SMSAlerts from '@/components/SMSAlerts'
import Testimonials from '@/components/Testimonials'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FlavorBoard />
        <AwardWall />

        {/* Features section */}
        <section className="section-pad bg-cream">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-8">
              <SMSAlerts />

              <div className="card-base p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-ink mb-3">
                    Bringing Lago&apos;s to Your Party?
                  </h3>
                  <p className="text-stone-warm leading-relaxed mb-6">
                    We do catering for birthdays, weddings, and corporate events. Order half gallons
                    in advance and we&apos;ll have them ready when you arrive.
                  </p>
                </div>
                <Link href="#catering" className="btn-primary self-start">
                  Request Catering
                </Link>
              </div>
            </div>
          </div>
        </section>

        <StoryTimeline />
        <FlavorExplorer />

        {/* Story image strip */}
        <section className="relative overflow-hidden">
          <div className="h-72 md:h-96 relative">
            <Image
              src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1600&q=80&auto=format"
              alt="New England summer coastline"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/75 to-ink/25 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="section-label text-white/60">NH Seacoast Tradition</p>
                <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  Four Generations.<br />One Recipe.
                </h2>
                <Link href="/our-story" className="text-white font-semibold hover:text-cream-200 transition-colors">
                  Read our story →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Catering form */}
        <section id="catering" className="section-pad bg-white">
          <div className="container-tight max-w-2xl">
            <div className="text-center mb-10">
              <p className="section-label">Events & Catering</p>
              <h2 className="font-display text-display-md font-bold text-ink mb-3">
                Bring Lago&apos;s to Your Event
              </h2>
              <p className="text-stone-warm">
                Birthdays, weddings, corporate events — we&apos;ve got you covered.
              </p>
            </div>
            <CateringForm />
          </div>
        </section>

        <VisitSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
