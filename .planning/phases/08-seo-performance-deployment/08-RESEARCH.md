# Phase 8: SEO & Performance + Deployment - Research

**Researched:** 2026-01-30
**Domain:** Next.js 15 SEO, Performance Optimization, and Production Deployment
**Confidence:** HIGH

## Summary

This phase implements Next.js 15's built-in SEO capabilities, Core Web Vitals optimization, and Vercel deployment for a production-ready marketing website. Next.js 15 provides native solutions for all SEO requirements through the Metadata API, file-based conventions for sitemap.xml and robots.txt, and automatic performance optimizations.

The standard approach uses Next.js 15's Metadata API (static `metadata` objects and dynamic `generateMetadata` functions) for page-level SEO, native `sitemap.ts` and `robots.ts` files for search engine discovery, and file-based `opengraph-image.tsx` for social sharing images. Performance optimization focuses on proper use of Server Components, `next/image` with priority loading, `next/font` for zero-CLS fonts, dynamic imports for heavy components, and bundle analysis via `@next/bundle-analyzer`.

For analytics, both Plausible and Umami offer privacy-focused alternatives to Google Analytics. Plausible has a smaller script (< 1KB) and polished hosted solution, while Umami is built with Next.js/React and offers better self-hosting flexibility. Vercel deployment is straightforward with automatic HTTPS, preview deployments, and custom domain support.

**Primary recommendation:** Use Next.js 15's native SEO features (Metadata API, sitemap.ts, robots.ts, opengraph-image.tsx) rather than external libraries. Set `metadataBase` in root layout to ensure absolute URLs for OpenGraph images. Choose Plausible for simplicity or Umami for developer control. Optimize Core Web Vitals through `priority` on LCP images, Server Components by default, and strategic dynamic imports for heavy client components.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 15.x (built-in) | Page-level SEO metadata | Native, type-safe, automatically deduplicated, streaming-aware |
| next/image | 15.x (built-in) | Image optimization | Automatic WebP/AVIF conversion, lazy loading, LCP optimization via `priority` |
| next/font | 15.x (built-in) | Font optimization | Zero CLS, self-hosted fonts, no external requests |
| next/og | 15.x (built-in) | Dynamic OG image generation | ImageResponse API for runtime OG images using JSX/CSS |
| Vercel | Platform | Deployment & hosting | First-class Next.js support, automatic optimizations, edge network |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @next/bundle-analyzer | Latest | Bundle size analysis | Development/CI - visualize bundle composition |
| next-plausible | 3.12.x | Plausible Analytics integration | If choosing Plausible for analytics |
| next/script | 15.x (built-in) | Umami Analytics integration | If choosing Umami for analytics |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native sitemap.ts | next-sitemap package | Package adds complexity; native is sufficient for most sites |
| Plausible | Umami | Plausible: easier setup, hosted. Umami: Next.js-based, better self-hosting |
| Native OG images | Third-party service | Services add latency and cost; native is fast and free |
| Vercel Analytics | Plausible/Umami | Vercel Analytics integrates deeply but costs scale with traffic |

**Installation:**
```bash
# Analytics (choose one)
npm install next-plausible  # For Plausible
# OR use next/script (built-in) for Umami

# Bundle analysis (dev dependency)
npm install --save-dev @next/bundle-analyzer
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── layout.tsx              # Root layout with metadataBase
├── sitemap.ts              # Sitemap generation
├── robots.ts               # robots.txt generation
├── opengraph-image.tsx     # Default OG image
├── [route]/
│   ├── page.tsx            # Route with metadata export
│   ├── opengraph-image.tsx # Route-specific OG image (optional)
│   └── [dynamic]/
│       ├── page.tsx        # Dynamic route with generateMetadata
│       └── opengraph-image.tsx  # Dynamic OG images
├── components/
│   └── Analytics.tsx       # Analytics component (if using)
└── lib/
    └── constants.ts        # SITE_URL, metadata defaults
```

