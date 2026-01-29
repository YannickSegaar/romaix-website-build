# Domain Pitfalls: Next.js Marketing Website

**Domain:** SaaS/Agency Marketing Website with Next.js + Animations
**Researched:** 2026-01-29
**Confidence:** HIGH (verified with official Next.js docs, Context7, and recent 2026 community findings)

## Critical Pitfalls

Mistakes that cause rewrites, performance disasters, or major architectural problems.

---

### Pitfall 1: Animation Library Incompatibility with App Router

**What goes wrong:** Exit animations don't work with Next.js App Router. The router updates context frequently during navigation, causing components to unmount and remount abruptly. This breaks Framer Motion's `AnimatePresence` and similar exit animation systems.

**Why it happens:** Architectural mismatch between Next.js App Router's rendering model and animation libraries that need to control component lifecycle during transitions. The Next.js team broke `AnimatePresence` detection and transition blocking modes in Framer Motion.

**Consequences:**
- Exit animations simply don't fire
- Users see jarring page transitions instead of smooth animations
- "FrozenRouter" workarounds rely on unexposed Next.js internals and can break at any time
- Significant rework required if discovered late in development

**Prevention:**
1. Accept enter-only animations (page appears with animation, exits instantly)
2. Use View Transitions API with `next-view-transitions` library (beta, but official browser API)
3. Consider Pages Router if exit animations are non-negotiable
4. Test animation approach in a spike/POC before committing to full build

**Detection:**
- Exit animations not triggering during route navigation
- Components unmounting before animation completes
- `AnimatePresence` not detecting exit state

**Phase mapping:** Foundation/Setup phase - Choose animation strategy before building components

