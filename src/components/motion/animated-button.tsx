'use client'

import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'

interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<'div'>, 'children' | 'ref'> {
  children: ReactNode
  className?: string
  hoverScale?: number
  tapScale?: number
}

export const AnimatedButton = forwardRef<HTMLDivElement, AnimatedButtonProps>(
  (
    {
      children,
      className,
      hoverScale = 1.02,
      tapScale = 0.98,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()

    if (prefersReducedMotion) {
      return (
        <div ref={ref} className={className} {...(props as Record<string, unknown>)}>
          {children}
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'
