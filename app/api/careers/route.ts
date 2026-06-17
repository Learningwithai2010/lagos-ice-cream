import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { business } from '@/lib/business-data'
import { saveSubmission, TABLES } from '@/lib/supabase'

/**
 * Careers / employment application intake.
 * Accepts multipart form data (incl. an optional resume), emails the owner via
 * Resend with the resume attached, and degrades gracefully without keys so the
 * demo never breaks.
 *
 * Spam protection: a hidden honeypot field ("company"). Bots fill it; humans
 * never see it — if it's set, we 200 silently without sending.
 */

const MAX_RESUME_BYTES = 4 * 1024 * 1024 // 4 MB
const ALLOWED_RESUME = /\.(pdf|docx?|rtf|txt)$/i

const FIELD_LABELS: Record<string, string> = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
  age: 'Age / Date of birth',
  position: 'Position applying for',
  employmentType: 'Employment type',
  startDate: 'Earliest start date',
  daysAvailable: 'Days available',
  hoursAvailable: 'Hours available',
  previousEmployer: 'Previous employer',
  experience: 'Relevant experience',
  customerService: 'Customer service experience',
  whyLagos: "Why work at Lago's",
  goodFit: 'What makes them a good fit',
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  )
}

export async function POST(request: NextRequest) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid submission.' }, { status: 400 })
  }

  // Honeypot — silently accept (don't tip off bots), but send nothing.
  if (String(form.get('company') || '').trim() !== '') {
    return NextResponse.json({ success: true, delivered: false })
  }

  const get = (k: string) => String(form.get(k) || '').trim()
  const firstName = get('firstName')
  const lastName = get('lastName')
  const email = get('email')
  const phone = get('phone')
  const position = get('position')

  if (!firstName || !lastName || !position || (!email && !phone)) {
    return NextResponse.json(
      { success: false, error: 'Please include your name, the position, and a phone or email.' },
      { status: 400 }
    )
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }

  // Optional resume
  let attachment: { filename: string; content: Buffer } | null = null
  const resume = form.get('resume')
  if (resume && typeof resume === 'object' && 'arrayBuffer' in resume) {
    const file = resume as File
    if (file.size > 0) {
      if (file.size > MAX_RESUME_BYTES) {
        return NextResponse.json({ success: false, error: 'Resume must be under 4 MB.' }, { status: 400 })
      }
      if (!ALLOWED_RESUME.test(file.name)) {
        return NextResponse.json({ success: false, error: 'Resume must be a PDF, DOC, DOCX, RTF, or TXT.' }, { status: 400 })
      }
      attachment = { filename: file.name, content: Buffer.from(await file.arrayBuffer()) }
    }
  }

  // Build a readable summary of all provided fields.
  const rows = Object.keys(FIELD_LABELS)
    .map((k) => [FIELD_LABELS[k], get(k)] as const)
    .filter(([, v]) => v !== '')

  // Store the application (resume file is emailed; we keep its name on the row).
  await saveSubmission(TABLES.applications, {
    first_name: firstName,
    last_name: lastName,
    email: email || null,
    phone: phone || null,
    address: get('address') || null,
    age: get('age') || null,
    position,
    employment_type: get('employmentType') || null,
    start_date: get('startDate') || null,
    days_available: get('daysAvailable') || null,
    hours_available: get('hoursAvailable') || null,
    previous_employer: get('previousEmployer') || null,
    experience: get('experience') || null,
    customer_service: get('customerService') || null,
    why_lagos: get('whyLagos') || null,
    good_fit: get('goodFit') || null,
    resume_filename: attachment?.filename || null,
  })

  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.OWNER_EMAIL
  const fromEmail = process.env.LEAD_FROM_EMAIL || "Lago's Careers <onboarding@resend.dev>"

  if (!apiKey || !ownerEmail) {
    console.log(`[careers] application from ${firstName} ${lastName} for ${position} (email not configured)`)
    return NextResponse.json({ success: true, delivered: false })
  }

  try {
    const resend = new Resend(apiKey)
    const html = `
      <h2 style="font-family:sans-serif">🧑‍🍳 New Job Application — ${escapeHtml(position)}</h2>
      <p style="font-family:sans-serif;color:#555">From the ${business.name} careers page</p>
      <table style="font-family:sans-serif;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 12px;border:1px solid #eee;font-weight:600;vertical-align:top">${escapeHtml(
                label
              )}</td><td style="padding:6px 12px;border:1px solid #eee">${escapeHtml(value)}</td></tr>`
          )
          .join('')}
      </table>
      <p style="font-family:sans-serif;color:#555;margin-top:12px">${
        attachment ? 'Resume attached.' : 'No resume attached.'
      }</p>
    `
    await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: email || undefined,
      subject: `Application: ${firstName} ${lastName} — ${position}`,
      html,
      attachments: attachment ? [attachment] : undefined,
    })
    return NextResponse.json({ success: true, delivered: true })
  } catch (err) {
    console.error('Resend error (careers):', err)
    return NextResponse.json({ success: true, delivered: false })
  }
}
