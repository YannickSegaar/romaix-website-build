# Phase 5: Content Pages - Research

**Researched:** 2026-01-30
**Domain:** Next.js 15 App Router static content pages
**Confidence:** HIGH

## Summary

Phase 5 requires implementing four table-stakes content pages: About, Contact (enhancement), Privacy Policy, and Terms of Service. These are static pages that establish company credibility and legal compliance.

The standard approach uses Next.js 15 App Router with static metadata exports, file-based routing, and Tailwind CSS v4 for styling. For long-form legal content (Privacy/Terms), the @tailwindcss/typography plugin provides professional typographic defaults. All pages inherit header/footer from the root layout and leverage Server Components for optimal performance.

The project already has /contact page with conditional form rendering from Phase 3. This phase enhances it with better information architecture and creates three new pages (/about, /privacy, /terms) following the same architectural patterns.

**Primary recommendation:** Use static `metadata` exports (not generateMetadata) for all pages, create flat route structure (app/about/page.tsx), and install @tailwindcss/typography plugin for prose styling on legal pages.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x (16.1.6) | App Router with file-based routing | Official Next.js framework, Server Components by default, optimal static generation |
| React | 19.x (19.2.3) | Component framework | Next.js 15 requires React 19 for Server Components |
| Tailwind CSS | v4 | Styling and layout | Already project standard, v4 with PostCSS plugin |
| @tailwindcss/typography | v4 compatible | Long-form content styling | Official first-party plugin for prose content, hand-tuned by designers |
| Framer Motion | 12.x (12.29.2) | Page transitions and animations | Already project standard for consistent UX |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.563.0 | Icons for team sections | Already installed, consistent with existing UI |
| @next/mdx | Latest | MDX support (optional) | Only if content needs to be managed as markdown files |
| next-themes | 0.4.6 | Dark mode support | Already installed for theme consistency |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tailwindcss/typography | Custom CSS classes | Typography plugin provides professionally designed defaults, handles edge cases |
| Static metadata | generateMetadata | generateMetadata adds unnecessary overhead for static pages |
| Inline content | @next/mdx + content files | MDX useful for frequently updated content, overkill for stable pages |

**Installation:**
```bash
npm install @tailwindcss/typography
```

## Architecture Patterns

### Recommended Project Structure
```
src/app/
├── layout.tsx                  # Root layout (existing)
├── page.tsx                    # Homepage (existing)
├── about/
│   └── page.tsx               # About page with team section
├── contact/
│   └── page.tsx               # Contact page (existing, enhance)
├── privacy/
│   └── page.tsx               # Privacy Policy
├── terms/
│   └── page.tsx               # Terms of Service
└── sitemap.ts                 # Auto-generated sitemap

src/components/
├── sections/
│   ├── team-section.tsx       # Team members display (for About)
│   └── contact-info.tsx       # Contact details (for Contact enhancement)
└── layout/
    ├── header.tsx             # Header (existing)
    └── footer.tsx             # Footer (existing, already links to /privacy, /terms)
```

