'use client'

import { motion } from 'framer-motion'

interface GlassMorphCardProps {
  value: string
  label: string
}

export function GlassMorphCard({ value, label }: GlassMorphCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative rounded-2xl overflow-hidden cursor-default"
    >
      {/* Glass layers */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5" />
      <div className="absolute inset-0 border border-white/25 rounded-2xl" />
      {/* Shine highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative px-4 py-4 text-center">
        <p className="text-2xl font-extrabold text-white">{value}</p>
        <p className="text-xs text-white/60 mt-0.5">{label}</p>
      </div>
    </motion.div>
  )
}
