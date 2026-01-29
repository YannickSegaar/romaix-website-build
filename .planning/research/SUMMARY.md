# Project Research Summary

**Project:** RomAIx Marketing Website
**Domain:** AI Automation Agency Marketing Website (B2B SaaS/Agency Hybrid)
**Researched:** 2026-01-29
**Confidence:** HIGH

## Executive Summary

RomAIx needs a modern marketing website that balances SaaS product showcase with agency credibility. Research shows that the most successful B2B SaaS/agency websites in 2026 answer three critical questions within 5 seconds: What problem do you solve? What is your product? Who is it for? The recommended approach uses Next.js 15 with App Router, Tailwind CSS + shadcn/ui for light/clean design, and strategic Framer Motion animations for feature cards—avoiding the common pitfall of animation library incompatibility with App Router exit animations.

The technology stack is mature and well-documented: Next.js 15 with TypeScript provides excellent SEO through static generation, Vercel deployment is optimal for this use case, and the combination of React Hook Form + Zod delivers type-safe form validation for lead capture. The architecture follows feature-based organization with route groups, maintaining clear Server/Client Component boundaries to avoid bundle bloat. Critical to success is building case studies early (foundational for B2B sales), implementing Server Actions for forms from day one, and testing Core Web Vitals throughout development.

Key risks center on performance: Framer Motion exit animations don't work with App Router (accept enter-only animations), client component boundary creep can balloon bundle size to 300KB+, and SEO content loaded client-side becomes invisible to search engines. Prevention requires architectural discipline from the start—Container/Presenter pattern for animations, server-side content rendering, and continuous bundle monitoring. The recommended phase structure prioritizes foundation (UI components, layout shell), then homepage sections in visual order, followed by additional pages and content. This sequence matches component dependencies and enables early visual validation.

## Key Findings

### Recommended Stack

The research converges on a battle-tested stack for 2026 marketing sites: Next.js 15 provides the foundation with App Router, Turbopack (76.7% faster builds), and built-in image optimization. Styling uses Tailwind CSS for utility-first approach with shadcn/ui components (90k+ GitHub stars, copy-paste ownership model avoids vendor lock-in). Animations leverage Framer Motion with strategic isolation to leaf components. Content management starts simple with MDX (git-based, type-safe) and can upgrade to Storyblok/Sanity later if non-technical team needs visual editing.

**Core technologies:**
- **Next.js 15** (latest: 16.1.6): SSG/ISR for marketing pages, App Router for clean architecture, Vercel-optimized — industry standard for marketing sites with excellent SEO
- **TypeScript 5.x**: Essential for modern Next.js projects in 2025, prevents bugs, enables refactoring — no longer optional for serious projects
- **Tailwind CSS 3.x/4.x**: Dominant choice for SaaS websites, utility-first provides granular control for custom designs, small bundle size
- **shadcn/ui**: 250k+ weekly npm installs, copy-paste components built on Radix UI, accessible and customizable without vendor lock-in
- **Framer Motion 11.x**: Specified in requirements, production-ready declarative API perfect for marketing site animations (36KB bundle justified for visual polish)
- **React Hook Form 7.x + Zod 3.x**: Winner over unmaintained Formik, 8KB bundle, type-safe validation for lead capture forms
- **Resend + React Email**: Modern transactional email for form confirmations, JSX-based templates, 1/9th cost of SendGrid with better DX
- **Plausible/Umami**: Privacy-focused analytics (<2KB script), GDPR-compliant, clean metrics without Google Analytics bloat

**Version requirements:** Next.js 15+ for Turbopack and React 19 support, React Hook Form 7.x (Formik unmaintained), Resend (SendGrid discontinued free tier July 2025).

### Expected Features

The feature landscape divides cleanly into table stakes (missing = credibility loss), differentiators (competitive advantage), and anti-features (actively hurt conversions). For RomAIx targeting B2B travel operators, case studies are critical for sales—94% of B2B buyers research before purchasing. Social proof and quantified outcomes build trust, while animated feature cards differentiate from static competitors.