### Pattern 1: Static Page with Metadata
**What:** Server Component with static metadata export for SEO
**When to use:** All content pages in this phase
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | RomAIx',
  description: 'Learn about RomAIx team, mission, and travel industry focus',
  openGraph: {
    title: 'About RomAIx',
    description: 'AI automation solutions for travel industry',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-16 md:py-24">
      {/* Content */}
    </div>
  )
}
```

### Pattern 2: Long-Form Content with Typography Plugin
**What:** Prose-styled content for legal pages using @tailwindcss/typography
**When to use:** Privacy Policy, Terms of Service, any long-form text
**Example:**
```typescript
// Source: https://tailwindcss.com/blog/tailwindcss-typography
export default function PrivacyPage() {
  return (
    <article className="container px-4 md:px-6 py-16 md:py-24">
      <div className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly...</p>
        {/* More content */}
      </div>
    </article>
  )
}
```

### Pattern 3: Team Section Component
**What:** Reusable team member grid with images, names, roles
**When to use:** About page team section
**Example:**
```typescript
// Source: Web design best practices 2026
interface TeamMember {
  name: string
  role: string
  image?: string
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {members.map((member) => (
        <div key={member.name} className="text-center">
          <div className="mb-4 h-32 w-32 mx-auto rounded-full bg-muted flex items-center justify-center">
            {/* Avatar or image */}
          </div>
          <h3 className="font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      ))}
    </div>
  )
}
```

### Pattern 4: Sitemap Generation
**What:** Programmatic sitemap for SEO
**When to use:** After adding new pages to improve crawlability
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://romaix.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://romaix.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://romaix.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://romaix.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://romaix.com/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
```

### Anti-Patterns to Avoid
- **Using generateMetadata for static pages:** Adds overhead without benefit. Use static `metadata` object instead.
- **Creating nested route groups unnecessarily:** Keep structure flat (app/about/page.tsx) unless grouping serves a purpose.
- **Forgetting force-static export:** If you need truly static pages, add `export const dynamic = 'force-static'`.
- **Inconsistent container/padding:** Match existing pattern from homepage (container px-4 md:px-6 py-16 md:py-24).
- **Missing metadata for social sharing:** Always include openGraph and twitter metadata for better sharing.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Typography for long content | Custom CSS for headings, spacing, lists | @tailwindcss/typography prose classes | Professionally designed, handles edge cases (nested lists, blockquotes, code), responsive |
| SEO metadata | Manual head tags | Next.js Metadata API | Type-safe, automatic merging, prevents duplicates |
| Sitemap generation | Manual XML file | next.js sitemap.ts convention | Auto-updates, type-safe, supports dynamic content |
| Responsive navigation | Custom breakpoint logic | Existing Header component patterns | Already tested, accessible, consistent |
| Privacy policy content | Writing from scratch | GDPR compliance templates | Legal requirements complex, easy to miss critical sections |

**Key insight:** Static content pages seem simple but have critical SEO, accessibility, and legal requirements. Use established patterns and plugins rather than custom solutions.

## Common Pitfalls

### Pitfall 1: Using Vague or Overly Legal Language in Privacy/Terms
**What goes wrong:** Privacy policies written in complex legal jargon that users can't understand, or using generic templates without customization
**Why it happens:** Copying from other sites or relying on AI-generated content without review
**How to avoid:**
- Use plain language summaries for each section
- Customize templates to actual practices
- Include specific third-party service names
- Add "Last Updated" date
**Warning signs:** Content says "we may collect" without specifics, no mention of actual services used

### Pitfall 2: Missing or Improper Metadata Configuration
**What goes wrong:** Pages have poor SEO, don't show properly when shared on social media, or have missing canonical URLs
**Why it happens:** Forgetting to add metadata exports or using incomplete metadata objects
**How to avoid:**
- Always include title, description, openGraph, and twitter metadata
- Set metadataBase in root layout
- Use canonical URLs for each page
**Warning signs:** Social media preview broken, Google Search Console warnings, duplicate titles

### Pitfall 3: Typography Inconsistency
**What goes wrong:** Legal pages look different from rest of site (different font sizes, line heights, spacing)
**Why it happens:** Not configuring typography plugin or using arbitrary values
**How to avoid:**
- Install @tailwindcss/typography plugin
- Use prose classes with size modifiers (prose lg:prose-lg)
- Include dark:prose-invert for dark mode
- Match color scheme with prose-slate or similar
**Warning signs:** Text too small on mobile, line length too wide, poor readability

### Pitfall 4: Forgetting Accessibility Requirements
**What goes wrong:** Keyboard navigation broken, headings out of order, missing ARIA labels, poor color contrast
**Why it happens:** Not testing with keyboard or screen readers, rushing implementation
**How to avoid:**
- Use semantic HTML (header, nav, main, footer, article)
- Maintain heading hierarchy (h1 → h2 → h3)
- Test keyboard navigation (Tab, Enter, Escape)
- Check color contrast ratios
**Warning signs:** Can't navigate with keyboard, screen reader confused, WCAG violations

### Pitfall 5: Not Updating Footer Links
**What goes wrong:** Footer already links to /privacy and /terms but pages don't exist yet, causing 404s
**Why it happens:** Footer was created with future links before pages implemented
**How to avoid:**
- Check existing footer links before starting
- Ensure all linked pages exist before deploying
- Test all navigation links
**Warning signs:** Footer inspection shows /privacy and /terms already linked (observed in existing footer.tsx)

### Pitfall 6: Poor Mobile Experience
**What goes wrong:** Long-form content unreadable on mobile, forms too cramped, navigation awkward
**Why it happens:** Only testing on desktop viewport
**How to avoid:**
- Use responsive prose classes (prose lg:prose-lg)
- Test on actual mobile devices
- Ensure line length stays 45-75 characters
- Use proper container max-widths
**Warning signs:** Text extends to screen edges, form fields too small, horizontal scrolling

### Pitfall 7: Missing Contact Page Context
**What goes wrong:** Contact page looks like just a form, lacks company information, no alternative contact methods
**Why it happens:** Treating contact page as pure form without context
**How to avoid:**
- Add company address/email above or beside form
- Include business hours or response time expectations
- Show alternative contact methods (email, phone)
- Add map or location information if relevant
**Warning signs:** Page feels empty except for form, users ask "how else can I reach you?"

## Code Examples

Verified patterns from official sources:

### Static Page with Full Metadata
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'
import { FadeIn } from '@/components/motion'

export const metadata: Metadata = {
  title: 'About Us | RomAIx',
  description: 'Learn about the RomAIx team, our mission to revolutionize travel industry automation, and our expertise in AI solutions.',
  keywords: ['RomAIx team', 'travel AI', 'company mission', 'about'],
  openGraph: {
    title: 'About RomAIx - AI Automation for Travel Industry',
    description: 'Meet the team behind RomAIx and learn about our mission',
    type: 'website',
    url: 'https://romaix.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RomAIx',
    description: 'AI automation solutions for travel industry',
  },
}

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-16 md:py-24">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About RomAIx</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Your content here...
        </p>
      </FadeIn>
    </div>
  )
}
```

### Typography Plugin Configuration
```typescript
// Source: https://tailwindcss.com/blog/tailwindcss-typography
// In globals.css with Tailwind v4
@import "tailwindcss";
@plugin "@tailwindcss/typography";

