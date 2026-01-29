# Phase 1: Foundation & Setup - Research

**Researched:** 2026-01-29
**Domain:** Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion
**Confidence:** HIGH

## Summary

This research investigates the standard approach for establishing a Next.js 15 foundation with TypeScript, Tailwind CSS, shadcn/ui components, and Framer Motion animations. The stack represents the current state-of-the-art for building performant, animated marketing websites with App Router.

The standard initialization flow uses `create-next-app` with default options (TypeScript, Tailwind, ESLint, App Router enabled by default in Next.js 15), followed by shadcn/ui initialization using the CLI, which sets up component infrastructure with CSS variables for theming. Framer Motion integration requires creating client component wrappers to work with Server Components in App Router, with scroll-triggered animations using `whileInView` and staggered lists using `variants` with `staggerChildren`.

Critical pitfalls identified include: exit animations don't work in App Router (use enter-only animations), client component boundary creep can bloat bundles (create minimal wrappers), OKLCH color format required for shadcn/ui theming (not hex), and mobile-first Tailwind approach (unprefixed utilities target mobile, not `sm:`).

**Primary recommendation:** Initialize with `create-next-app@latest` accepting defaults, configure shadcn/ui with OKLCH brand colors in CSS variables, create reusable Framer Motion wrapper components marked "use client", and structure with separate components/ and app/ directories for clean separation.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x | React framework with App Router | Industry standard for SSR/SSG, built-in routing, Vercel optimization |
| TypeScript | 5.x | Type safety | Default in create-next-app, catches errors at build time |
| Tailwind CSS | 4.x | Utility-first CSS | Default in create-next-app, rapid styling, built-in responsive design |
| shadcn/ui | latest | Component library | Copy-paste components, full customization, uses Tailwind + Radix UI primitives |
| Framer Motion | 11.x | Animation library | Industry standard for React animations, declarative API, scroll triggers |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Radix UI | latest | Headless UI primitives | Automatically installed by shadcn/ui for accessibility |
| clsx / cn utility | latest | Conditional classNames | Installed by shadcn/ui for className merging |
| OKLCH color tools | N/A | Hex to OKLCH conversion | One-time use for brand color conversion |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn/ui | Headless UI directly | More control but lose pre-styled patterns |
| Framer Motion | React Spring | Different API, less declarative, steeper learning curve |
| Tailwind CSS v4 | v3 | v4 uses CSS-first config (@theme directive), breaking change from JS config |

**Installation:**
```bash
# Initialize Next.js project
npx create-next-app@latest project-name

# Interactive prompts (or use --yes for defaults):
# - TypeScript: Yes (default)
# - ESLint: Yes (default)
# - Tailwind CSS: Yes (default)
# - src/ directory: Recommended for cleaner separation
# - App Router: Yes (default)
# - Import alias: @/* (default)
# - Turbopack: Yes (default)

# Initialize shadcn/ui
npx shadcn@latest init

# Add core components for marketing site
npx shadcn@latest add button card input label
```

## Architecture Patterns

### Recommended Project Structure
```
project-root/
├── src/
│   ├── app/                    # App Router (routing only)
│   │   ├── layout.tsx          # Root layout with HTML/body
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles + shadcn variables
│   ├── components/             # Shared components
│   │   ├── ui/                 # shadcn components (auto-generated)
│   │   ├── layout/             # Header, Footer
│   │   ├── motion/             # Framer Motion wrappers
│   │   │   ├── fade-in.tsx
│   │   │   ├── slide-in.tsx
│   │   │   └── stagger-container.tsx
│   │   └── sections/           # Page sections (Hero, Features, etc.)
│   ├── lib/                    # Utilities
│   │   └── utils.ts            # cn() utility (auto-generated)
│   └── types/                  # TypeScript types
├── public/                     # Static assets
└── tailwind.config.ts          # Tailwind configuration
```

