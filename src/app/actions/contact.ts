'use server'

import { headers } from 'next/headers'
import { contactSchema } from '@/lib/schemas/contact'
import { sendContactNotification } from '@/lib/email'

export type ContactFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitContactForm(
  data: unknown
): Promise<ContactFormState> {
  // Server-side validation (same schema as client)
  const parsed = contactSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Please check the form for errors',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  // Rate limiting by IP (basic implementation)
  const headersList = await headers()
  const ip = (headersList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  // TODO: For production, implement proper rate limiting with Upstash
  // For now, we rely on honeypot and server validation

  try {
    await sendContactNotification(parsed.data)
    return { success: true }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      success: false,
      error: 'Failed to send message. Please try again.',
    }
  }
}
