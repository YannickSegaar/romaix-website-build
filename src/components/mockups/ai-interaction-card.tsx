'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MessageSquare, Phone, Check, Loader2, Calendar, Bot } from 'lucide-react'

interface InteractionStep {
  icon: React.ReactNode
  label: string
  status: 'pending' | 'active' | 'complete'
}

interface AIInteraction {
  id: string
  channel: 'email' | 'chat' | 'phone'
  channelIcon: React.ReactNode
  title: string
  subtitle: string
  message: string
  aiResponse: string
  integration: string
  latency: string
}

// 6 interactions aligned with hero data:
// Index 0: ATV desert - Adventure Tours - Email inquiry - "the emails"
// Index 1: Helicopter - Helicopter Tours - Chat message - "the bookings"
// Index 2: Ski slopes - Ski Schools - Phone voicemail - "the inquiries"
// Index 3: Surfing - Surf Schools - Email inquiry - "the follow-ups"
// Index 4: Tour bus - Tour Operators - Chat message - "the scheduling"
// Index 5: Boutique hotel - Boutique Hotels - Phone voicemail - "the support"
const interactions: AIInteraction[] = [
  {
    id: 'email-adventure',
    channel: 'email',
    channelIcon: <Mail className="h-4 w-4" />,
    title: 'Group ATV Booking',
    subtitle: 'Email Inquiry',
    message: 'Hi, we have a group of 12 interested in the sunset desert ATV tour next Saturday...',
    aiResponse: 'Hi! Yes, we have spots available for the sunset ATV tour on Saturday. I\'ve reserved 12 spots for you. Would you like me to send the booking confirmation?',
    integration: 'Gmail + HubSpot',
    latency: '0.8s',
  },
  {
    id: 'chat-helicopter',
    channel: 'chat',
    channelIcon: <MessageSquare className="h-4 w-4" />,
    title: 'Helicopter Availability',
    subtitle: 'WhatsApp Message',
    message: 'Do you have any spots left for the mountain helicopter tour on March 12th?',
    aiResponse: 'Yes, we have 4 spots left for the Mountain Helicopter Tour on March 12th. Would you like to reserve? I can hold them for 24 hours.',
    integration: 'WhatsApp + Calendar',
    latency: '0.4s',
  },
  {
    id: 'phone-ski',
    channel: 'phone',
    channelIcon: <Phone className="h-4 w-4" />,
    title: 'Ski Lesson Inquiry',
    subtitle: 'Voicemail Transcribed',
    message: 'Caller asked about winter ski packages and group discounts for 8 people...',
    aiResponse: 'Sent SMS: "Thanks for calling! Our ski packages start at €299/person with 15% group discount for 8+. Book online or I\'ll call you back within 2 hours."',
    integration: 'Twilio + Notion',
    latency: '1.2s',
  },
  {
    id: 'email-surf',
    channel: 'email',
    channelIcon: <Mail className="h-4 w-4" />,
    title: 'Surf Lesson Follow-up',
    subtitle: 'Email Inquiry',
    message: 'Following up on our surf lesson inquiry from last week. Is the beginner group still available?',
    aiResponse: 'Great news! The beginner surf group on the 15th still has 3 spots. I\'ve attached our waiver form and sent a calendar invite. Reply to confirm!',
    integration: 'Gmail + Calendly',
    latency: '0.6s',
  },
  {
    id: 'chat-tour',
    channel: 'chat',
    channelIcon: <MessageSquare className="h-4 w-4" />,
    title: 'Tour Scheduling',
    subtitle: 'WhatsApp Message',
    message: 'Can we reschedule our city tour from Tuesday to Thursday same time?',
    aiResponse: 'Done! I\'ve moved your city tour to Thursday at 10 AM. Same pickup location. Updated confirmation sent to your email.',
    integration: 'WhatsApp + Google Calendar',
    latency: '0.3s',
  },
  {
    id: 'phone-hotel',
    channel: 'phone',
    channelIcon: <Phone className="h-4 w-4" />,
    title: 'Hotel Support Call',
    subtitle: 'Voicemail Transcribed',
    message: 'Guest asking about late checkout options and spa availability for tomorrow...',
    aiResponse: 'Sent SMS: "Late checkout until 2 PM is available for €30. Spa has openings at 11 AM and 3 PM tomorrow. Reply 1 for checkout, 2 for spa, or 3 for both!"',
    integration: 'Twilio + PMS',
    latency: '0.9s',
  },
]