**Must have (table stakes):**
- **Clear value proposition** — Hero section answering "what, who, why" in 5 seconds
- **Mobile-responsive design** — 50%+ traffic is mobile, 53% abandon if load takes >3 seconds
- **3-5 detailed case studies** — Critical for B2B sales, show before/after workflows with quantified results
- **Social proof section** — 90% of B2B buyers influenced by testimonials with specific metrics
- **About/Team page** — B2B buyers need to verify legitimacy, agency credibility requirement
- **Contact information** — Visible email/form (hidden contact = red flag)
- **Blog with card layout** — Expected for thought leadership, 12-20 pieces/month standard
- **Legal pages** — Privacy policy, terms (GDPR requirement)
- **Fast page load (<2s)** — Core Web Vitals are ranking factors, 53% bounce if >3 seconds
- **Clear navigation** — 3-5 items max (complex menus kill conversions)

**Should have (competitive differentiators):**
- **Animated feature cards** — 2026 "Card Play" trend, makes AI concepts tangible, shows workflows visually
- **Quantified outcomes in hero** — Top SaaS sites show metrics immediately ("Saved 40 hours/week")
- **Free assessment CTA** — Lower friction than demo request, provides value before commitment (differentiates from "book demo")
- **Industry-specific messaging** — Travel operator language throughout, speak to their pain points
- **Multi-step lead forms** — Deel increased conversions 111% with this approach (reduces cognitive load)
- **ROI calculator** — B2B buyers want to quantify value before commitment
- **Video case studies** — More engaging than text, shows real people and results

**Defer to v2+ (not essential for launch):**
- **Interactive product demo** — High complexity, test demand with video demos first
- **AI personalization** — Requires traffic data, implement after launch
- **Real-time chat** — Start with email/form, add later once lead volume justifies it
- **Multiple industry landing pages** — Start with travel focus, expand later

**Explicitly exclude (anti-features):**
- Carousels for critical content (only 1% see slides beyond first)
- Auto-play videos with sound (universally hated)
- Intrusive pop-ups on page load (Google penalizes)
- More than 2-3 primary CTAs per page (paradox of choice)
- Generic testimonials without names/metrics (buyers see through vague praise)
- Complex navigation (>5 items kills conversions)

### Architecture Approach

Modern Next.js 15 marketing sites use App Router with Route Groups and Feature-Based Organization. This architecture separates marketing pages from application logic while maintaining clean component boundaries. The critical pattern is Container/Presenter for animations—data/structure in Server Components, interactivity in Client Components. This maximizes Server Component benefits (smaller bundle, better performance) while enabling client-side animations.

**Major components:**
1. **Route Groups** — `(marketing)` group organizes all marketing pages without affecting URLs, enables shared layout (header, footer) while maintaining clean separation
2. **Component Organization** — `ui/` for atomic elements (buttons, cards), `sections/` for feature-based page sections (hero, testimonials), `animations/` for reusable Framer Motion wrappers, `forms/` for validation-integrated inputs
3. **Server/Client Boundary** — Default to Server Components, only mark interactive pieces as Client Components (animations, forms), prevents bundle bloat while maintaining performance
4. **Type-Safe Content** — TypeScript interfaces for all structures (case studies, blog posts), Zod schemas for form validation on client and server
5. **Static Generation Strategy** — SSG for marketing pages (Home, About, Services), ISR for blog/case studies (revalidate every 5-60 minutes), reserve SSR only for truly dynamic content

**Folder structure highlights:**
- `app/(marketing)/` — All marketing pages with shared layout
- `components/ui/` — shadcn/ui components (Button, Card, Input)
- `components/sections/` — Page sections (HeroSection, SocialProofSection, CaseStudiesSection)
- `components/animations/` — Reusable wrappers (FadeIn, SlideIn, StaggerChildren)
- `lib/validations.ts` — Zod schemas for forms
- `types/` — TypeScript interfaces (CaseStudy, BlogPost)

**Build order:** Foundation (UI components, utilities, types) → Layout shell (header, footer, marketing layout) → Animation infrastructure → Homepage sections (in visual order) → Homepage assembly → Additional pages. This sequence respects dependencies and enables visual development.

