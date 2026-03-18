'use client'

import { motion } from 'framer-motion'
import { services } from './service-data'
import { Check, Bot, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function BentoGrid() {
  const [email, chat, phone, dashboard] = services

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            COMMUNICATION CHANNELS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Complete AI Communication Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four specialized agents working together. One unified experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* Email - Large card spanning 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 group"
          >
            <div className="h-full p-6 md:p-8 rounded-3xl border-2 border-border bg-gradient-to-br from-blue-500/5 to-transparent hover:border-blue-500/30 transition-all">
              <div className="grid md:grid-cols-2 gap-6 h-full">
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-xl bg-blue-500/10">
                    <email.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold">{email.title}</h3>
                  <p className="text-muted-foreground">{email.description}</p>
                  <ul className="space-y-2">
                    {email.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-blue-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
                  <div className="relative rounded-xl border border-border bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">inbox_ai</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="p-3 rounded-lg bg-muted/30 text-sm">
                        <div className="text-xs text-muted-foreground mb-1">{email.mockup.title}</div>
                        <p className="text-muted-foreground italic">&ldquo;{email.mockup.scenario}&rdquo;</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                        <div className="flex items-start gap-2">
                          <Bot className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          <p className="text-sm">&ldquo;{email.mockup.response}&rdquo;</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat - Tall card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="row-span-2 group"
          >
            <div className="h-full p-6 rounded-3xl border-2 border-border bg-gradient-to-b from-green-500/5 to-transparent hover:border-green-500/30 transition-all flex flex-col">
              <div className="inline-flex p-3 rounded-xl bg-green-500/10 self-start mb-4">
                <chat.icon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{chat.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{chat.description}</p>

              {/* Chat mockup */}
              <div className="flex-1 rounded-xl border border-border bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="px-3 py-2 border-b border-border/50 flex items-center gap-2 bg-green-500/5">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <chat.icon className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">WhatsApp</div>
                    <div className="text-xs text-green-500">Online</div>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] p-2 rounded-lg bg-muted text-sm">
                      {chat.mockup.scenario}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-2 rounded-lg bg-green-500/10 text-sm">
                      {chat.mockup.response}
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mt-4">
                {chat.features.slice(0, 2).map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Phone - Medium card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="h-full p-6 rounded-3xl border-2 border-border bg-gradient-to-br from-purple-500/5 to-transparent hover:border-purple-500/30 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-purple-500/10 mb-4">
                <phone.icon className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{phone.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{phone.description}</p>

              <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                <div className="text-xs text-muted-foreground mb-1">Missed Call → AI Response</div>
                <p className="text-sm">&ldquo;{phone.mockup.response}&rdquo;</p>
              </div>
            </div>
          </motion.div>

          {/* Dashboard - Wide card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <div className="h-full p-6 rounded-3xl border-2 border-border bg-gradient-to-br from-amber-500/5 to-transparent hover:border-amber-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex p-3 rounded-xl bg-amber-500/10">
                  <dashboard.icon className="h-6 w-6 text-amber-500" />
                </div>
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{dashboard.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{dashboard.description}</p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-bold text-primary">47</div>
                  <div className="text-xs text-muted-foreground">Today</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-bold text-green-500">94%</div>
                  <div className="text-xs text-muted-foreground">Auto</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-bold text-amber-500">12m</div>
                  <div className="text-xs text-muted-foreground">Avg</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild className="group">
            <Link href="/contact?type=demo">
              See All Channels in Action
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
