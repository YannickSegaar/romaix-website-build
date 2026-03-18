import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion'
import { Button } from '@/components/ui/button'
import {
  Search,
  FileText,
  BarChart3,
  Globe,
  Bot,
  Workflow,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services',
  description: `${SITE_NAME} services for tour operators and boutique hotels: SEO & GEO, AI content pipeline, analytics, programmatic landing pages, and website build.`,
  openGraph: {
    title: `Services | ${SITE_NAME}`,
    description:
      'Everything a travel business needs to dominate search, scale content, and grow direct bookings.',
  },
}

const services = [
  {
    icon: Search,
    title: 'SEO & GEO Optimization',
    desc: 'Rank on Google and surface in AI-generated answers. Structured data (JSON-LD), schema markup, dynamic sitemaps, and entity signals built for the travel vertical.',
    features: [
      'Organization, WebSite, LocalBusiness schema',
      'FAQ, Review, and BlogPosting markup',
      'Dynamic sitemap.xml including Ghost posts',
      'GEO: entity signals for ChatGPT / Google SGE',
      'Lighthouse SEO score ≥ 95 guaranteed',
    ],
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Globe,
    title: 'Programmatic Landing Pages',
    desc: 'Auto-generate ranking pages for every destination, tour type, and niche keyword combination. Turn your inventory into a search asset.',
    features: [
      'Destination × tour-type page matrix',
      'Unique, AI-written copy per page',
      'Dynamic internal linking',
      'LocalBusiness schema per location',
      'No duplicate content penalties',
    ],
    color: 'text-amber-600 bg-amber-100',
  },
  {
    icon: FileText,
    title: 'AI Content Pipeline',
    desc: 'Blog posts, destination guides, FAQs, and social copy — researched, written, and published automatically via your CMS.',
    features: [
      'Topic research aligned to buyer intent',
      'Ghost CMS integration',
      'On-brand tone and voice',
      '4–8 posts per month',
      'Human review before publish',
    ],
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    desc: 'GA4 dashboards, conversion tracking, and monthly reports showing exactly what is driving bookings — not vanity metrics.',
    features: [
      'GA4 property setup & configuration',
      'Contact form + CTA event tracking',
      'Monthly performance report',
      'Booking attribution insights',
      'Real-time traffic dashboard',
    ],
    color: 'text-green-600 bg-green-100',
  },
  {
    icon: Bot,
    title: 'AI Automation',
    desc: 'Stop drowning in repetitive tasks. We build AI agents that handle email triage, inquiry responses, booking follow-ups, and scheduling — 24/7.',
    features: [
      'AI email processing & routing',
      'WhatsApp / Instagram / Facebook DMs',
      'Multi-channel booking follow-ups',
      'Human-in-the-loop review workflows',
      'Reduces inbox volume by up to 60%',
    ],
    color: 'text-purple-600 bg-purple-100',
  },
  {
    icon: Workflow,
    title: 'Website Build & Migration',
    desc: 'Fast, accessible Next.js sites that score green on Core Web Vitals. Full Framer, Webflow, and WordPress migrations handled end-to-end.',
    features: [
      'Next.js 15 App Router + Vercel',
      'Core Web Vitals: LCP, FID, CLS all green',
      'Mobile-first, WCAG accessible',
      'Framer / Webflow / WordPress migration',
      'Staging deploy in 2 weeks',
    ],
    color: 'text-rose-600 bg-rose-100',
  },
]

const tiers = [
  {
    name: 'Starter',
    price: '$1,499',
    period: '/mo',
    desc: 'For boutique hotels and small tour operators getting started with digital marketing.',
    features: [
      'Website build (up to 6 pages)',
      'SEO setup + schema markup',
      '2 blog posts per month',
      'GA4 install & basic events',
      'Monthly report',
    ],
    cta: 'Get started',
    highlight: false,
    href: '/contact?type=assessment',
  },
  {
    name: 'Growth',
    price: '$2,999',
    period: '/mo',
    desc: 'For growing travel businesses ready to dominate local search and scale content.',
    features: [
      'Everything in Starter',
      'Unlimited pages',
      '8 blog posts + 4 destination guides/mo',
      'Programmatic landing pages',
      'GEO optimization',
      'Advanced conversion tracking',
      'AI automation (1 channel)',
    ],
    cta: 'Most popular',
    highlight: true,
    href: '/contact?type=demo',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For multi-property hotel groups, large tour operators, and DMOs.',
    features: [
      'Everything in Growth',
      'Dedicated account manager',
      'Custom integrations (PMS, booking engine)',
      'Multi-brand / multi-domain support',
      'AI automation (all channels)',
      'SLA and priority support',
    ],
    cta: 'Contact us',
    highlight: false,
    href: '/contact',
  },
]

export default function ServicesPage() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} Services`,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      description: s.desc,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background pt-16 md:pt-24 pb-12 px-4">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"
          aria-hidden="true"
        />
        <FadeIn className="relative container mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            For Tour Operators &amp; Boutique Hotels
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Services</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything a travel business needs to dominate search, scale content, and grow direct
            bookings — without the enterprise budget.
          </p>
        </FadeIn>
      </section>

      {/* Service cards */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-8">
          <StaggerContainer staggerDelay={0.08}>
            {services.map((s) => {
              const Icon = s.icon
              return (
                <StaggerItem key={s.title}>
                  <div className="group rounded-2xl border-2 border-border bg-card p-8 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div
                        className={`flex-shrink-0 inline-flex rounded-xl p-3 transition-all duration-300 group-hover:scale-110 ${s.color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold mb-3">{s.title}</h2>
                        <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-16 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
            <p className="mt-4 text-muted-foreground">No hidden fees. Cancel anytime.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.1}>
                <div
                  className={`rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
                    tier.highlight
                      ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/30 ring-2 ring-primary scale-[1.02]'
                      : 'bg-card border-2 border-border hover:border-primary/20 hover:shadow-xl'
                  }`}
                >
                  <h3 className="text-lg font-bold">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    {tier.period && (
                      <span className={`text-sm ${tier.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className={`mt-3 text-sm ${tier.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {tier.desc}
                  </p>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`h-4 w-4 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-primary-foreground/70' : 'text-primary'}`}
                        />
                        <span className={tier.highlight ? 'text-primary-foreground/90' : 'text-foreground/80'}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`mt-8 w-full group ${
                      tier.highlight
                        ? 'bg-white text-primary hover:bg-white/90'
                        : ''
                    }`}
                    variant={tier.highlight ? 'secondary' : 'default'}
                  >
                    <Link href={tier.href} className="flex items-center justify-center gap-2">
                      {tier.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <FadeIn className="max-w-xl mx-auto">
          <p className="text-muted-foreground text-lg">Not sure which plan is right for you?</p>
          <Button size="lg" asChild className="mt-6 group">
            <Link href="/contact" className="flex items-center gap-2">
              Talk to us — free consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </FadeIn>
      </section>
    </>
  )
}
