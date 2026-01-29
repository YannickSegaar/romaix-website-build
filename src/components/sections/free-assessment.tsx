import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion'
import { CheckCircle } from 'lucide-react'

export function FreeAssessment() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24 bg-muted/30">
      <FadeIn className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">
          Get Your Free AI Automation Assessment
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover exactly how much time and money you could save with custom AI automation.
          Our assessment is completely free with no strings attached.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Personalized Analysis</h3>
              <p className="text-sm text-muted-foreground">
                We analyze your specific workflows and pain points
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">ROI Projection</h3>
              <p className="text-sm text-muted-foreground">
                See estimated time and cost savings for your business
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Custom Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                Get a tailored plan for implementing automation
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact?type=assessment">Get Free Assessment</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact?type=demo">Or Book a Demo</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  )
}
