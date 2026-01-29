import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion'

export function Hero() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24 lg:py-32">
      <FadeIn className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          AI Automation for{' '}
          <span className="text-primary">Travel Businesses</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Save 40+ hours per week. Automate customer service, bookings, and workflows
          with AI agents built for tour operators, travel agencies, and boutique hotels.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact?type=demo">Book a Demo</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact?type=assessment">Get Free Assessment</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  )
}
