'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from './service-data'
import { Check, ArrowRight, Bot } from 'lucide-react'

export function FloatingCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            COMMUNICATION CHANNELS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All Your Channels. One AI Brain.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hover over each channel to see how our AI handles real conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            const isExpanded = expandedId === service.id

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setExpandedId(service.id)}
                onMouseLeave={() => setExpandedId(null)}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: isExpanded ? 1.05 : 1,
                    y: isExpanded ? -10 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative overflow-hidden rounded-2xl border-2 bg-card p-6 cursor-pointer transition-colors ${
                    isExpanded
                      ? 'border-primary shadow-2xl shadow-primary/10'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  {/* Glow effect */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
                      />
                    )}
                  </AnimatePresence>

                  {/* Content */}
                  <div className="relative">
                    <div
                      className={`inline-flex p-3 rounded-xl ${service.color}/10 text-${service.color.replace('bg-', '')} mb-4`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>

                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          {/* Mockup preview */}
                          <div className="p-3 rounded-lg bg-muted/50 border border-border">
                            <div className="text-xs text-muted-foreground mb-1">
                              {service.mockup.title}
                            </div>
                            <p className="text-sm italic text-muted-foreground">
                              &ldquo;{service.mockup.scenario}&rdquo;
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="flex items-start gap-2">
                              <Bot className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <p className="text-sm">&ldquo;{service.mockup.response}&rdquo;</p>
                            </div>
                          </div>

                          {/* Features */}
                          <ul className="space-y-2">
                            {service.features.slice(0, 2).map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-primary shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : (
                        <motion.p
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm text-muted-foreground line-clamp-2"
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
