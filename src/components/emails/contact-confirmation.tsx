import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from '@react-email/components'

interface ContactConfirmationEmailProps {
  name: string
}

export function ContactConfirmationEmail({
  name,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thanks for reaching out!</Heading>

          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              We received your message and will get back to you within 24 hours.
            </Text>
            <Text style={text}>
              In the meantime, feel free to explore our case studies to see how
              we've helped other travel businesses save time and increase
              bookings with AI automation.
            </Text>
            <Text style={signature}>
              Best regards,
              <br />
              The RomAIx Team
            </Text>
          </Section>
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
  color: '#587C74',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  margin: '40px 0 20px',
}

const text = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '24px',
  margin: '16px 0',
}

const signature = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '24px',
  marginTop: '32px',
}