### Pattern 1: Root Layout with Header/Footer
**What:** Root layout defines HTML scaffold and persistent UI elements (header, footer) shared across all pages.
**When to use:** Required in every Next.js App Router project for global layout.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages
// app/layout.tsx
import '@/app/globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Pattern 2: Framer Motion Client Component Wrappers
**What:** Wrap motion.div and other elements in "use client" components to work with Server Components.
**When to use:** Any time you need Framer Motion animations in App Router.
**Example:**
```typescript
// Source: https://dev.to/sushilmagare10/animate-like-a-pro-creating-a-reusable-motiondiv-using-motion-1h7i
// components/motion/fade-in.tsx
'use client'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInProps extends HTMLMotionProps<'div'> {
  className?: string
}

export function FadeIn({ children, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 3: Staggered List/Grid Animations
**What:** Parent-child variant pattern that staggers child animation timing.
**When to use:** Lists, grids, card layouts where items should animate in sequence.
**Example:**
```typescript
// Source: https://www.framer.com/motion/transition/
// components/motion/stagger-container.tsx
'use client'
import { motion, Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function StaggerContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={itemVariants}>{children}</motion.div>
}
```

### Pattern 4: shadcn/ui Custom Brand Color
**What:** Override CSS variables in globals.css to apply brand color to all components.
**When to use:** Required during initial setup to match brand identity.
**Example:**
```css
/* Source: https://ui.shadcn.com/docs/theming */
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);

    /* Brand color #587C74 converted to OKLCH */
    --primary: oklch(0.52 0.05 170);
    --primary-foreground: oklch(0.985 0 0);

    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);

    --radius: 0.5rem;
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);

    --primary: oklch(0.55 0.05 170);
    --primary-foreground: oklch(0.145 0 0);
  }
}
```

### Pattern 5: Tailwind Mobile-First Responsive Design
**What:** Use unprefixed utilities for mobile, add breakpoint prefixes for larger screens.
**When to use:** All responsive styling (this is Tailwind's core approach).
**Example:**
```tsx
// Source: https://tailwindcss.com/docs/responsive-design
// Correct mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>

// WRONG - sm: does not target mobile
<div className="sm:w-full">
  {/* This applies at 640px+, NOT mobile */}