### Pattern 1: Static Metadata with metadataBase
**What:** Define static metadata in page.tsx using exported `metadata` object. Set `metadataBase` in root layout for absolute URLs.
**When to use:** For static pages (homepage, about, contact, legal pages).
**Example:**
```typescript
// app/layout.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://romaix.ai'),
  title: {
    default: 'Romaix - AI-Powered Business Automation',
    template: '%s | Romaix'
  },
  description: 'Transform your business with AI automation solutions',
  verification: {
    google: 'YOUR_VERIFICATION_CODE'
  }
}

// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Romaix mission and team',
  openGraph: {
    title: 'About Romaix',
    description: 'Learn about our mission',
    images: ['/og-about.png'], // Relative URL works with metadataBase
  },
}
```

### Pattern 2: Dynamic Metadata for Content
**What:** Use `generateMetadata` async function for dynamic routes that fetch data.
**When to use:** Blog posts, case studies, any dynamic [slug] routes.
**Example:**
```typescript
// app/blog/[slug]/page.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'
import { getBlogPost } from '@/lib/blog'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}
```

### Pattern 3: Sitemap Generation for Dynamic Content
**What:** Use `sitemap.ts` to generate sitemap.xml with all routes, including dynamic content from MDX.
**When to use:** Every project needs this for search engine discovery.
**Example:**
```typescript
// app/sitemap.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import { getAllCaseStudies } from '@/lib/case-studies'

export default async function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://romaix.ai'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic blog posts
  const posts = await getAllBlogPosts()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic case studies
  const caseStudies = await getAllCaseStudies()
  const caseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages, ...caseStudyPages]
}
```

### Pattern 4: Dynamic OpenGraph Images
**What:** Generate unique OG images per post/case study using `opengraph-image.tsx` and ImageResponse.
**When to use:** For blog posts, case studies where each needs unique social share preview.
**Example:**
```typescript
// app/blog/[slug]/opengraph-image.tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog'

export const alt = 'Blog Post'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20 }}>
          {post.title}
        </div>
        <div style={{ fontSize: 40, opacity: 0.8 }}>
          {post.excerpt}
        </div>
      </div>
    ),
    { ...size }
  )
}
```

### Pattern 5: Core Web Vitals Optimization
**What:** Optimize LCP with `priority` on hero images, CLS with `next/font`, INP with Server Components.
**When to use:** Every page, especially marketing pages with images and custom fonts.
**Example:**
```typescript
// app/layout.tsx - Font optimization
// Source: https://nextjs.org/docs/app/getting-started/fonts
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}

// app/page.tsx - LCP image optimization
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'

export default function HomePage() {
  return (
    <section>
      <Image
        src="/hero-image.jpg"
        alt="Hero"
        width={1920}
        height={1080}
        priority  // Preload LCP image
        sizes="100vw"
      />
    </section>
  )
}
```

### Pattern 6: Dynamic Imports for Heavy Components
**What:** Use `next/dynamic` to code-split heavy client components (modals, charts, animations).
**When to use:** Components with large dependencies that aren't needed on initial load.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/lazy-loading
import dynamic from 'next/dynamic'

// Lazy load heavy modal component
const ContactModal = dynamic(() => import('@/components/ContactModal'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Client-only component
})

// Lazy load chart library
const ChartComponent = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), {
  loading: () => <div>Loading chart...</div>,
})
```

### Pattern 7: Analytics Integration (Plausible)
**What:** Add Plausible analytics via `next-plausible` package with proxy to bypass ad blockers.
**When to use:** If choosing Plausible for privacy-focused analytics.
**Example:**
```typescript
// app/layout.tsx
// Source: https://github.com/4lejandrito/next-plausible
import PlausibleProvider from 'next-plausible'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PlausibleProvider domain="romaix.ai">
          {children}
        </PlausibleProvider>
      </body>
    </html>
  )
}

// next.config.js - Add proxy to bypass ad blockers
const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()({
  // your next.config.js
})
```

### Pattern 8: Analytics Integration (Umami)
**What:** Add Umami analytics via `next/script` with environment variables.
**When to use:** If choosing Umami for privacy-focused analytics with self-hosting.
**Example:**
```typescript
// app/components/Analytics.tsx
// Source: https://fabian-rosenthal.com/blog/integrate-umami-analytics-into-nextjs-app-router
'use client'

import Script from 'next/script'

export function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://cloud.umami.is/script.js'

  if (!websiteId) return null

  return (
    <Script
      async
      src={umamiSrc}
      data-website-id={websiteId}
    />
  )
}

