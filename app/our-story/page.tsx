import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import StoryTimeline from '@/components/StoryTimeline'
import AwardWall from '@/components/AwardWall'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import Image from 'next/image'
import awardsData from '@/data/awards.json'

export const metadata: Metadata = {
  title: "Our Story | Lago's Ice Cream — Family Owned Since 1981",
  description:
    "Lago's Ice Cream has been a New Hampshire institution since 1981, founded by the Lago family and now run by Steve & Andrea Grenier. 13× NH's Best Ice Cream.",
}

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="h-64 md:h-80 relative">
            <Image
              src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80&auto=format"
              alt="Ice cream being scooped"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream" />
          </div>
          <div className="section-pad bg-cream pb-0">
            <div className="container-tight">
              <p className="section-label">A Family Legacy</p>
              <h1 className="font-display text-display-lg font-bold text-ink mb-6">Our Story</h1>
            </div>
          </div>
        </div>

        {/* Story text */}
        <section className="section-pad bg-cream pt-0">
          <div className="container-tight max-w-3xl">
            <div className="prose prose-lg prose-stone max-w-none space-y-8">
              <div className="card-base p-8">
                <h2 className="font-display font-bold text-2xl text-ink mb-4">The Beginning (1981)</h2>
                <p className="text-stone-warm leading-relaxed">
                  In 1981, Mike, Carol, and Andrea Lago opened a modest ice cream stand at 71
                  Lafayette Road in Rye, New Hampshire. That first summer, master craftsman Arnold
                  &quot;Gramps&quot; Wade taught them the art of homemade ice cream — slow-churned,
                  real-ingredient recipes that would anchor a 44-year tradition.
                </p>
                <p className="text-stone-warm leading-relaxed mt-4">
                  Andrea met Steve Grenier, and together they became passionate about perfecting
                  every batch. In 1986, Steve and Andrea attended the prestigious{' '}
                  <strong className="text-ink">Penn State Ice Cream School</strong> — learning the
                  science behind what makes ice cream truly extraordinary.
                </p>
              </div>

              <div className="card-base p-8">
                <h2 className="font-display font-bold text-2xl text-ink mb-4">Awards & Recognition</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {awardsData.awards.map((award) => (
                    <div key={award.id} className={`p-4 rounded-2xl ${award.featured ? 'bg-raspberry-50 border border-raspberry-200' : 'bg-stone-50 border border-stone-200'}`}>
                      <p className={`font-bold text-sm ${award.featured ? 'text-raspberry-700' : 'text-ink'}`}>
                        {award.title}
                      </p>
                      <p className="text-xs text-stone-warm mt-0.5">{award.subtitle}</p>
                      <p className="text-xs text-stone-light mt-0.5">{award.source} · {award.years}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-base p-8">
                <h2 className="font-display font-bold text-2xl text-ink mb-4">Lago&apos;s Today</h2>
                <p className="text-stone-warm leading-relaxed">
                  Today, Steve and Andrea Grenier continue the family tradition that began over four
                  decades ago. With four generations of family involvement, Lago&apos;s remains
                  fiercely independent, deeply local, and completely committed to quality over
                  convenience.
                </p>
                <p className="text-stone-warm leading-relaxed mt-4">
                  Every scoop is still made the way Gramps Wade taught — with real ingredients,
                  real care, and zero shortcuts. That&apos;s why you&apos;ll drive 20 minutes out of your
                  way for it. And why you&apos;ll come back every summer for the rest of your life.
                </p>
                <blockquote className="mt-6 pl-4 border-l-2 border-raspberry-300">
                  <p className="font-display italic text-ink-light text-lg">
                    &quot;New Hampshire&apos;s Best Ice Cream — 13 years running.&quot;
                  </p>
                  <cite className="text-xs text-stone-light">— NH Magazine</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <AwardWall />
        <StoryTimeline />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
