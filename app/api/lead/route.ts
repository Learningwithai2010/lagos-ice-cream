import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { business } from '@/lib/business-data'

/**
 * Unified lead capture for every form on the site (catering, flavor alerts,
 * general contact). Submissions are emailed to the BUSINESS OWNER via Resend.
 *
 * If RESEND_API_KEY / OWNER_EMAIL are not set (e.g. local dev), the lead is
 * logged and the request still succeeds so the demo never shows a broken form.
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

  // Minimal validation — every form sends at least a name + a way to reach back.
  const name = String(body.name || '').trim()
  const contact = String(body.email || body.phone || body.contact || '').trim()
  if (!name || !contact) {
    return NextResponse.json(
      { success: false, error: 'Please include your name and a phone or email.' },
      { status: 400 }
    )
  }

  // Build a readable summary from whatever fields the form sent.
  const fields = Object.entries(body)
    .filter(([k]) => k !== 'type')
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k}: ${String(v).trim()}`)

  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.OWNER_EMAIL
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'Lago\'s Website <onboarding@resend.dev>'

  if (!apiKey || !ownerEmail) {
    // Demo / local fallback — never block the user, just record it.
    console.log(`[lead:${type}] (email not configured)`, fields.join(' | '))
    return NextResponse.json({ success: true, delivered: false })
  }

  try {
    const resend = new Resend(apiKey)
    const html = `
      <h2 style="font-family:sans-serif">${SUBJECTS[type]}</h2>
      <p style="font-family:sans-serif;color:#555">From the ${business.name} website</p>
      <table style="font-family:sans-serif;border-collapse:collapse">
        ${fields
          .map(
            (line) =>
              `<tr><td style="padding:6px 12px;border:1px solid #eee">${escapeHtml(line)}</td></tr>`
          )
          .join('')}
      </table>
    `
    await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: String(body.email || '') || undefined,
      subject: SUBJECTS[type],
      html,
    })
    return NextResponse.json({ success: true, delivered: true })
  } catch (err) {
    console.error('Resend error:', err)
    // Still acknowledge so the visitor isn't blocked; owner can follow up by phone.
    return NextResponse.json({ success: true, delivered: false })
  }
}
