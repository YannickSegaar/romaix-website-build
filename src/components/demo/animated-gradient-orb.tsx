'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGradientOrbProps {
  className?: string
  delay?: number
}

export function AnimatedGradientOrb({ className, delay = 0 }: AnimatedGradientOrbProps) {
  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl opacity-50 pointer-events-none', className)}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.4, 0.6, 0.4],
        x: [0, 20, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
