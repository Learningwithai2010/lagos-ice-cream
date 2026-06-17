import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { business } from '@/lib/business-data'
import { saveSubmission, TABLES } from '@/lib/supabase'

/**
 * Unified lead capture for the catering, flavor-alert, and general-contact
 * forms. Each submission is (1) stored in Supabase and (2) emailed to the
 * owner via Resend. Both are best-effort — if either isn't configured the
 * request still succeeds so the visitor is never blocked.
 */

type LeadType = 'catering' | 'alert' | 'contact'

const SUBJECTS: Record<LeadType, string> = {
  catering: '🎉 New Catering / Event Request',
  alert: '🔔 New Flavor Back-in-Stock Alert',
  contact: '✉️ New Website Message',
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  )
}

const str = (v: unknown) => String(v ?? '').trim()
const orNull = (v: unknown) => (str(v) === '' ? null : str(v))

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const type = (body.type as LeadType) || 'contact'
  if (!['catering', 'alert', 'contact'].includes(type)) {
    return NextResponse.json({ success: false, error: 'Unknown form type.' }, { status: 400 })
  }

  const name = str(body.name)
  const contact = str(body.email) || str(body.phone) || str(body.contact)
  if (!name && !contact) {
    return NextResponse.json(
      { success: false, error: 'Please include your name and a phone or email.' },
      { status: 400 }
    )
  }

  // ── Store in Supabase (mapped to the right table) ──
  if (type === 'catering') {
    await saveSubmission(TABLES.catering, {
      name,
      phone: orNull(body.phone),
      email: orNull(body.email),
      event_type: orNull(body.eventType),
      event_date: orNull(body.date),
      event_size: orNull(body.eventSize),
      half_gallons: orNull(body.halfGallons),
      notes: orNull(body.notes),
    })
  } else if (type === 'alert') {
    await saveSubmission(TABLES.alerts, {
      name: orNull(body.name),
      contact,
      flavor: orNull(body.flavor),
    })
  } else {
    await saveSubmission(TABLES.contact, {
      name,
      email: orNull(body.email),
      message: orNull(body.message),
    })
  }

  // ── Email the owner ──
  const fields = Object.entries(body)
    .filter(([k]) => k !== 'type')
    .filter(([, v]) => str(v) !== '')
    .map(([k, v]) => `${k}: ${str(v)}`)

  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.OWNER_EMAIL
  const fromEmail = process.env.LEAD_FROM_EMAIL || "Lago's Website <onboarding@resend.dev>"

  if (apiKey && ownerEmail) {
    try {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: fromEmail,
        to: ownerEmail,
        replyTo: str(body.email) || undefined,
        subject: SUBJECTS[type],
        html: `
          <h2 style="font-family:sans-serif">${SUBJECTS[type]}</h2>
          <p style="font-family:sans-serif;color:#555">From the ${business.name} website</p>
          <table style="font-family:sans-serif;border-collapse:collapse">
            ${fields
              .map(
                (line) =>
                  `<tr><td style="padding:6px 12px;border:1px solid #eee">${escapeHtml(line)}</td></tr>`
              )
              .join('')}
          </table>`,
      })
    } catch (err) {
      console.error('Resend error:', err)
    }
  } else {
    console.log(`[lead:${type}] (email not configured)`, fields.join(' | '))
  }

  return NextResponse.json({ success: true })
}