// Usage in component
export default function PrivacyPage() {
  return (
    <article className="container px-4 md:px-6 py-16 md:py-24">
      <div className="prose prose-slate lg:prose-lg xl:prose-xl dark:prose-invert mx-auto max-w-4xl">
        <h1>Privacy Policy</h1>
        {/* Content automatically styled */}
      </div>
    </article>
  )
}
```

### Responsive Typography for Long-Form Content
```typescript
// Source: https://www.samiharaketi.com/post/website-dimensions-typography-in-2026-a-practical-guide-for-web-designers
// Best practices: 45-90 characters per line, ideal 66 characters
// Blog article width: 640px-760px

<article className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto max-w-[760px]">
  {/* Content with optimal line length */}
</article>
```

### Enhanced Contact Page Structure
```typescript
// Source: https://www.eleken.co/blog-posts/contact-form-design
export default function ContactPage() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left: Contact Information */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Ready to transform your travel business?
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">hello@romaix.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-muted-foreground">Within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-muted/30 p-6 md:p-8 rounded-lg">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router getStaticProps | App Router static metadata | Next.js 13+ | Simpler API, better TypeScript support, RSC by default |
| Custom typography CSS | @tailwindcss/typography | Tailwind v1+ | Professional defaults, less maintenance, dark mode support |
| Manual sitemap.xml | Programmatic sitemap.ts | Next.js 13+ | Type-safe, auto-updates, supports dynamic content |
| Client-side metadata | Server metadata API | Next.js 13+ | Better SEO, streaming, no hydration mismatch |
| WCAG 2.1 AA | WCAG 2.2 AA | October 2023 | 9 new success criteria, stricter accessibility requirements |

