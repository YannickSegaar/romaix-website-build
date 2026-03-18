'use client'

import { motion } from 'framer-motion'

interface FloatingBadgeProps {
  icon: string
  label: string
}

export function FloatingBadge({ icon, label }: FloatingBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -1 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium backdrop-blur-sm cursor-default"
    >
      <span className="opacity-70">{icon}</span>
      {label}
    </motion.span>
  )
}
