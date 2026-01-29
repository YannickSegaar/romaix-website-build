# Architecture Patterns: Next.js Marketing Website

**Domain:** AI automation agency marketing website
**Researched:** 2026-01-29
**Confidence:** HIGH (verified with official Next.js docs + 2026 community best practices)

## Recommended Architecture

Modern Next.js 15 marketing sites use the **App Router with Route Groups and Feature-Based Organization**. This architecture separates marketing pages from application logic while maintaining clean, scalable component boundaries.

```
romaix-website/
├── src/
│   ├── app/                          # App Router (routing only)
│   │   ├── (marketing)/              # Route group (URL: /)
│   │   │   ├── layout.tsx            # Marketing layout (header, footer)
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx          # /about
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx          # /case-studies
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # /case-studies/[slug]
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx          # /blog
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # /blog/[slug]
│   │   │   └── contact/
│   │   │       └── page.tsx          # /contact
│   │   ├── api/                      # API routes
│   │   │   ├── contact/
│   │   │   │   └── route.ts          # POST /api/contact
│   │   │   └── newsletter/
│   │   │       └── route.ts          # POST /api/newsletter
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles + Tailwind
│   │   └── not-found.tsx             # 404 page
│   ├── components/                   # Shared components
│   │   ├── ui/                       # Basic building blocks
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── badge.tsx
│   │   ├── layout/                   # Structural components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── mobile-menu.tsx
│   │   ├── sections/                 # Page sections (feature-based)
│   │   │   ├── hero-section.tsx
│   │   │   ├── social-proof-section.tsx
│   │   │   ├── solutions-section.tsx
│   │   │   ├── case-studies-section.tsx
│   │   │   ├── process-section.tsx
│   │   │   ├── lead-magnet-section.tsx
│   │   │   ├── blog-preview-section.tsx
│   │   │   ├── faq-section.tsx
│   │   │   └── contact-section.tsx
│   │   ├── animations/               # Framer Motion wrappers
│   │   │   ├── fade-in.tsx
│   │   │   ├── slide-in.tsx
│   │   │   ├── stagger-children.tsx
│   │   │   └── page-transition.tsx
│   │   └── forms/                    # Form components
│   │       ├── contact-form.tsx
│   │       ├── newsletter-form.tsx
│   │       └── form-field.tsx
│   ├── lib/                          # Utilities and helpers
│   │   ├── utils.ts                  # General utilities (cn, etc)
│   │   ├── api.ts                    # API client functions
│   │   ├── validations.ts            # Zod schemas
│   │   └── constants.ts              # Constants (nav links, etc)
│   └── types/                        # TypeScript types
│       ├── index.ts
│       ├── case-study.ts
│       └── blog.ts
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── tailwind.config.ts                # Tailwind configuration
├── postcss.config.mjs                # PostCSS configuration
├── next.config.ts                    # Next.js configuration
└── package.json
```

### Key Architectural Decisions

**1. Route Groups for Organization**
Using `(marketing)` route group to organize all marketing pages without affecting URLs. This allows:
- Shared layout for marketing pages (header, footer)
- Clean separation from potential future app sections
- Ability to apply different layouts to different page groups

**2. Component Organization by Purpose**
Components are organized into logical groups:
- `ui/` - Atomic design elements (buttons, inputs, cards)
- `layout/` - Structural components used across pages
- `sections/` - Feature-based page sections (hero, testimonials, etc)
- `animations/` - Reusable animation wrappers
- `forms/` - Form-specific components with validation

**3. Server Components by Default**
All components are React Server Components unless they need:
- Client-side interactivity (onClick, useState)
- Browser APIs (window, localStorage)
- Framer Motion animations (requires "use client")

### Component Boundaries

| Component Type | Responsibility | Communicates With | Server/Client |
|----------------|---------------|-------------------|---------------|
| **Layout Components** | Structural shell (header, footer, nav) | None (receives children) | Server |
| **Section Components** | Large page sections (hero, social proof) | UI components, Animation wrappers | Server (wrapper) + Client (animations) |
| **UI Components** | Basic building blocks (button, card) | None or minimal | Server (default) |
| **Animation Wrappers** | Framer Motion animations | Children components | Client ("use client") |
| **Form Components** | User input with validation | API routes via POST | Client ("use client") |
| **Page Components** | Route pages, compose sections | Section components, Layout | Server |
| **API Routes** | Backend endpoints (contact, newsletter) | External services (email, CRM) | Server (API) |