// Phase timing within 6-second cycle:
// 0-1.5s: Message appears (message phase)
// 1.5-3s: Processing animation (processing phase)
// 3-5s: AI Response appears (response phase)
// 5-6s: Sync to CRM indicator (sync phase)
const PHASE_TIMINGS = {
  message: 0,      // Start immediately
  processing: 1500, // 1.5s
  response: 3000,   // 3s
  sync: 5000,       // 5s
}

function StepIndicator({ step, index }: { step: InteractionStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
        step.status === 'complete'
          ? 'bg-primary/10 text-primary'
          : step.status === 'active'
            ? 'bg-amber-500/10 text-amber-600'
            : 'bg-muted text-muted-foreground'
      }`}
    >
      {step.status === 'complete' ? (
        <Check className="h-3.5 w-3.5" />
      ) : step.status === 'active' ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        step.icon
      )}
      <span>{step.label}</span>
    </motion.div>
  )
}

interface AIInteractionCardProps {
  /** Controlled index from parent (0-5), synced with master hero cycle */
  currentIndex?: number
}

export function AIInteractionCard({ currentIndex: controlledIndex }: AIInteractionCardProps = {}) {
  const [internalIndex, setInternalIndex] = useState(0)

  // Use controlled index if provided, otherwise use internal state
  const isControlled = controlledIndex !== undefined
  const activeIndex = isControlled ? controlledIndex : internalIndex

  const current = interactions[activeIndex]

  // For uncontrolled mode, cycle to next interaction
  useEffect(() => {
    if (isControlled) return

    const cycleTimeout = setTimeout(() => {
      setInternalIndex((prev) => (prev + 1) % interactions.length)
    }, 6000)

    return () => clearTimeout(cycleTimeout)
  }, [internalIndex, isControlled])

  return (
    <AIInteractionCardInner
      key={activeIndex}
      interaction={current}
    />
  )
}

// Inner component that resets its phase state when key changes
function AIInteractionCardInner({ interaction }: { interaction: AIInteraction }) {
  const [animationPhase, setAnimationPhase] = useState<'message' | 'processing' | 'response' | 'sync'>('message')

  // Phase progression within the 6-second cycle
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    // Schedule phase transitions
    const processingTimeout = setTimeout(() => {
      setAnimationPhase('processing')
    }, PHASE_TIMINGS.processing)
    timeouts.push(processingTimeout)

    const responseTimeout = setTimeout(() => {
      setAnimationPhase('response')
    }, PHASE_TIMINGS.response)
    timeouts.push(responseTimeout)

    const syncTimeout = setTimeout(() => {
      setAnimationPhase('sync')
    }, PHASE_TIMINGS.sync)
    timeouts.push(syncTimeout)

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [])

  const steps: InteractionStep[] = [
    {
      icon: interaction.channelIcon,
      label: interaction.subtitle,
      status: animationPhase === 'message' ? 'active' : 'complete',
    },
    {
      icon: <Bot className="h-3.5 w-3.5" />,
      label: 'AI Processing',
      status:
        animationPhase === 'processing'
          ? 'active'
          : animationPhase === 'response' || animationPhase === 'sync'
            ? 'complete'
            : 'pending',
    },
    {
      icon: <Calendar className="h-3.5 w-3.5" />,
      label: 'Syncing to CRM',
      status: animationPhase === 'sync' ? 'active' : 'pending',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative w-full max-w-md"
    >
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-2xl shadow-black/5">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-primary/5 pointer-events-none" />

        {/* Header */}
        <div className="relative px-5 py-4 border-b border-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                system_status: active
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5 space-y-4">
          {/* Channel indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {interaction.channelIcon}
              <span>{interaction.title}</span>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex flex-wrap gap-2">
            {steps.map((step, i) => (
              <StepIndicator key={i} step={step} index={i} />
            ))}
          </div>

          {/* Message */}
          <AnimatePresence mode="wait">
            {(animationPhase === 'message' || animationPhase === 'processing') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground"
              >
                <p className="italic">&ldquo;{interaction.message}&rdquo;</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Response */}
          <AnimatePresence mode="wait">
            {(animationPhase === 'response' || animationPhase === 'sync') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-lg bg-primary/5 border border-primary/10"
              >
                <div className="flex items-start gap-2">
                  <Bot className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm">&ldquo;{interaction.aiResponse}&rdquo;</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="relative px-5 py-3 border-t border-black/5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Integration: {interaction.integration}</span>
          <span>Latency: {interaction.latency}</span>
        </div>
      </div>
    </motion.div>
  )
}
