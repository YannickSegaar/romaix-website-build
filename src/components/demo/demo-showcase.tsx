'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { HeroV2 } from '@/components/sections/hero-v2'
import { HeroV3 } from '@/components/sections/hero-v3'
import {
  FloatingCards,
  InteractiveTabs,
  HorizontalCarousel,
  BentoGrid,
} from '@/components/services'
import { SocialProof } from '@/components/sections/social-proof'
import { WorkflowSection } from '@/components/sections/workflow-section'
import { IPhoneChatMockup } from '@/components/mockups/iphone-chat-mockup'
import { GlassMorphCard } from './glass-morph-card'
import { AnimatedGradientOrb } from './animated-gradient-orb'
import { FloatingBadge } from './floating-badge'

const sections: { id: string; label: string; badge: string; color: keyof typeof dividerColors }[] = [
  { id: 'hero-v3', label: 'Hero V3', badge: 'RECOMMENDED', color: 'amber' },
  { id: 'iphone', label: 'iPhone Mockup', badge: 'NEW', color: 'teal' },
  { id: 'workflow', label: 'Workflow', badge: 'ATTIO-STYLE', color: 'blue' },
  { id: 'tabs', label: 'Interactive Tabs', badge: 'RECOMMENDED', color: 'green' },
  { id: 'floating', label: 'Floating Cards', badge: 'OPTION 1', color: 'blue' },
  { id: 'carousel', label: 'Carousel', badge: 'OPTION 3', color: 'purple' },
  { id: 'bento', label: 'Bento Grid', badge: 'OPTION 4', color: 'amber' },
  { id: 'hero-v2', label: 'Hero V2', badge: 'GRADIENT MESH', color: 'teal' },
]

const badgeColors = {
  amber: 'bg-amber-500/15 text-amber-700 border-amber-300/50',
  teal: 'bg-primary/15 text-primary border-primary/30',
  blue: 'bg-blue-500/15 text-blue-700 border-blue-300/50',
  green: 'bg-green-500/15 text-green-700 border-green-300/50',
  purple: 'bg-purple-500/15 text-purple-700 border-purple-300/50',
}

const dividerColors: Record<string, string> = {
  amber: 'border-amber-500/30 bg-amber-500/5',
  teal: 'border-primary/30 bg-primary/5',
  blue: 'border-blue-500/30 bg-blue-500/5',
  green: 'border-green-500/30 bg-green-500/5',
  purple: 'border-purple-500/30 bg-purple-500/5',
}