### Data Flow

```
User Request → Next.js Router
                    ↓
             Root Layout (layout.tsx)
                    ↓
          Marketing Layout ((marketing)/layout.tsx)
                    ↓
               Page (page.tsx)
                    ↓
        Section Components (hero, social-proof, etc)
                    ↓
    UI Components + Animation Wrappers
                    ↓
              Rendered HTML

Form Submission → Client Component → API Route → External Service → Response
```

**Key Flow Characteristics:**
- **Static Generation**: Marketing pages are pre-rendered at build time (ISR for blog/case studies)
- **Server-First**: Data fetching happens in Server Components where possible
- **Progressive Enhancement**: Animations are client-side enhancements, content works without JS
- **API Routes**: Contact and newsletter forms POST to Next.js API routes, which handle external integrations

## Patterns to Follow

### Pattern 1: Container/Presenter for Animations
**What:** Separate data/structure (Server) from interactivity/animations (Client)
**When:** Section components that need animations but can be mostly static
**Why:** Maximizes Server Component benefits while enabling client-side animations

**Example:**
```typescript
// components/sections/hero-section.tsx (Server Component)
import { HeroAnimated } from './hero-animated'

export function HeroSection() {
  // Data fetching, logic here (server-side)
  const heroData = {
    title: "AI Automation for Modern Businesses",
    subtitle: "RomAIx helps agencies scale with intelligent automation",
    ctaText: "Get Started",
    ctaLink: "/contact"
  }

  return <HeroAnimated {...heroData} />
}

// components/sections/hero-animated.tsx (Client Component)
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function HeroAnimated({ title, subtitle, ctaText, ctaLink }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Button href={ctaLink}>{ctaText}</Button>
    </motion.section>
  )
}
```

### Pattern 2: Reusable Animation Wrappers
**What:** Extract common animations into wrapper components
**When:** Same animation pattern used across multiple sections
**Why:** DRY principle, consistent motion design, easier to maintain

**Example:**
```typescript
// components/animations/fade-in.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Usage in section:
import { FadeIn } from '@/components/animations/fade-in'

export function SolutionsSection() {
  return (
    <section>
      <FadeIn delay={0.2}>
        <h2>Our Solutions</h2>
      </FadeIn>
      <FadeIn delay={0.4}>
        <p>Description...</p>
      </FadeIn>
    </section>
  )
}
```

### Pattern 3: Layout Pattern for Shared Structure
**What:** Define marketing layout once, apply to all marketing pages
**When:** Multiple pages share header, footer, navigation
**Why:** DRY, consistent UX, easier to update shared elements

**Example:**
```typescript
// app/(marketing)/layout.tsx
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
```

### Pattern 4: Type-Safe Content with TypeScript
**What:** Define TypeScript interfaces for all content structures
**When:** Any structured data (case studies, blog posts, sections)
**Why:** Catch errors early, autocomplete, refactoring safety

**Example:**
```typescript
// types/case-study.ts
export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    description: string
  }[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  featured: boolean
  publishedAt: Date
}

// Usage:
import { CaseStudy } from '@/types/case-study'

async function getCaseStudies(): Promise<CaseStudy[]> {
  // Fetch and return typed data
}
```

### Pattern 5: Form Validation with Zod
**What:** Use Zod schemas for client-side and server-side validation
**When:** Any form (contact, newsletter)
**Why:** Type safety, consistent validation, error messages

