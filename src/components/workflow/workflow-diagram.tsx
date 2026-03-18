'use client'

import { useMemo, useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Mail,
  Brain,
  GitBranch,
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Send,
} from 'lucide-react'

import { WorkflowCardNode, type WorkflowCardData } from './nodes/workflow-card-node'
import { AnimatedEdge } from './edges/animated-edge'
import { useWorkflowAnimation, getEdgeAnimationDuration } from './hooks/use-workflow-animation'
import { WorkflowAnnotation } from './workflow-annotation'

// Register custom node and edge types
const nodeTypes = { workflowCard: WorkflowCardNode }
const edgeTypes = { animated: AnimatedEdge }

// Node definitions with Attio-style vertical layout
// Center column at x=300, branches spread to x=50 and x=550
const createInitialNodes = (): Node<WorkflowCardData>[] => [
  {
    id: 'trigger',
    type: 'workflowCard',
    position: { x: 300, y: 0 },
    data: {
      icon: <Mail className="w-4 h-4" />,
      title: 'New email arrives',
      tag: 'Email',
      tagColor: 'blue',
      description: 'Trigger when a new email arrives in your inbox',
      badge: { label: 'Trigger', variant: 'trigger' },
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'ai-analysis',
    type: 'workflowCard',
    position: { x: 300, y: 160 },
    data: {
      icon: <Brain className="w-4 h-4" />,
      title: 'AI reads & understands',
      tag: 'AI',
      tagColor: 'purple',
      description: 'Understands what the customer needs',
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'router',
    type: 'workflowCard',
    position: { x: 300, y: 320 },
    data: {
      icon: <GitBranch className="w-4 h-4" />,
      title: 'Smart routing',
      tag: 'Condition',
      tagColor: 'amber',
      description: 'AI decides the best action to take',
      badge: { label: 'Condition', variant: 'condition' },
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'booking',
    type: 'workflowCard',
    position: { x: 50, y: 520 },
    data: {
      icon: <Calendar className="w-4 h-4" />,
      title: 'Process booking',
      tag: 'Calendar',
      tagColor: 'green',
      description: 'Check availability and reserve time slot',
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'question',
    type: 'workflowCard',
    position: { x: 300, y: 520 },
    data: {
      icon: <MessageSquare className="w-4 h-4" />,
      title: 'Write personalized reply',
      tag: 'AI Response',
      tagColor: 'purple',
      description: 'Creates a helpful, personalized response',
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'escalate',
    type: 'workflowCard',
    position: { x: 550, y: 520 },
    data: {
      icon: <AlertTriangle className="w-4 h-4" />,
      title: 'Alert your team',
      tag: 'Alert',
      tagColor: 'red',
      description: 'Notify team for urgent or complex issues',
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'confirm',
    type: 'workflowCard',
    position: { x: 50, y: 700 },
    data: {
      icon: <CheckCircle className="w-4 h-4" />,
      title: 'Confirm & sync',
      tag: 'CRM',
      tagColor: 'green',
      description: 'Update CRM and send confirmation email',
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'send-reply',
    type: 'workflowCard',
    position: { x: 300, y: 700 },
    data: {
      icon: <Send className="w-4 h-4" />,
      title: 'Send reply',
      tag: 'Email',
      tagColor: 'blue',
      description: 'Automatically send the drafted response',
      status: 'pending',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
]

const createInitialEdges = (): Edge[] => [
  {
    id: 'e-trigger-ai',
    source: 'trigger',
    target: 'ai-analysis',
    type: 'animated',
    data: { status: 'pending' },
  },
  {
    id: 'e-ai-router',
    source: 'ai-analysis',
    target: 'router',
    type: 'animated',
    data: { status: 'pending' },
  },
  {
    id: 'e-router-booking',
    source: 'router',
    target: 'booking',
    type: 'animated',
    data: { status: 'pending', label: 'Booking' },
  },
  {
    id: 'e-router-question',
    source: 'router',
    target: 'question',
    type: 'animated',
    data: { status: 'pending', label: 'Question' },
  },
  {
    id: 'e-router-escalate',
    source: 'router',
    target: 'escalate',
    type: 'animated',
    data: { status: 'pending', label: 'Urgent' },
  },
  {
    id: 'e-booking-confirm',
    source: 'booking',
    target: 'confirm',
    type: 'animated',
    data: { status: 'pending' },
  },
  {
    id: 'e-question-reply',
    source: 'question',
    target: 'send-reply',
    type: 'animated',
    data: { status: 'pending' },
  },
]

interface WorkflowDiagramProps {
  className?: string
  autoPlay?: boolean
}

export function WorkflowDiagram({ className, autoPlay = true }: WorkflowDiagramProps) {
  const [isInView, setIsInView] = useState(false)
  const { getNodeStatus, getEdgeStatus, showAnnotation } = useWorkflowAnimation(isInView && autoPlay)

  // Update node statuses based on animation step
  const nodes = useMemo(() => {
    return createInitialNodes().map((node) => ({
      ...node,
      data: {
        ...node.data,
        status: getNodeStatus(node.id),
      },
    }))
  }, [getNodeStatus])

  // Update edge statuses based on animation step
  const edges = useMemo(() => {
    return createInitialEdges().map((edge) => {
      const status = getEdgeStatus(edge.id)
      const animationDuration = getEdgeAnimationDuration(edge.id)
      return {
        ...edge,
        data: { ...edge.data, status, animationDuration },
      }
    })
  }, [getEdgeStatus])

  const onViewportEnter = useCallback(() => setIsInView(true), [])
  const onViewportLeave = useCallback(() => setIsInView(false), [])

  return (
    <motion.div
      className={cn('relative w-full', className)}
      onViewportEnter={onViewportEnter}
      onViewportLeave={onViewportLeave}
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Floating annotation - positioned near the router */}
      <WorkflowAnnotation
        show={showAnnotation}
        text="Customer question detected"
        className="absolute top-[52%] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      />

      {/* ReactFlow container with dot grid background */}
      <div className="relative h-[850px] w-full rounded-2xl overflow-hidden bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
          fitView
          fitViewOptions={{
            padding: 0.15,
            minZoom: 0.6,
            maxZoom: 1,
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} color="#d1d5db" gap={20} size={1} />
        </ReactFlow>
      </div>
    </motion.div>
  )
}

// Compact version for mobile - keeping the existing implementation
export function WorkflowDiagramCompact({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-full py-6', className)}>
      <div className="flex flex-col items-center gap-3 px-4">
        <div className="text-center mb-2">
          <span className="text-xs text-gray-500">AI Email Processing Flow</span>
        </div>

        {/* Simplified linear representation */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <StepBadge icon={<Mail className="w-3 h-3" />} label="Email" />
          <Arrow />
          <StepBadge icon={<Brain className="w-3 h-3" />} label="AI Analysis" />
          <Arrow />
          <StepBadge icon={<GitBranch className="w-3 h-3" />} label="Route" />
        </div>

        <div className="flex items-center gap-4 mt-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-4 bg-gray-300" />
            <StepBadge icon={<Calendar className="w-3 h-3" />} label="Book" active />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-4 bg-gray-300" />
            <StepBadge icon={<MessageSquare className="w-3 h-3" />} label="Reply" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-4 bg-gray-300" />
            <StepBadge icon={<AlertTriangle className="w-3 h-3" />} label="Alert" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StepBadge({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs',
        active
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : 'bg-gray-50 border-gray-200 text-gray-600'
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-gray-400">
      <path
        d="M0 4H14M14 4L10 1M14 4L10 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
