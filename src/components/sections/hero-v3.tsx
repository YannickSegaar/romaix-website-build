'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem, AnimatedButton, MorphingText } from '@/components/motion'
import { AIInteractionCard } from '@/components/mockups/ai-interaction-card'
import { useHeroCycle } from '@/hooks/use-hero-cycle'
import { ArrowRight } from 'lucide-react'

// Travel industry background images aligned with AI interactions
// Index 0: ATV desert - Adventure Tours - "the emails"
// Index 1: Helicopter - Helicopter Tours - "the bookings"
// Index 2: Ski slopes - Ski Schools - "the inquiries"
// Index 3: Surfing - Surf Schools - "the follow-ups"
// Index 4: Tour bus - Tour Operators - "the scheduling"
// Index 5: Boutique hotel - Boutique Hotels - "the support"
const travelImages = [
  {
    src: '/images/hero/atv-tour.jpg',
    alt: 'ATV desert tour',
    industry: 'Adventure Tours',
  },
  {
    src: '/images/hero/helicopter-tour.jpg',
    alt: 'Helicopter mountain tour',
    industry: 'Helicopter Tours',
  },
  {
    src: '/images/hero/ski-school.jpg',
    alt: 'Ski school on snowy mountain',
    industry: 'Ski Schools',
  },
  {
    src: '/images/hero/surf-lesson.jpg',
    alt: 'Surfing lesson at beach',
    industry: 'Surf Schools',
  },
  {
    src: '/images/hero/tour-bus.jpg',
    alt: 'Tour bus in scenic location',
    industry: 'Tour Operators',
  },
  {
    src: '/images/hero/boutique-hotel.jpg',
    alt: 'Boutique hotel exterior',
    industry: 'Boutique Hotels',
  },
]

// Words aligned with each industry/background
const morphingWords = [
  'the emails',      // Adventure Tours
  'the bookings',    // Helicopter Tours
  'the inquiries',   // Ski Schools
  'the follow-ups',  // Surf Schools
  'the scheduling',  // Tour Operators
  'the support',     // Boutique Hotels
]

export function HeroV3() {
  const { currentIndex, setIndex } = useHeroCycle()

  const currentImage = travelImages[currentIndex]

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Morphing background images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background image with fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-amber-50/50 to-white">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </div>

            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80" />
          </motion.div>
        </AnimatePresence>

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="container relative px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <StaggerContainer staggerDelay={0.15} delayChildren={0.1} className="text-left">
            <StaggerItem>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  FOR TRAVEL & TOURISM OPERATORS
                </span>
                {/* Current industry indicator */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-medium"
                  >
                    {currentImage.industry}
                  </motion.span>
                </AnimatePresence>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Reclaim Your{' '}
                <span className="text-primary">Passion</span>.
                <br />
                Automate{' '}
                <span className="text-primary/80">
                  <MorphingText words={morphingWords} currentIndex={currentIndex} />
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
                    className="hover:border-primary hover:text-primary transition-colors bg-white/50 backdrop-blur-sm"
                  >
                    <Link href="/case-studies">See Case Studies</Link>
                  </Button>
                </AnimatedButton>
              </div>
            </StaggerItem>

            {/* Image navigation dots */}
            <StaggerItem>
              <div className="mt-8 flex items-center gap-2">
                <span className="text-xs text-muted-foreground mr-2">Industries:</span>
                {travelImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex
                        ? 'bg-primary w-6'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`View ${travelImages[i].industry}`}
                  />
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right: Interactive Mockup */}
          <div className="relative lg:pl-8">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-amber-400/30 to-transparent rounded-full blur-2xl" />

            <AIInteractionCard currentIndex={currentIndex} />
          </div>
        </div>
      </div>
    </section>
  )
}