export function DemoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-amber-400 to-primary"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Sticky nav */}
      <div className="sticky top-16 z-50">
        <div className="relative overflow-hidden border-b border-white/20">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-amber-400/5" />

          <div className="relative container mx-auto px-4 py-3">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-0.5">
              <span className="text-xs font-semibold text-muted-foreground mr-2 whitespace-nowrap">
                Jump to:
              </span>
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { scrollTo(s.id); setActiveSection(i) }}
                  className={`
                    whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all
                    ${activeSection === i
                      ? 'bg-primary text-white shadow-sm shadow-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page header with glassmorphism */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900 py-20 px-4">
        {/* Animated orbs */}
        <AnimatedGradientOrb className="top-10 left-10 w-96 h-96 bg-primary/30" delay={0} />
        <AnimatedGradientOrb className="bottom-10 right-10 w-80 h-80 bg-amber-400/20" delay={1.5} />
        <AnimatedGradientOrb className="top-1/2 left-1/2 w-64 h-64 bg-blue-400/20" delay={0.8} />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative container mx-auto text-center">
          {/* Glassmorphism header card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Glass effect */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl" />
              <div className="absolute inset-0 border border-white/20 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5" />

              <div className="relative px-10 py-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white/90 text-xs font-semibold uppercase tracking-widest mb-5"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Design Preview — Internal
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
                >
                  RomAIx Design Demo
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-white/70 text-lg max-w-lg mx-auto"
                >
                  Visual exploration of hero sections, animations, and UI components.
                  Scroll to compare options.
                </motion.p>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 flex flex-wrap gap-3 justify-center"
                >
                  {[
                    { icon: '✦', label: 'Framer Motion 12' },
                    { icon: '◈', label: 'Glassmorphism' },
                    { icon: '⟳', label: 'Scroll Animations' },
                    { icon: '▣', label: 'ReactFlow Diagrams' },
                  ].map((badge) => (
                    <FloatingBadge key={badge.label} icon={badge.icon} label={badge.label} />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Glassmorphism stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { value: '8', label: 'Sections' },
              { value: '4', label: 'Hero variants' },
              { value: '60fps', label: 'Animations' },
              { value: '97%', label: 'Complete' },
            ].map((stat) => (
              <GlassMorphCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Demo sections */}
      <SectionWrapper id="hero-v3" label="Hero V3: Morphing Travel Backgrounds" badge="RECOMMENDED" color="amber" note="Add images to /public/images/hero/ to see crossfade effect">
        <HeroV3 />
      </SectionWrapper>

      <SectionWrapper id="iphone" label="3D Isometric iPhone Mockup" badge="NEW" color="teal" note="Chat bubbles floating in 3D space — matches site's teal/white theme">
        <section className="relative py-20 min-h-[700px] flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
          <IPhoneChatMockup />
        </section>
      </SectionWrapper>

      <SocialProof />

      <SectionWrapper id="workflow" label="Attio-Style Workflow Diagram" badge="ATTIO-STYLE" color="blue" note="AI email processing flow with animated SVG connectors and staggered node animations">
        <WorkflowSection />
      </SectionWrapper>

      <SectionWrapper id="tabs" label="Interactive Tabs + iPhone Mockup" badge="RECOMMENDED" color="green" note="Auto-cycles every 5s, pauses on interaction">
        <InteractiveTabs />
      </SectionWrapper>

      <SectionWrapper id="floating" label="Floating Cards (hover to expand)" badge="OPTION 1" color="blue">
        <FloatingCards />
      </SectionWrapper>

      <SectionWrapper id="carousel" label="Horizontal Carousel (swipe or use arrows)" badge="OPTION 3" color="purple">
        <HorizontalCarousel />
      </SectionWrapper>

      <SectionWrapper id="bento" label="Bento Grid (asymmetric layout)" badge="OPTION 4" color="amber">
        <BentoGrid />
      </SectionWrapper>

      <SectionWrapper id="hero-v2" label="Hero V2: Gradient Mesh Background" badge="GRADIENT MESH" color="teal">
        <HeroV2 />
      </SectionWrapper>

      {/* Summary section with glassmorphism cards */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-primary/90 py-20 px-4">
        <AnimatedGradientOrb className="top-0 right-0 w-96 h-96 bg-primary/20" delay={0} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Summary of Components
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                color: 'from-blue-500/20 to-blue-500/5',
                border: 'border-blue-400/30',
                title: '✓ Attio-Style Workflow',
                items: [
                  'Animated SVG bezier connectors',
                  'Staggered node entrance animations',
                  'Three-way branch with labels',
                  'Responsive: compact view on mobile',
                ],
              },
              {
                color: 'from-green-500/20 to-green-500/5',
                border: 'border-green-400/30',
                title: '✓ Interactive Tabs Upgraded',
                items: [
                  'Auto-cycles through channels every 5s',
                  'Pauses on hover or click',
                  'Progress bar shows time until next tab',
                  'iPhone mockup integration',
                ],
              },
              {
                color: 'from-amber-500/20 to-amber-500/5',
                border: 'border-amber-400/30',
                title: '✓ Hero V3 with Backgrounds',
                items: [
                  'Crossfading travel industry images',
                  'Industry label changes with image',
                  'Navigation dots to jump to industry',
                  'Ready for /public/images/hero/ images',
                ],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden"
              >
                {/* Glass card */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`} />
                <div className={`absolute inset-0 border ${card.border} rounded-2xl`} />

                <div className="relative p-6">
                  <div className="text-white font-semibold mb-3">{card.title}</div>
                  <ul className="space-y-1.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-white/40 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 relative rounded-2xl overflow-hidden max-w-xl mx-auto"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <div className="absolute inset-0 border border-primary/30 rounded-2xl" />
            <div className="relative p-5 text-center">
              <p className="text-sm font-semibold text-white/90 mb-2">Next Step: Add Travel Images</p>
              <p className="text-xs text-white/60">
                Create <code className="bg-white/10 px-1.5 py-0.5 rounded">/public/images/hero/</code> and add:{' '}
                atv-tour.jpg, helicopter-tour.jpg, ski-school.jpg, surf-lesson.jpg, tour-bus.jpg, boutique-hotel.jpg
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Section wrapper with glassmorphism label bar
function SectionWrapper({
  id,
  label,
  badge,
  color,
  note,
  children,
}: {
  id: string
  label: string
  badge: string
  color: keyof typeof dividerColors
  note?: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="border-b border-gray-100 scroll-mt-28">
      {/* Section header bar */}
      <div className={`relative overflow-hidden px-4 py-3 border-b ${dividerColors[color]}`}>
        <div className="absolute inset-0 backdrop-blur-sm" />
        <div className="relative flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${badgeColors[color as keyof typeof badgeColors]}`}>
              {badge}
            </span>
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </div>
          {note && (
            <span className="text-xs text-muted-foreground">{note}</span>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
