import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import VisitSection from '@/components/VisitSection'
import CateringForm from '@/components/CateringForm'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: "Visit | Lago's Ice Cream — 71 Lafayette Road, Rye, NH",
  description:
    "Visit Lago's Ice Cream at 71 Lafayette Road, Rye, NH. Open daily 1–9 PM (seasonal). 603-964-9880. Get directions and book catering.",
}

export default function VisitPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="section-pad bg-cream pb-0">
          <div className="container-tight pt-10">
            <p className="section-label">Come See Us</p>
            <h1 className="font-display text-display-lg font-bold text-ink mb-4">
              Find Lago&apos;s
            </h1>
            <p className="text-ink-light max-w-xl leading-relaxed">
              We&apos;re right on Route 1 on the NH Seacoast — easy to find, impossible to forget.
            </p>
          </div>
        </div>
        <VisitSection />

        {/* Catering section */}
        <section id="catering" className="section-pad bg-white">
          <div className="container-tight max-w-2xl">
            <div className="text-center mb-10">
              <p className="section-label">Events & Catering</p>
              <h2 className="font-display text-display-md font-bold text-ink mb-3">
                Bring Lago&apos;s to Your Event
              </h2>
              <p className="text-stone-warm">
                Birthdays, weddings, corporate events — we can help you create an unforgettable
                dessert experience.
              </p>
            </div>
            <CateringForm />
          </div>
        </section>

        {/* Send a message */}
        <section id="contact" className="section-pad bg-cream-100 scroll-mt-20">
          <div className="container-tight max-w-2xl">
            <div className="text-center mb-10">
              <p className="section-label">Get in Touch</p>
              <h2 className="font-display text-display-md font-bold text-ink mb-3">
                Send Us a Message
              </h2>
              <p className="text-stone-warm">
                Questions about flavors, your next party, or just saying hello — we&apos;d love to
                hear from you. We typically reply within 24 hours.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-stone-border shadow-card-hover p-6 md:p-9">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
