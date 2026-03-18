import { Mail, MessageSquare, Phone, LayoutDashboard } from 'lucide-react'

export interface Service {
  id: string
  title: string
  shortTitle: string
  description: string
  icon: typeof Mail
  color: string
  features: string[]
  mockup: {
    title: string
    scenario: string
    response: string
  }
}

export const services: Service[] = [
  {
    id: 'email',
    title: 'Email AI Agents',
    shortTitle: 'Email',
    description:
      'Automatically draft responses, handle inquiries, and manage your inbox. Your AI learns your tone and handles routine emails while flagging important ones.',
    icon: Mail,
    color: 'bg-blue-500',
    features: [
      'Auto-draft responses in your voice',
      'Smart inbox prioritization',
      'Booking confirmation automation',
      'Follow-up sequences',
    ],
    mockup: {
      title: 'New Group Inquiry',
      scenario: 'Sarah asked about availability for 12 guests on the sunset tour...',
      response: 'Hi Sarah! Great news - we have spots available. I\'ve tentatively reserved 12 places for you...',
    },
  },
  {
    id: 'chat',
    title: 'Web Chat Agents',
    shortTitle: 'Chat',
    description:
      'Instant responses on WhatsApp, website chat, and social media. Never miss a lead, even at 3am. Seamlessly hands off to humans when needed.',
    icon: MessageSquare,
    color: 'bg-green-500',
    features: [
      'WhatsApp Business integration',
      'Website live chat widget',
      'Instagram & Facebook DMs',
      'Smart human handoff',
    ],
    mockup: {
      title: 'WhatsApp Message',
      scenario: 'Do you have any spots left for the Alpine tour on March 12th?',
      response: 'Yes! We have 4 spots left for March 12th. Would you like me to reserve them for you?',
    },
  },
  {
    id: 'phone',
    title: 'Phone AI Agents',
    shortTitle: 'Phone',
    description:
      'AI-powered call handling that sounds natural. Transcribes voicemails, handles common questions, and schedules callbacks for complex inquiries.',
    icon: Phone,
    color: 'bg-purple-500',
    features: [
      'Natural voice interactions',
      'Voicemail transcription',
      'Automated callbacks',
      'Call routing & scheduling',
    ],
    mockup: {
      title: 'Missed Call Handled',
      scenario: 'Caller asked about winter ski packages for 8 people...',
      response: 'SMS sent: "Thanks for calling! Winter packages start at €299/person with 15% group discount..."',
    },
  },
  {
    id: 'dashboard',
    title: 'Unified Dashboard',
    shortTitle: 'Dashboard',
    description:
      'See all your communication channels in one place. Track response times, customer satisfaction, and automation performance.',
    icon: LayoutDashboard,
    color: 'bg-amber-500',
    features: [
      'All channels in one view',
      'Real-time analytics',
      'Conversation history',
      'Team collaboration tools',
    ],
    mockup: {
      title: 'Today\'s Overview',
      scenario: '47 conversations handled • 94% automated • 12 mins avg response',
      response: '3 conversations need human review. Click to see priority items.',
    },
  },
]
