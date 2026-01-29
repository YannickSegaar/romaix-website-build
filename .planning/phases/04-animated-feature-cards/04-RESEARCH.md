# Phase 4: Animated Feature Cards - Research

**Researched:** 2026-01-29
**Domain:** Framer Motion hover animations, 3D card transforms, scroll-triggered stagger animations
**Confidence:** HIGH

## Summary

Animated feature cards are a cornerstone of modern SaaS websites in 2026, with the industry moving toward purposeful motion that demonstrates product functionality rather than decorative effects. The "Trengo-style" pattern combines scroll-triggered reveals with sophisticated hover interactions including scale, rotation, and mouse-position-aware 3D tilts.

The project's existing Framer Motion 12.29.2 infrastructure provides all necessary capabilities. The StaggerContainer/StaggerItem pattern already implements scroll-triggered staggered reveals. For hover effects, Framer Motion's whileHover prop combined with GPU-accelerated transform properties (scale, rotate, rotateX, rotateY) delivers smooth 60fps animations. Mouse-position tracking requires useMotionValue and useTransform hooks for converting cursor coordinates to rotation values.

**Primary recommendation:** Build feature cards using existing StaggerContainer for scroll reveals, add whileHover transforms for simple hover effects, and optionally implement mouse-tracking 3D tilt for differentiator cards using useMotionValue pattern. Use @media(hover: hover) for desktop-only hover effects with mobile tap states as fallback.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.29.2 | Animation engine | Industry standard for React animations, already validated in Phase 1, GPU-accelerated transforms |
| Tailwind CSS | v4 | Styling & hover states | CSS-based config, built-in transition utilities, gradient animations via background-position |
| Next.js | 15 | App Router RSC | Server components with 'use client' animation wrappers per Phase 1 pattern |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.563.0 | Icon library | Feature card icons (already installed) |
| None needed | - | Integration logos | Use SVG icons from icons8.com or similar |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Framer Motion | CSS animations only | Less code but no gesture system, harder mobile fallbacks |
| Mouse tracking | Simple scale/rotate | Simpler implementation but less differentiating |
| Stagger on scroll | All-at-once reveal | Easier but less engaging visual experience |

**Installation:**
```bash
# No new packages needed - all dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── motion/                    # Existing animation wrappers
│   │   ├── fade-in.tsx           # ✅ Already exists
│   │   ├── slide-in.tsx          # ✅ Already exists
│   │   ├── stagger-container.tsx # ✅ Already exists
│   │   ├── hover-card.tsx        # NEW: whileHover wrapper
│   │   └── tilt-card.tsx         # NEW: mouse-tracking 3D tilt (optional)
│   └── sections/
│       └── solutions.tsx          # NEW: Solutions section with feature cards
└── types/
    └── content.ts                 # Extend with feature card types
```

### Pattern 1: Scroll-Triggered Stagger Reveal
**What:** Cards fade in with staggered timing as user scrolls to section
**When to use:** Initial reveal of feature cards on viewport entry
**Example:**
```typescript
// Source: Existing project pattern from Phase 1
import { StaggerContainer, StaggerItem } from '@/components/motion'

<StaggerContainer staggerDelay={0.15} delayChildren={0.2}>
  {features.map((feature) => (
    <StaggerItem key={feature.id}>
      <FeatureCard {...feature} />
    </StaggerItem>
  ))}
</StaggerContainer>
```
**Confidence:** HIGH - Pattern already implemented and validated in Phase 1

### Pattern 2: Simple Hover Effects (Scale + Color Shift)
**What:** Card scales up and color shifts on hover using whileHover
**When to use:** Standard interaction feedback for all feature cards
**Example:**
```typescript
// Source: https://www.framer.com/motion/gestures/
// https://refine.dev/blog/framer-motion-react-animations/
'use client'
import { motion } from 'framer-motion'

<motion.div
  whileHover={{
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  }}
  whileTap={{ scale: 0.98 }}
  className="rounded-lg border bg-card p-6 hover:shadow-xl transition-shadow"
>
  {children}
</motion.div>
```
**Confidence:** HIGH - Official Framer Motion pattern