### Critical Pitfalls

Research identified 15 pitfalls ranging from critical (cause rewrites) to minor (easily fixable). The top 5 will derail the project if not addressed from the start.

1. **Animation library incompatibility with App Router** — Exit animations don't work with Next.js App Router. AnimatePresence breaks due to router context updates. **Prevention:** Accept enter-only animations (page appears with animation, exits instantly), test animation approach in spike before committing, or use View Transitions API (beta).

2. **Client Component boundary creep** — Placing 'use client' too high in component tree negates Server Component benefits, bloats bundle to 300KB+. **Prevention:** Use Container/Presenter pattern (keep layouts as Server Components, mark only leaf interactive components as Client), use `server-only` package to prevent accidental exposure, analyze bundle with @next/bundle-analyzer.

3. **Wrong rendering strategy** — Using SSR for static marketing content increases costs and slows pages. **Prevention:** Default to SSG for Home/About/Services, use ISR (5-60 min revalidate) for blog/case studies, reserve SSR for truly dynamic content. Target: 100% marketing pages as SSG.

4. **Framer Motion SSR and performance issues** — Framer Motion needs browser APIs unavailable during SSR, `drop-shadow` animations cause scroll performance issues. **Prevention:** Always use 'use client' with Framer Motion, isolate animations to leaf components, avoid expensive properties (use transform/opacity only), test on low-end devices early.

5. **SEO content loaded client-side** — Essential content fetched in useEffect is invisible to search crawlers, AI search agents prioritize raw HTML. **Prevention:** Render critical content server-side in Server Components, check "View Page Source" for all important text, use Google Search Console URL Inspection to verify crawler sees content.

**Additional high-priority pitfalls:**
- Missing/duplicate metadata (every page needs unique title/description under 60/160 chars)
- Image optimization misconfiguration (missing remotePatterns causes 400 errors)
- Form handling without Server Actions (exposes API keys, lacks server-side validation)
- Bundle size bloat (imports entire libraries instead of tree-shakeable functions)

## Implications for Roadmap

Based on combined research, the optimal phase structure follows component dependencies and feature priorities. Early phases establish foundation and high-impact table stakes. Later phases add differentiators once core functionality proves stable.

### Phase 1: Foundation & Setup
**Rationale:** UI components and layout shell have no dependencies and enable all subsequent work. Animation infrastructure must be decided early to avoid rework. This phase establishes patterns that every feature will follow.

**Delivers:**
- Project initialization (Next.js 15 + TypeScript + Tailwind + ESLint)
- shadcn/ui component library (Button, Card, Input, Badge)
- Utilities and TypeScript types
- Root layout + Marketing layout with Header/Footer
- Animation wrapper components (FadeIn, SlideIn, StaggerChildren)
- Rendering strategy documentation (SSG for marketing pages)

**Addresses:**
- Fast page load speed (table stakes)
- Mobile-responsive design foundation (table stakes)

**Avoids:**
- Pitfall 1: Test animation approach (spike enter-only animations with Framer Motion)
- Pitfall 2: Establish Server/Client boundary patterns
- Pitfall 7: Configure remotePatterns for all image sources

**Research flags:** No additional research needed—well-documented patterns.

### Phase 2: Homepage Core (Table Stakes)
**Rationale:** Homepage is the first impression and highest-traffic page. Build sections in visual order for early validation. Case studies are foundational for B2B sales and feed social proof quotes.

**Delivers:**
- Hero section with clear value proposition
- Social proof section with testimonials
- Solutions/Services overview section
- Case studies showcase section (3 detailed case studies)
- Process section (workflow before/after)
- Lead magnet section (free assessment CTA)
- Contact section with form

**Addresses:**
- Clear value proposition (table stakes)
- Social proof (table stakes)
- Case studies (table stakes, critical for B2B)
- Clear CTAs (table stakes)
- Free assessment CTA (differentiator)

**Avoids:**
- Pitfall 5: Render all section content server-side
- Pitfall 3: Use SSG for homepage (revalidate on content update)
- Anti-features: No carousels for hero, no auto-play videos