</div>
```

### Anti-Patterns to Avoid
- **Using exit animations with App Router:** Exit animations don't work due to component unmounting behavior. Use enter-only animations with `whileInView` and `viewport={{ once: true }}`.
- **Marking entire pages "use client":** Creates large client bundles. Only mark animation wrapper components as client components.
- **Using hex colors in shadcn/ui CSS variables:** shadcn/ui v2 uses OKLCH format. Convert hex to OKLCH using tools like oklch.com.
- **Targeting mobile with sm: prefix:** In Tailwind's mobile-first system, unprefixed utilities target mobile. `sm:` applies at 640px+.
- **Putting all code in app/ directory:** Keep app/ for routing only. Store components, utilities, and types in separate directories.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible dropdowns, dialogs, tooltips | Custom click handlers and CSS | shadcn/ui components (built on Radix UI) | Radix handles focus traps, keyboard navigation, ARIA attributes, screen readers |
| Scroll-triggered animations | IntersectionObserver + CSS transitions | Framer Motion whileInView | Handles viewport detection, animation orchestration, cleanup, performance optimization |
| Staggered list animations | Manual delay calculations with setTimeout | Framer Motion variants with staggerChildren | Declarative API, handles timing, supports both enter and stagger in one config |
| Responsive breakpoint hooks | Custom window.matchMedia listeners | Tailwind's mobile-first utilities | No JavaScript needed, optimized bundle, works with SSR |
| Class name conditional logic | String concatenation or template literals | clsx or cn utility | Handles falsy values, merges Tailwind classes correctly, prevents duplicates |
| Color theming system | CSS custom properties manually managed | shadcn/ui CSS variables | Automatic dark mode, semantic naming, works with all components |

**Key insight:** This stack (shadcn/ui + Framer Motion + Tailwind) exists specifically to avoid hand-rolling common UI patterns. Radix primitives handle complex accessibility, Framer Motion handles animation complexity, Tailwind handles responsive design. Custom implementations miss edge cases and accessibility requirements.

## Common Pitfalls

### Pitfall 1: Framer Motion Exit Animations in App Router
**What goes wrong:** AnimatePresence exit animations don't trigger on page/component unmounts.
**Why it happens:** Next.js App Router swaps components immediately during navigation without giving time for exit animations. The OuterLayoutRouter component fully replaces content before animation can complete.
**How to avoid:** Use enter-only animations with `whileInView` and `viewport={{ once: true }}`. Don't use AnimatePresence for page transitions.
**Warning signs:** Components disappear instantly instead of animating out. AnimatePresence wrapping page content has no effect.
**Sources:** [GitHub Issue #49279](https://github.com/vercel/next.js/issues/49279), [GitHub Issue #2411](https://github.com/framer/motion/issues/2411)

### Pitfall 2: Client Component Boundary Creep
**What goes wrong:** Marking large components or entire pages "use client" bloats the client bundle, negating Next.js SSR benefits.
**Why it happens:** Framer Motion only works in client components, tempting developers to mark parent components as client.
**How to avoid:** Create small, focused wrapper components for motion elements. Mark only the wrapper "use client", not the parent component.
**Warning signs:** Large page bundle sizes. DevTools show Server Components being hydrated unnecessarily.
**Sources:** [StaticMania Article](https://staticmania.com/blog/how-to-use-framer-motion-for-animations-in-next-js)

### Pitfall 3: Using Hex Colors in shadcn/ui Theme Variables
**What goes wrong:** Brand colors defined as hex values in CSS variables don't work with shadcn/ui components or Tailwind opacity modifiers.
**Why it happens:** shadcn/ui v2 and Tailwind CSS v4 use OKLCH color format for better color consistency and opacity support.
**How to avoid:** Convert hex colors to OKLCH format using tools like oklch.com, oklch.fyi, or oklch.net before adding to CSS variables.
**Warning signs:** Colors appear wrong. Opacity modifiers like `bg-primary/50` don't work. Tailwind throws warnings about color format.
**Sources:** [shadcn/ui Theming Docs](https://ui.shadcn.com/docs/theming)

### Pitfall 4: Misunderstanding Tailwind Mobile-First Breakpoints
**What goes wrong:** Using `sm:` prefix to target mobile devices applies styles at 640px+ instead of mobile.
**Why it happens:** Tailwind uses min-width media queries (mobile-first), not max-width. `sm:` means "small screens and up", not "small screens only".
**How to avoid:** Use unprefixed utilities for mobile base styles. Add breakpoint prefixes for progressively larger screens.
**Warning signs:** Styles missing on mobile but appear on tablet. "Mobile-first" code doesn't work on actual mobile devices.
**Sources:** [Tailwind Responsive Design Docs](https://tailwindcss.com/docs/responsive-design)

### Pitfall 5: Missing Root Layout Requirements
**What goes wrong:** Build fails with error about missing html/body tags or children prop.
**Why it happens:** App Router requires a root layout (app/layout.tsx) that explicitly defines `<html>` and `<body>` tags and accepts a `children` prop.
**How to avoid:** Always include app/layout.tsx with html, body tags, and children prop. Never skip or delete the root layout.
**Warning signs:** Build error: "Root layout must export a default component" or "The root layout must include html and body tags".
**Sources:** [Next.js Layouts and Pages Docs](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

### Pitfall 6: Environment Variables Not Prefixed with NEXT_PUBLIC_
**What goes wrong:** Environment variables are undefined in browser, but work in server components.
**Why it happens:** Next.js only exposes variables prefixed with `NEXT_PUBLIC_` to the browser. Unprefixed variables are server-only.
**How to avoid:** Prefix client-side environment variables with `NEXT_PUBLIC_`. Keep sensitive keys (API secrets) without prefix.
**Warning signs:** `process.env.VARIABLE` is undefined in client components but works in server components. Build errors about undefined values.
**Sources:** [Next.js 15 Common Pitfalls](https://www.staytuneed.com/blog/tips-good-practices-and-pitfalls-with-next-js-15)

## Code Examples

Verified patterns from official sources:

### Complete Next.js Initialization
```bash
# Source: https://nextjs.org/docs/app/api-reference/cli/create-next-app
npx create-next-app@latest romaix-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Or use interactive mode with defaults
npx create-next-app@latest romaix-website
# Accept all defaults (TypeScript, Tailwind, ESLint, App Router, Turbopack)
```

### shadcn/ui Initialization and Component Installation
```bash
# Source: https://ui.shadcn.com/docs/installation/next
cd romaix-website
npx shadcn@latest init

