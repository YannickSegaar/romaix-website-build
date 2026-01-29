import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion'
import { steps } from '@/data/how-it-works'

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From discovery to deployment in weeks, not months
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.number} className="text-center">
              {/* Large step number as visual anchor */}
              <div className="text-5xl md:text-6xl font-bold text-primary/20 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
