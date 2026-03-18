'use client'

import { getBezierPath, getSmoothStepPath, type EdgeProps } from '@xyflow/react'
import { useEffect, useRef, useState, useId } from 'react'

// Attio-style color palette
const COLORS = {
  baseGray: '#D1D3D6',
  activeGreen: '#0FC27B',
  highlightAmber: '#F59E0B',
  labelBorder: {
    active: '#C7F4D3',
    inactive: '#E5E7EB',
    highlighted: '#FCD34D',
  },
  labelBg: {
    default: 'white',
    highlighted: '#FEF3C7',
  },
  labelText: {
    active: '#0B935D',
    inactive: '#6B7280',
    highlighted: '#B45309',
  },
}

export interface AnimatedEdgeData extends Record<string, unknown> {
  status?: 'pending' | 'active' | 'completed' | 'dimmed' | 'highlighted'
  label?: string
  animationDuration?: number
}

export function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const edgeData = data as AnimatedEdgeData | undefined
  const isBranchEdge = !!edgeData?.label
  const uniqueId = useId()
  const gradientId = `pulse-gradient-${id}-${uniqueId.replace(/:/g, '')}`

  // Use bezier for branch edges (smoother curves), smooth step for straight connections
  const [edgePath, labelX, labelY] = isBranchEdge
    ? getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        curvature: 0.25,
      })
    : getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 20, // Attio uses 20px radius for smooth curves
      })

  const status = edgeData?.status ?? 'pending'
  const isActive = status === 'active'
  const isCompleted = status === 'completed'
  const isDimmed = status === 'dimmed'
  const isHighlighted = status === 'highlighted'
  const animDuration = edgeData?.animationDuration ?? 200

  // Ease-in-out function for smoother animation
  const easeInOut = (t: number): number => {
    return t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2
  }

  // Calculate approximate path length for gradient animation
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(200)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [edgePath])

  // Animation state - tracks both gradient position and fill progress
  const [gradientOffset, setGradientOffset] = useState(0)
  const [fillProgress, setFillProgress] = useState(0) // 0 to 1, controls how much of path is green
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive) {
      // Reset animation when not active
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      startTimeRef.current = null
      setGradientOffset(0)
      // Keep fill at 100% when completed, reset otherwise
      if (!isCompleted) {
        setFillProgress(0)
      }
      return
    }

    // Animate gradient position along the path with easing
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const linearProgress = Math.min(elapsed / animDuration, 1)
      // Apply ease-in-out for smoother animation
      const progress = easeInOut(linearProgress)

      // Update fill progress - the green follows behind the dot
      setFillProgress(progress)

      // Move gradient from start to end of path
      // Gradient segment is ~15% of path length for tighter dot effect
      const gradientLength = pathLength * 0.15
      const startPos = -gradientLength
      const endPos = pathLength + gradientLength
      const currentPos = startPos + progress * (endPos - startPos)

      setGradientOffset(currentPos)

      if (linearProgress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Ensure fill is complete at end
        setFillProgress(1)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, isCompleted, animDuration, pathLength])

  // Calculate stroke-dashoffset for progressive fill
  // dashoffset starts at pathLength (hidden) and goes to 0 (fully visible)
  const strokeDashoffset = isCompleted ? 0 : pathLength * (1 - fillProgress)

  // Calculate gradient coordinates based on path direction
  // For vertical paths: gradient moves along Y axis
  // For horizontal paths: gradient moves along X axis
  const isVertical = Math.abs(targetY - sourceY) > Math.abs(targetX - sourceX)
  const gradientLength = pathLength * 0.15

  // Gradient position calculation
  const getGradientCoords = () => {
    if (isVertical) {
      const direction = targetY > sourceY ? 1 : -1
      return {
        x1: sourceX,
        y1: sourceY + (gradientOffset - gradientLength) * direction,
        x2: sourceX,
        y2: sourceY + (gradientOffset + gradientLength) * direction,
      }
    } else {
      const direction = targetX > sourceX ? 1 : -1
      return {
        x1: sourceX + (gradientOffset - gradientLength) * direction,
        y1: sourceY,
        x2: sourceX + (gradientOffset + gradientLength) * direction,
        y2: sourceY,
      }
    }
  }

  const gradientCoords = getGradientCoords()

  return (
    <>
      {/* Gradient definition for pulse effect */}
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={gradientCoords.x1}
          y1={gradientCoords.y1}
          x2={gradientCoords.x2}
          y2={gradientCoords.y2}
        >
          {/* Smoother gradient with multiple stops for softer glow */}
          <stop offset="0" stopColor={COLORS.activeGreen} stopOpacity="0" />
          <stop offset="0.2" stopColor={COLORS.activeGreen} stopOpacity="0.3" />
          <stop offset="0.4" stopColor={COLORS.activeGreen} stopOpacity="0.8" />
          <stop offset="0.5" stopColor={COLORS.activeGreen} stopOpacity="1" />
          <stop offset="0.6" stopColor={COLORS.activeGreen} stopOpacity="0.8" />
          <stop offset="0.8" stopColor={COLORS.activeGreen} stopOpacity="0.3" />
          <stop offset="1" stopColor={COLORS.activeGreen} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Layer 1: Base path (always visible, gray - fades when dimmed) */}
      <path
        ref={pathRef}
        d={edgePath}
        stroke={COLORS.baseGray}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={isDimmed ? 0.25 : 1}
        style={{ transition: 'opacity 0.5s ease-out' }}
      />

      {/* Layer 2: Progressive green fill - fills in as animation progresses */}
      <path
        d={edgePath}
        stroke={COLORS.activeGreen}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={pathLength}
        strokeDashoffset={strokeDashoffset}
        opacity={isActive || isCompleted ? 1 : 0}
      />

      {/* Layer 3: Animated gradient pulse (creates traveling dot effect) */}
      {isActive && (
        <path
          d={edgePath}
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Arrow marker at end - only shows when edge is fully complete */}
      {isCompleted && (
        <g
          transform={`translate(${targetX}, ${targetY - 8})`}
          style={{
            opacity: 1,
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <path
            d="M-4 -4 L0 0 L4 -4"
            stroke={COLORS.activeGreen}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}

      {/* Branch label - Attio style: on the path with background */}
      {edgeData?.label && (
        <g
          opacity={isDimmed ? 0.3 : 1}
          style={{ transition: 'opacity 0.5s ease-out' }}
        >
          {/* Glow effect for highlighted state */}
          {isHighlighted && (
            <rect
              x={labelX - 47}
              y={labelY - 12}
              width="94"
              height="24"
              rx="6"
              fill="none"
              stroke={COLORS.highlightAmber}
              strokeWidth="2"
              opacity="0.6"
              style={{
                filter: 'blur(4px)',
              }}
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </rect>
          )}
          {/* Label background with subtle shadow */}
          <rect
            x={labelX - 45}
            y={labelY - 10}
            width="90"
            height="20"
            rx="4"
            fill={isHighlighted ? COLORS.labelBg.highlighted : COLORS.labelBg.default}
            stroke={
              isHighlighted
                ? COLORS.labelBorder.highlighted
                : isActive || isCompleted
                  ? COLORS.labelBorder.active
                  : COLORS.labelBorder.inactive
            }
            strokeWidth={isHighlighted ? '1.5' : '1'}
            filter="drop-shadow(0 1px 2px rgb(0 0 0 / 0.05))"
            style={{
              transition: 'all 0.3s ease-out',
            }}
          />
          {/* Label text */}
          <text
            x={labelX}
            y={labelY + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight={isHighlighted ? '600' : '500'}
            fill={
              isHighlighted
                ? COLORS.labelText.highlighted
                : isActive || isCompleted
                  ? COLORS.labelText.active
                  : COLORS.labelText.inactive
            }
            style={{
              userSelect: 'none',
              transition: 'all 0.3s ease-out',
            }}
          >
            {edgeData.label}
          </text>
        </g>
      )}
    </>
  )
}
