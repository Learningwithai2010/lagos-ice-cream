import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, adminToken, checkPasscode } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  let body: { passcode?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!checkPasscode(String(body.passcode || ''))) {
    return NextResponse.json({ error: 'Wrong passcode.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  })
  return res
}