**Research flags:** No additional research needed—standard marketing sections.

### Phase 3: Lead Capture & Forms
**Rationale:** Forms are critical conversion points and have specific technical requirements (Server Actions, validation). Build early to enable lead generation immediately after launch.

**Delivers:**
- Form validation schemas (Zod)
- Contact form with React Hook Form
- Newsletter signup form
- API routes with Server Actions
- Email integration (Resend + React Email templates)
- Form error handling and success states

**Addresses:**
- Contact information (table stakes)
- Multi-step forms (differentiator—implement after testing single-step first)

**Avoids:**
- Pitfall 8: Use Server Actions from start (not client-side fetch)
- Server-side validation (prevent bot submissions)
- API key exposure (keys stay on server)

**Research flags:** Standard patterns, no additional research needed.

### Phase 4: Animated Feature Cards (Differentiator)
**Rationale:** This is the core differentiator specified in requirements. Build after foundation is stable and Server/Client boundaries are proven. Requires performance testing on real devices.

**Delivers:**
- AI agent workflow visualization cards
- Hover animations (flip, scale, color change)
- Scroll-triggered animations for card reveals
- Performance optimization (GPU-accelerated properties only)

**Addresses:**
- Animated feature cards (key differentiator)
- Quantified outcomes display (differentiator)

**Avoids:**
- Pitfall 4: Framer Motion SSR issues (use 'use client', test performance early)
- Pitfall 1: Accept enter-only animations (no exit animations)
- Expensive animation properties (avoid drop-shadow, use transform/opacity)

**Research flags:** May need deeper research on specific animation patterns for workflow visualization—consider `/gsd:research-phase` if requirements are unclear.

### Phase 5: Content Pages (About, Contact)
**Rationale:** Reuse components built for homepage. These are table stakes but lower priority than homepage.

**Delivers:**
- About page (team, mission, why travel industry)
- Standalone Contact page (full-page form experience)
- Legal pages (Privacy, Terms—use generator templates)

**Addresses:**
- About/Team page (table stakes)
- Legal pages (table stakes, GDPR requirement)

**Avoids:**
- Walls of text (break into scannable sections)
- Generic messaging (use travel industry language)

**Research flags:** No additional research needed.

### Phase 6: Blog Implementation
**Rationale:** Blog is table stakes for thought leadership but can launch with 5-10 posts. MDX keeps it simple initially, upgrade to CMS later if needed.

**Delivers:**
- Blog listing page (card layout, 2-3 columns)
- Blog post detail page (MDX rendering)
- Blog preview section on homepage
- Category filtering
- Read time calculation
- ISR configuration (revalidate every 5 minutes)

**Addresses:**
- Blog/Content hub (table stakes)

**Avoids:**
- Pitfall 6: Implement generateMetadata for all blog posts
- Pitfall 3: Use ISR (not SSR) for blog posts

**Research flags:** Standard blog patterns, no additional research needed.

### Phase 7: Case Studies Detail Pages
**Rationale:** Build after case study data exists from Phase 2. Enables deep-dive into results and workflows.

**Delivers:**
- Case study detail pages (dynamic routes)
- Before/after workflow visualizations
- Quantified results presentation
- Client testimonial integration
- Related case studies section

**Addresses:**
- Case studies (table stakes, detailed view)
- Industry-specific examples (differentiator)

**Avoids:**
- Pitfall 6: Unique metadata per case study
- Generic stock photos (use real client work)

**Research flags:** No additional research needed.

### Phase 8: SEO & Performance Optimization
**Rationale:** Pre-launch optimization ensures Core Web Vitals pass and search engines can crawl effectively. This phase catches issues before they impact rankings.

**Delivers:**
- Sitemap.xml generation (dynamic based on content)
- robots.txt configuration
- OpenGraph images for all pages
- Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1)
- Bundle size audit (<100KB First Load JS)
- Analytics integration (Plausible/Umami)

**Addresses:**
- Fast page load (table stakes)
- SEO fundamentals (table stakes)

**Avoids:**
- Pitfall 13: Test Core Web Vitals on real devices
- Pitfall 15: Generate sitemap/robots before launch
- Pitfall 9: Bundle analysis to catch bloat

