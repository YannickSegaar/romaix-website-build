import type { Metadata } from 'next'
import {
  Hero,
  SocialProof,
  CaseStudies,
  Solutions,
  HowItWorks,
  FreeAssessment,
  FAQ,
  BlogPreview,
  Contact,
} from '@/components/sections'

export const metadata: Metadata = {
  description:
    'Transform your travel business with AI automation. RomAIx helps tour operators, travel agencies, and boutique hotels save time, reduce costs, and deliver exceptional guest experiences.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <CaseStudies />
      <Solutions />
      <HowItWorks />
      <FreeAssessment />
      <FAQ />
      <BlogPreview />
      <Contact />
    </>
  )
}
