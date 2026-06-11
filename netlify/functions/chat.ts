import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import Anthropic from '@anthropic-ai/sdk'
import flavors from '../../data/flavors.json'

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>()
const MAX_REQUESTS_PER_HOUR = 30
const MAX_SESSION_MESSAGES = 10

function getClientIP(event: HandlerEvent): string {
  return (
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.headers['client-ip'] ||
    'unknown'
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = RATE_LIMIT_MAP.get(ip)
  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return true
  }
  if (entry.count >= MAX_REQUESTS_PER_HOUR) return false
  entry.count++
  return true
}

function buildSystemPrompt(): string {
  const allergenSummary = flavors
    .filter((f) => f.allergens.length === 0)
    .map((f) => f.name)
    .join(', ')

  const originalsList = flavors
    .filter((f) => f.isOriginal)
    .map((f) => `${f.name} (${f.description})`)
    .join('\n')

  const dairyFreeList = flavors
    .filter((f) => (f.tags as string[]).includes('dairy-free'))
    .map((f) => f.name)
    .join(', ')

  const noSugarList = flavors
    .filter((f) => (f.tags as string[]).includes('no-sugar-added'))
    .map((f) => f.name)
    .join(', ')

  return `You are the friendly AI Flavor Finder for Lago's Ice Cream in Rye, NH — a beloved family-owned homemade ice cream stand open since 1981. You help customers discover their perfect flavor.

ABOUT LAGO'S:
- Address: 71 Lafayette Road, Rye, NH
- Phone: 603-964-9880
- Hours: Open 7 days, 1–9 PM (seasonal)
- Founded 1981, current owners Steve & Andrea Grenier
- 13× NH Magazine's Best Ice Cream (2009–2025)
- Best Frappe in New England 2010 & 2011

FLAVOR CATALOG (${flavors.length} flavors):
${flavors.map((f) => `• ${f.name}${f.isOriginal ? ' [ORIGINAL]' : ''}: ${f.description}${f.allergens.length ? ` (contains: ${f.allergens.join(', ')})` : ' (no common allergens)'}`).join('\n')}

LAGO'S ORIGINALS (created in-house):
${originalsList}

ALLERGEN-FREE OPTIONS (no common allergens):
${allergenSummary}

DAIRY FREE: ${dairyFreeList}
NO SUGAR ADDED: ${noSugarList}

FLAVOR RECOMMENDATION RULES:
- Love coffee? → Cappuccino Slam, Coffee Oreo, Kahlua Chip, Coffee Heath Bar Yogurt
- Love crunchy + sweet? → Salty Sailor, Heath Bar, Scotty Lago's Bronze Run
- Chocolate lover? → Cow Pie, Kahlua Fudge Brownie, Mocha Chip, Triple Chocolate DF
- Fruit lover? → Black Raspberry, Wild Maine Blueberry, Strawberry, Orange Pineapple
- Kid-friendly? → Cookie Monster, Cotton Candy, Cake Batter, M&M
- Best sellers? → Funky Panda (#1), Kahlua Fudge Brownie, Black Raspberry
- Nut allergy? → Recommend allergen-free options above

IMPORTANT RULES:
1. ONLY answer questions about Lago's Ice Cream flavors, allergens, hours, location, and general ordering
2. Always be warm, helpful, and enthusiastic — you love ice cream!
3. When recommending flavors, mention 2-3 specific options and why they match
4. For allergen questions, be precise and always recommend they confirm with staff
5. Keep responses under 150 words — short and sweet like a great scoop
6. If asked about anything unrelated to Lago's, gently redirect to flavors and visiting
7. Sign off suggestions with an invitation to visit`
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const ip = getClientIP(event)

  if (!checkRateLimit(ip)) {
    return {
      statusCode: 429,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Too many requests. Please try again later.',
        fallback: true,
      }),
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Chat service unavailable', fallback: true }),
    }
  }

  let body: { message: string; sessionCount?: number }
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  if (!body.message || typeof body.message !== 'string') {
    return { statusCode: 400, body: 'Missing message' }
  }

  if ((body.sessionCount || 0) >= MAX_SESSION_MESSAGES) {
    return {
      statusCode: 429,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Session limit reached. Stop by and our staff can help in person!',
        fallback: false,
      }),
    }
  }

  const message = body.message.slice(0, 500)

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: message }],
    })

    const text =
      response.content[0]?.type === 'text' ? response.content[0].text : 'Sorry, try again!'

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ response: text }),
    }
  } catch (err) {
    console.error('Claude API error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Service error', fallback: true }),
    }
  }
}
