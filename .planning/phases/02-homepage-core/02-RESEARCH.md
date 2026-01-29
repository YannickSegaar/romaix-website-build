# Phase 2: Homepage Core (Table Stakes) - Research

**Researched:** 2026-01-29
**Domain:** Next.js 15 homepage sections with shadcn/ui, Framer Motion, and Tailwind CSS
**Confidence:** HIGH

## Summary

This research investigates how to build the core homepage sections for a B2B SaaS/agency marketing website using the existing Next.js 15 + shadcn/ui + Framer Motion stack. Phase 2 covers six key requirements: Hero section with value proposition (HOME-01, HOME-02), Social proof logo bar (HOME-03), Case Studies showcase (HOME-06), How It Works section (HOME-07), and FAQ accordion (HOME-10).

The standard approach leverages Server Components for static content sections while using the existing Framer Motion animation wrappers (FadeIn, SlideIn, StaggerContainer) for scroll-triggered animations. The shadcn/ui Accordion component handles FAQ functionality with full accessibility. Logo bars use CSS-only infinite marquee animations with grayscale styling. Case study cards use the existing Card component with quantified metrics prominently displayed.

Key patterns identified: Hero sections must answer "what, who, why" within 5 seconds with benefit-driven headlines under 8 words; social proof belongs near the hero to establish early trust; case studies should lead with quantified metrics (40%+ improvement, hours saved); How It Works sections work best with 3-4 steps maximum; FAQ accordions use caret icons (not plus signs) and need full-width clickable areas.

**Primary recommendation:** Build each homepage section as a separate Server Component in `src/components/sections/`, wrap animated content with existing motion wrappers, use shadcn/ui Accordion for FAQ, create a CSS-only logo marquee for social proof, and structure case study cards to prominently feature quantified results.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Framework with App Router, Server Components | Already installed, handles SSR/SSG, optimal for SEO |
| React | 19.2.3 | UI library | Already installed |
| Tailwind CSS | 4.x | Utility-first styling | Already installed, CSS-first config |
| shadcn/ui | latest | Component library | Already initialized, provides Card, Button |
| Framer Motion | 12.29.2 | Animation library | Already installed with wrapper components |

### Components Needed (Install via shadcn/ui)
| Component | Purpose | When to Use |
|-----------|---------|-------------|
| Accordion | FAQ section | Expandable Q&A with accessibility |

### Supporting (Already Available)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.563.0 | Icons | Chevron icons for accordion, step icons |
| class-variance-authority | 0.7.1 | Component variants | Section styling variations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS marquee | Framer Motion ticker | Motion ticker is Motion+ paid; CSS is free and sufficient |
| shadcn/ui Accordion | Custom accordion | Lose accessibility, keyboard navigation |
| Static logo grid | Logo marquee | Marquee adds visual interest but is more complex |

**Installation:**
```bash
# Add Accordion component for FAQ section
npx shadcn@latest add accordion
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── page.tsx              # Homepage - imports section components
├── components/
│   ├── sections/             # Homepage sections (NEW)
│   │   ├── hero.tsx          # Hero with CTAs
│   │   ├── social-proof.tsx  # Logo bar/marquee
│   │   ├── case-studies.tsx  # Case study cards
│   │   ├── how-it-works.tsx  # Step process
│   │   ├── faq.tsx           # FAQ accordion
│   │   └── index.ts          # Barrel export
│   ├── ui/                   # shadcn components
│   │   └── accordion.tsx     # (to be added)
│   ├── motion/               # Animation wrappers (existing)
│   └── layout/               # Header, Footer (existing)
├── data/                     # Static content data (NEW)
│   ├── case-studies.ts       # Case study data
│   ├── faq.ts                # FAQ questions/answers
│   └── how-it-works.ts       # Process steps
└── types/                    # TypeScript types (NEW)
    └── content.ts            # Content type definitions
```

### Pattern 1: Server Component Sections with Animation Islands
**What:** Keep section components as Server Components, import client animation wrappers only where needed.
**When to use:** All homepage sections to maximize SSR benefits.
**Example:**
```typescript
// components/sections/hero.tsx (Server Component - no 'use client')
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion'

export function Hero() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24 lg:py-32">
      <FadeIn className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          AI Automation for{' '}
          <span className="text-primary">Travel Businesses</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Save 40+ hours per week. Automate customer service, bookings, and workflows.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="/contact?type=demo">Book a Demo</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/contact?type=assessment">Get Free Assessment</a>
          </Button>
        </div>
      </FadeIn>
    </section>
  )
}
```

