'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { services } from './service-data'
import { Check, Bot, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HorizontalCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.carousel-card')
    cards[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    setCurrentIndex(index)
  }

  const next = () => scrollToIndex(Math.min(currentIndex + 1, services.length - 1))
  const prev = () => scrollToIndex(Math.max(currentIndex - 1, 0))

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-amber-500/5" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            COMMUNICATION CHANNELS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Swipe Through Your AI Workforce
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each channel has its own specialized AI agent, working together seamlessly.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            disabled={currentIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={next}
            disabled={currentIndex === services.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:px-[calc(50%-20rem)]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="carousel-card flex-shrink-0 w-[90vw] md:w-[40rem] snap-center"
              >
                <div className="h-full overflow-hidden rounded-3xl border-2 border-border bg-card shadow-xl">
                  {/* Top colored bar */}
                  <div className={`h-2 ${service.color}`} />

                  <div className="p-8 md:p-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left: Info */}
                      <div className="space-y-6">
                        <div
                          className={`inline-flex p-4 rounded-2xl ${service.color}/10`}
                        >
                          <Icon className={`h-8 w-8 ${service.color.replace('bg-', 'text-')}`} />
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                        </div>

                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-sm">
                              <Check className="h-4 w-4 text-primary shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Mockup */}
                      <div className="relative">
                        <div className={`absolute inset-0 ${service.color}/10 blur-2xl rounded-full`} />

                        <div className="relative rounded-xl border border-border bg-background/80 backdrop-blur overflow-hidden">
                          {/* Header */}
                          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">
                              {service.mockup.title}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="p-4 space-y-3">
                            <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                              <p className="italic">&ldquo;{service.mockup.scenario}&rdquo;</p>
                            </div>

                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                              <div className="flex items-start gap-2">
                                <Bot className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <p className="text-sm">&ldquo;{service.mockup.response}&rdquo;</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Sent
                              </span>
                              <span>0.4s latency</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