// app/layout.tsx
import { UmamiAnalytics } from './components/Analytics'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <UmamiAnalytics />
      </body>
    </html>
  )
}
```

### Anti-Patterns to Avoid
- **Exporting both `metadata` and `generateMetadata`:** Next.js throws error. Use only one per route segment.
- **Relative URLs for OpenGraph images without `metadataBase`:** Social platforms can't fetch images. Always set `metadataBase` in root layout.
- **Using `loading="lazy"` on LCP images:** Hurts performance. Use `priority` prop instead.
- **Dynamic importing entire pages:** Increases bundle size. Only dynamic import heavy components.
- **Missing robots.txt or sitemap.xml:** Search engines can't discover content efficiently.
- **Client Components by default:** Increases bundle size. Use Server Components unless interactivity needed.
- **Forgetting to redeploy after adding environment variables:** Vercel requires redeployment for new env vars to take effect.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML generation | Native `sitemap.ts` | Handles 50K URL limit, type-safe, automatically served at /sitemap.xml |
| robots.txt generation | Manual file in /public | Native `robots.ts` | Dynamic, type-safe, can vary by environment |
| OpenGraph image generation | Canvas API or headless browser | `next/og` ImageResponse | Optimized, uses JSX/CSS syntax, Edge-compatible |
| Image optimization | Manual responsive images + WebP | `next/image` | Automatic format selection, lazy loading, srcset generation |
| Font optimization | Manual font loading | `next/font` | Zero CLS, self-hosts Google Fonts, automatic subsetting |
| Bundle analysis | Custom webpack stats parsing | `@next/bundle-analyzer` | Visual reports, tracks over time, built for Next.js |
| Metadata management | Manual meta tags | Metadata API | Deduplication, streaming-aware, type-safe, hierarchy |
| Analytics proxy | Custom API route | `next-plausible` withPlausibleProxy | Handles rewrites, bypasses ad blockers |

**Key insight:** Next.js 15 provides native solutions for almost all SEO and performance needs. External libraries/services add complexity, dependencies, and often inferior performance compared to built-in solutions. Use native features unless specific requirements justify external tools.

## Common Pitfalls

### Pitfall 1: Missing metadataBase for OpenGraph Images
**What goes wrong:** OpenGraph images show as relative URLs (`/og-image.png`) instead of absolute URLs, causing social platforms (LinkedIn, Twitter, Facebook) to fail loading them.
**Why it happens:** Next.js generates relative URLs by default unless `metadataBase` is set. Developers often test locally where this isn't obvious.
**How to avoid:** Always set `metadataBase` in root `layout.tsx` using environment variable:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
}
```
**Warning signs:** When sharing links on social media, no preview image appears. Check page source for `<meta property="og:image">` - if it starts with `/` instead of `https://`, metadataBase is missing.

### Pitfall 2: VERCEL_URL vs Custom Domain for metadataBase
**What goes wrong:** Setting `metadataBase` to `VERCEL_URL` causes OpenGraph images to use Vercel's auto-generated preview URL (*.vercel.app) instead of custom domain, breaking image previews when sharing production links.
**Why it happens:** `VERCEL_URL` is a system environment variable that points to the deployment URL, not the custom domain.
**How to avoid:** Create separate `NEXT_PUBLIC_SITE_URL` environment variable for production domain:
```typescript
// .env.production
NEXT_PUBLIC_SITE_URL=https://romaix.ai

// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://romaix.ai'),
}
```
**Warning signs:** OpenGraph preview works on vercel.app URLs but breaks on custom domain. Check og:image URL in page source.

### Pitfall 3: Not Using priority on LCP Images
**What goes wrong:** Largest Contentful Paint (LCP) scores are poor (> 2.5s), even though images are optimized.
**Why it happens:** Without `priority`, Next.js lazy-loads images, delaying LCP. Browser doesn't know to preload the hero image.
**How to avoid:** Add `priority` prop to above-the-fold hero/banner images:
```typescript
<Image src="/hero.jpg" alt="Hero" priority width={1920} height={1080} />
```
**Warning signs:** Next.js dev console shows warning: "Image with src '...' was detected as the Largest Contentful Paint (LCP). Please add the 'priority' property if this image is above the fold."

