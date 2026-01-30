import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  StaggerContainer,
  StaggerItem,
  AnimatedButton,
} from '@/components/motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient for visual interest */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
        aria-hidden="true"
      />
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />

      <div className="container relative px-4 md:px-6 py-16 md:py-24 lg:py-32">
        <StaggerContainer
          staggerDelay={0.15}
          delayChildren={0.1}
          className="text-center max-w-4xl mx-auto"
        >
          <StaggerItem>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              AI Automation for{' '}
              <span className="relative text-primary">
                Travel Businesses
                {/* Gradient underline accent */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-[var(--accent-gold)]/60 to-primary/60 rounded-full"
                  aria-hidden="true"
                />
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Save 40+ hours per week. Automate customer service, bookings, and workflows
              with AI agents built for tour operators, travel agencies, and boutique hotels.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton>
                <Button
                  size="lg"
                  asChild
                  className="shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-shadow"
                >
                  <Link href="/contact?type=demo">Book a Demo</Link>
                </Button>
              </AnimatedButton>
              <AnimatedButton>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="hover:border-primary hover:text-primary transition-colors"
                >
                  <Link href="/contact?type=assessment">Get Free Assessment</Link>
                </Button>
              </AnimatedButton>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
