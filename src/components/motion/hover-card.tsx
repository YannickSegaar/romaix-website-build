'use client'

import { motion, HTMLMotionProps } from 'framer-motion'

interface HoverCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  /** Enhanced hover effect for hero cards (larger scale, more shadow) */
  enhanced?: boolean
}

export function HoverCard({
  children,
  className,
  enhanced = false,
  ...props
}: HoverCardProps) {
  // Scale values: enhanced (hero) cards scale more
  const hoverScale = enhanced ? 1.05 : 1.02
  const tapScale = 0.98

  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: tapScale }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
