import { Resend } from 'resend'
import { ContactNotificationEmail } from '@/components/emails/contact-notification'
import { ContactConfirmationEmail } from '@/components/emails/contact-confirmation'

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
