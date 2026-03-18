import type { Metadata } from 'next'
import { DemoShowcase } from '@/components/demo/demo-showcase'

export const metadata: Metadata = {
  title: 'Design Demo | RomAIx',
  description: 'Preview of new visual design options',
  robots: { index: false, follow: false },
}

export default function DemoPage() {
  return <DemoShowcase />
}