**Example:**
```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// components/forms/contact-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, ContactFormData } from '@/lib/validations'

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  async function onSubmit(data: ContactFormData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    // Handle response
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with error messages */}
    </form>
  )
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Putting All Code in app/
**What:** Storing all components, utilities, and logic inside the `app/` directory
**Why bad:**
- Mixes routing concerns with component logic
- Harder to find components
- Violates separation of concerns
- Makes components harder to reuse

**Instead:** Use `src/components/`, `src/lib/`, `src/types/` for code organization. Reserve `app/` directory strictly for routing structure (pages, layouts, API routes).

### Anti-Pattern 2: Making Everything a Client Component
**What:** Adding "use client" to every component "just in case"
**Why bad:**
- Loses Server Component benefits (smaller bundle, better performance)
- Increases JavaScript sent to browser
- Slower initial page load
- Can't use async/await for data fetching

**Instead:** Use Container/Presenter pattern. Keep data fetching and static structure in Server Components, only mark interactive pieces as Client Components. Default to Server, opt-in to Client.

### Anti-Pattern 3: Inline Tailwind Classes Without Abstraction
**What:** Repeating long Tailwind class strings across components
**Why bad:**
- Inconsistent styling
- Hard to maintain
- Difficult to update design system
- Unreadable JSX

**Instead:** Create reusable UI components with consistent styling. Use the `cn()` utility for conditional classes:

```typescript
// Good:
import { Button } from '@/components/ui/button'
<Button variant="primary" size="lg">Click me</Button>

// Bad:
<button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
  Click me
</button>
```

### Anti-Pattern 4: Not Using Route Groups
**What:** Flat app directory without logical grouping
**Why bad:**
- All pages at same level, confusing navigation
- Can't apply different layouts to different page types
- Harder to understand site structure
- Difficult to manage as site grows

**Instead:** Use route groups like `(marketing)`, `(blog)`, `(app)` to organize pages by purpose while keeping clean URLs.

### Anti-Pattern 5: Hardcoding Content in Components
**What:** Putting all text, links, and data directly in component JSX
**Why bad:**
- Hard to update content
- Can't reuse components with different content
- No single source of truth
- Difficult to implement CMS later

**Instead:** Pass content as props or define constants in `lib/constants.ts`:

```typescript
// lib/constants.ts
export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// components/layout/navigation.tsx
import { NAV_LINKS } from '@/lib/constants'

