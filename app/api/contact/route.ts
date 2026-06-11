import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body as {
      name?: string
      email?: string
      message?: string
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
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

    // Production: wire to Resend, SendGrid, or similar
    console.log('Contact form submission:', {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      receivedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Thanks! We'll be in touch within 24 hours.",
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