### Pattern 3: 3D Tilt on Mouse Movement (Advanced)
**What:** Card rotates along X/Y axes based on cursor position within card bounds
**When to use:** Differentiator cards only (1-3 hero cards), not all cards
**Example:**
```typescript
// Source: https://dev.to/arielbk/how-to-make-a-3d-shiny-card-animation-react-ts-and-framer-motion-ijf
// https://medium.com/nicasource/3d-animations-with-framer-motion-13445d46e8c5
'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dampen = 40 // Lower = more dramatic tilt

  const rotateX = useTransform(mouseY, (latest) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2
    return -(latest - centerY) / dampen
  })

  const rotateY = useTransform(mouseX, (latest) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    return (latest - centerX) / dampen
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="rounded-lg border bg-card p-6"
      >
        {children}
      </motion.div>
    </div>
  )
}
```
**Confidence:** MEDIUM - Pattern well-documented but not yet tested in this codebase

### Pattern 4: Integration Logo Display
**What:** Grid or carousel of integration platform logos (WhatsApp, Instagram, Facebook)
**When to use:** Within Solutions section to show available integrations
**Example:**
```typescript
// Source: https://www.saasframe.io/patterns/blog-cards
// Static grid approach (simpler, better accessibility)
<div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
  {integrations.map((integration) => (
    <div
      key={integration.name}
      className="flex items-center justify-center rounded-lg border bg-muted/30 p-4 grayscale hover:grayscale-0 transition-all"
    >
      <img
        src={integration.logo}
        alt={integration.name}
        className="h-8 w-8 object-contain"
      />
    </div>
  ))}
</div>
```
**Confidence:** HIGH - Standard pattern in 2026 SaaS websites per https://webflow.com/blog/saas-website-design-examples

### Pattern 5: Mobile Touch Fallbacks
**What:** Desktop hover effects don't work on touch devices - use @media queries
**When to use:** All hover-based interactions
**Example:**
```typescript
// Source: https://www.lexo.ch/blog/2024/12/handling-hover-on-mobile-devices-with-html-css-and-javascript/
// https://itnext.io/finally-a-css-only-solution-to-hover-on-touchscreens-c498af39c31c

// In Tailwind config or component styles:
// Use @media(hover: hover) to apply hover effects only on devices with hover capability

// For Framer Motion:
<motion.div
  whileHover={{ scale: 1.05 }} // Only triggers on hover-capable devices
  whileTap={{ scale: 0.98 }}   // Triggers on all devices (touch + click)
  className="@media(hover:hover):hover:shadow-xl"
>
```
**Confidence:** HIGH - Standard CSS media query approach

### Anti-Patterns to Avoid
- **Hover-dependent critical information:** Don't hide essential content behind hover states - mobile users can't access it
- **Heavy animations on all cards:** Limit complex mouse-tracking effects to 1-3 hero cards, use simple scale/shadow for others
- **Layout shift on hover:** Use transform properties (scale, rotate) instead of width/height to avoid layout recalculation
- **Animating non-GPU properties:** Avoid animating width, height, top, left, margin - causes reflow and jank
- **Exit animations with viewport.once:** Per Phase 1 decision, all scroll animations are enter-only

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animation orchestration | Custom timeout chains | Framer Motion variants + staggerChildren | Handles timing, cleanup, interruption edge cases |
| Mouse position tracking | Raw clientX/clientY math | useMotionValue + useTransform | Optimized for performance, reactive, composable |
| Mobile hover detection | navigator.userAgent parsing | CSS @media(hover: hover) + whileTap | Standards-based, covers hybrid devices |
| GPU acceleration | Manual will-change CSS | Framer Motion transform props | Automatic compositor optimization |
| Spring physics | Custom easing functions | Framer Motion spring transitions | Physically accurate, configurable stiffness/damping |

**Key insight:** Framer Motion handles the complex animation lifecycle (mounting, unmounting, interruption, cleanup) that looks simple but has many edge cases. The useMotionValue/useTransform system provides reactive animation primitives that are difficult to replicate performantly with raw React state.

## Common Pitfalls

