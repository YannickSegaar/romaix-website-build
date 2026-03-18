'use client'

import { useState, useEffect, useCallback } from 'react'

export type NodeStatus = 'pending' | 'running' | 'completed' | 'dimmed' | 'deciding'
export type EdgeStatus = 'pending' | 'active' | 'completed' | 'dimmed' | 'highlighted'

// Items to dim when decision is made (non-chosen branches)
const DIMMED_AFTER_ROUTER = {
  edges: ['e-router-booking', 'e-router-escalate', 'e-booking-confirm'],
  nodes: ['booking', 'escalate', 'confirm'],
}

// Animation sequence - supports single items, parallel arrays, pauses, and special states
// Format varies by step type:
// - ['node', id, duration_ms] - activate a node
// - ['edge', id, duration_ms] - activate an edge
// - ['nodes', ids[], duration_ms] - parallel node activation
// - ['edges', ids[], duration_ms] - parallel edge activation
// - ['pause', duration_ms] - dramatic pause (no visual change)
// - ['deciding', id, duration_ms] - special "thinking" state for router
// - ['highlight', id, duration_ms] - highlight edge label before activating
type AnimationStep =
  | ['node', string, number]
  | ['edge', string, number]
  | ['nodes', string[], number]
  | ['edges', string[], number]
  | ['pause', number]
  | ['deciding', string, number]
  | ['highlight', string, number]

// Variable timing based on importance - slower at key moments
const animationSequence: AnimationStep[] = [
  // Start with trigger - longer to let visitors orient
  ['node', 'trigger', 800],
  ['edge', 'e-trigger-ai', 200],
  // AI Analysis - show "thinking"
  ['node', 'ai-analysis', 700],
  ['edge', 'e-ai-router', 200],
  // KEY MOMENT: Router decision
  ['deciding', 'router', 1000], // Special "thinking" state
  ['pause', 300], // Dramatic pause before branch
  // Highlight the chosen path label before animating
  ['highlight', 'e-router-question', 400],
  // Decision made - animate the chosen edge
  ['edge', 'e-router-question', 300],
  ['node', 'question', 500],
  // Continue down the chosen path
  ['edge', 'e-question-reply', 150],
  ['node', 'send-reply', 500],
]

// Get duration for an edge (used by edge component for animation sync)
export function getEdgeAnimationDuration(edgeId: string): number {
  for (const step of animationSequence) {
    if (step[0] === 'edge' && step[1] === edgeId) {
      return step[2]
    }
    if (step[0] === 'edges' && (step[1] as string[]).includes(edgeId)) {
      return step[2]
    }
  }
  return 200 // default
}

