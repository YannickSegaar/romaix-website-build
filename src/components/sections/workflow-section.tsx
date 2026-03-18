'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { StaggerContainer, StaggerItem } from '@/components/motion'

// ReactFlow requires client-side rendering only
const WorkflowDiagram = dynamic(
  () => import('@/components/workflow').then((mod) => mod.WorkflowDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="h-[850px] w-full flex items-center justify-center bg-white rounded-2xl border border-gray-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-400 rounded-full animate-spin" />
          <div className="text-muted-foreground text-sm">Loading workflow...</div>
        </div>
      </div>
    ),
  }
)

const WorkflowDiagramCompact = dynamic(
  () => import('@/components/workflow').then((mod) => mod.WorkflowDiagramCompact),
  { ssr: false }
)

interface WorkflowSectionProps {
  className?: string
}

export function WorkflowSection({ className }: WorkflowSectionProps) {
  return (
    <section className={cn('relative py-16 md:py-24 overflow-hidden bg-white', className)}>
      <div className="container relative px-4 md:px-6">
        {/* Header */}
        <StaggerContainer className="text-center mb-12">
          <StaggerItem>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              AI-Powered Automation
            </span>
          </StaggerItem>

          <StaggerItem>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              See How Your Emails{' '}
              <span className="text-primary">Handle Themselves</span>
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From inbox to action in seconds. Our AI reads, understands, and responds to customer
              emails—booking requests get scheduled, questions get answered, urgent issues get
              escalated.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Workflow Diagram - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="hidden md:block"
        >
          <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <WorkflowDiagram />
          </div>
        </motion.div>

        {/* Workflow Diagram - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="md:hidden"
        >
          <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 rounded-2xl border border-gray-200 shadow-lg p-4">
            <WorkflowDiagramCompact />
          </div>
        </motion.div>

        {/* Stats/Benefits */}
        <StaggerContainer
          staggerDelay={0.1}
          delayChildren={0.3}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <StaggerItem>
            <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Emails handled automatically</div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">&lt;30s</div>
              <div className="text-sm text-muted-foreground">Average response time</div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Always-on availability</div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
