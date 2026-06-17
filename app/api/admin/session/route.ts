import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/admin-auth'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ authed: false }, { status: 401 })
  }
  return NextResponse.json({ authed: true, supabase: isSupabaseConfigured() })
}
