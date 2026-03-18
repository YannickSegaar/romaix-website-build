import type { Metadata } from 'next'
import { HeroV2 } from '@/components/sections/hero-v2'
import { HeroV3 } from '@/components/sections/hero-v3'
import {
  FloatingCards,
  InteractiveTabs,
  HorizontalCarousel,
  BentoGrid,
} from '@/components/services'
import { SocialProof } from '@/components/sections'
import { WorkflowSection } from '@/components/sections/workflow-section'
import { IPhoneChatMockup } from '@/components/mockups/iphone-chat-mockup'

export const metadata: Metadata = {
  title: 'Design Demo | RomAIx',
  description: 'Preview of new visual design options',
  robots: 'noindex, nofollow',
}

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Section Header */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">Design Demo</h1>
          <p className="text-muted-foreground">
            Preview the new hero sections and service visualization options.
            Scroll down to see each approach.
          </p>
        </div>
      </div>

      {/* NEW: 3D Isometric iPhone Mockup */}
      <div className="border-b-4 border-primary/20">
        <div className="bg-primary/10 px-4 py-2 text-center">
          <span className="text-sm font-medium text-primary">
            NEW: 3D ISOMETRIC iPHONE MOCKUP WITH FLOATING CHAT
          </span>
          <p className="text-xs text-primary/70 mt-1">
            Chat bubbles floating in 3D space - matches site's teal/white theme
          </p>
        </div>
        <section className="relative py-20 min-h-[700px] flex items-center justify-center overflow-hidden">
          {/* Background matching site style */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
          <IPhoneChatMockup />
        </section>
      </div>

      {/* Hero V3 - With morphing backgrounds */}
      <div className="border-b-4 border-amber-500/20">
        <div className="bg-amber-500/10 px-4 py-2 text-center">
          <span className="text-sm font-medium text-amber-600">
            HERO V3: MORPHING TRAVEL BACKGROUNDS (Recommended)
          </span>
          <p className="text-xs text-amber-600/70 mt-1">
            Add images to /public/images/hero/ to see the crossfade effect
          </p>
        </div>
        <HeroV3 />
      </div>

      {/* Hero V2 - With gradient mesh */}
      <div className="border-b-4 border-primary/20">
        <div className="bg-primary/5 px-4 py-2 text-center">
          <span className="text-sm font-medium text-primary">
            HERO V2: GRADIENT MESH BACKGROUND
          </span>
        </div>
        <HeroV2 />
      </div>

      {/* Integration bar / Social Proof */}
      <SocialProof />

      {/* NEW: Attio-Style Workflow Diagram */}
      <div className="border-b-4 border-blue-500/20">
        <div className="bg-blue-500/10 px-4 py-2 text-center">
          <span className="text-sm font-medium text-blue-600">
            NEW: ATTIO-STYLE WORKFLOW DIAGRAM
          </span>
          <p className="text-xs text-blue-600/70 mt-1">
            AI Email Processing Flow with animated SVG connectors and staggered node animations
          </p>
        </div>
        <WorkflowSection />
      </div>

      {/* Option 2: Interactive Tabs - NOW WITH iPHONE MOCKUP + AUTO-CYCLE */}
      <div className="border-b-4 border-green-500/20">
        <div className="bg-green-500/10 px-4 py-2 text-center">
          <span className="text-sm font-medium text-green-600">
            RECOMMENDED: INTERACTIVE TABS + iPHONE MOCKUP
          </span>
          <p className="text-xs text-green-600/70 mt-1">
            Auto-cycles every 5s, pauses on interaction. Click tabs or wait to see all channels.
          </p>
        </div>
        <InteractiveTabs />
      </div>

      {/* Option 1: Floating Cards */}
      <div className="border-b-4 border-blue-500/20">
        <div className="bg-blue-500/10 px-4 py-2 text-center">
          <span className="text-sm font-medium text-blue-600">
            OPTION 1: FLOATING CARDS (Hover to expand)
          </span>
        </div>
        <FloatingCards />
      </div>

      {/* Option 3: Horizontal Carousel */}
      <div className="border-b-4 border-purple-500/20">
        <div className="bg-purple-500/10 px-4 py-2 text-center">
          <span className="text-sm font-medium text-purple-600">
            OPTION 3: HORIZONTAL CAROUSEL (Swipe or use arrows)
          </span>
        </div>
        <HorizontalCarousel />
      </div>

      {/* Option 4: Bento Grid */}
      <div className="border-b-4 border-amber-500/20">
        <div className="bg-amber-500/10 px-4 py-2 text-center">
          <span className="text-sm font-medium text-amber-600">
            OPTION 4: BENTO GRID (Asymmetric layout)
          </span>
        </div>
        <BentoGrid />
      </div>

      {/* Summary */}
      <div className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Summary of Changes</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-card border border-blue-500/30">
              <div className="text-blue-500 font-semibold mb-2">✓ Attio-Style Workflow</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Animated SVG bezier connectors</li>
                <li>• Staggered node entrance animations</li>
                <li>• Three-way branch with labels</li>
                <li>• Responsive: compact view on mobile</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-card border border-green-500/30">
              <div className="text-green-500 font-semibold mb-2">✓ Interactive Tabs Upgraded</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Auto-cycles through channels every 5 seconds</li>
                <li>• Pauses on hover or click interaction</li>
                <li>• Progress bar shows time until next tab</li>
                <li>• iPhone mockup instead of generic card</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-card border border-amber-500/30">
              <div className="text-amber-500 font-semibold mb-2">✓ Hero V3 with Backgrounds</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Crossfading travel industry images</li>
                <li>• Industry label changes with image</li>
                <li>• Navigation dots to jump to specific industry</li>
                <li>• Ready for your images in /public/images/hero/</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 max-w-xl mx-auto">
            <p className="text-sm font-medium text-primary mb-2">Next Step: Add Travel Images</p>
            <p className="text-xs text-muted-foreground">
              Create <code className="bg-muted px-1 rounded">/public/images/hero/</code> folder and add:
              atv-tour.jpg, helicopter-tour.jpg, ski-school.jpg, surf-lesson.jpg, tour-bus.jpg, boutique-hotel.jpg
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