**Research flags:** Standard optimization patterns, no additional research needed.

### Phase 9: Post-Launch Enhancements (v2)
**Rationale:** Features to add after launch based on user feedback and traffic patterns.

**Delivers (prioritize based on data):**
- Interactive product demo (if demo requests are high)
- ROI calculator (once enough customer data exists)
- Video case studies (if text case studies convert well)
- Real-time chat (if lead volume justifies it)
- Industry-specific landing pages (if traffic shows multiple verticals)

**Avoids:**
- Building features without demand validation
- Complex features before core metrics are solid

**Research flags:** Likely needs `/gsd:research-phase` for interactive demo tools (Storylane, etc.) if pursued.

### Phase Ordering Rationale

**Dependency-driven:** Phase 1 provides foundation for all subsequent work (UI components, animation patterns, Server/Client boundaries). Phase 2 creates homepage sections that Phase 5 will reuse. Phase 3 builds forms that Phase 2's contact section needs.

**Risk-mitigated:** Early phases test critical architectural decisions (animation approach, Server Component boundaries, rendering strategy) before building full feature set. Phase 4 tackles the highest-risk differentiator (animations) after foundation is proven.

**Value-focused:** Phases 1-3 deliver a functional homepage with lead capture—enough to soft launch and gather feedback. Phase 4 adds visual polish. Phases 5-7 complete the marketing site. Phase 8 ensures launch quality.

**Avoid building in this order:**
- Don't build animations before foundation (Pitfall 2: boundary creep risk)
- Don't build blog before homepage (homepage is higher conversion priority)
- Don't defer SEO to post-launch (Pitfall 5: client-side content is invisible to crawlers)

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 4 (Animated Feature Cards):** If specific workflow visualization patterns are unclear, run `/gsd:research-phase` on "interactive card animation libraries" or "workflow visualization best practices"
- **Phase 9 (Interactive Product Demo):** If pursued, needs research on demo tools (Storylane, Arcade, Navattic)

**Phases with standard patterns (skip research-phase):**
- **Phase 1-3, 5-8:** All follow well-documented Next.js and SaaS marketing site patterns with high-confidence sources

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js 15, Tailwind, shadcn/ui, Framer Motion all verified via official docs and 2026 community sources. Resend dominance over SendGrid verified via multiple sources. |
| Features | HIGH | Research based on 15+ authoritative 2026 sources cross-referencing B2B SaaS best practices, agency requirements, and travel industry specifics. Table stakes vs. differentiators clearly defined. |
| Architecture | HIGH | Official Next.js App Router documentation + multiple 2026 community best practices guides. Container/Presenter pattern and Server/Client boundaries well-established. |
| Pitfalls | HIGH | Critical pitfalls verified via official Next.js docs, GitHub issues, and multiple developer experience reports. Phase-specific warnings mapped to implementation timeline. |

**Overall confidence:** HIGH

### Gaps to Address

Despite high overall confidence, some areas need attention during implementation:

- **Animation exit transitions:** Framer Motion + App Router incompatibility is well-documented, but alternative solutions (View Transitions API) are still beta. Accept enter-only animations as the pragmatic choice, revisit in 6 months when browser support improves.

- **Vercel cost projections:** Research shows potential for cost surprises but doesn't provide concrete estimates for traffic levels. Monitor usage from day one, set billing alerts, target 100% SSG to minimize function invocations.

- **Content volume for blog:** Research recommends 12-20 posts/month for high-performing SaaS but doesn't specify minimum viable post count. Launch with 5-10 quality posts, increase frequency based on traffic and engagement.

- **Free assessment vs. demo request conversion:** Research suggests free assessment converts 2-3x better than demo request but doesn't provide specific metrics for travel industry. A/B test both CTAs post-launch.

- **ROI calculator complexity:** Research identifies ROI calculators as differentiators but doesn't specify implementation approach. Defer to Phase 9 and research specific calculator patterns when ready to build.

