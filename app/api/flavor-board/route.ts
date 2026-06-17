import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

/**
 * Today's "Scooping Today" board.
 *  - Public GET reads the current board.
 *  - Owner POST (passcode-gated, ADMIN_PASSCODE) updates it from /admin.
 *
 * State lives in Upstash Redis when configured, so every visitor sees the
 * owner's changes. If Upstash env vars are missing (local dev / demo without
 * setup), it falls back to an in-memory store so nothing breaks.
 */

const BOARD_KEY = 'lago:flavor-board'

type Board = { flavors: string[]; updatedAt: string }

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null

// In-memory fallback (per server instance; resets on cold start).
let memoryBoard: Board | null = null

async function readBoard(): Promise<Board | null> {
  if (redis) return (await redis.get<Board>(BOARD_KEY)) ?? null
  return memoryBoard
}

async function writeBoard(board: Board): Promise<void> {
  if (redis) await redis.set(BOARD_KEY, board)
  else memoryBoard = board
}

export async function GET() {
  const board = await readBoard()
  if (!board) return NextResponse.json({ flavors: null })
  return NextResponse.json(board)
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

  const board: Board = { flavors: body.flavors, updatedAt: new Date().toISOString() }
  await writeBoard(board)

  return NextResponse.json({ ok: true, updatedAt: board.updatedAt, persisted: Boolean(redis) })
}
