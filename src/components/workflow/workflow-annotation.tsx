'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface WorkflowAnnotationProps {
  show: boolean
  text?: string
  className?: string
}

export function WorkflowAnnotation({
  show,
  text = 'Customer question detected',
  className,
}: WorkflowAnnotationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={className}
        >
          <div className="relative">
            {/* Glow effect behind the annotation */}
            <div
              className="absolute inset-0 rounded-lg bg-amber-400/20 blur-md"
              style={{ transform: 'scale(1.1)' }}
            />

            {/* Main annotation container */}
            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-300 shadow-lg shadow-amber-200/50">
              {/* Sparkle/insight icon */}
              <svg
                className="w-4 h-4 text-amber-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4" />
                <path d="m16.24 7.76 2.83-2.83" />
                <path d="M22 12h-4" />
                <path d="m16.24 16.24 2.83 2.83" />
                <path d="M12 18v4" />
                <path d="m4.93 19.07 2.83-2.83" />
                <path d="M2 12h4" />
                <path d="m4.93 4.93 2.83 2.83" />
              </svg>

              {/* Text */}
              <span className="text-xs font-medium text-amber-800 whitespace-nowrap">
                {text}
              </span>

              {/* Subtle animated pulse ring */}
              <motion.div
                className="absolute -inset-0.5 rounded-lg border border-amber-400/50"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.2, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
