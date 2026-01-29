import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from '@react-email/components'

interface ContactNotificationEmailProps {
  name: string
  email: string
  phone?: string
  message: string
}

export function ContactNotificationEmail({
  name,
  email,
  phone,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>
          </Section>

          {phone && (
            <Section style={section}>
              <Text style={label}>Phone:</Text>
              <Link href={`tel:${phone}`} style={link}>
                {phone}
              </Link>
            </Section>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Text style={footer}>
            Sent from RomAIx website contact form
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 48px 48px',
  borderRadius: '4px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  margin: '40px 0 20px',
  padding: '0',
}

const section = {
  marginBottom: '16px',
}

const label = {
  fontSize: '12px',
  color: '#666',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px',
}

const value = {
  fontSize: '16px',
  color: '#333',
  margin: '0',
}

const link = {
  color: '#587C74',
  textDecoration: 'none',
}

const messageStyle = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginTop: '32px',
}
