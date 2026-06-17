/**
 * lib/business-data.ts — SINGLE SOURCE OF TRUTH for Lago's Ice Cream.
 *
 * Every fact on the site should trace back to this file. Only facts confirmed
 * in the research live here. Anything unknown is intentionally omitted rather
 * than invented (no prices, no social URLs, no unconfirmed dates).
 */

export interface DayHours {
  /** 0 = Sunday … 6 = Saturday */
  day: number
  label: string
  /** minutes from midnight, local (America/New_York) */
  open: number
  close: number
}

export interface Testimonial {
  name: string
  location: string | null
  rating: number
  text: string
  date: string
  /** avatar initial; null → render a generic Google user glyph */
  initial: string | null
}

export interface Award {
  title: string
  subtitle: string
  source: string
  years: string
  featured: boolean
}

// 1–9 PM, seven days a week (seasonal). 13*60 = 780, 21*60 = 1260.
const OPEN_MIN = 13 * 60
const CLOSE_MIN = 21 * 60

export const business = {
  name: "Lago's Ice Cream",
  tagline: 'Handcrafted Since 1981',
  type: 'Seasonal homemade ice cream stand',
  foundedYear: 1981,
  owners: 'Steve & Andrea Grenier',
  cashOnly: true,
  seasonal: true,

  phoneDisplay: '(603) 964-9880',
  phoneTel: '+16039649880',
  email: 'lagosicecream@yahoo.com',

  address: {
    street: '71 Lafayette Road',
    routeNote: 'Route 1',
    city: 'Rye',
    state: 'NH',
    zip: '03870',
    full: '71 Lafayette Road, Rye, NH 03870',
  },

  geo: { lat: 43.0065, lng: -70.7618 },

  hoursLabel: 'Open Daily · 1–9 PM (Seasonal)',
  hours: [
    { day: 0, label: 'Sunday', open: OPEN_MIN, close: CLOSE_MIN },
    { day: 1, label: 'Monday', open: OPEN_MIN, close: CLOSE_MIN },
    { day: 2, label: 'Tuesday', open: OPEN_MIN, close: CLOSE_MIN },
    { day: 3, label: 'Wednesday', open: OPEN_MIN, close: CLOSE_MIN },
    { day: 4, label: 'Thursday', open: OPEN_MIN, close: CLOSE_MIN },
    { day: 5, label: 'Friday', open: OPEN_MIN, close: CLOSE_MIN },
    { day: 6, label: 'Saturday', open: OPEN_MIN, close: CLOSE_MIN },
  ] as DayHours[],

  rating: 4.8,
  reviewCount: 1232,

  links: {
    website: 'https://www.lagosicecream.com',
    googleMaps: "https://www.google.com/maps/place/Lago's+Ice+Cream",
    googleReviews: "https://www.google.com/maps/place/Lago's+Ice+Cream/reviews",
    // Social URLs: UNKNOWN — omitted on purpose.
  },

  /** Real, verbatim Google reviews. Do not edit the text. */
  testimonials: [
    {
      name: 'Mif M.',
      location: 'Granby, CT',
      rating: 5,
      text:
        'Best ice cream in the world!! Especially cherry vanilla!! I love it!! Great service and great parking and right on route 1!!',
      date: 'April 2026',
      initial: 'M',
    },
    {
      name: 'Cara S.',
      location: 'Budd Lake, NJ',
      rating: 5,
      text:
        "Lagos has the best ice cream near Portsmouth. They have an awesome range of flavors, from fruity to chocolatey to grape nuts. I LOVE trying their fruit flavors like banana and pineapple. They're super rich and never icy. They always have chunks of real fruit and are absolutely delicious without being too sweet. The service is fast and efficient, although I wish they offered samples. It's so nice to sit outside on their benches, which are always clean, and enjoy a cone on a hot summer days.",
      date: 'June 2026',
      initial: 'C',
    },
    {
      name: 'Google Reviewer',
      location: null,
      rating: 5,
      text:
        'The lines looked long but they went very fast due to the amount of windows. I had the best dairy free ice cream ever, the kahlua fudge brownie is to die for. Only paid with cash but there is an atm on the site.',
      date: 'June 2026',
      initial: null,
    },
  ] as Testimonial[],

  awards: [
    {
      title: "NH's Best Ice Cream",
      subtitle: '13 Times',
      source: 'New Hampshire Magazine',
      years: "2009, '10, '13, '16–'25",
      featured: true,
    },
    {
      title: "New England's Best Flavor",
      subtitle: 'Kahlua Fudge Brownie',
      source: 'WBZ TV4 Boston',
      years: '1987',
      featured: true,
    },
    {
      title: 'Best Frappe in New England',
      subtitle: 'Two Years Running',
      source: "NECN's Baby You're the Best",
      years: '2010 & 2011',
      featured: true,
    },
    {
      title: 'Wall Street Journal',
      subtitle: 'Featured',
      source: 'Wall Street Journal',
      years: '2022',
      featured: false,
    },
    {
      title: 'Yankee Magazine',
      subtitle: 'Featured',
      source: 'Yankee Magazine',
      years: '2022',
      featured: false,
    },
  ] as Award[],
} as const

/** True when the stand is currently open, computed in America/New_York. */
export function getOpenStatus(now: Date = new Date()): {
  isOpen: boolean
  label: string
  sublabel: string
} {
  const et = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  const mins = et.getHours() * 60 + et.getMinutes()
  if (mins >= OPEN_MIN && mins < CLOSE_MIN) {
    const minsLeft = CLOSE_MIN - mins
    return {
      isOpen: true,
      label: 'Open Now',
      sublabel: minsLeft > 60 ? 'Open until 9 PM' : 'Closing soon',
    }
  }
  if (mins < OPEN_MIN) return { isOpen: false, label: 'Opens at 1 PM', sublabel: 'Come back soon!' }
  return { isOpen: false, label: 'Closed for Today', sublabel: 'Opens tomorrow at 1 PM' }
}
