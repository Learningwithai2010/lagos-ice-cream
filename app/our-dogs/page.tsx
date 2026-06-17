import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Our Dogs | Lago's Ice Cream — Meet the Lago's Pups",
  description:
    "Meet the beloved shop dogs of Lago's Ice Cream in Rye, NH. They've been greeting customers and stealing hearts for years.",
}

export default function OurDogsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="section-pad bg-cream pb-0">
          <div className="container-tight pt-10">
            <p className="section-label">The Real Stars of the Show</p>
            <h1 className="font-display text-display-lg font-bold text-ink mb-4">Our Dogs</h1>
            <p className="text-ink-light max-w-xl leading-relaxed">
              At Lago&apos;s, we&apos;re dog people. Our shop pups have been part of the family for years —
              and our customers love them almost as much as the ice cream.
            </p>
          </div>
        </div>

        <section className="section-pad bg-cream">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Dog image */}
              <div className="card-base overflow-hidden">
                <div className="relative h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80&auto=format"
                    alt="Happy dog on a summer day"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-stone-warm italic text-center">
                    The real MVPs of 71 Lafayette Road 🐾
                  </p>
                </div>
              </div>

              {/* Dog stories */}
              <div className="space-y-6">
                <div className="card-base p-7">
                  <span className="text-5xl block mb-5">🐾</span>
                  <h2 className="font-display font-bold text-2xl text-ink mb-4">
                    The Lago&apos;s Dogs
                  </h2>
                  <p className="text-stone-warm leading-relaxed mb-4">
                    Lago&apos;s wouldn&apos;t be Lago&apos;s without our beloved shop dogs. For years, they&apos;ve been
                    greeting customers, chasing butterflies, and stealing hearts on the NH Seacoast.
                  </p>
                  <p className="text-stone-warm leading-relaxed">
                    Stop by and say hi — they love meeting new friends almost as much as they love
                    the smell of waffle cones fresh off the iron.
                  </p>
                </div>

                <div className="card-base p-7 bg-raspberry-50 border border-raspberry-100">
                  <h3 className="font-semibold text-ink mb-3">Dog-Friendly Stand</h3>
                  <p className="text-stone-warm text-sm leading-relaxed">
                    Well-behaved dogs are welcome at Lago&apos;s! Our stand is outdoors and dog-friendly.
                    Just keep them on leash and away from our serving area. Ask us about a pup cup! 🍦
                  </p>
                  <div className="mt-4">
                    <a href="tel:+16039649880" className="text-sm font-semibold text-raspberry-600 hover:text-raspberry-700">
                      Call 603-964-9880 →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo grid placeholder */}
            <div className="mt-12">
              <h2 className="font-display font-bold text-2xl text-ink mb-6 text-center">
                Summer at the Stand
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&auto=format',
                  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format',
                  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80&auto=format',
                  'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80&auto=format',
                  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&auto=format',
                  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80&auto=format',
                ].map((src, i) => (
                  <div key={i} className="relative h-48 rounded-2xl overflow-hidden">
                    <Image src={src} alt={`Lago's dog photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
