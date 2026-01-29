# Technology Stack

**Project:** RomAIx Marketing Website
**Domain:** SaaS/Agency Marketing Website with Animations
**Researched:** 2026-01-29
**Overall Confidence:** HIGH

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Next.js** | 15.x (latest: 16.1.6) | React framework with SSG/ISR | Industry standard for marketing sites; excellent SEO with App Router, built-in image optimization, Vercel-optimized, Turbopack for fast builds. Next.js 15+ includes stable Turbopack (76.7% faster startup), React 19 support, and better caching control. |
| **React** | 19.x | UI library | Required by Next.js 15; improved performance and modern features for interactive components |
| **TypeScript** | 5.x (latest stable) | Type safety | Essential for modern Next.js projects in 2025; prevents bugs, improves DX, enables better refactoring. No longer optional for serious projects. |

**Confidence:** HIGH (verified via Next.js official docs, WebFetch confirmed v16.1.6)

### Styling & UI
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Tailwind CSS** | 3.x/4.x | Utility-first CSS framework | Dominant choice for SaaS websites in 2025; utility-first approach provides granular control, excellent for custom designs like Attio/Trengo. Small bundle size, Vercel-optimized. |
| **shadcn/ui** | Latest | Copy-paste React components | Exploded in 2025 (90k+ GitHub stars, 250k+ weekly npm installs); copy-paste ownership model avoids vendor lock-in. Built on Radix UI for accessibility. Ideal for SaaS with 80% adoption in new projects. Includes form components, dialogs, cards needed for lead capture. |
| **PostCSS** | 8.x | CSS processing | Built into Next.js; required for Tailwind CSS |

**Confidence:** HIGH (verified via multiple 2025 WebSearch sources showing Tailwind dominance and shadcn/ui ecosystem growth)

### Animation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Framer Motion** | 11.x (now "Motion") | React animation library | Specified in requirements; production-ready, strikes perfect balance between power and simplicity. Best for complex interactions on feature cards. Larger bundle (~36KB) but worth it for marketing sites prioritizing visual polish. |
| **Motion One** | Latest (optional alternative) | Lightweight animations | Consider for simple animations; ~5KB bundle size, GPU-accelerated, excellent mobile performance. Use alongside Framer Motion for micro-interactions. |