**Handling during planning/execution:**
- Animation approach: Spike in Phase 1 to validate enter-only animations meet requirements
- Vercel costs: Weekly dashboard review, monthly budget analysis
- Blog cadence: Start conservative (1-2 posts/week), increase based on demand
- CTA testing: Build both free assessment and demo request, A/B test post-launch
- ROI calculator: Gather customer data first, research tools when ready to implement

## Sources

### Primary (HIGH confidence)

**Stack Research:**
- Next.js Official Documentation (nextjs.org/docs) — App Router, Server Components, Image Optimization, Metadata API
- Tailwind CSS Official Docs (tailwindcss.com/docs)
- Framer Motion (motion.dev) — Redirect from framer.com/motion as of 2025
- React Hook Form (react-hook-form.com)
- Resend (resend.com)
- shadcn/ui ecosystem verified via WebSearch showing 90k+ GitHub stars, 250k+ weekly npm installs

**Architecture Research:**
- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)

**Pitfalls Research:**
- [Next.js Image Optimization Official Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Functions: generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Metadata Files Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)

### Secondary (MEDIUM-HIGH confidence)

**Stack Research (2025-2026 sources):**
- [Next.js Best Practices 2025](https://www.raftlabs.com/blog/building-with-next-js-best-practices-and-benefits-for-performance-first-teams/)
- [React Hook Form vs Formik 2025](https://medium.com/@tejasvinavale1599/the-future-of-forms-react-hook-form-vs-formik-vs-zod-validation-21fda10596b5)
- [Resend vs SendGrid 2025](https://medium.com/@nermeennasim/email-apis-in-2025-sendgrid-vs-resend-vs-aws-ses-a-developers-journey-8db7b5545233)
- [Shadcn/UI Ecosystem 2025](https://www.devkit.best/blog/mdx/shadcn-ui-ecosystem-complete-guide-2025)
- [Privacy-Focused Analytics 2025](https://vemetric.com/blog/plausible-vs-umami)

**Features Research (2026 sources):**
- [Best B2B SaaS Website Examples (2026)](https://www.vezadigital.com/post/best-b2b-saas-websites-2026)
- [SaaS Website Conversions 2026 | Webstacks](https://www.webstacks.com/blog/website-conversions-for-saas-businesses)
- [10 SaaS Landing Page Trends for 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)
- [Customer Proof Guide for B2B SaaS 2026](https://www.peerbound.com/blog/customer-proof-guide)
- [33 Website Design Features That Hurt Conversions](https://www.winsavvy.com/website-design-mistakes/)

**Architecture Research (2026 sources):**
- [Best Practices for Organizing Your Next.js 15 2025](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji)
- [The Ultimate Guide to Organizing Your Next.js 15 Project Structure](https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure)
- [The Battle-Tested NextJS Project Structure I Use in 2025](https://medium.com/@burpdeepak96/the-battle-tested-nextjs-project-structure-i-use-in-2025-f84c4eb5f426)

**Pitfalls Research (verified via multiple sources):**
- [Solving Framer Motion Page Transitions in Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router)
- [Next.js App Router Issue with Framer Motion #49279](https://github.com/vercel/next.js/issues/49279)
- [The 10KB Next.js App: Extreme Bundle Optimization](https://medium.com/better-dev-nextjs-react/the-10kb-next-js-app-extreme-bundle-optimization-techniques-d8047c482aea)
- [JavaScript SEO In 2026: 7 Mistakes Killing Your Rankings](https://zumeirah.com/javascript-seo-in-2026/)
- [The Complete Next.js SEO Guide](https://strapi.io/blog/nextjs-seo)

### Community Validation (MEDIUM confidence)

**Technology adoption metrics:**
- React Hook Form: 42.8k+ GitHub stars, 2M+ weekly downloads
- Formik maintenance status: No commits in 1+ year (verified via WebSearch)
- Resend adoption: 80% of new Next.js projects per development agency reports
- SendGrid free tier discontinued: July 2025 (verified via multiple sources)
- Conversion benchmarks: Multi-step forms 111% increase (Deel case study), Free assessment 2-3x better than demo request

---

*Research completed: 2026-01-29*
*Ready for roadmap: yes*