### Pitfall 4: Forgetting to Await params in Next.js 15+
**What goes wrong:** TypeScript errors or runtime crashes in `generateMetadata` when accessing route params.
**Why it happens:** Next.js 15+ made `params` and `searchParams` Promises that must be awaited.
**How to avoid:** Always await params:
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params  // Must await!
  // ...
}
```
**Warning signs:** TypeScript errors about Promise types, or runtime errors accessing param properties.

### Pitfall 5: Sitemap Not Showing in Google Search Console
**What goes wrong:** Google Search Console shows "Couldn't fetch" error for sitemap.xml.
**Why it happens:** Common causes include missing XML declaration, incorrect format, or using localhost URLs.
**How to avoid:**
- Ensure `sitemap.ts` returns proper `MetadataRoute.Sitemap` type
- Use absolute production URLs (not localhost)
- Test sitemap at `/sitemap.xml` before submitting to GSC
- If dynamic sitemap, ensure route is not blocked by ISR/caching issues
**Warning signs:** Sitemap works locally but fails in GSC. Check actual sitemap URL in production browser.

### Pitfall 6: Excessive Bundle Size from Client Components
**What goes wrong:** First Load JS exceeds 100KB, failing bundle size requirements. Page feels slow.
**Why it happens:** Adding `'use client'` at top of file makes entire component tree client-side, bundling all dependencies.
**How to avoid:**
- Use Server Components by default (no directive)
- Add `'use client'` only to leaf components that need interactivity
- Use dynamic imports for heavy client components
- Check bundle with `@next/bundle-analyzer`
**Warning signs:** Lighthouse/PageSpeed shows high "Total Blocking Time". Bundle analyzer shows large client chunks.

### Pitfall 7: Redeploying After Environment Variable Changes
**What goes wrong:** New environment variables don't work in deployment, even though they're set in Vercel dashboard.
**Why it happens:** Vercel bakes environment variables into build artifacts. Adding/changing vars requires redeployment.
**How to avoid:** After adding/changing env vars in Vercel dashboard, trigger new deployment via:
- Push new commit
- Manual redeploy from Vercel UI
- Redeploy via Vercel CLI
**Warning signs:** Environment variable reads as `undefined` in production but shows in Vercel settings.

### Pitfall 8: Missing Google Search Console Verification
**What goes wrong:** Can't verify site ownership in Google Search Console, blocking sitemap submission and index monitoring.
**Why it happens:** Verification meta tag not added to site, or added incorrectly.
**How to avoid:** Add verification to root layout metadata:
```typescript
export const metadata: Metadata = {
  verification: {
    google: 'YOUR_VERIFICATION_CODE',  // Just the code, not full meta tag
  },
}
```
**Warning signs:** GSC verification fails. Check page source for `<meta name="google-site-verification">` tag.

### Pitfall 9: Analytics Script Blocked by Ad Blockers
**What goes wrong:** Analytics show very low visitor counts. Most users aren't tracked.
**Why it happens:** Ad blockers recognize analytics domains (plausible.io, umami.is) and block scripts.
**How to avoid:**
- For Plausible: Use `withPlausibleProxy` in next.config.js
- For Umami: Add custom rewrites in next.config.js to proxy script through your domain
**Warning signs:** Analytics dashboard shows unusually low traffic compared to other metrics (server logs, Vercel analytics).

### Pitfall 10: Missing ALT Text on Images
**What goes wrong:** Accessibility issues, SEO penalties. Screen readers can't describe images.
**Why it happens:** Developers forget or use placeholder text.
**How to avoid:** Every `<Image>` needs descriptive `alt` prop:
```typescript
// Bad
<Image src="/product.jpg" alt="image" />

