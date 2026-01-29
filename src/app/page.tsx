import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/motion"

export default function Home() {
  return (
    <div className="container py-16 md:py-24">
      <FadeIn>
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            AI Automation for the{' '}
            <span className="text-primary">Travel Industry</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Custom AI solutions for tour operators, travel agencies, and boutique hotels.
            Automate customer service, bookings, and workflows.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Book a Demo</Button>
            <Button size="lg" variant="outline">Get Free Assessment</Button>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