### Pattern 2: CSS-Only Infinite Logo Marquee
**What:** Create seamless infinite scrolling logo bar using CSS animations without JavaScript.
**When to use:** Social proof logo bars where simplicity and performance matter.
**Example:**
```typescript
// components/sections/social-proof.tsx
// Note: Requires custom Tailwind animation in globals.css

const logos = [
  { name: 'Client A', src: '/logos/client-a.svg' },
  { name: 'Client B', src: '/logos/client-b.svg' },
  // ... more logos
]

export function SocialProof() {
  return (
    <section className="py-12 overflow-hidden bg-muted/30">
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground font-medium">
          Trusted by leading travel businesses
        </p>
      </div>
      <div className="relative">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee container */}
        <div className="flex animate-marquee">
          {/* Duplicate logos for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-shrink-0 mx-8">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Required CSS (add to globals.css):**
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

### Pattern 3: Case Study Cards with Quantified Metrics
**What:** Card layout that leads with metrics/results, includes industry and client context.
**When to use:** Case study showcase sections.
**Example:**
```typescript
// components/sections/case-studies.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { StaggerContainer, StaggerItem } from '@/components/motion'
import { ArrowRight } from 'lucide-react'

interface CaseStudy {
  id: string
  client: string
  industry: string
  metric: string
  metricValue: string
  description: string
  slug: string
}

export function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Real Results for Travel Businesses
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          See how we've helped businesses like yours save time and grow
        </p>
      </div>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <StaggerItem key={study.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                {/* Metric prominently displayed */}
                <div className="text-4xl font-bold text-primary mb-2">
                  {study.metricValue}
                </div>
                <CardTitle className="text-lg">{study.metric}</CardTitle>
                <CardDescription>
                  {study.client} - {study.industry}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <a
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Read case study <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
```

### Pattern 4: How It Works Step Process
**What:** Visual 3-4 step process with numbered steps and brief descriptions.
**When to use:** Explaining engagement model or product workflow.
**Example:**
```typescript
// components/sections/how-it-works.tsx
import { FadeIn } from '@/components/motion'
import { StaggerContainer, StaggerItem } from '@/components/motion'

interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  { number: '01', title: 'Discovery Call', description: 'We learn about your current workflows and pain points' },
  { number: '02', title: 'Custom Solution', description: 'We design AI agents tailored to your specific needs' },
  { number: '03', title: 'Implementation', description: 'We build and integrate with your existing tools' },
  { number: '04', title: 'Ongoing Support', description: 'We monitor, optimize, and scale as you grow' },
]

export function HowItWorks() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24 bg-muted/30">
      <FadeIn className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          From discovery to deployment in weeks, not months
        </p>
      </FadeIn>

      <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <StaggerItem key={step.number} className="text-center">
            <div className="text-5xl font-bold text-primary/20 mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
```

### Pattern 5: FAQ Accordion with shadcn/ui
**What:** Expandable FAQ using shadcn/ui Accordion with proper accessibility.
**When to use:** FAQ sections with 5-10 questions grouped by topic.
**Example:**
```typescript
// components/sections/faq.tsx
'use client' // Required for Accordion interactivity

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FadeIn } from '@/components/motion'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What industries do you specialize in?',
    answer: 'We specialize in AI automation for the travel industry, including tour operators, travel agencies, and boutique hotels.',
  },
  // ... more FAQs
]

