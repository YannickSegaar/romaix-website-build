'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'

const CYCLE_DURATION = 6000 // 6 seconds per cycle
const TOTAL_ITEMS = 6

interface UseHeroCycleOptions {
  /** Override the default cycle duration (6000ms) */
  duration?: number
  /** Override the total number of items (6) */
  itemCount?: number
  /** Pause automatic cycling */
  paused?: boolean
}

interface UseHeroCycleReturn {
  /** Current index (0 to itemCount-1) */
  currentIndex: number
  /** Set index directly (for manual navigation) */
  setIndex: (index: number) => void
  /** Go to next item */
  next: () => void
  /** Go to previous item */
  previous: () => void
  /** Cycle duration in ms */
  cycleDuration: number
  /** Total number of items */
  itemCount: number
  /** Whether cycling is currently paused */
  isPaused: boolean
  /** Pause/resume cycling */
  setPaused: (paused: boolean) => void
}

/**
 * Master timer hook for synchronized hero animations.
 * All components using this hook will change at exactly the same time.
 */
export function useHeroCycle(options: UseHeroCycleOptions = {}): UseHeroCycleReturn {
  const {
    duration = CYCLE_DURATION,
    itemCount = TOTAL_ITEMS,
    paused: initialPaused = false,
  } = options

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(initialPaused)

  // Auto-cycle through items
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }, duration)

    return () => clearInterval(interval)
  }, [duration, itemCount, isPaused])

  const setIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, itemCount - 1)))
  }, [itemCount])

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount)
  }, [itemCount])

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }, [itemCount])

  const setPaused = useCallback((paused: boolean) => {
    setIsPaused(paused)
  }, [])

  return useMemo(() => ({
    currentIndex,
    setIndex,
    next,
    previous,
    cycleDuration: duration,
    itemCount,
    isPaused,
    setPaused,
  }), [currentIndex, setIndex, next, previous, duration, itemCount, isPaused, setPaused])
}
