import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "Lago's Ice Cream — Rye, NH | Hand-Scooped Homemade Ice Cream",
  description:
    "Lago's Ice Cream in Rye, NH — 13× NH's Best Ice Cream, handcrafted since 1981. 50+ flavors, waffle cones, frappes. Open daily 1–9 PM at 71 Lafayette Road.",
  metadataBase: new URL('https://lagosicecream.com'),
  alternates: { canonical: '/' },
  keywords: [
    "Lago's Ice Cream",
    'ice cream Rye NH',
    'NH Seacoast ice cream',
    'homemade ice cream New Hampshire',
    'best ice cream NH',
    'waffle cones Rye NH',
    'ice cream frappes New Hampshire',
  ],
  openGraph: {
    title: "Lago's Ice Cream — Rye, NH",
    description: "13× NH's Best Ice Cream. Handcrafted since 1981 on the NH Seacoast.",
    type: 'website',
    locale: 'en_US',
    url: 'https://lagosicecream.com',
    siteName: "Lago's Ice Cream",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lago's Ice Cream — Rye, NH",
    description: "13× NH's Best Ice Cream. Handcrafted since 1981.",
  },
  robots: { index: true, follow: true },
  other: { 'theme-color': '#8B2F82' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'IceCreamShop',
              name: "Lago's Ice Cream",
              url: 'https://lagosicecream.com',
              telephone: '+16039649880',
              email: 'lagosicecream@yahoo.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '71 Lafayette Road',
                addressLocality: 'Rye',
                addressRegion: 'NH',
                postalCode: '03870',
                addressCountry: 'US',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 43.0065, longitude: -70.7618 },
              openingHours: 'Mo-Su 13:00-21:00',
              servesCuisine: 'Ice Cream',
              priceRange: '$',
              award: "13× NH Magazine's Best Ice Cream",
            }),
          }}
        />
      </head>
      <body className="font-body bg-cream text-ink antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