**Deprecated/outdated:**
- **next-mdx-remote**: Not well maintained as of 2025, use @next/mdx for local content
- **getStaticProps/getStaticPaths**: Pages Router only, use App Router patterns
- **Head component**: Replaced by Metadata API in App Router
- **Pure white backgrounds (#FFFFFF)**: 2026 trend toward soft neutrals (paper/limestone tones) for readability

## Open Questions

Things that couldn't be fully resolved:

1. **Actual Privacy Policy and Terms Content**
   - What we know: Must be GDPR compliant, include specific services used, plain language
   - What's unclear: RomAIx's actual data practices, third-party services, data retention policies
   - Recommendation: Use GDPR-compliant template as starting point, customize with actual practices, get legal review

2. **Team Information for About Page**
   - What we know: Should include team members, roles, mission statement, travel industry focus
   - What's unclear: Actual team member names, photos, bios, company history
   - Recommendation: Create flexible component structure, use placeholder content, easy to update later

3. **Contact Information Details**
   - What we know: Should include email, response time expectations, alternative contact methods
   - What's unclear: Actual business email, phone number, physical address if any
   - Recommendation: Add information architecture now, populate with real data when available

4. **MDX vs Inline Content**
   - What we know: @next/mdx works with App Router, useful for frequently updated content
   - What's unclear: Whether Privacy/Terms will need frequent updates or stay relatively static
   - Recommendation: Start with inline JSX (simpler), migrate to MDX later if content management becomes burden

## Sources

### Primary (HIGH confidence)
- Next.js Official Docs - Layouts and Pages: https://nextjs.org/docs/app/getting-started/layouts-and-pages
- Next.js Official Docs - Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js Official Docs - Sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Tailwind CSS Typography Plugin: https://tailwindcss.com/blog/tailwindcss-typography
- Tailwind CSS Typography GitHub: https://github.com/tailwindlabs/tailwindcss-typography
- WCAG 2.2 Overview: https://www.w3.org/WAI/standards-guidelines/wcag/

### Secondary (MEDIUM confidence)
- Next.js 15 App Router Guide (Medium): https://medium.com/@livenapps/next-js-15-app-router-a-complete-senior-level-guide-0554a2b820f7
- Next.js 15 SEO Guide: https://www.digitalapplied.com/blog/nextjs-seo-guide
- 2026 GDPR Compliance Guide: https://secureprivacy.ai/blog/gdpr-compliance-2026
- Privacy Policy Requirements (Ironclad): https://ironcladapp.com/journal/contracts/best-privacy-policy-examples-for-gdpr
- SaaS Website Best Practices: https://www.poweredbysearch.com/blog/saas-website-best-practices/
- Contact Form Design Examples: https://www.eleken.co/blog-posts/contact-form-design
- Typography Best Practices 2026: https://www.samiharaketi.com/post/website-dimensions-typography-in-2026-a-practical-guide-for-web-designers
- NN/G Privacy Policy Mistakes: https://www.nngroup.com/articles/privacy-policies-terms-use-pages/

### Tertiary (LOW confidence)
- tw-prose CSS-only plugin announcement: https://dev.to/gridou/announcing-tw-prose-a-css-only-typography-plugin-for-tailwind-css-v4-o8j
- Getting Started with Next.js 15 and MDX: https://dev.to/ptpaterson/getting-started-with-nextjs-15-and-mdx-305k
- Building Responsive Team Section: https://medium.com/@ryaddev/building-a-responsive-team-members-section-with-react-c44b9027e608

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified via official docs and existing package.json
- Architecture: HIGH - Next.js App Router patterns verified via official documentation
- Typography: HIGH - @tailwindcss/typography verified via official blog and GitHub
- Privacy/Terms requirements: MEDIUM - GDPR requirements from authoritative sources, but actual content needs legal review
- Pitfalls: MEDIUM - Based on multiple credible sources and NN/G research, but some WebSearch only

**Research date:** 2026-01-30
**Valid until:** 2026-02-28 (30 days - stable domain, Next.js 15 mature)

**Key considerations for planner:**
- Footer already links to /privacy and /terms (lines 11-12 in footer.tsx) - must implement these pages
- Contact page already exists with conditional forms - enhancement means adding context/info
- Header already has /about link (line 9 in header.tsx) - page expected by navigation
- Tailwind CSS v4 with PostCSS - typography plugin installation needs CSS import syntax
- Project uses OKLCH color space - ensure prose colors work with existing theme
- Existing animation pattern with FadeIn component - maintain consistency
- Server Components by default - all pages should be Server Components unless interaction needed