export function Navigation() {
  return (
    <nav>
      {NAV_LINKS.map(link => (
        <Link key={link.href} href={link.href}>{link.label}</Link>
      ))}
    </nav>
  )
}
```

### Anti-Pattern 6: Animating Everything
**What:** Adding Framer Motion animations to every single element
**Why bad:**
- Performance issues (too many animations)
- Overwhelming user experience
- Slower page loads
- Distracting from content

**Instead:** Use animations strategically for:
- Page transitions
- Hero section entrance
- Key CTAs and sections on scroll
- Interactive elements (hover, click)

Keep animations subtle and purposeful.

## Build Order Recommendations

Based on component dependencies and marketing site best practices, follow this build order:

### Phase 1: Foundation (No dependencies)
**Order:** Build these first as they have no dependencies
1. **UI Components** (`components/ui/`)
   - Button, Card, Input, Badge
   - These are the most atomic, dependency-free components
2. **Utilities** (`lib/utils.ts`, `lib/constants.ts`)
   - Helper functions (cn, formatDate, etc)
   - Constants (navigation links, company info)
3. **TypeScript Types** (`types/`)
   - Define all interfaces early for type safety

**Rationale:** Foundation components are building blocks for everything else. Build them first to enable parallel development of sections.

### Phase 2: Layout Shell (Depends on Phase 1)
**Order:** Build after UI components exist
1. **Root Layout** (`app/layout.tsx`)
   - HTML shell, global styles, fonts
2. **Header** (`components/layout/header.tsx`)
   - Uses: Button, Navigation constants
3. **Footer** (`components/layout/footer.tsx`)
   - Uses: Navigation constants
4. **Marketing Layout** (`app/(marketing)/layout.tsx`)
   - Uses: Header, Footer
5. **404 Page** (`app/not-found.tsx`)
   - Simple standalone page

**Rationale:** Layout provides consistent shell. Build early so you can see structure as you build pages.

### Phase 3: Animation Infrastructure (Depends on Phase 1)
**Order:** Build before sections that need animations
1. **Animation Wrappers** (`components/animations/`)
   - FadeIn, SlideIn, StaggerChildren
   - These are reusable across all sections
2. **Page Transition** (`components/animations/page-transition.tsx`)
   - Used in root layout

**Rationale:** Animation wrappers are reusable across sections. Build once, use everywhere. Can be built in parallel with Phase 2.

### Phase 4: Homepage Sections (Depends on Phases 1-3)
**Order:** Build in homepage appearance order for visual development
1. **Hero Section** (`components/sections/hero-section.tsx`)
   - Uses: Button, FadeIn
   - First impression, build first
2. **Social Proof Section** (`components/sections/social-proof-section.tsx`)
   - Uses: Card, FadeIn
   - Simple, builds confidence
3. **Solutions Section** (`components/sections/solutions-section.tsx`)
   - Uses: Card, FadeIn, StaggerChildren
4. **Case Studies Section** (`components/sections/case-studies-section.tsx`)
   - Uses: Card, Button, FadeIn
   - May need CaseStudy type
5. **Process Section** (`components/sections/process-section.tsx`)
   - Uses: FadeIn, SlideIn
6. **Lead Magnet Section** (`components/sections/lead-magnet-section.tsx`)
   - Uses: Card, Button, FadeIn
7. **Blog Preview Section** (`components/sections/blog-preview-section.tsx`)
   - Uses: Card, Badge, FadeIn
   - May need BlogPost type
8. **FAQ Section** (`components/sections/faq-section.tsx`)
   - Uses: Accordion/expandable UI, FadeIn
9. **Contact Section** (`components/sections/contact-section.tsx`)
   - Uses: ContactForm (see Phase 5)

**Rationale:** Build sections in order they appear on page. This allows visual verification as you build. Each section builds on previous UI components and animation wrappers.

### Phase 5: Forms and API Routes (Can start during Phase 4)
**Order:** Build when section that needs them is being built
1. **Form Validation Schemas** (`lib/validations.ts`)
   - Zod schemas for contact, newsletter
2. **Contact Form** (`components/forms/contact-form.tsx`)
   - Uses: Input, Button, validations
3. **Newsletter Form** (`components/forms/newsletter-form.tsx`)
   - Uses: Input, Button, validations
4. **API Routes** (`app/api/contact/route.ts`, `app/api/newsletter/route.ts`)
   - Server-side validation and integration

**Rationale:** Forms and APIs can be built when their corresponding sections are being developed. Contact form needed for Contact Section.

### Phase 6: Homepage Assembly (Depends on Phases 1-5)
**Order:** Build after all sections complete
1. **Homepage** (`app/(marketing)/page.tsx`)
   - Compose all sections together
   - Verify layout, spacing, flow

**Rationale:** Homepage is just composition of sections. Build last to ensure all dependencies exist.

### Phase 7: Additional Pages (Depends on Phases 1-3)
**Order:** Build after homepage is functional
1. **About Page** (`app/(marketing)/about/page.tsx`)
   - Reuse: sections, animations, UI components
2. **Contact Page** (`app/(marketing)/contact/page.tsx`)
   - Reuse: ContactForm, sections
3. **Case Studies Listing** (`app/(marketing)/case-studies/page.tsx`)
   - Reuse: Card, Badge, UI components
4. **Case Study Detail** (`app/(marketing)/case-studies/[slug]/page.tsx`)
   - May need CaseStudy type, dynamic route
5. **Blog Listing** (`app/(marketing)/blog/page.tsx`)
   - Reuse: Card, Badge, UI components
6. **Blog Post Detail** (`app/(marketing)/blog/[slug]/page.tsx`)
   - May need BlogPost type, dynamic route

**Rationale:** Additional pages reuse components built for homepage. Case studies and blog pages may require data fetching and CMS integration.

### Dependency Diagram

```
Phase 1 (Foundation)
  ├─ UI Components
  ├─ Utilities
  └─ Types
      ↓
Phase 2 (Layout Shell)     Phase 3 (Animations)
  ├─ Root Layout               ├─ Animation Wrappers
  ├─ Header                    └─ Page Transition
  ├─ Footer                         ↓
  ├─ Marketing Layout               ↓
  └─ 404 Page                       ↓
      ↓                             ↓
      └─────────────┬───────────────┘
                    ↓
Phase 4 (Homepage Sections)     Phase 5 (Forms/API)
  ├─ Hero                          ├─ Validations
  ├─ Social Proof                  ├─ Contact Form
  ├─ Solutions                     ├─ Newsletter Form
  ├─ Case Studies                  └─ API Routes
  ├─ Process                            ↓
  ├─ Lead Magnet                        ↓
  ├─ Blog Preview                       ↓
  ├─ FAQ                                ↓
  └─ Contact ──────────────────────────┘
      ↓
Phase 6 (Homepage Assembly)
  └─ Homepage (page.tsx)
      ↓
