import type { FeatureCard, Integration } from '@/types/content'

// Feature cards for Solutions section
// 3 hero cards (with enhanced hover) + 3 supporting cards
export const FEATURES: FeatureCard[] = [
  // Hero cards (isHero: true)
  {
    id: 'ai-agents',
    title: 'AI Booking Agents',
    description:
      'Intelligent agents that handle booking inquiries 24/7, answering questions and guiding customers through the reservation process.',
    icon: 'Bot',
    isHero: true,
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description:
      'Automate repetitive tasks like booking confirmations, follow-ups, and payment reminders to save hours every week.',
    icon: 'Workflow',
    isHero: true,
  },
  {
    id: 'integrations',
    title: 'Platform Integrations',
    description:
      'Connect your existing tools seamlessly. We integrate with booking systems, CRMs, and communication platforms.',
    icon: 'Plug',
    isHero: true,
  },
  // Supporting cards
  {
    id: 'multi-channel',
    title: 'Multi-Channel Support',
    description:
      'Manage conversations across WhatsApp, Instagram, Facebook, and email from a single dashboard.',
    icon: 'MessageSquare',
  },
  {
    id: 'analytics',
    title: 'Smart Analytics',
    description:
      'Track response times, conversion rates, and customer satisfaction with real-time dashboards.',
    icon: 'BarChart3',
  },
  {
    id: 'custom-flows',
    title: 'Custom Conversation Flows',
    description:
      'Design personalized customer journeys that match your brand voice and business processes.',
    icon: 'GitBranch',
  },
]

// Integration platform logos
// Note: Icons will be placeholder divs initially, replaced with real SVGs later
export const INTEGRATIONS: Integration[] = [
  { name: 'WhatsApp', logo: '/icons/whatsapp.svg' },
  { name: 'Instagram', logo: '/icons/instagram.svg' },
  { name: 'Facebook', logo: '/icons/facebook.svg' },
  { name: 'Messenger', logo: '/icons/messenger.svg' },
  { name: 'Email', logo: '/icons/email.svg' },
  { name: 'Zapier', logo: '/icons/zapier.svg' },
  { name: 'HubSpot', logo: '/icons/hubspot.svg' },
  { name: 'Salesforce', logo: '/icons/salesforce.svg' },
]
