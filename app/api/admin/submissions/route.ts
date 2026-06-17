import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/admin-auth'
import { getSupabaseAdmin, TABLES } from '@/lib/supabase'

const TYPE_TO_TABLE: Record<string, string> = {
  catering: TABLES.catering,
  applications: TABLES.applications,
  contact: TABLES.contact,
  alerts: TABLES.alerts,
}

function tableFor(type: string | null): string | null {
  return type ? TYPE_TO_TABLE[type] ?? null : null
}

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const table = tableFor(request.nextUrl.searchParams.get('type'))
  if (!table) return NextResponse.json({ error: 'Unknown type' }, { status: 400 })

  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ rows: [], supabase: false })

  const { data, error } = await db.from(table).select('*').order('created_at', { ascending: false })
  if (error) {
    // Most common cause: schema.sql not run yet, or only the anon key is set
    // (RLS blocks it). Degrade to the dashboard's "not connected" notice
    // instead of erroring out.
    console.error('[admin] fetch error:', error.message)
    return NextResponse.json({ rows: [], supabase: false, setupNeeded: true })
  }
  return NextResponse.json({ rows: data ?? [], supabase: true })
}

export async function PATCH(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: { type?: string; id?: string; status?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const table = tableFor(body.type ?? null)
  if (!table || !body.id || !body.status) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ error: 'Database not configured.' }, { status: 503 })

  const { error } = await db.from(table).update({ status: body.status }).eq('id', body.id)
  if (error) return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const table = tableFor(request.nextUrl.searchParams.get('type'))
  const id = request.nextUrl.searchParams.get('id')
  if (!table || !id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const db = getSupabaseAdmin()
  if (!db) return NextResponse.json({ error: 'Database not configured.' }, { status: 503 })

  const { error } = await db.from(table).delete().eq('id', id)
  if (error) return NextResponse.json({ error: 'Delete failed.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