export function useWorkflowAnimation(isInView: boolean) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [activeItems, setActiveItems] = useState<Set<string>>(new Set())
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [dimmedItems, setDimmedItems] = useState<Set<string>>(new Set())
  const [decidingNode, setDecidingNode] = useState<string | null>(null)
  const [highlightedEdge, setHighlightedEdge] = useState<string | null>(null)
  const [showAnnotation, setShowAnnotation] = useState(false)

  // Reset animation when leaving view
  useEffect(() => {
    if (!isInView) {
      setCurrentStep(-1)
      setActiveItems(new Set())
      setCompletedItems(new Set())
      setDimmedItems(new Set())
      setDecidingNode(null)
      setHighlightedEdge(null)
      setShowAnnotation(false)
    }
  }, [isInView])

  // Advance through animation sequence
  useEffect(() => {
    if (!isInView) return

    // Animation complete - pause then reset for loop
    if (currentStep >= animationSequence.length) {
      const resetTimer = setTimeout(() => {
        setCurrentStep(-1)
        setActiveItems(new Set())
        setCompletedItems(new Set())
        setDimmedItems(new Set())
        setDecidingNode(null)
        setHighlightedEdge(null)
        setShowAnnotation(false)
      }, 4000) // Pause at end before looping
      return () => clearTimeout(resetTimer)
    }

    // Start first step after initial delay
    if (currentStep === -1) {
      const startTimer = setTimeout(() => {
        setCurrentStep(0)
      }, 800) // Brief pause before animation starts
      return () => clearTimeout(startTimer)
    }

    // Get current step
    const step = animationSequence[currentStep]
    const type = step[0]

    // Handle pause step - just wait, no visual change
    if (type === 'pause') {
      const duration = step[1] as number
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, duration)
      return () => clearTimeout(timer)
    }

    // Handle deciding step - special "thinking" state for router
    if (type === 'deciding') {
      const nodeId = step[1] as string
      const duration = step[2] as number

      setDecidingNode(nodeId)
      setShowAnnotation(true) // Show annotation during decision

      // Dim non-chosen branches when decision starts
      const dimmed = new Set<string>()
      DIMMED_AFTER_ROUTER.edges.forEach((id) => dimmed.add(`edge-${id}`))
      DIMMED_AFTER_ROUTER.nodes.forEach((id) => dimmed.add(`node-${id}`))
      setDimmedItems(dimmed)

      const timer = setTimeout(() => {
        setDecidingNode(null)
        setCompletedItems((prev) => {
          const next = new Set(prev)
          next.add(`node-${nodeId}`)
          return next
        })
        setCurrentStep((prev) => prev + 1)
      }, duration)
      return () => clearTimeout(timer)
    }

    // Handle highlight step - highlight edge label before animating
    if (type === 'highlight') {
      const edgeId = step[1] as string
      const duration = step[2] as number

      setHighlightedEdge(edgeId)

      const timer = setTimeout(() => {
        // Keep highlighted until edge completes
        setCurrentStep((prev) => prev + 1)
      }, duration)
      return () => clearTimeout(timer)
    }

    // Standard node/edge animation
    const ids = step[1]
    const duration = step[2] as number
    const itemIds = Array.isArray(ids) ? ids : [ids as string]
    const itemType = type === 'nodes' ? 'node' : type === 'edges' ? 'edge' : type

    // Mark items as active
    setActiveItems(new Set(itemIds.map((id) => `${itemType}-${id}`)))

    // After duration, mark as completed and move to next step
    const timer = setTimeout(() => {
      // Move active items to completed
      setCompletedItems((prev) => {
        const next = new Set(prev)
        itemIds.forEach((id) => next.add(`${itemType}-${id}`))
        return next
      })
      setActiveItems(new Set())

      // Clear highlight after edge completes
      if (type === 'edge' && highlightedEdge) {
        setHighlightedEdge(null)
        setShowAnnotation(false) // Hide annotation after choice is made
      }

      setCurrentStep((prev) => prev + 1)
    }, duration)

    return () => clearTimeout(timer)
  }, [isInView, currentStep, highlightedEdge])

  // Get node status
  const getNodeStatus = useCallback(
    (nodeId: string): NodeStatus => {
      if (decidingNode === nodeId) return 'deciding'
      const key = `node-${nodeId}`
      if (activeItems.has(key)) return 'running'
      if (completedItems.has(key)) return 'completed'
      if (dimmedItems.has(key)) return 'dimmed'
      return 'pending'
    },
    [activeItems, completedItems, dimmedItems, decidingNode]
  )

  // Get edge status
  const getEdgeStatus = useCallback(
    (edgeId: string): EdgeStatus => {
      if (highlightedEdge === edgeId) return 'highlighted'
      const key = `edge-${edgeId}`
      if (activeItems.has(key)) return 'active'
      if (completedItems.has(key)) return 'completed'
      if (dimmedItems.has(key)) return 'dimmed'
      return 'pending'
    },
    [activeItems, completedItems, dimmedItems, highlightedEdge]
  )

  return {
    currentStep,
    getNodeStatus,
    getEdgeStatus,
    getEdgeAnimationDuration,
    totalSteps: animationSequence.length,
    isAnimating: currentStep >= 0 && currentStep < animationSequence.length,
    showAnnotation,
  }
}
