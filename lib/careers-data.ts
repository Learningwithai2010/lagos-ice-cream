export interface Position {
  title: string
  type: string
  blurb: string
}

export const positions: Position[] = [
  {
    title: 'Ice Cream Scooper',
    type: 'Seasonal · Part-Time',
    blurb: 'Scoop, serve, and make someone’s day. The heart of the stand.',
  },
  {
    title: 'Seasonal Team Member',
    type: 'Seasonal',
    blurb: 'Summer on the Seacoast — fast-paced, friendly, and a lot of fun.',
  },
  {
    title: 'Catering Team Member',
    type: 'Part-Time · Events',
    blurb: 'Bring Lago’s to weddings and parties. Evenings & weekends.',
  },
  {
    title: 'Shift Lead',
    type: 'Part-Time / Full-Time',
    blurb: 'Run the floor, mentor the crew, keep the line moving.',
  },
  {
    title: 'General Application',
    type: 'Open',
    blurb: 'Don’t see your role? Tell us how you’d like to help.',
  },
]

export const perks = [
  { emoji: '🍦', title: 'Free ice cream', desc: 'On every shift. Obviously.' },
  { emoji: '🗓️', title: 'Flexible scheduling', desc: 'Built around school & summer.' },
  { emoji: '🌊', title: 'Seacoast summers', desc: 'Steps from Rye Beach.' },
  { emoji: '🤝', title: 'Friendly team', desc: 'A family-run crew, four generations strong.' },
]
