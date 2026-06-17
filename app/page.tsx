import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FlavorBoard from '@/components/FlavorBoard'
import AwardWall from '@/components/AwardWall'
import FlavorExplorer from '@/components/FlavorExplorer'
import StoryTimeline from '@/components/StoryTimeline'
import VisitSection from '@/components/VisitSection'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import Catering from '@/components/Catering'
import SMSAlerts from '@/components/SMSAlerts'
import Testimonials from '@/components/Testimonials'
import StickyMobileCTA from '@/components/StickyMobileCTA'
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
        <StoryTimeline />
        <FlavorExplorer />

        {/* Story image strip — real "made here" photo */}
        <section className="relative overflow-hidden">
          <div className="h-72 md:h-96 relative">
            <Image
              src="/images/real/flavors-photo.jpg"
              alt="Tubs of Lago's homemade ice cream in the shop's freezer"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="section-label !text-gold-light">NH Seacoast Tradition</p>
                <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  Four Generations.<br />One Recipe.
                </h2>
                <Link href="/our-story" className="text-white font-semibold hover:text-gold-light transition-colors">
                  Read our story →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <Catering />

        {/* Flavor alerts */}
        <section className="section-pad bg-cream">
          <div className="container-tight">
            <SMSAlerts />
          </div>
        </section>

        <VisitSection />
      </main>
      <Footer />
      <ChatWidget />
      <StickyMobileCTA />
    </>
  )
}
