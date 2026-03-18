'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface MorphingTextProps {
  /** Array of words/phrases to cycle through */
  words: string[]
  /** Current index to display (controlled externally) */
  currentIndex: number
  /** Optional className for the container */
  className?: string
  /** Duration of the crossfade transition in seconds */
  transitionDuration?: number
}

/**
 * Smooth morphing text component that crossfades between words.
 * Unlike typing animations, this provides a clean, synchronized transition
 * that can be controlled externally via currentIndex.
 */
export function MorphingText({
  words,
  currentIndex,
  className = '',
  transitionDuration = 0.6,
}: MorphingTextProps) {
  // Ensure index is within bounds
  const safeIndex = Math.max(0, Math.min(currentIndex, words.length - 1))
  const currentWord = words[safeIndex]

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={safeIndex}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{
            duration: transitionDuration,
            ease: [0.4, 0, 0.2, 1], // easeInOut cubic bezier
          }}
          className="inline-block"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
