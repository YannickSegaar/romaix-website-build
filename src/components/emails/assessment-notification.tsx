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

interface AssessmentNotificationEmailProps {
  name: string
  email: string
  company: string
  phone?: string
  businessType: string
  currentChallenges: string
  monthlyInquiries?: string
}

const businessTypeLabels: Record<string, string> = {
  tour_operator: 'Tour Operator',
  travel_agency: 'Travel Agency',
  boutique_hotel: 'Boutique Hotel',
  other: 'Other',
}

const inquiryLabels: Record<string, string> = {
  under_100: 'Under 100',
  '100_500': '100-500',
  '500_1000': '500-1,000',
  over_1000: 'Over 1,000',
}

export function AssessmentNotificationEmail({
  name,
  email,
  company,
  phone,
  businessType,
  currentChallenges,
  monthlyInquiries,
}: AssessmentNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Free Assessment Request</Heading>
          <Text style={subtitle}>High-intent lead - respond within 24 hours</Text>

          <Section style={section}>
            <Text style={label}>Contact</Text>
            <Text style={value}>{name}</Text>
            <Link href={`mailto:${email}`} style={link}>{email}</Link>
            {phone && <Text style={value}>{phone}</Text>}
          </Section>

          <Section style={section}>
            <Text style={label}>Company</Text>
            <Text style={value}>{company}</Text>
            <Text style={badge}>{businessTypeLabels[businessType] || businessType}</Text>
          </Section>

          {monthlyInquiries && (
            <Section style={section}>
              <Text style={label}>Monthly Customer Inquiries</Text>
              <Text style={value}>{inquiryLabels[monthlyInquiries] || monthlyInquiries}</Text>
            </Section>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Current Challenges</Text>
            <Text style={challengesStyle}>{currentChallenges}</Text>
          </Section>

          <Text style={footer}>
            Free Assessment Request from RomAIx website
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
  margin: '40px 0 8px',
}

const subtitle = {
  color: '#587C74',
  fontSize: '14px',
  margin: '0 0 24px',
}

const section = {
  marginBottom: '20px',
}

const label = {
  fontSize: '12px',
  color: '#666',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px',
}

const value = {
  fontSize: '16px',
  color: '#333',
  margin: '0 0 4px',
}

const link = {
  color: '#587C74',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '4px',
}

const badge = {
  display: 'inline-block',
  backgroundColor: '#587C74',
  color: '#fff',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '4px',
  marginTop: '8px',
}

const challengesStyle = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f9fafb',
  padding: '16px',
  borderRadius: '4px',
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