### Pitfall 1: Janky Hover Animations on Low-End Devices
**What goes wrong:** Cards stutter on hover, FPS drops below 60
**Why it happens:** Animating non-GPU properties (width, margin, box-shadow), too many cards with complex effects
**How to avoid:**
- Only animate transform and opacity (GPU-accelerated)
- Use Tailwind's transition-shadow utility for box-shadow (happens on main thread)
- Limit 3D tilt effects to 1-3 hero cards, not entire grid
- Test with Chrome DevTools CPU throttling at 4x slowdown
**Warning signs:** Red bars in Chrome Performance tab FPS chart
**Source:** https://motion.dev/docs/performance, https://developer.chrome.com/docs/devtools/performance

### Pitfall 2: Hover States Stuck on Mobile
**What goes wrong:** Card stays in "hovered" state after tap on touch device
**Why it happens:** CSS :hover persists after touch event on some mobile browsers
**How to avoid:**
- Wrap hover effects in `@media(hover: hover) and (pointer: fine)`
- Always provide whileTap alongside whileHover for touch feedback
- Test on actual mobile devices, not just desktop DevTools
**Warning signs:** Users report cards staying highlighted after tap
**Source:** https://www.lexo.ch/blog/2024/12/handling-hover-on-mobile-devices-with-html-css-and-javascript/

### Pitfall 3: Scroll Animations Don't Trigger
**What goes wrong:** Cards never animate in, stay in "hidden" state
**Why it happens:**
- Negative viewport margin too large (element never "in view")
- Parent container has overflow:hidden that breaks IntersectionObserver
- viewport.once=true + user scrolls too fast past trigger point
**How to avoid:**
- Test margin values: -50px to -100px works for most layouts
- Avoid overflow:hidden on containers with scroll animations
- Consider viewport.amount="some" for partially visible triggers
**Warning signs:** Cards visible but opacity:0, no animation on scroll
**Source:** Existing project pattern (StaggerContainer uses margin: "-50px")

### Pitfall 4: Mouse Tracking Performance Issues
**What goes wrong:** Card tilt animation lags behind cursor movement
**Why it happens:**
- Using React state instead of useMotionValue (causes re-renders)
- Not using useTransform (recalculating on every frame)
- getBoundingClientRect() called too frequently
**How to avoid:**
- Always use useMotionValue for mouse tracking (no re-renders)
- Use useTransform for derived values (optimized updates)
- Consider throttling mousemove events for complex calculations
- Use transition with spring physics for smooth interpolation
**Warning signs:** Janky tilt animation, FPS drops during mouse movement
**Source:** https://dev.to/arielbk/how-to-make-a-3d-shiny-card-animation-react-ts-and-framer-motion-ijf

### Pitfall 5: Gradient Color Shift Doesn't Animate
**What goes wrong:** Hover gradient change is instant, not smooth transition
**Why it happens:** CSS can't directly transition linear-gradient values
**How to avoid:**
- Use background-position animation with oversized gradient (bg-[size:_200%])
- OR layer two gradients and transition opacity of top layer
- OR animate border-color instead of background gradient
**Warning signs:** Tailwind transition class has no effect on gradient
**Source:** https://github.com/tailwindlabs/tailwindcss/discussions/4145

## Code Examples

Verified patterns from official sources:

### Basic Hover Card with Scale + Shadow
```typescript
// Source: https://www.framer.com/motion/gestures/
'use client'
import { motion } from 'framer-motion'

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group rounded-xl border-2 border-border bg-card p-6 transition-shadow hover:shadow-2xl"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
```

### Staggered Card Grid Reveal
```typescript
// Source: Existing project pattern + https://medium.com/@onifkay/creating-staggered-animations-with-framer-motion-0e7dc90eae33
import { StaggerContainer, StaggerItem } from '@/components/motion'

export function SolutionsSection() {
  return (
    <section className="py-24">
      <h2 className="mb-12 text-center text-4xl font-bold">Solutions</h2>

      <StaggerContainer
        staggerDelay={0.15}
        delayChildren={0.2}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature) => (
          <StaggerItem key={feature.id}>
            <FeatureCard {...feature} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
```