export function FAQ() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24">
      <FadeIn className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about working with us
        </p>
      </FadeIn>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```

### Anti-Patterns to Avoid
- **Hero carousels:** Only 1% of users see slides beyond the first. Use static hero with clear value prop.
- **Multiple competing CTAs:** Stick to 2 CTAs max in hero (Book Demo + Free Assessment).
- **Generic testimonials:** Use specific, quantified results ("Saved 40 hours/week" not "Great service").
- **Tech jargon:** Avoid LLM, RAG, AI Agent without context. Lead with benefits ("Automate booking replies").
- **Plus icons for accordion:** Use caret/chevron icons - plus signs can be confused with "add" actions.
- **Clickable icon only:** Make entire accordion header clickable, not just the icon.
- **Too many FAQ items:** Keep to 5-7 questions max without grouping. Use subheaders for larger sets.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Expandable FAQ sections | Custom useState toggle logic | shadcn/ui Accordion | Radix handles keyboard navigation, ARIA, focus management, animation |
| Scroll-triggered section reveals | IntersectionObserver + manual state | Framer Motion FadeIn/SlideIn wrappers | Already built, handles cleanup, optimized performance |
| Staggered card animations | Manual delay calculations | StaggerContainer + StaggerItem | Declarative API, handles timing orchestration |
| Logo bar infinite scroll | Custom requestAnimationFrame loop | CSS @keyframes animation | Simpler, better performance, no JS needed |
| Responsive typography | Manual media queries | Tailwind responsive prefixes | Built-in, consistent, mobile-first |
| Button variants | Custom styled buttons | shadcn/ui Button with variants | Consistent styling, accessibility, asChild pattern for links |

**Key insight:** The existing stack (shadcn/ui + Framer Motion wrappers + Tailwind) covers all homepage section needs. No new libraries required beyond adding the Accordion component via shadcn CLI.

## Common Pitfalls

### Pitfall 1: Value Proposition Too Long or Vague
**What goes wrong:** Hero headline exceeds 8 words, uses jargon, or fails to answer "what, who, why."
**Why it happens:** Trying to communicate everything instead of one clear message.
**How to avoid:** Write headline under 44 characters (8 words max). Lead with benefit, not feature. Test: can someone understand what you do in 5 seconds?
**Warning signs:** Bounce rate >60% on homepage, low scroll depth, visitors leaving without clicking CTAs.

### Pitfall 2: Case Studies Without Quantified Results
**What goes wrong:** Case studies describe process but don't show measurable outcomes.
**Why it happens:** Results data not collected or shared by clients.
**How to avoid:** Always include at least one number: time saved, conversion increase, cost reduction, hours automated. "50% faster booking responses" > "Improved efficiency."
**Warning signs:** Low engagement on case study section, prospects asking "what results have you achieved?" on calls.

### Pitfall 3: FAQ Accordion Missing Accessibility
**What goes wrong:** Custom accordion works with mouse but fails keyboard navigation and screen readers.
**Why it happens:** Building from scratch without understanding ARIA requirements.
**How to avoid:** Use shadcn/ui Accordion (built on Radix) which handles keyboard (Arrow keys, Space, Enter, Home, End), focus management, and ARIA attributes automatically.
**Warning signs:** Accessibility audit failures, users complaining on mobile, no keyboard navigation.

### Pitfall 4: Logo Bar Performance Issues
**What goes wrong:** JavaScript-based marquee causes jank, especially on mobile.
**Why it happens:** Using requestAnimationFrame or Framer Motion for continuous animation.
**How to avoid:** Use CSS-only @keyframes animation. CSS animations run on compositor thread, avoiding main thread blocking.
**Warning signs:** Stuttering animation, high CPU usage on mobile, battery drain complaints.

### Pitfall 5: Client Components for Static Content
**What goes wrong:** Marking entire sections as 'use client' bloats bundle size.
**Why it happens:** One interactive element (accordion) causes entire section to become client component.
**How to avoid:** Keep sections as Server Components. Only the FAQ section needs 'use client' because Accordion requires it. Hero, Case Studies, How It Works, and Social Proof should all be Server Components.
**Warning signs:** Large First Load JS in build output, slow Time to Interactive.

### Pitfall 6: Social Proof Too Far From Hero
**What goes wrong:** Logo bar placed at bottom of page where most visitors never scroll.
**Why it happens:** Treating social proof as optional decoration.
**How to avoid:** Place social proof immediately after hero section. Trust must be established early. Nielsen research shows 83% of visitors trust peer recommendations.
**Warning signs:** Low credibility perception in user testing, high bounce rate despite clear value prop.

## Code Examples

Verified patterns from official sources:

### shadcn/ui Accordion Installation and Usage
```bash
# Source: https://ui.shadcn.com/docs/components/accordion
npx shadcn@latest add accordion
```

```typescript
// Source: https://ui.shadcn.com/docs/components/accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Single item open at a time, collapsible
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple items can be open
<Accordion type="multiple">
  {/* ... */}
</Accordion>

// With default open item
<Accordion type="single" collapsible defaultValue="item-1">
  {/* ... */}
</Accordion>
```

### CSS Infinite Marquee Animation
```css
/* Source: https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/ */
/* Add to globals.css */

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* For use with Tailwind CSS v4 @theme directive */
@theme {
  --animate-marquee: marquee 30s linear infinite;
}

/* Or inline style approach */
.animate-marquee {
  animation: marquee 30s linear infinite;
}

/* Pause on hover (optional) */
.animate-marquee:hover {
  animation-play-state: paused;
}
```

### Existing Animation Wrapper Usage
```typescript
// Source: Existing codebase - src/components/motion/
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from '@/components/motion'

// Fade in on scroll
<FadeIn delay={0.2}>
  <h2>Section Title</h2>
</FadeIn>

// Slide in from direction
<SlideIn direction="left" distance={50}>
  <Card>Content</Card>
</SlideIn>

