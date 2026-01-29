// Case study type - displayed on homepage showcase
export interface CaseStudy {
  id: string
  client: string
  industry: string
  metric: string // e.g., "Time Saved Weekly"
  metricValue: string // e.g., "40+ hours"
  description: string // Brief summary (1-2 sentences)
  slug: string // URL slug for future detail page
}

// FAQ item type
export interface FAQItem {
  question: string
  answer: string
}

// How It Works step type
export interface Step {
  number: string // e.g., "01", "02"
  title: string
  description: string
}

// Feature card for Solutions section
export interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string // Lucide icon name (e.g., "Bot", "Workflow", "Plug")
  isHero?: boolean // If true, card gets enhanced hover effects
}

// Integration platform for logo display
export interface Integration {
  name: string
  logo: string // Path to SVG icon (e.g., "/icons/whatsapp.svg")
}