// Good
<Image src="/product.jpg" alt="AI automation dashboard showing workflow builder" />
```
**Warning signs:** Lighthouse accessibility score < 100. Next.js may show warnings in dev mode.

## Code Examples

Verified patterns from official sources:

### Root Layout with Complete SEO Setup
```typescript
// app/layout.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PlausibleProvider from 'next-plausible'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://romaix.ai'),
  title: {
    default: 'Romaix - AI-Powered Business Automation',
    template: '%s | Romaix',
  },
  description: 'Transform your business with intelligent automation solutions',
  keywords: ['AI automation', 'business automation', 'workflow automation'],
  authors: [{ name: 'Romaix Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Romaix',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@romaix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PlausibleProvider domain="romaix.ai">
          {children}
        </PlausibleProvider>
      </body>
    </html>
  )
}
```

### Robots.txt Configuration
```typescript
// app/robots.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://romaix.ai'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### Bundle Analyzer Configuration
```javascript
// next.config.js
// Source: https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your existing config
}

module.exports = withBundleAnalyzer(nextConfig)

// Run with: ANALYZE=true npm run build
```

### Dynamic Route with generateMetadata
```typescript
// app/case-studies/[slug]/page.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudy, getAllCaseStudySlugs } from '@/lib/case-studies'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) return {}

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      type: 'article',
      publishedTime: caseStudy.publishedAt,
      images: [
        {
          url: `/case-studies/${slug}/opengraph-image`,  // Points to opengraph-image.tsx
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.excerpt,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) notFound()

  return (
    <article>
      <h1>{caseStudy.title}</h1>
      {/* content */}
    </article>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/head` component | Metadata API | Next.js 13 (2022) | Type-safe, deduplication, streaming support |
| Manual XML for sitemap | Native `sitemap.ts` | Next.js 13.3 (2023) | Type-safe, automatic, no build scripts |
| `_document.js` for meta tags | `layout.tsx` with metadata | Next.js 13 (2022) | Server Components, better DX |
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | New Core Web Vitals metric, broader interactivity measure |
| React.lazy() | next/dynamic | Always preferred in Next.js | SSR support, better loading states |
| Manual font loading | next/font | Next.js 13 (2022) | Zero CLS, self-hosting, privacy |
| `priority` prop | `preload` prop (aliased) | Next.js 16 (coming) | Clearer naming, same functionality |
| External OG image services | next/og ImageResponse | Next.js 13 (2022) | Free, fast, edge-compatible |
| next-sitemap package | Native sitemap.ts (preferred) | Next.js 13.3 (2023) | Simpler for most cases, native is sufficient |

**Deprecated/outdated:**
- **`<Head>` component from `next/head`**: Replaced by Metadata API. Only use in Pages Router legacy projects.
- **`analyticsId` in next.config.js**: Removed in Next.js 15. Use dedicated analytics packages or Vercel Analytics.
- **FID metric**: Replaced by INP in Core Web Vitals (March 2024). Monitor INP instead.
- **Exporting both metadata object and generateMetadata**: Never supported, but common mistake. Use only one.

## Open Questions

Things that couldn't be fully resolved:

1. **Plausible vs Umami final choice**
   - What we know: Plausible has smaller script (< 1KB vs ~2KB), polished UI, easier setup. Umami is Next.js-based, better self-hosting, potentially better integration.
   - What's unclear: User preference for hosted (Plausible) vs self-hosted (Umami), and whether the Next.js tech stack alignment of Umami matters.
   - Recommendation: Default to Plausible for simplicity and smallest script size. If user wants self-hosting control or prefers Next.js stack familiarity, choose Umami. Both are excellent privacy-focused choices.

2. **Custom domain decision (romaix.ai or new domain)**
   - What we know: User mentioned "romaix.ai or new domain" - unclear if domain is purchased yet.
   - What's unclear: Whether romaix.ai is already owned and ready to use.
   - Recommendation: If domain not yet purchased, acquire it before deployment phase begins. DNS propagation can take 24-48 hours. Add `NEXT_PUBLIC_SITE_URL` environment variable once domain is decided.

3. **OpenGraph image strategy: file-based vs dynamic generation**
   - What we know: Can use static images (opengraph-image.png) or dynamic generation (opengraph-image.tsx). Dynamic generation creates unique images but requires server-side rendering.
   - What's unclear: User preference for unique per-post OG images vs shared default image.
   - Recommendation: Use dynamic generation (opengraph-image.tsx) for blog posts and case studies to create unique, branded previews. Use static image for homepage and static pages. This provides best social sharing experience.

