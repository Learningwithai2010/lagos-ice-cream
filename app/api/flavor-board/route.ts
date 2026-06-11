import { NextRequest, NextResponse } from 'next/server'

// In-memory store for demo. Persists within a server instance; resets on cold start.
// For production persistence, swap in Vercel KV: https://vercel.com/docs/storage/vercel-kv
let boardState: { flavors: string[]; updatedAt: string } | null = null

export async function GET() {
  if (!boardState) {
    return NextResponse.json({ flavors: null })
  }
  return NextResponse.json(boardState)
}

export async function POST(request: NextRequest) {
  let body: { passcode?: string; flavors?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const passcode = process.env.ADMIN_PASSCODE || 'LAGO2025'
  if (body.passcode !== passcode) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!Array.isArray(body.flavors)) {
    return NextResponse.json({ error: 'flavors must be an array' }, { status: 400 })
  }

  boardState = {
    flavors: body.flavors,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({ ok: true, updatedAt: boardState.updatedAt })
}