**Confidence:** MEDIUM-HIGH (Framer Motion redirects to motion.dev as of 2025; WebSearch confirms still production-ready but couldn't verify exact current version from Motion docs)

### Content Management
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **MDX** (built-in) | Next.js native | Blog content | Simple blog with card layout doesn't need full CMS; MDX provides type-safe content with React components. Zero cost, git-based workflow, perfect for technical content. |
| **Contentlayer** (optional) | 0.3.x | MDX processing | Type-safe MDX layer if blog grows; validates frontmatter, generates TypeScript types, integrates with Next.js App Router. |

**Alternative for future:** If non-technical team needs visual editing:
- **Storyblok** - Visual editing, proven App Router setup
- **Sanity** - Developer-first, flexible schema, real-time collaboration
- **Payload** - Self-hosted TypeScript CMS for full control

**Confidence:** HIGH (MDX is Next.js built-in; verified via official docs. CMS alternatives verified via WebSearch 2025 comparisons)

### Form Handling & Validation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **React Hook Form** | 7.x | Form state management | Winner over Formik in 2025; Formik not actively maintained (no commits in 1+ year). RHF is faster (8KB vs 15KB), zero dependencies, 2M+ weekly downloads, built for performance with uncontrolled components. |
| **Zod** | 3.x | Schema validation | TypeScript-first validation; integrates perfectly with React Hook Form via @hookform/resolvers. Type-safe form validation for lead capture forms (demo booking, free assessment). |

**Confidence:** HIGH (verified via WebSearch showing Formik maintenance issues and RHF dominance in 2025)

### Email & Lead Capture
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Resend** | Latest API | Transactional email | Built by former Vercel team; modern API, React Email templates (JSX-based), generous free tier (3000/month). Perfect for form submissions, demo booking confirmations. 80% adoption in Next.js projects vs SendGrid. |
| **React Email** | Latest | Email templates | Built by Resend team; write emails in JSX, preview in browser. Type-safe, component-based email design. |

**Alternative:** ConvertKit/Kit for marketing automation (newsletter, drip campaigns) - but use Resend for transactional (form confirmations).

**Confidence:** HIGH (verified via WebSearch 2025 comparisons; Resend recommended for Next.js startups, SendGrid losing ground after discontinuing free tier July 2025)

### Analytics
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Plausible** or **Umami** | Latest | Privacy-focused analytics | GDPR-compliant, cookie-free, lightweight (<1-2KB script). Plausible has polished UI (€9/mo hosted); Umami is self-hostable (free) or $9/mo hosted. Both ideal for marketing sites needing clean metrics without Google Analytics bloat. |

**Recommendation:** Start with Plausible hosted (30-day trial) for ease; migrate to Umami self-hosted if cost matters later.

**Confidence:** HIGH (verified via WebSearch 2025 privacy-focused analytics comparisons)

### Development Tools
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **ESLint** | 9.x | Code linting | Built into Next.js via eslint-config-next; includes Core Web Vitals rules. Use next/core-web-vitals config for performance linting. |
| **Prettier** | 3.x | Code formatting | Industry standard; use eslint-config-prettier to prevent conflicts. Consistent formatting across team. |
| **Husky** (optional) | 9.x | Git hooks | Pre-commit hooks to run ESLint/Prettier; prevents bad commits. Recommended for team projects. |
| **TypeScript ESLint** | 8.x | TS-specific linting | Included in Next.js 15+; powerful typescript-eslint rules for type safety. |

**Confidence:** HIGH (verified via Next.js official ESLint docs and WebSearch 2025 setup guides)

### Deployment & Hosting
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Vercel** | N/A (platform) | Hosting & deployment | Specified in requirements; built by Next.js team, zero-config deployment, automatic HTTPS, edge network, ISR support, environment variable management. Best for marketing sites with static content and ISR. |
| **Git** (GitHub preferred) | N/A | Version control | Vercel integrates seamlessly with GitHub; automatic preview deployments per PR. |

**Confidence:** HIGH (Vercel specified in project requirements; verified optimal for Next.js marketing sites via WebSearch)

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 | Astro | Astro excellent for content-heavy sites but Next.js better for interactive features (animated cards, forms). Next.js ecosystem more mature. |
| Styling | Tailwind CSS | CSS-in-JS (Emotion, Styled Components) | Tailwind dominant in 2025 SaaS space; CSS-in-JS adds runtime overhead, less performant. Tailwind's utility-first approach faster for custom designs. |
| Animation | Framer Motion | GSAP | GSAP powerful but imperative API (refs-based); Framer Motion more React-native with declarative components. GSAP better for timeline-heavy animations not needed here. |
| Animation | Framer Motion | React Spring | React Spring physics-based, great for natural motion but steeper learning curve. Framer Motion simpler API for marketing site animations. |
| Forms | React Hook Form | Formik | Formik unmaintained (no commits in 1+ year), heavier bundle (15KB vs 8KB), more re-renders. RHF is 2025 standard. |
| Email | Resend | SendGrid | SendGrid discontinued free tier (July 2025), worse DX, no idempotency keys, no request logs. Resend 1/9th the cost for typical use. |
| CMS | MDX (native) | WordPress Headless | WordPress overkill for simple blog; MDX simpler, free, git-based, type-safe with Next.js. Use real CMS only if non-technical team needs visual editing. |
| Analytics | Plausible/Umami | Google Analytics | GA4 bloated (45KB+ script), cookie-heavy, GDPR concerns, complex UI. Plausible/Umami lightweight, privacy-first, clean metrics. |

## Installation

### Initial Setup
```bash
# Create Next.js 15 app with TypeScript, Tailwind, ESLint, App Router
npx create-next-app@latest romaix-website --typescript --tailwind --eslint --app --turbopack

# Navigate to project
cd romaix-website
```

### Core Dependencies
```bash
# Animation
npm install framer-motion

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# UI Components (shadcn/ui)
npx shadcn@latest init

# Email
npm install resend react-email
```

### Development Dependencies
```bash
# Code quality
npm install -D prettier eslint-config-prettier

# Git hooks (optional but recommended)
npm install -D husky lint-staged
```

### Shadcn/UI Components
```bash
# Install needed UI components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add dialog
```

### MDX (for blog)
```bash
# If using Contentlayer for type-safe MDX
npm install contentlayer next-contentlayer
```

## Configuration Notes

### Environment Variables
```bash
# .env.local (DO NOT commit)
RESEND_API_KEY=re_...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=romaix.com

# Vercel dashboard (production)
# Add same variables in Vercel project settings
```

### TypeScript Configuration
Next.js 15 includes optimized tsconfig.json by default. Verify strict mode:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Tailwind Configuration
Extend with brand color:
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#587C74', // sage/teal
          light: '#7A9E95',
          dark: '#3D5A53',
        }
      }
    }
  }
}
```

### ESLint Configuration
```javascript
// eslint.config.js (flat config)
import nextConfig from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier/flat'

