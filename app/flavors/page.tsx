import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import FlavorExplorer from '../../components/FlavorExplorer'
import FlavorBoard from '../../components/FlavorBoard'
import Footer from '../../components/Footer'
import ChatWidget from '../../components/ChatWidget'

export const metadata: Metadata = {
  title: "Flavors | Lago's Ice Cream — 50+ Homemade Flavors",
  description:
    "Browse all 50+ homemade flavors at Lago's Ice Cream. Filter by allergen-free, dairy free, no sugar added, and Lago's Originals. Updated daily.",
}

export default function FlavorsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Page header */}
        <div className="section-pad bg-cream pb-0">
          <div className="container-tight pt-10">
            <p className="section-label">The Full Collection</p>
            <h1 className="font-display text-display-lg font-bold text-ink mb-4">
              All Our Flavors
            </h1>
            <p className="text-ink-light max-w-xl leading-relaxed">
              Over 50 handcrafted flavors — from award-winning Lago&apos;s Originals to classic scoops and
              allergy-friendly options. Use the filters to find your perfect match.
            </p>
          </div>
        </div>
        <FlavorBoard />
        <FlavorExplorer />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
