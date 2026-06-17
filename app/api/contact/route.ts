import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { business } from '@/lib/business-data'
import { saveSubmission, TABLES } from '@/lib/supabase'

/**
 * General "Send a Message" contact form. Emails the owner via Resend.
 * Falls back to logging (and still succeeds) when email isn't configured,
 * so the form never appears broken during a demo.
 */
export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: 'All fields are required.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  await saveSubmission(TABLES.contact, { name, email, message })

  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.OWNER_EMAIL
  const fromEmail = process.env.LEAD_FROM_EMAIL || "Lago's Website <onboarding@resend.dev>"

  if (apiKey && ownerEmail) {
    try {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: fromEmail,
        to: ownerEmail,
        replyTo: email,
        subject: `✉️ New message from ${name} — ${business.name} website`,
        text: `From: ${name} <${email}>\n\n${message}`,
      })
    } catch (err) {
      console.error('Resend error (contact):', err)
      // Fall through to success — owner can still be reached by phone.
    }
  } else {
    console.log('[contact] (email not configured)', { name, email, message })
  }

  return NextResponse.json({
    success: true,
    message: "Thanks! We'll be in touch within 24 hours.",
  })
}
