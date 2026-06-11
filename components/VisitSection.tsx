import { Clock, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const HOURS = [
  { days: 'Monday – Sunday', hours: '1:00 PM – 9:00 PM' },
]

export default function VisitSection() {
  return (
    <section className="section-pad bg-cream-200">
      <div className="container-tight">
        <div className="text-center mb-12">
          <p className="section-label">Find Us</p>
          <h2 className="font-display text-display-md font-bold text-ink">Come Visit</h2>
          <p className="text-stone-warm mt-3">
            We&apos;re on Route 1 on the NH Seacoast — easy to find, impossible to forget.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Info */}
          <div className="space-y-6">
            {/* Hours */}
            <div className="card-base p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-raspberry-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-raspberry-500" />
                </div>
                <h3 className="font-semibold text-ink text-lg">Hours</h3>
              </div>
              <div className="space-y-2">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex justify-between items-center py-2 border-b border-stone-border/50 last:border-0">
                    <span className="text-ink-light text-sm font-medium">{h.days}</span>
                    <span className="text-ink font-semibold text-sm">{h.hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-light mt-3">
                Open seasonally. Call ahead to confirm opening for the season.
              </p>
            </div>

            {/* Contact */}
            <div className="card-base p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-raspberry-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-raspberry-500" />
                </div>
                <h3 className="font-semibold text-ink text-lg">Contact</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-ink-light leading-relaxed">
                  71 Lafayette Road (Route 1)<br />
                  Rye, NH 03870
                </p>
                <a href="tel:6039649880" className="flex items-center gap-2 text-sm font-medium text-raspberry-600 hover:text-raspberry-700 transition-colors">
                  <Phone className="w-4 h-4" />
                  603-964-9880
                </a>
                <a href="mailto:lagosicecream@yahoo.com" className="flex items-center gap-2 text-sm font-medium text-raspberry-600 hover:text-raspberry-700 transition-colors">
                  <Mail className="w-4 h-4" />
                  lagosicecream@yahoo.com
                </a>
                <a
                  href="https://www.google.com/maps/search/Lago's+Ice+Cream+Rye+NH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-raspberry-600 hover:text-raspberry-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get Directions on Google Maps
                </a>
              </div>
            </div>

            {/* Dogs teaser */}
            <div className="card-base p-6 flex items-start gap-4">
              <span className="text-4xl">🐾</span>
              <div>
                <h3 className="font-semibold text-ink mb-1">Meet Our Shop Dogs!</h3>
                <p className="text-sm text-stone-warm leading-relaxed mb-3">
                  Lago&apos;s wouldn&apos;t be Lago&apos;s without our beloved shop dogs. Customers have been
                  falling in love with them for years.
                </p>
                <Link href="/our-dogs" className="text-sm font-semibold text-raspberry-500 hover:text-raspberry-700 transition-colors">
                  Meet the dogs →
                </Link>
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div className="card-base overflow-hidden h-full min-h-[400px]">
            <iframe
              title="Lago's Ice Cream on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2921.1234567890!2d-70.76177!3d43.00653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2e68b6b9b5b5b%3A0x1234567890abcdef!2s71%20Lafayette%20Rd%2C%20Rye%2C%20NH%2003870!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
