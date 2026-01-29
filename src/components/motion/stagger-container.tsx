'use client'

import { motion, Variants, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerContainerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.2,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={{ staggerDelay, delayChildren }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}