### Integration Logo Grid (Static)
```typescript
// Source: https://webflow.com/blog/saas-website-design-examples
const INTEGRATIONS = [
  { name: 'WhatsApp', logo: '/icons/whatsapp.svg' },
  { name: 'Instagram', logo: '/icons/instagram.svg' },
  { name: 'Facebook', logo: '/icons/facebook.svg' },
  // ... more
]

export function IntegrationLogos() {
  return (
    <div className="mt-12">
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
        INTEGRATES WITH
      </p>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-center rounded-lg border bg-muted/30 p-4 grayscale transition-all hover:grayscale-0"
          >
            <img
              src={integration.logo}
              alt={integration.name}
              className="h-8 w-8 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Advanced: 3D Tilt Card with Mouse Tracking
```typescript
// Source: https://dev.to/arielbk/how-to-make-a-3d-shiny-card-animation-react-ts-and-framer-motion-ijf
'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, (latest) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2
    return -(latest - centerY) / 40
  })

  const rotateY = useTransform(mouseX, (latest) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    return (latest - centerX) / 40
  })

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
        }}
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
```

### Gradient Hover Effect (Background Position Trick)
```typescript
// Source: https://github.com/tailwindlabs/tailwindcss/discussions/2361
// Note: Tailwind v4 syntax
<motion.div
  whileHover={{ scale: 1.02 }}
  className="rounded-lg bg-gradient-to-tr from-primary to-primary/60 bg-[size:_200%] bg-[position:_0%_0%] p-6 transition-all duration-500 hover:bg-[position:_100%_100%]"
>
  {children}
</motion.div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| All cards with 3D tilt | Hero cards only with tilt, others simple hover | 2025-2026 | Better performance, clearer visual hierarchy |
| Logo carousels everywhere | Static grids with hover effects | 2025-2026 | Better accessibility, less animation fatigue |
| Exit animations on scroll | Enter-only animations | Next.js 13+ | Prevents layout shift issues with RSC |
| will-change on everything | Let Framer Motion handle GPU | 2024+ | Browser handles optimization better |
| CSS @keyframes for complex | Framer Motion for interactive | 2023+ | Better gesture handling, mobile support |

**Deprecated/outdated:**
- **framer-motion/three:** Not needed for 2D card effects, overkill for this use case
- **GSAP ScrollTrigger:** Framer Motion's whileInView is simpler for basic scroll reveals
- **Auto-play logo carousels:** Accessibility concerns, prefer static grids per 2026 best practices

## Trengo Pattern Analysis

**What makes "Trengo-style" cards distinctive:**

Based on analysis of trengo.com homepage (fetched 2026-01-29):

