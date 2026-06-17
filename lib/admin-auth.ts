import crypto from 'crypto'
import { NextRequest } from 'next/server'

/**
 * Lightweight admin auth: a passcode (ADMIN_PASSCODE) exchanged for an
 * httpOnly cookie holding a non-reversible token. All admin API routes verify
 * the cookie server-side, so submission data (incl. PII) is never exposed to
 * the browser without the passcode.
 */

export const ADMIN_COOKIE = 'lago_admin'

function passcode(): string {
  return process.env.ADMIN_PASSCODE || 'LAGO2025'
}

export function adminToken(): string {
  return crypto.createHash('sha256').update(`lago::${passcode()}`).digest('hex')
}

export function checkPasscode(input: string): boolean {
  const a = Buffer.from(input || '')
  const b = Buffer.from(passcode())
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function isAuthed(request: NextRequest): boolean {
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value
  if (!cookie) return false
  const expected = adminToken()
  const a = Buffer.from(cookie)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