4. **Bundle size optimization targets**
   - What we know: Requirement is "First Load JS under 100KB for all marketing pages". Next.js 15 can achieve 50-80KB with proper Server Component usage.
   - What's unclear: Acceptable range above 100KB for interactive pages (contact form page might need React Hook Form + Zod validation).
   - Recommendation: Aim for < 100KB on all marketing pages (home, about, blog list, case study list). Allow up to 120KB on interactive pages (contact, individual blog/case study with comments). Use bundle analyzer to verify during development.

5. **Web Vitals monitoring approach**
   - What we know: Next.js provides `useReportWebVitals` hook. Vercel Analytics tracks automatically. Plausible/Umami don't track Core Web Vitals by default.
   - What's unclear: Whether to use Vercel Analytics (costs scale with traffic) in addition to Plausible/Umami, or implement custom Web Vitals tracking.
   - Recommendation: Start with Vercel Analytics free tier (includes Web Vitals). If traffic exceeds free tier, implement custom Web Vitals tracking using `useReportWebVitals` to send data to existing analytics endpoint.

## Sources

### Primary (HIGH confidence)
- [Next.js generateMetadata Official Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Metadata API, types, examples
- [Next.js Metadata and OG Images Guide](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - Official getting started
- [Next.js robots.txt Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - robots.ts API
- [Next.js sitemap.xml Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - sitemap.ts API and generateSitemaps
- [Next.js OpenGraph Image Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) - opengraph-image.tsx and ImageResponse
- [Next.js Image Component Documentation](https://nextjs.org/docs/app/api-reference/components/image) - priority prop, optimization
- [Next.js Font Optimization Documentation](https://nextjs.org/docs/app/getting-started/fonts) - next/font/google API
- [Next.js Lazy Loading Guide](https://nextjs.org/docs/app/guides/lazy-loading) - next/dynamic, code splitting
- [Next.js Bundle Analyzer npm](https://www.npmjs.com/package/@next/bundle-analyzer) - Configuration and usage
- [Vercel Environment Variables Docs](https://vercel.com/docs/environment-variables) - Configuration and deployment
- [Vercel Custom Domain Setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain) - DNS configuration

### Secondary (MEDIUM confidence)
- [next-plausible GitHub](https://github.com/4lejandrito/next-plausible) - Official integration package
- [Plausible Next.js Integration Docs](https://plausible.io/docs/nextjs-integration) - Official setup guide
- [Umami Next.js Integration Guide](https://fabian-rosenthal.com/blog/integrate-umami-analytics-into-nextjs-app-router) - Community guide for App Router
- [Core Web Vitals 2026 Guide](https://senorit.de/en/blog/core-web-vitals-2026) - INP, LCP, CLS targets
- [Optimizing Core Web Vitals with Next.js 15](https://trillionclues.medium.com/optimizing-core-web-vitals-with-next-js-15-61564cc51b13) - Performance techniques
- [Next.js SEO Best Practices 2026](https://medium.com/@alokkumar41558/next-js-seo-best-practices-guide-027325bf9339) - Comprehensive SEO guide
- [Plausible vs Umami Comparison](https://vemetric.com/blog/plausible-vs-umami) - Analytics comparison
- [Google Search Console Next.js Setup](https://medium.com/@davegray_86804/next-js-how-to-submit-your-sitemap-to-google-36a859c4d114) - Verification and sitemap submission

### Tertiary (LOW confidence)
- [Next.js Bundle Optimization Techniques 2025](https://medium.com/better-dev-nextjs-react/the-10kb-next-js-app-extreme-bundle-optimization-techniques-d8047c482aea) - Extreme optimization examples (may be over-engineered)
- Community discussions on GitHub about metadataBase and OpenGraph issues (various threads referenced)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All recommendations based on official Next.js 15 documentation and native features
- Architecture: HIGH - Patterns sourced from Next.js official docs and verified examples
- Pitfalls: HIGH - Common issues documented in Next.js GitHub discussions and official docs with verified solutions
- Analytics choice: MEDIUM - Both Plausible and Umami are valid; choice depends on user preference (hosted vs self-hosted)
- Performance targets: HIGH - Core Web Vitals thresholds are official Google standards; bundle size achievable per official Next.js guidance

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (30 days - Next.js ecosystem is stable but version updates may introduce new features)
