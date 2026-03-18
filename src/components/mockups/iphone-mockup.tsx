'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface IPhoneMockupProps {
  children: ReactNode
  className?: string
}

export function IPhoneMockup({ children, className = '' }: IPhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone frame */}
      <div className="relative mx-auto w-[280px] md:w-[320px]">
        {/* Outer frame - the iPhone body */}
        <div className="relative rounded-[3rem] bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800 p-2 shadow-2xl shadow-black/50">
          {/* Side buttons */}
          <div className="absolute -left-1 top-24 h-8 w-1 rounded-l-sm bg-zinc-700" />
          <div className="absolute -left-1 top-36 h-12 w-1 rounded-l-sm bg-zinc-700" />
          <div className="absolute -left-1 top-52 h-12 w-1 rounded-l-sm bg-zinc-700" />
          <div className="absolute -right-1 top-32 h-16 w-1 rounded-r-sm bg-zinc-700" />

          {/* Inner bezel */}
          <div className="relative rounded-[2.5rem] bg-black p-1">
            {/* Screen area */}
            <div className="relative overflow-hidden rounded-[2.25rem] bg-white">
              {/* Dynamic Island / Notch */}
              <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
                <div className="h-7 w-28 rounded-full bg-black" />
              </div>

              {/* Screen content */}
              <div className="relative min-h-[500px] md:min-h-[580px]">
                {children}
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <div className="h-1 w-32 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Reflection/shine effect */}
        <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
      </div>
    </div>
  )
}

interface PhoneScreenContentProps {
  channel: 'email' | 'chat' | 'phone' | 'dashboard'
  title: string
  scenario: string
  response: string
}

export function PhoneScreenContent({
  channel,
  title,
  scenario,
  response,
}: PhoneScreenContentProps) {
  const getAppHeader = () => {
    switch (channel) {
      case 'email':
        return {
          bg: 'bg-blue-500',
          name: 'Inbox',
          icon: '✉️',
        }
      case 'chat':
        return {
          bg: 'bg-green-500',
          name: 'WhatsApp',
          icon: '💬',
        }
      case 'phone':
        return {
          bg: 'bg-purple-500',
          name: 'Calls',
          icon: '📱',
        }
      case 'dashboard':
        return {
          bg: 'bg-amber-500',
          name: 'Dashboard',
          icon: '📊',
        }
    }
  }

  const header = getAppHeader()

  return (
    <div className="h-full flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-12 pb-2 text-xs font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.85 5.25 10.4 5 12 5c1.6 0 3.15.25 4.59.73v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
          </svg>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
          </svg>
        </div>
      </div>

      {/* App header */}
      <div className={`${header.bg} px-4 py-3 text-white`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{header.icon}</span>
          <span className="font-semibold">{header.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 p-4 space-y-3">
        {/* Notification card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-white p-3 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full ${header.bg} flex items-center justify-center text-white text-lg shrink-0`}>
              {header.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{title}</span>
                <span className="text-xs text-gray-400">now</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{scenario}</p>
            </div>
          </div>
        </motion.div>

        {/* AI Processing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 py-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
          />
          <span className="text-xs text-gray-500">AI analyzing...</span>
        </motion.div>

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl bg-primary/5 border border-primary/20 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs text-white">AI</span>
            </div>
            <span className="text-xs font-medium text-primary">Draft Response</span>
          </div>
          <p className="text-sm text-gray-700">{response}</p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-2 pt-2"
        >
          <button className="flex-1 py-2 px-3 rounded-lg bg-primary text-white text-sm font-medium">
            Send
          </button>
          <button className="flex-1 py-2 px-3 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
            Edit
          </button>
        </motion.div>
      </div>
    </div>
  )
}