// Staggered list animation
<StaggerContainer staggerDelay={0.1} delayChildren={0.2}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Button with Link (asChild Pattern)
```typescript
// Source: shadcn/ui Button documentation
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Using asChild to render as Link
<Button asChild>
  <Link href="/contact?type=demo">Book a Demo</Link>
</Button>

// Or with anchor tag
<Button size="lg" variant="outline" asChild>
  <a href="/contact?type=assessment">Get Free Assessment</a>
</Button>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript marquee animations | CSS @keyframes marquee | 2024+ | Better performance, no JS overhead, runs on compositor thread |
| Custom accordion with useState | Radix-based shadcn/ui Accordion | 2023+ | Full accessibility built-in, keyboard navigation, ARIA compliance |
| Exit animations on navigation | Enter-only animations (viewport.once) | Next.js App Router (2022+) | Exit animations don't work in App Router, use whileInView instead |
| Large hero images | Product UI mockups/workflows | 2025-2026 | Show the product, not generic imagery; builds trust faster |
| Clever/abstract headlines | Benefit-driven headlines <8 words | 2025-2026 | Clarity beats cleverness; users scan, don't read |
| Logo grid (static) | Logo marquee (animated) | 2024+ | Adds visual interest, fits more logos in less space |

**Deprecated/outdated:**
- **Plus icons for accordions:** Research shows caret icons are clearer for expand/collapse
- **Carousels for hero content:** Only 1% see beyond first slide; use static hero
- **Generic stock photos in hero:** Product screenshots or workflow visualizations perform better
- **Tech jargon in headlines:** B2B buyers respond to outcomes, not technology names

## Open Questions

Things that couldn't be fully resolved:

1. **Actual client logos for social proof bar**
   - What we know: Need grayscale logos, consistent height (~32px), permission from clients
   - What's unclear: Which clients have given permission, logo file availability
   - Recommendation: Use placeholder logos initially, create `/public/logos/` directory structure. Replace with real logos as permissions are obtained.

2. **Specific case study data (metrics, client names)**
   - What we know: Need 3 case studies with quantified results for Phase 2
   - What's unclear: Exact metrics, client permission to use names
   - Recommendation: Create data structure in `src/data/case-studies.ts` with placeholder content. Case study content can be populated from existing site or new client interviews.

3. **FAQ content specific to RomAIx services**
   - What we know: Need 5-7 common questions about AI automation for travel industry
   - What's unclear: Actual frequently asked questions from sales conversations
   - Recommendation: Start with generic AI/automation FAQs, refine based on actual customer questions. Create in `src/data/faq.ts` for easy updates.

4. **Whether logo marquee should pause on hover**
   - What we know: CSS supports `animation-play-state: paused` on hover
   - What's unclear: User preference for this interaction
   - Recommendation: Implement pause-on-hover as it's low effort and provides better UX for users trying to read logo names.

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Accordion Documentation](https://ui.shadcn.com/docs/components/accordion) - Component API, installation, usage examples
- [Radix UI Accordion Primitives](https://www.radix-ui.com/primitives/docs/components/accordion) - Underlying accessibility implementation
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) - Component architecture patterns
- Existing codebase: `src/components/motion/*.tsx` - Animation wrapper implementations
- Existing codebase: `src/components/ui/*.tsx` - shadcn/ui component patterns

### Secondary (MEDIUM confidence)
- [Cruip: Infinite Horizontal Scroll with Tailwind](https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/) - CSS marquee implementation
- [Builder.io: Scrolling Logo Animation Tailwind](https://www.builder.io/blog/scrolling-logo-animation-tailwindcss) - Alternative marquee approach
- [Best B2B SaaS Website Examples 2026](https://www.vezadigital.com/post/best-b2b-saas-websites-2026) - Hero section best practices
- [Designing B2B SaaS Homepages 2026](https://genesysgrowth.com/blog/designing-b2b-saas-homepages) - Value proposition guidelines
- [Accordion UI Best Practices](https://www.eleken.co/blog-posts/accordion-ui) - UX research on accordion design
- [SaaSFrame: How It Works Examples](https://saaspo.com/section-type/saas-how-it-works-section-examples) - Process section patterns

### Tertiary (LOW confidence)
- [Social Proof Landing Pages 2026](https://www.nudgify.com/social-proof-landing-pages/) - Placement recommendations
- [Case Studies for B2B Websites](https://www.trajectorywebdesign.com/blog/case-studies-for-b2b-websites) - Card layout patterns
- Design screenshots in `.planning/design-analysis/` - Trengo, Attio design patterns (visual reference only)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using existing installed libraries, verified from package.json
- Architecture: HIGH - Patterns follow Next.js App Router documentation and existing codebase conventions
- Pitfalls: HIGH - Based on official documentation, accessibility standards, and established UX research
- Code examples: HIGH - From official shadcn/ui docs and verified existing codebase

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days - stable patterns, content structure may evolve)

**Research notes:**
- All homepage sections can be built with existing stack (no new dependencies except shadcn/ui Accordion)
- Animation wrappers already handle the enter-only pattern needed for App Router
- Focus on content structure and data files since UI patterns are established
- CSS marquee preferred over JS for logo bar performance
- FAQ is the only section requiring 'use client' due to Accordion interactivity
