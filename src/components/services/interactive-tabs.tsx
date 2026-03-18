'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from './service-data'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IPhoneMockup, PhoneScreenContent } from '@/components/mockups/iphone-mockup'

export function InteractiveTabs() {
  const [activeTab, setActiveTab] = useState(services[0].id)
  const [isPaused, setIsPaused] = useState(false)
  const activeService = services.find((s) => s.id === activeTab)!

  // Auto-cycle through tabs
  const nextTab = useCallback(() => {
    const currentIndex = services.findIndex((s) => s.id === activeTab)
    const nextIndex = (currentIndex + 1) % services.length
    setActiveTab(services[nextIndex].id)
  }, [activeTab])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextTab()
    }, 5000) // Change tab every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, nextTab])

  // Pause on user interaction, resume after delay
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    setIsPaused(true)
    // Resume auto-cycle after 10 seconds of no interaction
    setTimeout(() => setIsPaused(false), 10000)
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            COMMUNICATION CHANNELS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pick a Channel. Watch AI Work.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click each channel to see a live demo of our AI in action.
          </p>
        </div>

        {/* Tab buttons with progress indicator */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            const isActive = activeTab === service.id

            return (
              <button
                key={service.id}
                onClick={() => handleTabClick(service.id)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setTimeout(() => setIsPaused(false), 3000)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all overflow-hidden ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Progress bar for active tab */}
                {isActive && !isPaused && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary-foreground/30"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    key={activeTab}
                  />
                )}
                <Icon className="h-4 w-4" />
                {service.shortTitle}
              </button>
            )
          })}
        </div>

        {/* Content area */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Left: Description */}
              <div className="space-y-6">
                <div>
                  <div
                    className={`inline-flex p-4 rounded-2xl ${activeService.color}/10 mb-4`}
                  >
                    <activeService.icon className={`h-8 w-8 ${activeService.color.replace('bg-', 'text-')}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{activeService.title}</h3>
                  <p className="text-muted-foreground">{activeService.description}</p>
                </div>

                <ul className="space-y-3">
                  {activeService.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button asChild className="group">
                  <Link href="/contact?type=demo">
                    See Full Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              {/* Right: iPhone Mockup */}
              <div className="relative flex justify-center">
                {/* Decorative glow */}
                <div className={`absolute inset-0 ${activeService.color}/20 blur-3xl rounded-full scale-75`} />

                {/* iPhone with screen content */}
                <motion.div
                  initial={{ scale: 0.95, rotateY: -5 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <IPhoneMockup>
                    <PhoneScreenContent
                      channel={activeService.id as 'email' | 'chat' | 'phone' | 'dashboard'}
                      title={activeService.mockup.title}
                      scenario={activeService.mockup.scenario}
                      response={activeService.mockup.response}
                    />
                  </IPhoneMockup>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
