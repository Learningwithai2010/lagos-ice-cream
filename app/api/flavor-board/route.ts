import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { isAuthed } from '@/lib/admin-auth'
import { readFlavorBoard, writeFlavorBoard, isSupabaseConfigured } from '@/lib/supabase'

/**
 * Today's "Scooping Today" board.
 *  - Public GET reads the current board.
 *  - Owner POST (passcode-gated, ADMIN_PASSCODE) updates it from /admin.
 *
 * Persistence priority, all best-effort and non-blocking:
 *   1. Supabase  — the database that already powers every form (preferred; no
 *      extra service to configure). Durable + shared across all visitors.
 *   2. Upstash Redis — used only if its env vars are set (legacy/optional).
 *   3. In-memory — last-resort fallback (per instance; resets on cold start) so
 *      a demo without any storage still works within a session.
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
  const fromDb = await readFlavorBoard()
  if (fromDb) return fromDb
  if (redis) return (await redis.get<Board>(BOARD_KEY)) ?? null
  return memoryBoard
}

/** Returns true when the board durably persisted (Supabase or Redis). */
async function writeBoard(board: Board): Promise<boolean> {
  let persisted = false
  if (await writeFlavorBoard(board.flavors, board.updatedAt)) persisted = true
  if (redis) {
    await redis.set(BOARD_KEY, board)
    persisted = true
  }
  // Always keep the in-memory copy too, as a same-instance read-through.
  memoryBoard = board
  return persisted
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

  // Accept either the admin session cookie (dashboard) or the passcode in body.
  const passcode = process.env.ADMIN_PASSCODE || 'LAGO2025'
  if (!isAuthed(request) && body.passcode !== passcode) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!Array.isArray(body.flavors)) {
    return NextResponse.json({ error: 'flavors must be an array' }, { status: 400 })
  }

  const board: Board = { flavors: body.flavors, updatedAt: new Date().toISOString() }
  const persisted = await writeBoard(board)

  return NextResponse.json({
    ok: true,
    updatedAt: board.updatedAt,
    persisted,
    storage: persisted ? (isSupabaseConfigured() ? 'supabase' : 'redis') : 'memory',
  })
}
