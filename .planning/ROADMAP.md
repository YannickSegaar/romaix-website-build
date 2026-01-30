# Roadmap: RomAIx Website

## Overview

This roadmap transforms RomAIx from a heavy Framer-built dark theme into a modern, light Next.js website that converts visitors to demos and free assessments within 30 seconds. The 8-phase journey prioritizes foundation and table stakes first, then adds competitive differentiators (animated feature cards), and concludes with content depth and optimization. Each phase delivers coherent capabilities that respect component dependencies while building toward a high-converting B2B SaaS marketing site optimized for tour operators and the travel industry.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Setup** - Project initialization, UI components, layout shell, animation infrastructure
- [x] **Phase 2: Homepage Core (Table Stakes)** - Hero, social proof, solutions, case studies showcase, FAQ, contact section
- [x] **Phase 3: Lead Capture & Forms** - Form infrastructure, validation, Server Actions, email integration
- [x] **Phase 4: Animated Feature Cards (Differentiator)** - Trengo-style animated cards showing AI agents and workflows
- [ ] **Phase 5: Content Pages** - About, Contact, Privacy Policy, Terms of Service
- [ ] **Phase 6: Blog Implementation** - Blog listing, post detail pages, homepage preview, category filtering
- [ ] **Phase 7: Case Studies Detail Pages** - Individual case study pages with workflows and quantified results
- [ ] **Phase 8: SEO & Performance + Deployment** - Metadata, sitemap, Core Web Vitals optimization, Vercel deployment

## Phase Details

### Phase 1: Foundation & Setup
**Goal**: Establish project infrastructure and component library that enables all subsequent development
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, ANIM-01, ANIM-03, ANIM-04
**Success Criteria** (what must be TRUE):
  1. Developer can run `npm run dev` and see a styled homepage shell with header and footer
  2. Developer can import and use shadcn/ui components (Button, Card, Input) styled with brand color #587C74
  3. Developer can wrap any component with FadeIn or SlideIn to add scroll-triggered animations
  4. Website displays correctly on mobile (375px), tablet (768px), and desktop (1440px) viewports
  5. Animation approach validated (enter-only animations work with App Router)
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md — Initialize Next.js 15 project with TypeScript, Tailwind, Framer Motion
- [x] 01-02-PLAN.md — Set up shadcn/ui with brand color theming (OKLCH)
- [x] 01-03-PLAN.md — Create Framer Motion animation wrappers (FadeIn, SlideIn, Stagger)
- [x] 01-04-PLAN.md — Create responsive Header, Footer, and root layout

### Phase 2: Homepage Core (Table Stakes)
**Goal**: Deliver complete homepage with clear value proposition, social proof, and conversion paths
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-06, HOME-07, HOME-10
**Success Criteria** (what must be TRUE):
  1. Visitor landing on homepage sees value proposition for travel industry AI automation within 5 seconds
  2. Visitor can click "Book a Demo" or "Get Free Assessment" CTAs from hero section
  3. Visitor sees social proof (client logos or trust indicators) establishing credibility
  4. Visitor can view 3 detailed case studies with quantified results (client names, metrics, industry)
  5. Visitor sees 3-4 step "How It Works" process explaining engagement model
  6. Visitor can expand/collapse FAQ accordion to find answers to common questions
**Plans**: 4 plans

Plans:
- [x] 02-01-PLAN.md — Install Accordion, add marquee CSS, create data files and types
- [x] 02-02-PLAN.md — Create Hero and Social Proof sections
- [x] 02-03-PLAN.md — Create Case Studies and How It Works sections
- [x] 02-04-PLAN.md — Create FAQ section and wire complete homepage

### Phase 3: Lead Capture & Forms
**Goal**: Enable visitor-to-lead conversion through functional, validated forms with email notifications
**Depends on**: Phase 2
**Requirements**: HOME-08, HOME-11, FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06
**Success Criteria** (what must be TRUE):
  1. Visitor can submit contact form with name, email, phone, message and receive confirmation
  2. Visitor can request free assessment with business details and see success message
  3. Visitor can book a demo (via form or calendar integration) and receive booking confirmation
  4. Form displays validation errors immediately for invalid inputs (email format, required fields)
  5. RomAIx team receives email notification within 60 seconds of form submission with lead details
  6. Forms reject bot submissions (server-side validation prevents spam)
**Plans**: 5 plans

Plans:
- [x] 03-01-PLAN.md — Install form dependencies, create Zod schemas, add shadcn/ui form components
- [x] 03-02-PLAN.md — Create Resend email client, templates, contact Server Action and form
- [x] 03-03-PLAN.md — Create assessment and demo Server Actions and form components
- [x] 03-04-PLAN.md — Create Free Assessment CTA and Contact sections, wire into homepage
- [x] 03-05-PLAN.md — [GAP CLOSURE] Create /contact page route with conditional form rendering

