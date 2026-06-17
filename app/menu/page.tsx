import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import { IceCream2, Coffee, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: "Menu | Lago's Ice Cream — Cones, Sundaes, Frappes",
  description:
    "Full menu at Lago's Ice Cream: cones, cups, waffle cones, sundaes, banana splits, frappes, and floats. Rye, NH.",
}

const MENU_SECTIONS = [
  {
    title: 'Scoops & Cones',
    icon: IceCream2,
    description: 'Served in a cup, cake cone, sugar cone, or made-fresh waffle cone',
    items: [
      { name: 'Small', price: 'Ask at stand', desc: 'Perfect starter scoop' },
      { name: 'Medium', price: 'Ask at stand', desc: 'Our most popular size' },
      { name: 'Large', price: 'Ask at stand', desc: 'Go big!' },
      { name: 'Waffle Cone', price: 'Add-on', desc: 'Fresh-made right here' },
      { name: 'Waffle Bowl', price: 'Ask at stand', desc: 'The full experience' },
    ],
  },
  {
    title: 'Sundaes',
    icon: Zap,
    description: 'Hot fudge, caramel, strawberry, butterscotch, and more',
    items: [
      { name: 'Classic Sundae', price: 'Ask at stand', desc: 'Your choice of sauce + whipped cream + cherry' },
      { name: 'Banana Split', price: 'Ask at stand', desc: '3 scoops, 3 sauces, the works' },
      { name: 'Hot Fudge Sundae', price: 'Ask at stand', desc: 'Homemade hot fudge' },
    ],
  },
  {
    title: 'Frappes & Floats',
    icon: Coffee,
    description: '2× Best Frappe in New England — NECN 2010 & 2011',
    items: [
      { name: 'Frappe', price: 'Ask at stand', desc: 'Any flavor, hand-blended to order. Award-winning.' },
      { name: 'Ice Cream Float', price: 'Ask at stand', desc: 'Root beer or orange soda + your scoop' },
      { name: 'Milkshake', price: 'Ask at stand', desc: 'Thick & creamy, any flavor' },
    ],
  },
]

const HALF_GALLON_FLAVORS = [
  'Banana', 'Black Raspberry', 'Black Raspberry Chip', 'Black Raspberry Oreo',
  'Butter Pecan', 'Cappuccino Slam', 'Cherry Vanilla', 'Chocolate', 'Chocolate Chip',
  'Chocolate Cookie Dough', 'Chocolate Walnut Fudge', 'Coffee', 'Coffee Oreo',
  'Cookie Dough', 'Cookie Monster', 'Cotton Candy', 'French Vanilla', 'Fresh Pineapple',
  'Grapenut', 'Heath Bar', 'Kahlua Chip', 'Kahlua Fudge Brownie', 'M&M',
  'Maple Walnut', 'Mint Chocolate Chip', 'Mint Oreo', 'Mocha Chip', 'Muddy Sneakers',
  'Orange Pineapple', 'Oreo', 'Peanut Butter Cup', 'Peppermint Stick', 'Pistachio',
  'Rocky Road', 'Rum Raisin', 'Scotty Lago\'s Bronze Run', 'Strawberry', 'Vanilla',
  'Black Raspberry Chip Yogurt', 'Coffee Heath Bar Yogurt',
]

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="section-pad bg-cream pb-0">
          <div className="container-tight pt-10">
            <p className="section-label">What We Serve</p>
            <h1 className="font-display text-display-lg font-bold text-ink mb-4">Our Menu</h1>
            <p className="text-ink-light max-w-xl leading-relaxed">
              Hand-scooped ice cream any way you like it — cone, cup, sundae, frappe, or straight
              from the tub. Come hungry.
            </p>
          </div>
        </div>

        {/* Menu sections */}
        <section className="section-pad bg-cream">
          <div className="container-tight">
            <div className="space-y-12">
              {MENU_SECTIONS.map((section) => {
                const Icon = section.icon
                return (
                  <div key={section.title}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-raspberry-50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-raspberry-500" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-display-sm text-ink">{section.title}</h2>
                        <p className="text-sm text-stone-warm">{section.description}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.items.map((item) => (
                        <div key={item.name} className="card-base p-5">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="font-semibold text-ink">{item.name}</h3>
                            <span className="text-xs text-stone-light bg-stone-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-sm text-stone-warm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Half Gallons */}
        <section id="half-gallons" className="section-pad bg-white">
          <div className="container-tight">
            <div className="text-center mb-10">
              <p className="section-label">Take Home</p>
              <h2 className="font-display text-display-md font-bold text-ink mb-3">
                Half Gallons To-Go
              </h2>
              <p className="text-stone-warm max-w-xl mx-auto">
                Stock your freezer with Lago&apos;s. {HALF_GALLON_FLAVORS.length} flavors available in
                half gallons — perfect for parties and catering orders.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {HALF_GALLON_FLAVORS.map((flavor) => (
                <span
                  key={flavor}
                  className="px-4 py-2 rounded-full border border-stone-border bg-cream-100 text-sm font-medium text-ink-light hover:border-raspberry-300 hover:text-raspberry-600 transition-colors"
                >
                  {flavor}
                </span>
              ))}
            </div>
            <p className="text-center text-xs text-stone-light mt-8">
              Call ahead to reserve: <a href="tel:+16039649880" className="text-raspberry-500 font-medium">603-964-9880</a>
            </p>
          </div>
        </section>

        {/* Pricing note */}
        <div className="bg-amber-50 border-t border-amber-200 py-6 px-4 text-center">
          <p className="text-sm text-amber-800">
            <strong>Pricing:</strong> Visit us at 71 Lafayette Road or call 603-964-9880 for current pricing.
            Prices subject to change seasonally.
          </p>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
