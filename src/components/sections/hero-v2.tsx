'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem, AnimatedButton } from '@/components/motion'
import { TypingAnimation } from '@/components/motion/typing-animation'
import { AIInteractionCard } from '@/components/mockups/ai-interaction-card'
import { ArrowRight } from 'lucide-react'

const typingWords = [
  'the emails',
  'the bookings',
  'the follow-ups',
  'the scheduling',
  'the inquiries',
  'the support',
]

export function HeroV2() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/[0.02] to-amber-50/30" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl opacity-60" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="container relative px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <StaggerContainer staggerDelay={0.15} delayChildren={0.1} className="text-left">
            <StaggerItem>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                FOR TRAVEL & TOURISM OPERATORS
              </span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Reclaim Your{' '}
                <span className="text-primary">Passion</span>.
                <br />
                Automate{' '}
                <span className="text-primary/80">
                  <TypingAnimation words={typingWords} />
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
                Stop drowning in emails and repetitive tasks. We build AI systems
                that feel human, so you can focus on the adventure.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <AnimatedButton>
                  <Button
                    size="lg"
                    asChild
                    className="shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all group"
                  >
                    <Link href="/contact?type=demo" className="flex items-center gap-2">
                      Start Building
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </AnimatedButton>
                <AnimatedButton>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="hover:border-primary hover:text-primary transition-colors"
                  >
                    <Link href="/case-studies">See Case Studies</Link>
                  </Button>
                </AnimatedButton>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right: Interactive Mockup */}
          <div className="relative lg:pl-8">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-amber-300/20 to-transparent rounded-full blur-2xl" />

            <AIInteractionCard />
          </div>
        </div>
      </div>
    </section>
  )
}
