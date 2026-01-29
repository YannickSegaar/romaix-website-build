# Requirements: RomAIx Website

**Defined:** 2025-01-29
**Core Value:** Visitors understand what RomAIx does and take action (book a demo or request a free assessment) within 30 seconds of landing.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUND-01**: Project initialized with Next.js 15 + TypeScript + Tailwind CSS
- [ ] **FOUND-02**: shadcn/ui component library configured with brand color (#587C74)
- [ ] **FOUND-03**: Framer Motion animation wrappers created (FadeIn, SlideIn, StaggerChildren)
- [ ] **FOUND-04**: Marketing layout with responsive Header and Footer
- [ ] **FOUND-05**: Mobile-responsive design across all breakpoints
- [ ] **FOUND-06**: Page load speed under 2 seconds (Core Web Vitals compliant)

### Homepage

- [ ] **HOME-01**: Hero section with clear value proposition for travel industry
- [ ] **HOME-02**: Hero has two CTAs: "Book a Demo" (primary) + "Get Free Assessment" (secondary)
- [ ] **HOME-03**: Social proof bar with client logos or trust indicators
- [ ] **HOME-04**: Solutions section with Trengo-style animated feature cards showing AI Agents + Workflows
- [ ] **HOME-05**: Integrations displayed within Solutions section (WhatsApp, Instagram, Facebook, etc.)
- [ ] **HOME-06**: Case Studies showcase featuring 3 detailed case studies with quantified results
- [ ] **HOME-07**: How It Works section with 3-4 step visual process
- [ ] **HOME-08**: Free Assessment CTA section (dedicated lead magnet)
- [ ] **HOME-09**: Blog preview showing latest 3 posts in card layout
- [ ] **HOME-10**: FAQ section with expandable accordion
- [ ] **HOME-11**: Contact section with form

### Pages

- [ ] **PAGE-01**: About page with team info, mission, and travel industry focus
- [ ] **PAGE-02**: Case Studies listing page with all case studies
- [ ] **PAGE-03**: Case Study detail pages with before/after workflows and results
- [ ] **PAGE-04**: Blog listing page with category filtering and card layout
- [ ] **PAGE-05**: Blog post detail pages with MDX rendering
- [ ] **PAGE-06**: Contact page with full-page form experience
- [ ] **PAGE-07**: Privacy Policy page
- [ ] **PAGE-08**: Terms of Service page

### Forms & Lead Capture

- [ ] **FORM-01**: Contact form with name, email, phone, message fields
- [ ] **FORM-02**: Free assessment request form with business details
- [ ] **FORM-03**: Demo booking form (or calendar integration)
- [ ] **FORM-04**: Server-side form handling with Server Actions
- [ ] **FORM-05**: Email notifications via Resend for form submissions
- [ ] **FORM-06**: Form validation with React Hook Form + Zod

### Animations

- [ ] **ANIM-01**: Scroll-triggered fade-in animations for sections
- [ ] **ANIM-02**: Trengo-style animated feature cards with hover effects
- [ ] **ANIM-03**: Staggered animations for lists and grids
- [ ] **ANIM-04**: Smooth page transitions (enter-only, no exit animations)

### SEO & Performance

- [ ] **SEO-01**: Unique metadata (title, description) for every page
- [ ] **SEO-02**: OpenGraph images for social sharing
- [ ] **SEO-03**: Sitemap.xml generation
- [ ] **SEO-04**: robots.txt configuration
- [ ] **SEO-05**: All content rendered server-side (no client-side content loading)
- [ ] **SEO-06**: Bundle size under 100KB First Load JS

### Deployment

- [ ] **DEPLOY-01**: Vercel deployment configured
- [ ] **DEPLOY-02**: Custom domain setup (romaix.ai or new domain)
- [ ] **DEPLOY-03**: Analytics integration (Plausible or Umami)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Features

- **V2-01**: Interactive product demo (Storylane or similar)
- **V2-02**: ROI calculator for potential savings
- **V2-03**: Video case studies
- **V2-04**: Real-time chat widget
- **V2-05**: Newsletter signup with email sequences
- **V2-06**: Multiple industry landing pages (beyond travel)
- **V2-07**: AI-powered personalization
- **V2-08**: Blog CMS integration (Sanity, Contentful, or Storyblok)
- **V2-09**: Automated blog generation workflows

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User authentication | Marketing site only, no user accounts needed |
| E-commerce/payments | Not applicable to service business model |
| Multi-language support | English only for v1, defer internationalization |
| Carousels for hero content | Anti-pattern: only 1% see slides beyond first |
| Auto-play videos with sound | Anti-pattern: universally disliked |
| Complex navigation (>5 items) | Anti-pattern: kills conversions |
| Client-side content loading for SEO content | Anti-pattern: invisible to search engines |
| Exit animations | Technical limitation: Framer Motion + App Router incompatibility |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FOUND-06 | Phase 8 | Pending |
| HOME-01 | Phase 2 | Pending |
| HOME-02 | Phase 2 | Pending |
| HOME-03 | Phase 2 | Pending |
| HOME-04 | Phase 4 | Pending |
| HOME-05 | Phase 4 | Pending |
| HOME-06 | Phase 2 | Pending |
| HOME-07 | Phase 2 | Pending |
| HOME-08 | Phase 3 | Pending |
| HOME-09 | Phase 6 | Pending |
| HOME-10 | Phase 2 | Pending |
| HOME-11 | Phase 3 | Pending |
| PAGE-01 | Phase 5 | Pending |
| PAGE-02 | Phase 7 | Pending |
| PAGE-03 | Phase 7 | Pending |
| PAGE-04 | Phase 6 | Pending |
| PAGE-05 | Phase 6 | Pending |
| PAGE-06 | Phase 5 | Pending |
| PAGE-07 | Phase 5 | Pending |
| PAGE-08 | Phase 5 | Pending |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| FORM-05 | Phase 3 | Pending |
| FORM-06 | Phase 3 | Pending |
| ANIM-01 | Phase 1 | Pending |
| ANIM-02 | Phase 4 | Pending |
| ANIM-03 | Phase 1 | Pending |
| ANIM-04 | Phase 1 | Pending |
| SEO-01 | Phase 8 | Pending |
| SEO-02 | Phase 8 | Pending |
| SEO-03 | Phase 8 | Pending |
| SEO-04 | Phase 8 | Pending |
| SEO-05 | All Phases | Pending |
| SEO-06 | Phase 8 | Pending |
| DEPLOY-01 | Phase 8 | Pending |
| DEPLOY-02 | Phase 8 | Pending |
| DEPLOY-03 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 40 total
- Mapped to phases: 40
- Unmapped: 0 ✓

---
*Requirements defined: 2025-01-29*
*Last updated: 2025-01-29 after initial definition*
