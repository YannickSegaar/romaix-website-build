'use client'

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useState, useId } from 'react'

// Attio-style color palette
const COLORS = {
  // Edge/handle colors
  handleDefault: '#407FF2', // Blue when inactive
  handleActive: '#0FC27B', // Green when active/completed
  handleDeciding: '#F59E0B', // Amber when deciding
  baseGray: '#D1D3D6',
  // Completed badge
  completedBg: '#DDF9E4',
  completedBorder: '#C7F4D3',
  completedText: '#0B935D',
  // Running indicator
  runningGreen: '#0FC27B',
  // Deciding indicator
  decidingAmber: '#F59E0B',
  decidingAmberLight: '#FEF3C7',
  // Secondary gray
  spinnerGray: '#5C5E63',
  spinnerBg: '#D1D3D6',
}

export type TagColor = 'blue' | 'green' | 'amber' | 'gray' | 'purple' | 'red'
export type BadgeVariant = 'trigger' | 'running' | 'completed' | 'condition'
export type NodeStatus = 'pending' | 'running' | 'completed' | 'dimmed' | 'deciding'

export interface WorkflowCardData extends Record<string, unknown> {
  icon: ReactNode
  title: string
  tag: string
  tagColor: TagColor
  description: string
  badge?: { label: string; variant: BadgeVariant }
  status: NodeStatus
}

export type WorkflowCardNode = Node<WorkflowCardData, 'workflowCard'>

const tagColorClasses: Record<TagColor, string> = {
  blue: 'bg-[#E5EEFF] text-[#407FF2] border-[#D6E5FF]',
  green: 'bg-green-50 text-green-700 border-green-200',
  amber: 'bg-[#FFF3CC] text-[#F5B900] border-[#FFEBAD]',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  red: 'bg-red-50 text-red-700 border-red-200',
}

// Border sweep animation duration (should match NODE_DURATION in use-workflow-animation.ts)
const BORDER_SWEEP_DURATION = 520

