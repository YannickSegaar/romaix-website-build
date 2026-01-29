'use server'

import { assessmentSchema } from '@/lib/schemas/assessment'
import { sendAssessmentNotification } from '@/lib/email'

export type AssessmentFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitAssessmentForm(
  data: unknown
): Promise<AssessmentFormState> {
  const parsed = assessmentSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Please check the form for errors',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await sendAssessmentNotification(parsed.data)
    return { success: true }
  } catch (error) {
    console.error('Assessment form submission error:', error)
    return {
      success: false,
      error: 'Failed to submit request. Please try again.',
    }
  }
}
