import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase access.
 *
 * All DB work happens server-side (in API routes), so we use the SERVICE ROLE
 * key — it bypasses RLS and is never exposed to the browser. Forms POST to our
 * own API routes (never to Supabase directly), and the admin dashboard reads
 * through protected admin API routes. The public anon key is supported too but
 * not required for this design.
 *
 * If the env vars are missing, getSupabaseAdmin() returns null and callers fall
 * back gracefully (email-only capture / empty dashboard) so nothing breaks.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let cached: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null
  if (cached) return cached
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && serviceKey)
}

/** Table names — single source of truth. */
export const TABLES = {
  catering: 'catering_requests',
  applications: 'job_applications',
  contact: 'contact_requests',
  alerts: 'flavor_alert_signups',
} as const

export type SubmissionTable = (typeof TABLES)[keyof typeof TABLES]

/**
 * Insert a submission. Never throws — logs and returns false on failure so a
 * Supabase outage can't block a lead from being captured by email.
 */
export async function saveSubmission(
  table: SubmissionTable,
  row: Record<string, unknown>
): Promise<boolean> {
  const db = getSupabaseAdmin()
  if (!db) return false
  try {
    const { error } = await db.from(table).insert(row)
    if (error) {
      console.error(`[supabase] insert ${table} failed:`, error.message)
      return false
    }
    return true
  } catch (err) {
    console.error(`[supabase] insert ${table} threw:`, err)
    return false
  }
}
