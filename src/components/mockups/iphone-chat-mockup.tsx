'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Mail, Loader2 } from 'lucide-react'

interface IPhoneMockupProps {
  className?: string
}

export function IPhoneChatMockup({ className }: IPhoneMockupProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Container with subtle perspective */}
      <div
        className="relative"
        style={{
          perspective: '1000px',
        }}
      >
        {/* Phone with subtle 3D tilt */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotateY: -5, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateY: -3, rotateX: 2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Shadow under phone */}
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/10 blur-2xl rounded-full" />

          {/* iPhone Frame - Dark bezel like real iPhone */}
          <div
            className="relative bg-[#1a1a1a] rounded-[3rem] p-[10px]"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255,255,255,0.1) inset,
                -2px 0 4px rgba(0,0,0,0.2),
                2px 0 4px rgba(0,0,0,0.1)
              `,
              width: 320,
              height: 660,
            }}
          >
            {/* Side buttons */}
            <div className="absolute -left-[3px] top-28 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
            <div className="absolute -left-[3px] top-40 w-[3px] h-16 bg-[#2a2a2a] rounded-l-sm" />
            <div className="absolute -right-[3px] top-32 w-[3px] h-12 bg-[#2a2a2a] rounded-r-sm" />

            {/* Inner screen area */}
            <div className="relative w-full h-full bg-white rounded-[2.3rem] overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
                <div className="w-[120px] h-[35px] bg-black rounded-full flex items-center justify-center px-4">
                  <div className="w-3 h-3 rounded-full bg-[#1a1a1a] ring-1 ring-[#333]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] ml-auto" />
                </div>
              </div>

              {/* Status Bar */}
              <div className="relative h-14 flex items-end justify-between px-8 pb-1 z-20">
                <span className="text-sm font-semibold text-black">9:41</span>
                <div className="flex items-center gap-1.5">
                  {/* Cellular */}
                  <svg className="w-4 h-4" viewBox="0 0 18 12" fill="black">
                    <rect x="0" y="7" width="3" height="5" rx="0.5" />
                    <rect x="5" y="5" width="3" height="7" rx="0.5" />
                    <rect x="10" y="2" width="3" height="10" rx="0.5" />
                    <rect x="15" y="0" width="3" height="12" rx="0.5" />
                  </svg>
                  {/* WiFi */}
                  <svg className="w-4 h-4" viewBox="0 0 16 12" fill="black">
                    <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 7.5c2.5-2.5 6.5-2.5 9 0l-1 1c-2-2-5-2-7 0l-1-1zM1 5c3.9-3.9 10.1-3.9 14 0l-1 1c-3.3-3.3-8.7-3.3-12 0L1 5z" />
                  </svg>
                  {/* Battery */}
                  <svg className="w-6 h-3.5" viewBox="0 0 27 14" fill="none">
                    <rect x="0.5" y="0.5" width="23" height="13" rx="3" stroke="black" strokeWidth="1" />
                    <rect x="2" y="2" width="18" height="10" rx="1.5" fill="black" />
                    <path d="M25 4.5v5a2 2 0 002-2v-1a2 2 0 00-2-2z" fill="black" />
                  </svg>
                </div>
              </div>

              {/* App Header - Blue bar like reference */}
              <div className="bg-[#4285f4] px-4 py-3 flex items-center gap-3">
                <Mail className="w-5 h-5 text-white" />
                <span className="text-white font-semibold text-lg">Inbox</span>
              </div>

              {/* Content Area */}
              <div className="p-4 space-y-4 bg-[#f8f9fa]" style={{ height: 'calc(100% - 130px)' }}>
                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#4285f4] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">New Group Inquiry</span>
                        <span className="text-sm text-gray-400">now</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-0.5 truncate">
                        Sarah asked about availability for 12 guests o...
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* AI Processing Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 py-2"
                >
                  <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-500">AI analyzing...</span>
                </motion.div>

                {/* AI Draft Response Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <span className="text-primary font-medium text-sm">Draft Response</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Hi Sarah! Great news - we have spots available. I've tentatively reserved 12 places for you...
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex gap-3"
                >
                  <button className="flex-1 bg-primary text-white font-medium py-3 rounded-xl shadow-sm shadow-primary/20">
                    Send
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 rounded-xl">
                    Edit
                  </button>
                </motion.div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default IPhoneChatMockup