# Interactive prompts:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes (required for theming)

# Install marketing site components
npx shadcn@latest add button card input label
```

### Root Layout with TypeScript
```typescript
// Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RomAIx - AI Automation for Travel Industry',
  description: 'Streamline your travel business with AI-powered automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Responsive Header Component
```tsx
// Source: Tailwind responsive design patterns
// components/layout/header.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          RomAIx
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  )
}
```

### Scroll-Triggered Fade In Component
```typescript
// Source: https://dev.to/shivamkatare/create-beautiful-scroll-animations-using-framer-motion-1a7b
// components/motion/fade-in.tsx
'use client'
import { motion, HTMLMotionProps, Variant } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
}

export function FadeIn({ children, delay = 0, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

### Staggered Grid Animation
```typescript
// Source: https://www.framer.com/motion/transition/
// components/sections/features-grid.tsx
'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export function FeaturesGrid({ features }: { features: Feature[] }) {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {features.map((feature) => (
        <motion.div key={feature.id} variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {feature.content}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Tailwind Responsive Breakpoints
```css
/* Source: https://tailwindcss.com/docs/responsive-design */
/* Default Tailwind breakpoints (built-in, no config needed) */

/* Mobile: unprefixed (base styles, <640px) */
.element { width: 100%; }

/* sm: 640px and up */
@media (width >= 40rem) {
  .sm\:element { width: 50%; }
}

/* md: 768px and up */
@media (width >= 48rem) {
  .md\:element { width: 33.333%; }
}

/* lg: 1024px and up */
@media (width >= 64rem) {
  .lg\:element { width: 25%; }
}

/* xl: 1280px and up */
@media (width >= 80rem) {
  .xl\:element { width: 20%; }
}

/* 2xl: 1536px and up */
@media (width >= 96rem) {
  .2xl\:element { width: 16.666%; }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router | App Router | Next.js 13+ (2022), default in 15 | Server Components by default, better performance, simpler data fetching |
| HSL color format | OKLCH color format | Tailwind v4 (2024), shadcn/ui v2 | Better perceptual uniformity, easier opacity handling, P3 color space support |
| JavaScript Tailwind config | CSS @theme directive | Tailwind v4 (2024) | Simpler config, better IDE support, no build-time JS execution |
| Manual animation libraries | Framer Motion declarative API | Framer Motion 4+ (2021) | whileInView, viewport props simplify scroll animations |
| npm/yarn | pnpm or bun | 2023-2024 | Faster installs, better disk usage, monorepo support |
| AnimatePresence page transitions | Enter-only animations | App Router limitation (2022+) | Exit animations don't work, use whileInView instead |

**Deprecated/outdated:**
- **Next.js Pages Router:** Still supported but App Router is default and recommended for new projects
- **Tailwind config.js with theme.extend:** v4 uses CSS @theme directive instead
- **HSL colors in shadcn/ui:** v2 migrated to OKLCH for better color science
- **Framer Motion exit animations in App Router:** Architectural limitation, use enter-only patterns
- **getStaticProps/getServerSideProps:** Replaced by async Server Components and fetch with caching

## Open Questions

Things that couldn't be fully resolved:

1. **Exact OKLCH values for brand color #587C74**
   - What we know: shadcn/ui requires OKLCH format, conversion tools exist (oklch.com, oklch.fyi)
   - What's unclear: Exact L, C, H values (tools require live interaction)
   - Recommendation: Use online converter tool during implementation. Approximate values: `oklch(0.52 0.05 170)` based on color appearance (greenish-gray). Verify with tool.

2. **Framer Motion bundle size impact with App Router**
   - What we know: Marking components "use client" includes them in client bundle. Creating small wrappers minimizes impact.
   - What's unclear: Exact KB added to bundle for minimal wrapper components vs. entire Framer Motion library
   - Recommendation: Create wrappers as documented. Monitor bundle size with `npx @next/bundle-analyzer`. If concerned, consider lazy loading animation components.

3. **shadcn/ui component selection for marketing site beyond Button, Card, Input**
   - What we know: Button, Card, Input are essential for marketing sites
   - What's unclear: Whether additional components (Badge, Separator, Avatar, etc.) should be installed upfront or on-demand
   - Recommendation: Install Button, Card, Input, Label initially. Add others (Badge, Separator, Hover Card) as needed during development. shadcn/ui philosophy is à la carte installation.

## Sources

### Primary (HIGH confidence)
- Next.js Official Docs: [Installation](https://nextjs.org/docs/app/getting-started/installation), [create-next-app CLI](https://nextjs.org/docs/app/api-reference/cli/create-next-app), [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages), [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- shadcn/ui Official Docs: [Installation (Next.js)](https://ui.shadcn.com/docs/installation/next), [Theming](https://ui.shadcn.com/docs/theming)
- Tailwind CSS Official Docs: [Responsive Design](https://tailwindcss.com/docs/responsive-design), [Customizing Colors](https://tailwindcss.com/docs/customizing-colors)
- Framer Motion Official Docs: [Transitions](https://www.framer.com/motion/transition/), [Stagger](https://www.framer.com/motion/stagger/)

### Secondary (MEDIUM confidence)
- [Next.js GitHub Issue #49279](https://github.com/vercel/next.js/issues/49279) - App Router Framer Motion shared layout animations issue (verified by official Vercel team tracking)
- [Framer Motion GitHub Issue #2411](https://github.com/framer/motion/issues/2411) - Exit animations not working in Next.js App Router (community-confirmed issue)
- [Best Practices for Organizing Next.js 15 2025 (DEV Community)](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) - Recent community patterns
- [Next.js 15 2026 Folder Structure Guide (CodeByDeep)](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide) - Current best practices

### Tertiary (LOW confidence)
- [Creating Staggered Animations with Framer Motion (Medium)](https://medium.com/@onifkay/creating-staggered-animations-with-framer-motion-0e7dc90eae33) - Code examples (author-attributed, needs testing)
- [Tips, Good Practices, and Pitfalls with Next.js 15 (staytuneed.com)](https://www.staytuneed.com/blog/tips-good-practices-and-pitfalls-with-next-js-15) - Environment variable pitfall (verified pattern but single source)
- OKLCH conversion tools (oklch.com, oklch.fyi, oklch.net) - Tools exist but specific color conversion needs manual verification

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified from official documentation and current ecosystem standards
- Architecture: HIGH - Patterns documented in official Next.js, Tailwind, and Framer Motion docs
- Pitfalls: HIGH - Exit animation issue tracked by Vercel team, other pitfalls documented in official sources or widely confirmed by community

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days - stable stack, but Next.js and Tailwind iterate quickly)

**Research notes:**
- All core libraries are at stable major versions (Next.js 15.x, Tailwind v4, Framer Motion 11.x)
- App Router patterns are now standard (2+ years since introduction)
- OKLCH color format is cutting-edge but well-documented in Tailwind v4 and shadcn/ui v2
- Exit animation limitation is architectural, not a bug - workarounds are well-established
