import type { Handler, HandlerEvent } from '@netlify/functions'
import { getStore } from '@netlify/blobs'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'LAGO2025'
const STORE_KEY = 'scooping-today'

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  const store = getStore('flavor-board')

  if (event.httpMethod === 'GET') {
    try {
      const raw = await store.get(STORE_KEY, { type: 'json' })
      if (!raw) {
        // Default: all flavors available
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ flavors: null, updatedAt: null }),
        }
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(raw),
      }
    } catch {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ flavors: null, updatedAt: null }),
      }
    }
  }

  if (event.httpMethod === 'POST') {
    let body: { passcode?: string; flavors?: string[] }
    try {
      body = JSON.parse(event.body || '{}')
    } catch {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }
    }

    if (body.passcode !== ADMIN_PASSCODE) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) }
    }

    if (!Array.isArray(body.flavors)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'flavors must be array' }) }
    }

    const payload = {
      flavors: body.flavors,
      updatedAt: new Date().toISOString(),
    }

    await store.setJSON(STORE_KEY, payload)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, ...payload }),
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
}