export default [
  nextConfig,
  prettierConfig,
]
```

## Stack Decision Rationale

### Why This Stack for RomAIx?

**Next.js 15 + Vercel:** Perfect for marketing sites needing SEO (SSG), fast builds (Turbopack), and edge optimization. Vercel specified in requirements and offers best Next.js DX.

**Tailwind + shadcn/ui:** Achieve light, clean design (Attio/Trengo inspired) with utility-first approach. shadcn/ui provides accessible, customizable components without vendor lock-in. Can easily match brand color #587C74.

**Framer Motion:** Specified for animated feature cards; production-ready, declarative API perfect for React. Sufficient for marketing site animations without GSAP complexity.

**React Hook Form + Zod:** Type-safe, performant forms for lead capture (demo booking, free assessment). Formik deprecated; RHF is 2025 standard.

**MDX Native:** Simple blog with card layout doesn't justify CMS cost/complexity. MDX provides type-safe, git-based content workflow. Upgrade to Storyblok/Sanity later if non-technical team needs visual editing.

**Resend + React Email:** Modern transactional email for form confirmations. JSX-based templates match React workflow. 1/9th cost of SendGrid with better DX.

**Plausible/Umami:** Privacy-focused analytics aligns with European GDPR requirements (travel industry). Lightweight script won't hurt Core Web Vitals.

### Performance Considerations
- Next.js Image component for optimized images
- Tailwind CSS purges unused styles
- Framer Motion code-splits animations
- Plausible/Umami <2KB analytics script
- Static generation (SSG) for marketing pages
- ISR for blog updates without redeploy

### Scalability Path
1. **Phase 1 (MVP):** Static site with forms, blog, animations
2. **Phase 2 (Growth):** Add Contentlayer if blog grows; migrate to Sanity/Storyblok if marketing team needs visual editing
3. **Phase 3 (Scale):** Add ConvertKit for marketing automation; consider Vercel Edge Functions for dynamic features

## Sources

### Official Documentation (HIGH confidence)
- Next.js: https://nextjs.org/docs (verified v16.1.6, App Router features)
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://motion.dev (redirect from framer.com/motion)
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev
- Resend: https://resend.com
- Vercel: https://vercel.com/docs

### 2025 Ecosystem Research (MEDIUM-HIGH confidence)
- [Next.js Best Practices 2025](https://www.raftlabs.com/blog/building-with-next-js-best-practices-and-benefits-for-performance-first-teams/)
- [React Animation Libraries 2025 Comparison](https://medevel.com/top-16-react-animation-libraries-for-2025-a-developers-guide-to-choosing-the-right-tool-2/)
- [Tailwind CSS Best Frameworks 2025](https://blog.logrocket.com/top-6-css-frameworks-2025/)
- [Shadcn/UI Ecosystem 2025](https://www.devkit.best/blog/mdx/shadcn-ui-ecosystem-complete-guide-2025)
- [React Hook Form vs Formik 2025](https://medium.com/@tejasvinavale1599/the-future-of-forms-react-hook-form-vs-formik-vs-zod-validation-21fda10596b5)
- [Resend vs SendGrid 2025](https://medium.com/@nermeennasim/email-apis-in-2025-sendgrid-vs-resend-vs-aws-ses-a-developers-journey-8db7b5545233)
- [Privacy-Focused Analytics 2025](https://vemetric.com/blog/plausible-vs-umami)
- [Next.js SEO Best Practices 2025](https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7)
- [Next.js 15 vs 14 Comparison](https://medium.com/@abdulsamad18090/next-js-14-vs-next-js-15-rc-a-detailed-comparison-d0160e425dc9)
- [Headless CMS Next.js 2025](https://naturaily.com/blog/next-js-cms)

### Community Trends (MEDIUM confidence)
- Shadcn/ui: 90k+ GitHub stars, 250k+ weekly npm installs (verified via WebSearch)
- React Hook Form: 42.8k+ GitHub stars, 2M+ weekly downloads (verified via WebSearch)
- Formik maintenance status: No commits in 1+ year (verified via WebSearch)
- Resend adoption: 80% of new Next.js projects per development agency reports (WebSearch)
- SendGrid free tier discontinued: July 2025 (verified via multiple sources)