1. **GSAP-powered scroll animations:** Trengo uses GSAP with ScrollTrigger for parallax effects (elements shift vertically as user scrolls with different offsets per screen size)
2. **Color accent on hover:** Purple accent color (#6a33fa, #946BFF) appears on interactive elements on hover
3. **Smooth easing:** Uses `ease: "power1.inOut"` and 2-second durations for polished transitions
4. **Number counters:** Animated counters that trigger on scroll with locale-formatted values
5. **Modular popup systems:** Toggle visibility states with overflow handling for interactive layers
6. **Multiple brand logos:** Logo carousels with visual repetition across viewport sizes

**Translation to Framer Motion:**
- Replace GSAP ScrollTrigger → Framer Motion whileInView
- Replace power1.inOut → easeOut (similar curve)
- Keep color accent hover pattern with Tailwind utilities
- Use StaggerContainer for card reveals instead of manual GSAP timeline
- Static logo grid instead of carousel (better for accessibility)

**Confidence:** MEDIUM - Based on Trengo's public HTML/CSS, not official documentation

## Performance Testing Protocol

**How to verify 60fps on mid-range devices:**

### Chrome DevTools Setup
1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click gear icon, enable "CPU: 4x slowdown" (simulates mid-range device)
4. For low-end testing, use "CPU: 6x slowdown"
5. Start recording, interact with cards, stop recording
6. Look for red bars above FPS chart (indicates dropped frames)

**Source:** https://developer.chrome.com/docs/devtools/performance

### Success Criteria
- **Green bars in FPS chart:** No red bars during hover/scroll animations
- **CPU usage:** Should not be maxed out (colorful CPU chart at 100%) during animations
- **Frame timing:** Main thread work should complete in <16.7ms per frame for 60fps
- **GPU acceleration:** Check Layers tab to confirm transform animations run on compositor

### Specific Tests
1. **Hover test:** Hover over cards repeatedly - should stay 60fps at 4x slowdown
2. **Scroll test:** Scroll to trigger stagger reveal - should stay smooth
3. **Simultaneous test:** Scroll while hovering cards - worst case scenario
4. **Mobile throttle:** Test at 6x slowdown to simulate low-end Android

**Confidence:** HIGH - Standard Chrome DevTools methodology per https://www.debugbear.com/blog/devtools-performance

## Open Questions

Things that couldn't be fully resolved:

1. **Workflow visualization within cards**
   - What we know: Trengo shows workflow concepts with icons and text
   - What's unclear: Whether RomAIx needs animated workflow diagrams or just static icons
   - Recommendation: Start with static icons + text, add animation only if user requests it during planning

2. **Integration logo source**
   - What we know: SVG icons available from icons8.com, Vecteezy, icon-icons.com
   - What's unclear: Whether RomAIx has brand guidelines for displaying partner logos
   - Recommendation: Use official brand icons from each platform's press kit where possible

3. **Number of feature cards**
   - What we know: Pattern works for 3-9 cards in grid layout
   - What's unclear: Exact number of features RomAIx wants to highlight
   - Recommendation: Design for 3 hero cards (with 3D tilt) + 3-6 additional cards (simple hover)

## Sources

### Primary (HIGH confidence)
- Framer Motion Official Docs (motion.dev) - Gestures and animation documentation
- Chrome DevTools Performance Guide - https://developer.chrome.com/docs/devtools/performance
- Project codebase - Existing StaggerContainer, FadeIn, SlideIn patterns validated in Phase 1
- Trengo.com homepage analysis - https://trengo.com (fetched 2026-01-29)

### Secondary (MEDIUM confidence)
- [Framer Motion examples: Hover animations](https://framermotionexamples.com/example/framer-motion-hover-animations)
- [DEV Community: 3D shiny card animation](https://dev.to/arielbk/how-to-make-a-3d-shiny-card-animation-react-ts-and-framer-motion-ijf)
- [Medium: Creating staggered animations with Framer Motion](https://medium.com/@onifkay/creating-staggered-animations-with-framer-motion-0e7dc90eae33)
- [Refine: Framer Motion React animations](https://refine.dev/blog/framer-motion-react-animations/)
- [Motion.dev: Animation performance guide](https://motion.dev/docs/performance)
- [SaaSFrame: SaaS Landing Page Trends for 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)
- [Webflow: SaaS website design examples 2026](https://webflow.com/blog/saas-website-design-examples)
- [Lexo: Handle Hover on Mobile](https://www.lexo.ch/blog/2024/12/handling-hover-on-mobile-devices-with-html-css-and-javascript/)
- [ITNEXT: CSS only hover solution for touchscreens](https://itnext.io/finally-a-css-only-solution-to-hover-on-touchscreens-c498af39c31c)
- [DebugBear: CPU Throttling in Chrome DevTools](https://www.debugbear.com/blog/cpu-throttling-in-chrome-devtools-and-lighthouse)
- [Calibre: Investigate animation performance with DevTools](https://calibreapp.com/blog/investigate-animation-performance-with-devtools)
- [HyperUI: Animated border gradient with Tailwind CSS v4](https://www.hyperui.dev/blog/animated-border-gradient-with-tailwindcss/)
- [GitHub: Tailwind CSS gradient transition discussion](https://github.com/tailwindlabs/tailwindcss/discussions/4145)
- [Icons8: WhatsApp Instagram Facebook icons](https://icons8.com/icons/set/facebook-instagram-whatsapp-x)

### Tertiary (LOW confidence)
- Various WebSearch results about SaaS design trends - provide directional guidance but lack technical specifics

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Framer Motion 12.29.2 already installed and validated, all patterns documented
- Architecture: HIGH - Existing project patterns provide proven foundation, new patterns have multiple verified sources
- Pitfalls: HIGH - Common issues well-documented in official Chrome DevTools and Framer Motion performance guides
- Trengo pattern: MEDIUM - Based on public HTML/CSS analysis, not official implementation guide
- Performance testing: HIGH - Standard Chrome DevTools methodology with specific metrics
- Integration logos: MEDIUM - Multiple sources available but no official RomAIx requirements

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days - stable domain, Framer Motion 12.x is mature)