export function WorkflowCardNode({ data }: NodeProps<WorkflowCardNode>) {
  const isActive = data.status === 'running'
  const isCompleted = data.status === 'completed'
  const isDimmed = data.status === 'dimmed'
  const isDeciding = data.status === 'deciding'
  const uniqueId = useId()

  // Track border sweep progress (0-360 degrees)
  const [sweepAngle, setSweepAngle] = useState(0)
  const [showSweep, setShowSweep] = useState(false)
  const [decidingPulse, setDecidingPulse] = useState(0)

  // Animate pulsing effect when in "deciding" state
  useEffect(() => {
    if (!isDeciding) {
      setDecidingPulse(0)
      return
    }

    setShowSweep(true)
    setSweepAngle(360) // Full border for deciding state
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      // Pulse every 500ms
      const pulse = Math.sin((elapsed / 500) * Math.PI) * 0.5 + 0.5
      setDecidingPulse(pulse)
      requestAnimationFrame(animate)
    }

    const frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isDeciding])

  // Animate the conic gradient sweep when node becomes active
  useEffect(() => {
    if (!isActive) {
      // Reset when not active, but keep completed/deciding state visible
      if (!isCompleted && !isDeciding) {
        setSweepAngle(0)
        setShowSweep(false)
      }
      return
    }

    setShowSweep(true)
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / BORDER_SWEEP_DURATION, 1)

      // Ease-in-out for smooth sweep
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      setSweepAngle(eased * 360)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Keep at 360 when complete
        setSweepAngle(360)
      }
    }

    const frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isActive, isCompleted, isDeciding])

  return (
    <div
      className="relative transition-all duration-500"
      style={{
        opacity: isDimmed ? 0.35 : 1,
        filter: isDimmed ? 'grayscale(0.5)' : 'none',
      }}
    >
      {/* Target handle (top) - Attio style: blue default, amber when deciding, green when active */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !rounded-full !border-[1.5px] !bg-white !transition-colors !duration-300"
        style={{
          borderColor: isDeciding
            ? COLORS.handleDeciding
            : isActive || isCompleted
              ? COLORS.handleActive
              : COLORS.handleDefault,
        }}
      />

      {/* Completed badge - Attio style: positioned to the RIGHT of the card */}
      {isCompleted && (
        <div className="absolute -right-2 top-2 translate-x-full z-20">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm whitespace-nowrap"
            style={{
              backgroundColor: COLORS.completedBg,
              borderWidth: 1,
              borderColor: COLORS.completedBorder,
              color: COLORS.completedText,
            }}
          >
            <svg
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 5.7 3.7 7c.5.7.7 1 1 1.2h.8c.3-.1.5-.5 1-1.2L9 3" />
            </svg>
            Completed
          </span>
        </div>
      )}

      {/* Running indicator - Attio style: pulsing badge to the right */}
      {isActive && (
        <div className="absolute -right-2 top-2 translate-x-full z-20">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-white border border-gray-200 text-gray-600 shadow-sm whitespace-nowrap">
            {/* Attio-style spinner */}
            <svg
              className="animate-spin w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
            >
              <circle
                cx="6"
                cy="6"
                r="4.5"
                stroke={COLORS.spinnerBg}
                strokeWidth="1"
              />
              <path
                d="M6 10.5a4.5 4.5 0 0 0 0-9"
                stroke={COLORS.spinnerGray}
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            Running
          </span>
        </div>
      )}

      {/* Deciding indicator - amber pulsing badge for router decision moment */}
      {isDeciding && (
        <div className="absolute -right-2 top-2 translate-x-full z-20">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm whitespace-nowrap"
            style={{
              backgroundColor: COLORS.decidingAmberLight,
              borderWidth: 1,
              borderColor: COLORS.decidingAmber,
              color: '#B45309',
            }}
          >
            {/* Thinking dots animation */}
            <span className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
            Deciding
          </span>
        </div>
      )}

      {/* Trigger/Condition badge - Attio style: positioned at top-left inside card area */}
      {data.badge && !isActive && !isCompleted && (
        <div className="absolute -top-2.5 left-3 z-10">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white border shadow-sm',
              data.badge.variant === 'trigger' && 'border-gray-200 text-gray-500',
              data.badge.variant === 'condition' && 'border-amber-200 text-amber-600'
            )}
          >
            {data.badge.variant === 'trigger' && (
              <svg className="w-2.5 h-2.5 animate-pulse" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="0.8" fill="#75777C" />
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="#75777C"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="6"
                  cy="6"
                  r="2.5"
                  stroke="#75777C"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {data.badge.variant === 'condition' && (
              <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 2L10 6L6 10L2 6L6 2Z" />
              </svg>
            )}
            {data.badge.label}
          </span>
        </div>
      )}

      {/* Main card with conic gradient border sweep - Attio style */}
      <div
        className="relative rounded-xl transition-all duration-300 ease-out"
        style={{
          width: 222, // Slightly larger to account for border
          padding: 1, // Creates the border width
          background: isDeciding
            ? `conic-gradient(from 0deg, ${COLORS.decidingAmber} ${sweepAngle}deg, transparent ${sweepAngle}deg)`
            : showSweep || isCompleted
              ? `conic-gradient(from 0deg, ${COLORS.handleActive} ${sweepAngle}deg, transparent ${sweepAngle}deg)`
              : '#E5E7EB',
          // Scale up and add glow when active or deciding
          transform: isActive || isDeciding ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isDeciding
            ? `0 0 ${20 + decidingPulse * 10}px rgba(245, 158, 11, ${0.4 + decidingPulse * 0.2}), 0 0 ${40 + decidingPulse * 15}px rgba(245, 158, 11, ${0.2 + decidingPulse * 0.1}), 0 8px 32px rgba(0, 0, 0, 0.12)`
            : isActive
              ? `0 0 20px rgba(15, 194, 123, 0.4), 0 0 40px rgba(15, 194, 123, 0.2), 0 8px 32px rgba(0, 0, 0, 0.12)`
              : 'none',
        }}
      >
        {/* Inner card content */}
        <div
          className={cn(
            'relative flex flex-col gap-2 rounded-[10px] bg-white p-3',
            'transition-shadow duration-300'
          )}
          style={{
            width: 220,
            boxShadow: isActive
              ? '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)'
              : '0 1px 3px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header row: Icon + Title + Tag */}
          <div className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-7 h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600">
              {data.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-semibold text-gray-900 leading-tight truncate">
                  {data.title}
                </span>
                <span
                  className={cn(
                    'flex-shrink-0 px-1.5 py-0.5 rounded border text-[10px] font-medium',
                    tagColorClasses[data.tagColor]
                  )}
                >
                  {data.tag}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[11px] text-gray-500 leading-relaxed pl-9 line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>

      {/* Source handle (bottom) - Attio style */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !rounded-full !border-[1.5px] !bg-white !transition-colors !duration-300"
        style={{
          borderColor: isDeciding
            ? COLORS.handleDeciding
            : isActive || isCompleted
              ? COLORS.handleActive
              : COLORS.handleDefault,
        }}
      />
    </div>
  )
}
