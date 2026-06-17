import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/admin-auth'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ authed: false }, { status: 401 })
  }
  // Integration status — booleans only (no secrets). Used to verify setup.
  const config = {
    supabase: isSupabaseConfigured(),
    resend: Boolean(process.env.RESEND_API_KEY),
    ownerEmail: Boolean(process.env.OWNER_EMAIL),
    anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    upstash: Boolean(
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ),
  }
  return NextResponse.json({ authed: true, supabase: config.supabase, config })
}