### Phase 4: Animated Feature Cards (Differentiator)
**Goal**: Differentiate from competitors with animated cards showing AI agents and workflows in action
**Depends on**: Phase 1
**Requirements**: HOME-04, HOME-05, ANIM-02
**Success Criteria** (what must be TRUE):
  1. Visitor sees Solutions section with animated feature cards for AI Agents, Workflow Automation, and Integrations
  2. Cards display hover effects (scale, color shift, or interactive elements) that respond smoothly to mouse movement
  3. Integration logos (WhatsApp, Instagram, Facebook, etc.) are visible within Solutions section
  4. Animations perform smoothly (60fps) on mid-range devices (tested on throttled CPU)
  5. Cards reveal with staggered scroll-triggered animations as visitor scrolls to Solutions section
**Plans**: 4 plans

Plans:
- [x] 04-01-PLAN.md — Add FeatureCard/Integration types, solutions data, HoverCard component
- [x] 04-02-PLAN.md — Create Solutions section with feature cards and integration logos
- [x] 04-03-PLAN.md — Wire Solutions to homepage, performance verification checkpoint
- [x] 04-04-PLAN.md — [GAP CLOSURE] Remove orphaned HoverCard component

### Phase 5: Content Pages
**Goal**: Complete table stakes pages establishing company credibility and legal compliance
**Depends on**: Phase 3
**Requirements**: PAGE-01, PAGE-06, PAGE-07, PAGE-08
**Success Criteria** (what must be TRUE):
  1. Visitor can navigate to About page and learn about RomAIx team, mission, and travel industry focus
  2. Visitor can access full-page Contact experience and submit inquiry via dedicated contact page
  3. Visitor can read Privacy Policy covering data collection, usage, and GDPR compliance
  4. Visitor can read Terms of Service outlining engagement terms and service scope
  5. All pages render with consistent header/footer and mobile-responsive layout
**Plans**: 3 plans

Plans:
- [ ] 05-01-PLAN.md — Install typography plugin, create About page with mission and team
- [ ] 05-02-PLAN.md — Enhance Contact page with info sidebar
- [ ] 05-03-PLAN.md — Create Privacy Policy and Terms of Service pages

### Phase 6: Blog Implementation
**Goal**: Establish thought leadership through blog with card layout and category filtering
**Depends on**: Phase 1
**Requirements**: HOME-09, PAGE-04, PAGE-05
**Success Criteria** (what must be TRUE):
  1. Visitor sees latest 3 blog posts on homepage in card layout with title, excerpt, date, and read time
  2. Visitor can navigate to Blog listing page and see all posts in 2-3 column grid layout
  3. Visitor can filter blog posts by category (AI Automation, Travel Industry, Case Studies, etc.)
  4. Visitor can click any blog post to read full content with formatted text, images, and code blocks
  5. Blog pages load from server-rendered content (visible in "View Page Source")
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### Phase 7: Case Studies Detail Pages
**Goal**: Enable deep-dive exploration of client success stories with workflows and quantified results
**Depends on**: Phase 2
**Requirements**: PAGE-02, PAGE-03
**Success Criteria** (what must be TRUE):
  1. Visitor can click any case study from homepage showcase to view detailed case study page
  2. Case study page displays before/after workflow visualizations showing automation impact
  3. Case study page shows quantified results with metrics (time saved, cost reduction, conversion lift)
  4. Case study page includes client testimonial quote with name and company
  5. Visitor sees "Related Case Studies" section suggesting 2-3 similar case studies
  6. Case Studies listing page displays all case studies in grid layout with filter options
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD

### Phase 8: SEO & Performance + Deployment
**Goal**: Launch-ready site meeting Core Web Vitals with complete SEO configuration on Vercel
**Depends on**: Phase 7
**Requirements**: FOUND-06, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, DEPLOY-01, DEPLOY-02, DEPLOY-03
**Success Criteria** (what must be TRUE):
  1. Every page displays unique, relevant title and meta description when shared on social media
  2. OpenGraph images appear correctly when pages are shared on LinkedIn, Twitter, Facebook
  3. Site is accessible via custom domain (romaix.ai or new domain) with HTTPS
  4. Sitemap.xml is automatically generated and includes all public pages
  5. Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1) on 4G mobile connection
  6. First Load JS bundle is under 100KB for all marketing pages
  7. Analytics dashboard shows visitor traffic and page views (Plausible or Umami)
  8. Search engines can crawl all content (verified via Google Search Console)
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Setup | 4/4 | Complete | 2026-01-29 |
| 2. Homepage Core (Table Stakes) | 4/4 | Complete | 2026-01-30 |
| 3. Lead Capture & Forms | 5/5 | Complete | 2026-01-29 |
| 4. Animated Feature Cards | 4/4 | Complete | 2026-01-29 |
| 5. Content Pages | 0/3 | Planned | - |
| 6. Blog Implementation | 0/TBD | Not started | - |
| 7. Case Studies Detail Pages | 0/TBD | Not started | - |
| 8. SEO & Performance + Deployment | 0/TBD | Not started | - |

---
*Roadmap created: 2026-01-29*
*Last updated: 2026-01-30*
