import type { CaseStudy } from '@/types/content'

export const caseStudies: CaseStudy[] = [
  {
    id: 'adventure-tours',
    client: 'Adventure Tours Co',
    industry: 'Tour Operator',
    metric: 'Response Time Reduced',
    metricValue: '85%',
    description:
      'Automated customer inquiries and booking confirmations, reducing average response time from 4 hours to under 30 minutes.',
    slug: 'adventure-tours',
  },
  {
    id: 'coastal-retreats',
    client: 'Coastal Retreats',
    industry: 'Boutique Hotels',
    metric: 'Hours Saved Weekly',
    metricValue: '40+',
    description:
      'AI-powered guest communication and booking management freed staff to focus on exceptional in-person experiences.',
    slug: 'coastal-retreats',
  },
  {
    id: 'euro-expeditions',
    client: 'Euro Expeditions',
    industry: 'Travel Agency',
    metric: 'Booking Conversion',
    metricValue: '+32%',
    description:
      'Intelligent lead nurturing and automated follow-ups increased booking conversions from inquiries.',
    slug: 'euro-expeditions',
  },
]
