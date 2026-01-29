'use server'

import { demoSchema } from '@/lib/schemas/demo'
import { sendDemoNotification } from '@/lib/email'

export type DemoFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitDemoForm(
  data: unknown
): Promise<DemoFormState> {
  const parsed = demoSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Please check the form for errors',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await sendDemoNotification(parsed.data)
    return { success: true }
  } catch (error) {
    console.error('Demo form submission error:', error)
    return {
      success: false,
      error: 'Failed to submit request. Please try again.',
    }
  }
}
