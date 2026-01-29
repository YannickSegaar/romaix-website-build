import { Resend } from 'resend'
import { ContactNotificationEmail } from '@/components/emails/contact-notification'
import { ContactConfirmationEmail } from '@/components/emails/contact-confirmation'
import { AssessmentNotificationEmail } from '@/components/emails/assessment-notification'

const resend = new Resend(process.env.RESEND_API_KEY)

// Use Resend's test domain during development
// For production, verify your domain at https://resend.com/domains
const FROM_EMAIL = process.env.NODE_ENV === 'production'
  ? 'RomAIx <noreply@romaix.com>'
  : 'RomAIx <onboarding@resend.dev>'

export async function sendContactNotification(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'leads@romaix.com'

  // Send notification to business
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [notificationEmail],
    subject: `New Contact: ${data.name}`,
    react: ContactNotificationEmail(data),
  })

  // Send confirmation to user
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [data.email],
    subject: 'Thanks for contacting RomAIx',
    react: ContactConfirmationEmail({ name: data.name }),
  })
}

export async function sendAssessmentNotification(data: {
  name: string
  email: string
  company: string
  phone?: string
  businessType: string
  currentChallenges: string
  monthlyInquiries?: string
}) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'leads@romaix.com'

  // Send notification to business
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [notificationEmail],
    subject: `Free Assessment Request: ${data.company}`,
    react: AssessmentNotificationEmail(data),
  })

  // Send confirmation to user
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [data.email],
    subject: 'Your Free Assessment Request - RomAIx',
    react: ContactConfirmationEmail({ name: data.name }),
  })
}

export async function sendDemoNotification(data: {
  name: string
  email: string
  company: string
  phone?: string
  preferredTime?: string
  notes?: string
}) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'leads@romaix.com'

  // Send notification to business
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [notificationEmail],
    subject: `Demo Request: ${data.company}`,
    text: `
New Demo Request

Contact: ${data.name}
Email: ${data.email}
Company: ${data.company}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.preferredTime ? `Preferred Time: ${data.preferredTime}` : ''}
${data.notes ? `Notes: ${data.notes}` : ''}

--
Demo Request from RomAIx website
    `.trim(),
  })

  // Send confirmation to user
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [data.email],
    subject: 'Demo Request Received - RomAIx',
    react: ContactConfirmationEmail({ name: data.name }),
  })
}