Phase 7 (Additional Pages)
  ├─ About
  ├─ Contact
  ├─ Case Studies (list)
  ├─ Case Studies (detail)
  ├─ Blog (list)
  └─ Blog (detail)
```

## Scalability Considerations

This architecture is designed for a marketing website that will grow over time. Here's how it scales:

| Concern | Current Approach | As Site Grows | At Scale (100+ pages) |
|---------|------------------|---------------|----------------------|
| **Page Count** | Static pages in `(marketing)` | Add route groups `(blog)`, `(resources)` | Multiple route groups with feature-specific layouts |
| **Component Library** | `components/ui/` with custom components | Add shadcn/ui or similar system | Design system package, Storybook documentation |
| **Content Management** | Hardcoded in components | Move to `lib/content/` or simple CMS | Headless CMS (Sanity, Contentful, Strapi) |
| **Animations** | Framer Motion wrappers | Same, with performance monitoring | Consider CSS animations for simple cases, lazy load complex animations |
| **Images** | `public/images/` | Next.js Image optimization | CDN (Cloudinary, Vercel Image Optimization) |
| **Performance** | Static generation | ISR for dynamic content | Edge functions, Partial Pre-rendering |
| **Forms** | API routes to email | API routes + CRM integration | Form service (Formspree, HubSpot) or dedicated API |
| **Analytics** | Basic tracking | Google Analytics/Plausible | Full marketing analytics stack |

## Performance Optimization Patterns

### Pattern 1: Image Optimization
Use Next.js Image component for all images:
```typescript
import Image from 'next/image'

<Image
  src="/images/hero-background.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  priority // For above-fold images
  placeholder="blur"
/>
```

### Pattern 2: Font Optimization
Use next/font for font loading:
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      {children}
    </html>
  )
}
```

### Pattern 3: Code Splitting
Dynamic imports for heavy components:
```typescript
import dynamic from 'next/dynamic'

const HeavyAnimation = dynamic(
  () => import('@/components/animations/heavy-animation'),
  { ssr: false } // Don't render on server
)
```

### Pattern 4: Static Generation with ISR
Use ISR for blog and case studies:
```typescript
// app/(marketing)/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

## Sources

**HIGH Confidence (Official Documentation):**
- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) - Official Next.js documentation
- [Next.js Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts) - Official routing docs

**MEDIUM Confidence (2026 Community Best Practices):**
- [Best Practices for Organizing Your Next.js 15 2025](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) - DEV Community
- [The Ultimate Guide to Organizing Your Next.js 15 Project Structure](https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure) - Wisp CMS
- [Next.js 14 Project Structure: Best Practices](https://nextjsstarter.com/blog/nextjs-14-project-structure-best-practices/) - Next.js Starter
- [The Battle-Tested NextJS Project Structure I Use in 2025](https://medium.com/@burpdeepak96/the-battle-tested-nextjs-project-structure-i-use-in-2025-f84c4eb5f426) - Medium
- [Mastering Next.js App Router: Best Practices for Structuring Your Application](https://thiraphat-ps-dev.medium.com/mastering-next-js-app-router-best-practices-for-structuring-your-application-3f8cf0c76580) - Medium
- [The New Architecture of React: Reusability and UX in Next.js Era](https://www.bitcot.com/new-architecture-of-react/) - Bitcot (Container/Presenter pattern)
- [Nextjs Common Design Pattern](https://medium.com/@lior_amsalem/nextjs-design-pattern-8e2f4e2a4fc5) - Medium
- [Next.js and Tailwind CSS 2025 Guide](https://codeparrot.ai/blogs/nextjs-and-tailwind-css-2025-guide-setup-tips-and-best-practices) - Code Parrot

**Animation Integration:**
- [How to Use Framer Motion for Animations in Next.js](https://staticmania.com/blog/how-to-use-framer-motion-for-animations-in-next-js) - StaticMania
- [Advanced page transitions with Next.js and Framer Motion](https://blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/) - LogRocket

**Component Architecture:**
- [Marketing Components in the Next.js Supabase SaaS kit](https://makerkit.dev/docs/next-supabase-turbo/components/marketing-components) - MakerKit
- [Website Hero Section Best Practices + Examples](https://prismic.io/blog/website-hero-section) - Prismic
