# RomAIx Website Rebuild

## What This Is

A complete website rebuild for RomAIx, an AI automation agency specializing in custom AI solutions for tour operators, the travel industry, and boutique hotels. The new site replaces the existing Framer-built website with a modern, code-based Next.js site featuring a light, clean design inspired by Attio and Trengo, with animated feature cards and a focus on converting visitors to demo bookings and lead captures.

## Core Value

**Visitors understand what RomAIx does and take action (book a demo or request a free assessment) within 30 seconds of landing.**

If everything else fails, the site must clearly communicate the value proposition and make it effortless to start a conversation.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Light, clean design with #587C74 (sage/teal) as primary brand color
- [ ] Trengo-style animated feature cards showing AI agents and workflows in action
- [ ] Hero section with clear value prop, two CTAs (Book Demo + Free Assessment)
- [ ] Social proof section (client logos, testimonials, or trust badges)
- [ ] Solutions section combining AI Agents + Workflow Automation + Integrations
- [ ] Prominent Case Studies section (critical for closing deals)
- [ ] How It Works process section (3-4 steps)
- [ ] Free Assessment lead magnet section
- [ ] Blog preview with card layout (3 latest posts)
- [ ] FAQ section
- [ ] Contact section with form
- [ ] About page
- [ ] Case Studies listing page
- [ ] Blog listing page with category filtering
- [ ] Contact page
- [ ] Mobile responsive design
- [ ] Smooth scroll animations (Framer Motion)
- [ ] Vercel deployment

### Out of Scope

- Blog CMS integration — defer to later phase, focus on static content first
- Automated blog generation workflows — separate project after site is live
- User authentication — not needed for marketing site
- E-commerce/payments — not applicable
- Multi-language support — English only for v1

## Context

**Current State:**
- Existing website at romaix.ai built on Framer
- Current site uses dark theme which feels heavy and less approachable
- Blog/CMS exists on Framer with card-based layout (user likes this pattern)
- Some animations exist that work well (hero text cycling, scroll effects)

**Design Inspiration Analyzed:**
- Trengo: Purple accents, animated feature cards, light background, product mockups
- Attio: Minimal, generous whitespace, premium feel
- Respond.io: Light base with dark gradient sections, social proof prominent
- Tidio: Navy + green CTAs, clean typography
- ColdIQ: Minimal, dark hero on light base
- HeyReach: Dark theme with purple gradients (not the direction chosen)
- Instantly: Blue accents, product UI mockups, testimonials

**Key Design Direction:**
- Light/white background (shift from current dark theme)
- Sage/teal (#587C74) as primary accent
- Trengo-style feature cards with layered UI mockups
- Generous whitespace (Attio influence)
- Animations with creative freedom, specifically including animated feature cards

**Target Audience:**
- Tour operators
- Travel industry businesses
- Boutique hotels
- Looking to automate customer service, bookings, and workflows with AI

## Constraints

- **Tech Stack**: Next.js, React, Tailwind CSS, Framer Motion — modern, maintainable, Vercel-optimized
- **Hosting**: Vercel — aligns with installed deployment skill
- **Brand Color**: #587C74 must remain the primary accent color
- **Content**: Migrate key content from existing site (case studies, services, about info)
- **Timeline**: Not specified, but user wants to move efficiently

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Light theme over dark | Inspiration sites analysis showed light themes feel more modern/approachable for B2B SaaS | — Pending |
| Combined Solutions section | User prefers unified presentation over split AI Agents / Workflow Automation | — Pending |
| Integrations merged into Solutions | Reduces section count, keeps focus on outcomes | — Pending |
| Free assessment as lead magnet | User's choice for lead capture mechanism | — Pending |
| CMS deferred | Focus on site structure first, add CMS capability later | — Pending |

---
*Last updated: 2025-01-29 after initialization*