**Sources:**
- [Solving Framer Motion Page Transitions in Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router)
- [Next.js App Router Issue with Framer Motion Shared Layout Animations](https://github.com/vercel/next.js/issues/49279)
- [How to animate route transitions in app directory](https://github.com/vercel/next.js/discussions/42658)

---

### Pitfall 2: Client Component Boundary Creep

**What goes wrong:** Developers place `'use client'` too high in the component tree, turning entire layouts or sections into Client Components. This dramatically increases bundle size and negates the benefits of Server Components.

**Why it happens:**
- Unclear understanding of Server vs Client Component boundaries
- Adding one interactive feature (like a state hook) to a large component
- Third-party libraries that require client-side APIs

**Consequences:**
- JavaScript bundle bloat (100KB+ when it should be 10-50KB)
- Slower page loads, especially on mobile
- Server-side data fetching benefits lost
- Accidentally exposing server-only code (API keys, database queries) to client

**Prevention:**
1. **Composition pattern:** Keep layouts as Server Components, only mark leaf interactive components as Client Components
2. **Use `server-only` package:** Prevents accidental server code exposure
   ```bash
   npm install server-only
   ```
   ```ts
   // lib/data.ts
   import 'server-only'
   export async function getData() { /* API keys safe here */ }
   ```
3. **Wrapper pattern for third-party components:**
   ```tsx
   // carousel.tsx
   'use client'
   import { Carousel } from 'acme-carousel'
   export default Carousel
   ```
4. **Analyze bundle:** Use `@next/bundle-analyzer` to catch boundary creep early

**Detection:**
- First Load JS metrics in Next.js build output over 100KB
- Components with state/effects that don't actually need them
- Build warnings about server-only imports in client code

**Phase mapping:** Every feature implementation phase - Review component boundaries before PR

**Sources:**
- [Next.js Server Components Official Docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Extreme Bundle Optimization Techniques](https://medium.com/better-dev-nextjs-react/the-10kb-next-js-app-extreme-bundle-optimization-techniques-d8047c482aea)

---

### Pitfall 3: Wrong Rendering Strategy for Content Type

**What goes wrong:** Using Server-Side Rendering (SSR) for content that should be statically generated, or Static Site Generation (SSG) for content that needs to be dynamic. Marketing sites often use SSR when SSG + ISR would be faster and cheaper.

**Why it happens:**
- Default to `export const dynamic = 'force-dynamic'` without considering content freshness requirements
- Not understanding the difference between SSG, SSR, and ISR
- Overestimating how often marketing content changes

**Consequences:**
- Slower page loads (SSR adds server processing time on every request)
- Higher Vercel costs (every page view runs server function)
- Poor Core Web Vitals scores
- Search engines get slow responses, impacting SEO

**Prevention:**
1. **Default to SSG for marketing pages:** Home, About, Services pages rarely change
2. **Use ISR for blog content:**
   ```tsx
   // app/blog/[slug]/page.tsx
   export const revalidate = 300 // 5 minutes
   ```
3. **Reserve SSR for truly dynamic content:** User dashboards, personalized pages
4. **Matrix for decision:**
   | Content Type | Strategy | Reason |
   |--------------|----------|--------|
   | Home/About/Services | SSG | Changes infrequently |
   | Blog posts | ISR (5-60 min) | New posts, comment counts |
   | Lead capture forms | SSG (form client-side) | Form JS hydrates client-side |
   | Pricing page | ISR (24 hours) | Price updates rare but important |

**Detection:**
- Page load times over 1 second on Vercel
- High function invocation counts in Vercel dashboard for static-looking pages
- Lighthouse showing "Reduce server response times (TTFB)"

**Phase mapping:** Architecture phase - Document rendering strategy per page type

**Sources:**
- [The Complete Next.js SEO Guide](https://strapi.io/blog/nextjs-seo)
- [Next.js Rendering Fundamentals](https://nextjs.org/docs/app/building-your-application/rendering)

---

### Pitfall 4: Framer Motion SSR and Performance Issues

**What goes wrong:** Framer Motion relies on browser-specific APIs (window object) unavailable during Server-Side Rendering. Additionally, certain Framer Motion features like `drop-shadow` animations cause severe scroll performance issues.

**Why it happens:**
- Framer Motion is fundamentally a client-side library
- Not adding `'use client'` to components using Framer Motion
- Using computationally expensive animation properties
- React 19 incompatibility (Framer Motion not yet compatible as of early 2026)

**Consequences:**
- Runtime errors: "window is not defined"
- Hydration mismatches between server and client
- Janky scrolling, dropped frames (especially mobile)
- Production builds with CSS Modules showing messy output with `AnimatePresence`

**Prevention:**
1. **Always use `'use client'` with Framer Motion:**
   ```tsx
   'use client'
   import { motion } from 'framer-motion'
   export function AnimatedCard() { /* ... */ }
   ```
2. **Isolate animations to leaf components:** Don't wrap entire pages
3. **Avoid expensive animation properties:**
   - Replace `drop-shadow` with CSS equivalents
   - Use `transform` and `opacity` (GPU-accelerated)
   - Avoid animating `width`, `height`, `top`, `left`
4. **Test on low-end devices early:** Animation performance issues compound
5. **Consider CSS animations for simple effects:** `@keyframes` + Tailwind is lighter

**Detection:**
- Console errors about `window` during build or dev
- Scroll performance degradation (use Chrome DevTools Performance tab)
- Lighthouse flagging "Avoid large layout shifts" or "Minimize main thread work"
- Frame rate dropping below 60fps during animations

**Phase mapping:**
- Setup phase: Establish animation component patterns
- Each feature phase: Performance test animations on real devices

**Sources:**
- [Resolving Framer Motion Compatibility in Next.js 14](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75)
- [Framer Motion Performance Guide Issue](https://github.com/framer/motion/issues/442)
- [Framer Motion Slow to Update Discussion](https://github.com/vercel/next.js/discussions/52042)

---

### Pitfall 5: SEO Content Loaded Client-Side

**What goes wrong:** Essential content (product descriptions, blog posts, feature cards) loaded client-side via JavaScript, making it invisible or delayed for search engine crawlers. Google may not wait for JavaScript execution.

**Why it happens:**
- Fetching content in `useEffect` instead of Server Components
- Using Client Components for content that should be server-rendered
- Not understanding that search crawlers may not execute JavaScript fully

**Consequences:**
- Pages appear blank to search engines
- Critical content not indexed
- Lower search rankings despite good content
- AI search agents (Gemini, Perplexity) prioritize raw HTML over rendered content in 2026

**Prevention:**
1. **Render critical content server-side:**
   ```tsx
   // app/features/page.tsx (Server Component by default)
   export default async function FeaturesPage() {
     const features = await getFeatures() // Runs on server
     return <FeatureList features={features} />
   }
   ```
2. **Check "View Page Source":** All important text should be in raw HTML
3. **Use Google Search Console:** Check "URL Inspection" to see what Google sees
4. **Separate concerns:** Animations client-side, content server-side
   ```tsx
   // Server Component (content)
   async function FeatureCards() {
     const features = await getFeatures()
     return features.map(f => <AnimatedCard feature={f} />)
   }

   // Client Component (animation only)
   'use client'
   function AnimatedCard({ feature }) {
     return <motion.div>{feature.title}</motion.div>
   }
   ```

**Detection:**
- Disable JavaScript in browser, check if content appears
- Lighthouse flagging "Content not visible during load"
- Google Search Console showing "Crawled - currently not indexed"
- `curl https://yoursite.com/page` showing no content in HTML

**Phase mapping:** Every content-heavy feature - Verify server-side rendering before merging

**Sources:**
- [JavaScript SEO In 2026: 7 Mistakes Killing Your Rankings](https://zumeirah.com/javascript-seo-in-2026/)
- [The Complete Next.js SEO Guide](https://strapi.io/blog/nextjs-seo)
- [Typical Next.js SEO Pitfalls to Avoid in 2024](https://focusreactive.com/typical-next-js-seo-pitfalls-to-avoid-in-2024/)

---

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or require refactoring.

---

### Pitfall 6: Missing or Duplicate Metadata

**What goes wrong:** Every page has the same title and description, or metadata is missing entirely. Search engines show generic "Home | RomAIx" for all pages, or titles get cut off because they're too long.

**Why it happens:**
- Forgetting to implement `generateMetadata` for dynamic routes
- Exporting both `metadata` object and `generateMetadata` (not allowed)
- Not understanding metadata inheritance in Next.js
- Duplicating metadata unnecessarily across files

**Prevention:**
1. **Use `generateMetadata` for dynamic pages:**
   ```tsx
   // app/blog/[slug]/page.tsx
   export async function generateMetadata({ params }) {
     const post = await getPost(params.slug)
     return {
       title: `${post.title} | RomAIx Blog`,
       description: post.excerpt,
       openGraph: {
         title: post.title,
         description: post.excerpt,
         images: [post.coverImage],
       },
     }
   }
   ```
2. **Set base metadata in root layout:**
   ```tsx
   // app/layout.tsx
   export const metadata = {
     metadataBase: new URL('https://romaix.com'),
     title: {
       template: '%s | RomAIx',
       default: 'RomAIx - AI Solutions',
     },
   }
   ```
3. **Metadata checklist per page:**
   - Title under 60 characters
   - Description under 160 characters
   - Unique for every page
   - OpenGraph images (1200x630px)
4. **Leverage fetch memoization:** Same fetch in `generateMetadata` and page component is automatic - don't worry about duplication

**Detection:**
- Google Search results showing same title for multiple pages
- Missing OpenGraph images in social media previews
- Build warnings about duplicate metadata
- SEO audit tools flagging duplicate titles/descriptions

**Phase mapping:** Every page implementation - Add metadata before marking complete

**Sources:**
- [Functions: generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [The Ultimate Next.js Metadata Guide for 2025](https://www.boar.is/p/nextjs-metadata)
- [Next.js SEO Metadata Best Practices](https://prateeksha.com/blog/nextjs-app-router-seo-metadata-sitemaps-canonicals)

---

### Pitfall 7: Image Optimization Misconfiguration

**What goes wrong:** Images load slowly, cause layout shifts, or fail to load entirely. Remote images return 400 errors. Priority images lazy-load, hurting Largest Contentful Paint (LCP).

**Why it happens:**
- Missing `remotePatterns` configuration for external images
- Not specifying width/height on remote images
- Using `priority` on too many images (or none at all)
- Missing alt text
- Protocol or port mismatches in remote patterns

**Prevention:**
1. **Configure remote patterns correctly:**
   ```ts
   // next.config.ts
   const config: NextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.ctfassets.net', // Contentful example
           port: '', // Leave empty unless custom port
           pathname: '/**',
         },
       ],
     },
   }
   ```
2. **Always specify dimensions for remote images:**
   ```tsx
   <Image
     src="https://example.com/hero.jpg"
     alt="RomAIx hero image"
     width={1200}
     height={630}
     priority // Only for LCP image!
   />
   ```
3. **Use `priority` only for LCP image:**
   - Typically one hero image per page
   - Above-the-fold content
   - Not for multiple images (defeats lazy loading)
4. **Use static imports when possible:**
   ```tsx
   import heroImage from './hero.png'
   <Image src={heroImage} alt="Hero" /> // Dimensions automatic!
   ```
5. **Common config mistakes to avoid:**
   - Development: Include `port: '1337'` for `localhost:1337`
   - Protocol: HTTPS servers need `protocol: 'https'`
   - Pathname: Use `/**` not `/*` for nested paths

**Detection:**
- Browser console: 400 errors on images
- Lighthouse: "Image elements do not have explicit width and height"
- Lighthouse: "Largest Contentful Paint image was lazily loaded"
- Cumulative Layout Shift (CLS) score over 0.1

**Phase mapping:**
- Setup phase: Configure `remotePatterns` for all image sources
- Every page: Review LCP image has `priority`

**Sources:**
- [Next.js Image Optimization Official Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Image Optimization Developer Guide](https://strapi.io/blog/nextjs-image-optimization-developers-guide)
- [DebugBear: Next.js Image Optimization](https://www.debugbear.com/blog/nextjs-image-optimization)

---

### Pitfall 8: Form Handling Without Server Actions

**What goes wrong:** Lead capture forms submit to client-side handlers that expose API keys, lack server-side validation (letting bots through), or cause waterfalls with sequential API calls.

**Why it happens:**
- Using traditional `onSubmit` + `fetch` patterns from pre-Server Actions era
- Not understanding Next.js Server Actions
- Skipping server-side validation (trusting client)

**Prevention:**
1. **Use Server Actions with Zod validation:**
   ```tsx
   // app/actions.ts
   'use server'
   import { z } from 'zod'

   const contactSchema = z.object({
     email: z.string().email(),
     message: z.string().min(10),
   })

   export async function submitContact(formData: FormData) {
     const result = contactSchema.safeParse({
       email: formData.get('email'),
       message: formData.get('message'),
     })

     if (!result.success) {
       return { error: result.error.flatten() }
     }

     // Send to CRM, API keys stay on server
     await sendToCRM(result.data)
     return { success: true }
   }
   ```

2. **Use `useActionState` for loading states:**
   ```tsx
   'use client'
   import { useActionState } from 'react'
   import { submitContact } from './actions'

   export function ContactForm() {
     const [state, formAction, isPending] = useActionState(submitContact, null)

     return (
       <form action={formAction}>
         <input name="email" type="email" required />
         <textarea name="message" required />
         <button disabled={isPending}>
           {isPending ? 'Sending...' : 'Send'}
         </button>
         {state?.error && <p>Error: {state.error}</p>}
       </form>
     )
   }
   ```

3. **Server-side validation checklist:**
   - Email format validation
   - Rate limiting (prevent spam)
   - CAPTCHA for public forms
   - Input sanitization

**Detection:**
- API keys visible in Network tab
- Bot submissions getting through
- Slow form submissions (check for waterfalls in Network tab)

**Phase mapping:** Lead capture feature - Implement Server Actions from the start

**Sources:**
- [The Only Guide You Need for Next.js Forms](https://www.deepintodev.com/blog/form-handling-in-nextjs)
- [Handling Forms in Next.js with Server Actions](https://medium.com/@sorayacantos/handling-forms-in-next-js-with-next-form-server-actions-useactionstate-and-zod-validation-15f9932b0a9e)
- [Next.js Forms and Mutations Official Docs](https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations)

---

### Pitfall 9: Bundle Size Bloat from Poor Code Splitting

**What goes wrong:** First Load JS balloons to 300KB+ when it should be 50-80KB. Pages load slowly, especially on mobile. Vercel functions time out or run out of memory.

**Why it happens:**
- Importing entire libraries instead of specific functions
- Not using dynamic imports for heavy components
- `'use client'` placed on large components with lots of dependencies
- Including all of `framer-motion` when only using basic animations

**Prevention:**
1. **Use tree-shakeable imports:**
   ```tsx
   // Bad
   import _ from 'lodash'
   _.debounce(fn, 300)

   // Good
   import debounce from 'lodash/debounce'
   debounce(fn, 300)
   ```

2. **Dynamic import heavy components:**
   ```tsx
   import dynamic from 'next/dynamic'

   const HeavyModal = dynamic(() => import('./HeavyModal'), {
     loading: () => <p>Loading...</p>,
   })
   ```

3. **Configure `optimizePackageImports` in Next.js 15+:**
   ```ts
   // next.config.ts
   const config: NextConfig = {
     experimental: {
       optimizePackageImports: ['framer-motion', 'lucide-react'],
     },
   }
   ```

4. **Monitor bundle size:**
   ```bash
   npm install -D @next/bundle-analyzer
   ```
   ```ts
   // next.config.ts
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })
   module.exports = withBundleAnalyzer(config)
   ```
   ```bash
   ANALYZE=true npm run build
   ```

5. **Component splitting strategy:**
   - Modals, dropdowns → dynamic import
   - Third-party widgets (chat, analytics) → dynamic import
   - Core UI (header, footer) → static import

**Detection:**
- Build output shows "First Load JS" over 100KB
- Lighthouse flagging "Reduce unused JavaScript"
- Slow page loads on 3G simulation
- Bundle analyzer showing large duplicate dependencies

**Phase mapping:**
- Setup phase: Configure bundle analyzer
- Each PR: Check First Load JS in build output
- Pre-launch: Full bundle audit

**Sources:**
- [The 10KB Next.js App: Extreme Bundle Optimization](https://medium.com/better-dev-nextjs-react/the-10kb-next-js-app-extreme-bundle-optimization-techniques-d8047c482aea)
- [Code Splitting in Next.js: Reduced Bundle Size by 70%](https://medium.com/@sohail_saifi/code-splitting-in-next-js-how-i-reduced-initial-bundle-size-by-70-73a4c328cc6c)
- [Next.js Package Bundling Guide](https://nextjs.org/docs/app/guides/package-bundling)

---

### Pitfall 10: Vercel Deployment Lock-in and Cost Surprises

**What goes wrong:** Next.js features work perfectly locally but fail or behave differently when deployed to other platforms. Vercel bills suddenly spike 2-3x with no warning. Features like Image Optimization or Middleware have unexpected usage costs.

**Why it happens:**
- Next.js uses private, undocumented build output format specific to Vercel
- ISR, Middleware, and Image Optimization are optimized for (or require) Vercel
- Usage-based pricing isn't predictable during development
- Cache invalidation works differently on Vercel vs. self-hosted

**Prevention:**
1. **Understand Vercel-specific features:**
   - Image Optimization: Self-hosted needs Sharp.js config
   - Middleware: Edge Runtime is Vercel-specific
   - ISR: Requires persistent storage (filesystem on Vercel, alternative elsewhere)

2. **Monitor Vercel usage early:**
   - Check dashboard weekly during development
   - Set up billing alerts
   - Understand function invocation costs (SSR pages)

3. **Alternative deployment considerations:**
   - **Docker + AWS/GCP:** More control, but ISR requires Redis/S3 setup
   - **Cloudflare Pages:** Supports Next.js but with limitations
   - **Netlify:** Has Next.js Runtime but features may lag

4. **Cost optimization on Vercel:**
   - Use SSG where possible (free, no function invocations)
   - Enable Edge caching for API routes
   - Optimize images before upload (reduce transformation load)
   - Consider Vercel Pro for better rates if usage grows

5. **If avoiding vendor lock-in is critical:**
   - Consider Astro, Remix, or SvelteKit as alternatives
   - Use Next.js Pages Router (easier to self-host than App Router)
   - Plan for Docker deployment from the start

**Detection:**
- Unexpected Vercel bills
- Features working locally but failing in other environments
- Build output shows proprietary format warnings
- High function invocation counts for static-looking pages

**Phase mapping:**
- Planning phase: Decide on deployment target and budget
- Setup phase: Configure for chosen platform
- Each month: Review Vercel usage dashboard

**Sources:**
- [Why we ditched Next.js and never looked back](https://northflank.com/blog/why-we-ditched-next-js-and-never-looked-back)
- [Next.js Deployment Challenges: Open Source Collaboration](https://www.netlify.com/blog/how-we-run-nextjs/)
- [Vercel App Guide: Deployment, Templates, and Pricing in 2026](https://kuberns.com/blogs/post/vercel-app-guide/)

---

## Minor Pitfalls

Mistakes that cause annoyance or small inefficiencies, but are easily fixable.

---

### Pitfall 11: Tailwind Drop-Shadow Performance

**What goes wrong:** Scroll performance degrades dramatically when using Tailwind's `drop-shadow-*` utility classes, especially on pages with multiple shadowed elements.

**Prevention:**
- Replace `drop-shadow-*` with `shadow-*` (uses CSS box-shadow, GPU-accelerated)
- Or use CSS `filter: drop-shadow()` with `will-change: filter` for critical elements
- Test scroll performance on real devices

**Detection:** Janky scrolling in Chrome DevTools Performance profile showing long paint times

**Sources:**
- [Tailwind Low Performance Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/7411)

---

### Pitfall 12: Missing Canonical URLs

**What goes wrong:** Duplicate content issues arise when `/about` and `/about/` are treated as different pages, or query parameters create infinite variations.

**Prevention:**
1. **Set canonical in metadata:**
   ```tsx
   export const metadata = {
     alternates: {
       canonical: 'https://romaix.com/about',
     },
   }
   ```
2. **Normalize URLs:** Remove trailing slashes in middleware
3. **Ignore query params:** `?utm_source=...` shouldn't create new canonicals

**Detection:** Google Search Console showing duplicate pages

**Sources:**
- [Next.js SEO Metadata Best Practices](https://prateeksha.com/blog/nextjs-app-router-seo-metadata-sitemaps-canonicals)

---

### Pitfall 13: Not Testing Core Web Vitals Early

**What goes wrong:** Site passes local performance tests but fails Core Web Vitals in production. 64% of websites don't meet all three CWV metrics.

**Prevention:**
- Use Lighthouse CI in GitHub Actions
- Test on real devices and slow networks
- Monitor PageSpeed Insights for production site
- Target thresholds:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

**Detection:** Google Search Console flagging poor CWV, lower search rankings

**Phase mapping:** Every feature - Run Lighthouse before merging

**Sources:**
- [SEO Mistakes and Common Errors to Avoid in 2026](https://content-whale.com/blog/seo-mistakes-and-common-errors-to-avoid-in-2026/)

---

### Pitfall 14: Context Providers in Server Components

**What goes wrong:** React Context doesn't work in Server Components. Developers try to use `ThemeProvider` or `AuthProvider` in root layout and get errors.

**Prevention:**
```tsx
// app/providers.tsx
'use client'
import { createContext } from 'react'

export const ThemeContext = createContext({})

export function Providers({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}

// app/layout.tsx (Server Component)
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

**Detection:** Build errors about "createContext is not supported in Server Components"

**Sources:**
- [Next.js Server Components Official Docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

### Pitfall 15: Forgetting Sitemap and robots.txt

**What goes wrong:** Search engines don't discover all pages, or crawl budget is wasted on admin/draft pages.

**Prevention:**
1. **Generate sitemap automatically:**
   ```ts
   // app/sitemap.ts
   export default async function sitemap() {
     const posts = await getAllPosts()

     return [
       {
         url: 'https://romaix.com',
         lastModified: new Date(),
         changeFrequency: 'daily',
         priority: 1,
       },
       ...posts.map(post => ({
         url: `https://romaix.com/blog/${post.slug}`,
         lastModified: post.updatedAt,
         changeFrequency: 'weekly',
         priority: 0.8,
       })),
     ]
   }
   ```

2. **Configure robots.txt:**
   ```ts
   // app/robots.ts
   export default function robots() {
     return {
       rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/admin/', '/api/'],
       },
       sitemap: 'https://romaix.com/sitemap.xml',
     }
   }
   ```

**Detection:** Google Search Console showing crawl errors or missing pages

**Phase mapping:** Pre-launch - Generate before first deployment

**Sources:**
- [Next.js Metadata Files Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| **Foundation/Setup** | Animation library choice | Spike/POC exit animations before committing to Framer Motion |
| **Foundation/Setup** | Image source configuration | Configure all `remotePatterns` upfront (Contentful, etc.) |
| **Foundation/Setup** | Rendering strategy unclear | Document SSG vs ISR vs SSR per page type |
| **Component Development** | Client boundary too high | Code review: Check `'use client'` placement in every PR |
| **Component Development** | Animation performance | Test on real device before marking feature complete |
| **Content Pages** | SEO content client-side | Disable JS in browser, verify content appears |
| **Lead Capture Forms** | Client-side form handling | Use Server Actions from the start, not traditional fetch |
| **Blog Implementation** | Missing metadata | Checklist: generateMetadata for every dynamic route |
| **Pre-Launch** | Bundle size unchecked | Run bundle analyzer, target < 100KB First Load JS |
| **Pre-Launch** | Core Web Vitals untested | Lighthouse CI + real device testing |
| **Pre-Launch** | Missing sitemap/robots | Generate sitemap.ts and robots.ts |
| **Post-Launch** | Vercel cost surprises | Monitor usage weekly, optimize high-invocation pages |

---

## Sources

**Official Documentation:**
- [Next.js Official Documentation](https://nextjs.org/docs)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

**Animation & Performance:**
- [Solving Framer Motion Page Transitions in Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router)
- [Next.js App Router Issue with Framer Motion #49279](https://github.com/vercel/next.js/issues/49279)
- [Resolving Framer Motion Compatibility in Next.js 14](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75)
- [Framer Motion Performance Guide Issue](https://github.com/framer/motion/issues/442)

**SEO & Content:**
- [The Complete Next.js SEO Guide for Building Crawlable Apps](https://strapi.io/blog/nextjs-seo)
- [JavaScript SEO In 2026: 7 Mistakes Killing Your Rankings](https://zumeirah.com/javascript-seo-in-2026/)
- [Typical Next.js SEO Pitfalls to Avoid in 2024](https://focusreactive.com/typical-next-js-seo-pitfalls-to-avoid-in-2024/)
- [SEO Mistakes and Common Errors to Avoid in 2026](https://content-whale.com/blog/seo-mistakes-and-common-errors-to-avoid-in-2026/)

**Bundle Optimization:**
- [The 10KB Next.js App: Extreme Bundle Optimization](https://medium.com/better-dev-nextjs-react/the-10kb-next-js-app-extreme-bundle-optimization-techniques-d8047c482aea)
- [Code Splitting in Next.js: Reduced Bundle Size by 70%](https://medium.com/@sohail_saifi/code-splitting-in-next-js-how-i-reduced-initial-bundle-size-by-70-73a4c328cc6c)
- [Next.js Package Bundling Guide](https://nextjs.org/docs/app/guides/package-bundling)

**Forms & Server Actions:**
- [The Only Guide You Need for Next.js Forms](https://www.deepintodev.com/blog/form-handling-in-nextjs)
- [Handling Forms in Next.js with Server Actions](https://medium.com/@sorayacantos/handling-forms-in-next-js-with-next-form-server-actions-useactionstate-and-zod-validation-15f9932b0a9e)

**Deployment:**
- [Why we ditched Next.js and never looked back](https://northflank.com/blog/why-we-ditched-next-js-and-never-looked-back)
- [Next.js Deployment Challenges](https://www.netlify.com/blog/how-we-run-nextjs/)
- [Vercel App Guide: Complete Guide to Deployment, Templates, and Pricing in 2026](https://kuberns.com/blogs/post/vercel-app-guide/)

**Images:**
- [Next.js Image Optimization Developer Guide](https://strapi.io/blog/nextjs-image-optimization-developers-guide)
- [DebugBear: Next.js Image Optimization](https://www.debugbear.com/blog/nextjs-image-optimization)
- [CVE-2025-59471: Next.js Image Optimizer](https://dev.to/cverports/cve-2025-59471-nextjs-image-optimizer-the-4gb-hello-world-5c09)

**Metadata:**
- [The Ultimate Next.js Metadata Guide for 2025](https://www.boar.is/p/nextjs-metadata)
- [Next.js SEO: Metadata, Sitemaps & Canonical Tags](https://prateeksha.com/blog/nextjs-app-router-seo-metadata-sitemaps-canonicals)
