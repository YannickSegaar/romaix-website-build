# Phase 7: Case Studies Detail Pages - Research

**Researched:** 2026-01-30
**Domain:** Next.js dynamic routes with MDX content for case study detail pages
**Confidence:** HIGH

## Summary

This phase builds case study detail pages following the established MDX content pattern from Phase 6 (Blog Implementation). Case studies require richer metadata than blog posts (client testimonial, before/after workflow data, quantified metrics) but follow the same technical architecture: gray-matter for frontmatter parsing, Next.js dynamic routes with generateStaticParams, and next-mdx-remote for runtime rendering.

The standard approach reuses existing infrastructure (src/lib/blog.ts pattern, src/content/ directory structure, MDX rendering with next-mdx-remote/rsc) while extending the metadata schema for case study-specific fields. Related content recommendations use simple tag-based cosine similarity or Jaccard similarity matching rather than complex ML algorithms.

Before/after workflow visualizations can be implemented with either static images or interactive React components like react-compare-slider (shadcn/ui Comparison component) for image comparisons. For workflow diagrams, static Mermaid diagrams in MDX or simple custom React components are preferred over heavy libraries like React Flow for initial implementation.

**Primary recommendation:** Mirror the blog implementation pattern with extended case study metadata schema, reuse next-mdx-remote rendering, implement tag-based related content matching, and start with static workflow visualizations (images or simple CSS) before considering interactive components.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router with dynamic routes | Already installed - official framework for React with built-in routing |
| gray-matter | 4.0.3 | Parse YAML frontmatter from MDX | Already installed - industry standard for frontmatter parsing |
| next-mdx-remote | 5.0.0 | Render MDX at runtime | Already installed - Turbopack-compatible MDX rendering (Phase 6) |
| Zod | 4.3.6 | Validate case study metadata | Already installed - type-safe schema validation |
| date-fns | 4.1.0 | Format dates | Already installed - lightweight date utility |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.563.0 | Icons for UI elements | Already installed - for navigation, CTAs, industry icons |
| reading-time-estimator | 2.1.1 | Calculate read time | Already installed - if case studies have substantial text content |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static MDX (@next/mdx) | next-mdx-remote | Static requires compile-time imports, breaks with Turbopack in Next.js 16 (Phase 6 research) |
| React Flow | Static images or simple CSS | React Flow adds 200KB+ bundle size - overkill for simple before/after workflow visualization |
| Complex ML recommendation | Tag-based similarity | ML adds complexity without value for small dataset (3 case studies currently) |

**Installation:**
```bash
# No new packages needed - reuse existing stack
# All required libraries already installed in Phase 1 and Phase 6
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/
│   ├── posts/          # Blog posts (Phase 6)
│   └── case-studies/   # Case study MDX files (NEW)
├── lib/
│   ├── blog.ts         # Blog utilities (Phase 6)
│   ├── case-studies.ts # Case study utilities (NEW - mirror blog.ts)
│   └── schemas/
│       ├── blog.ts     # Blog schema (Phase 6)
│       └── case-study.ts # Case study schema (NEW)
├── app/
│   ├── case-studies/
│   │   ├── page.tsx              # Listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Detail page
│   └── blog/           # Blog routes (Phase 6 reference)
├── components/
│   ├── case-study/     # Case study-specific components (NEW)
│   │   ├── CaseStudyCard.tsx     # Card for listing page
│   │   ├── MetricsDisplay.tsx    # Quantified results display
│   │   ├── TestimonialBlock.tsx  # Client testimonial with quote
│   │   ├── RelatedCaseStudies.tsx # Related content recommendations
│   │   └── index.ts              # Barrel export
│   └── sections/
│       └── case-studies.tsx      # Homepage showcase (existing)
```

### Pattern 1: MDX Content with Extended Frontmatter
**What:** Reuse blog MDX pattern but with case study-specific metadata
**When to use:** All case study content pages
**Example:**
```yaml
---
title: "Adventure Tours: 85% Faster Response Time"
description: "How Adventure Tours Co automated customer inquiries..."
date: "2026-01-15"
client: "Adventure Tours Co"
industry: "Tour Operator"
metric: "Response Time Reduced"
metricValue: "85%"
testimonial:
  quote: "RomAIx transformed our customer service..."
  author: "Sarah Johnson"
  role: "Operations Manager"
  company: "Adventure Tours Co"
beforeWorkflow: "/images/case-studies/adventure-tours-before.png"
afterWorkflow: "/images/case-studies/adventure-tours-after.png"
results:
  - metric: "Response Time"
    before: "4 hours"
    after: "30 minutes"
    improvement: "85% reduction"
  - metric: "Customer Satisfaction"
    before: "72%"
    after: "94%"
    improvement: "+22 points"
tags: ["Tour Operator", "Customer Service", "Response Automation"]
relatedIndustries: ["Tour Operator", "Travel Agency"]
slug: "adventure-tours-response-automation"
---

## The Challenge

Adventure Tours Co was struggling with...

## The Solution

We implemented...

## The Results

After 3 months...
```

### Pattern 2: Mirror Blog Utility Pattern
**What:** Create src/lib/case-studies.ts mirroring src/lib/blog.ts structure
**When to use:** All case study data fetching operations
**Example:**
```typescript
// Source: Existing codebase src/lib/blog.ts pattern (Phase 6)
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { caseStudySchema, type CaseStudyMetadata } from './schemas/case-study';

const caseStudiesDirectory = path.join(process.cwd(), 'src/content/case-studies');

export interface CaseStudy extends CaseStudyMetadata {
  slug: string;
  content: string;
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesDirectory);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  const caseStudies = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(caseStudiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const metadata = caseStudySchema.parse(data);

    return { slug, content, ...metadata };
  });

  return caseStudies.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  // Same pattern as getPostBySlug from blog.ts
}

export function getRelatedCaseStudies(
  currentSlug: string,
  limit: number = 3
): CaseStudy[] {
  // Tag-based similarity matching (see Pattern 3)
}
```

### Pattern 3: Tag-Based Related Content Matching
**What:** Simple Jaccard similarity for tag-based filtering (no ML needed)
**When to use:** Related case studies recommendation
**Example:**
```typescript
// Source: Medium - Semantic Tag Filtering research
export function getRelatedCaseStudies(
  currentSlug: string,
  limit: number = 3
): CaseStudy[] {
  const allStudies = getAllCaseStudies();
  const current = allStudies.find(s => s.slug === currentSlug);

  if (!current) return [];

  // Jaccard similarity: |A ∩ B| / |A ∪ B|
  const scoredStudies = allStudies
    .filter(s => s.slug !== currentSlug)
    .map(study => {
      const currentTags = new Set(current.tags);
      const studyTags = new Set(study.tags);

      // Add industry as implicit tag for matching
      if (current.industry) currentTags.add(current.industry);
      if (study.industry) studyTags.add(study.industry);

      const intersection = new Set(
        [...currentTags].filter(x => studyTags.has(x))
      );
      const union = new Set([...currentTags, ...studyTags]);

      const similarity = intersection.size / union.size;

      return { study, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return scoredStudies.map(s => s.study);
}
```

### Pattern 4: Dynamic Route with generateStaticParams
**What:** Next.js 15 best practice for known routes at build time
**When to use:** Case study detail pages
**Example:**
```typescript
// Source: Official Next.js docs - Dynamic Routes
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/case-studies';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export const dynamicParams = false; // 404 for unknown slugs

export async function generateMetadata(
  { params }: CaseStudyPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) return {};

  return {
    title: `${study.title} | RomAIx Case Studies`,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // Render case study...
}
```

### Pattern 5: Simple Workflow Visualization with Static Images
**What:** Before/after workflow as static images with CSS comparison layout
**When to use:** Initial implementation (can upgrade to interactive later)
**Example:**
```tsx
// Simple two-column before/after comparison
export function WorkflowComparison({
  beforeImage,
  afterImage
}: {
  beforeImage: string;
  afterImage: string;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8 my-12">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-destructive">
          Before: Manual Process
        </h3>
        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-destructive/20">
          <Image src={beforeImage} alt="Before workflow" fill className="object-contain" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-primary">
          After: Automated with RomAIx
        </h3>
        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary/20">
          <Image src={afterImage} alt="After workflow" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
```

### Pattern 6: Metrics Display with Visual Hierarchy
**What:** Large metric values with before/after comparison
**When to use:** Quantified results section
**Example:**
```tsx
// Source: B2B SaaS case study best practices research
export function MetricsDisplay({ results }: { results: MetricResult[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
      {results.map((result, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{result.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Metric value prominently displayed */}
              <div className="text-5xl font-bold text-primary mb-4">
                {result.improvement}
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Before:</span>
                  <span className="font-medium">{result.before}</span>
                </div>
                <div className="flex justify-between">
                  <span>After:</span>
                  <span className="font-medium text-primary">{result.after}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Don't fetch case studies client-side:** Use Server Components and generateStaticParams for static generation at build time
- **Don't build custom similarity algorithms:** Use simple Jaccard similarity for tag matching - adequate for small datasets
- **Don't add heavy visualization libraries:** Start with static images or CSS - only add react-compare-slider if user interaction is specifically required
- **Don't duplicate data:** Case study data from src/data/case-studies.ts should migrate to MDX frontmatter - single source of truth
- **Don't skip validation:** Always validate frontmatter with Zod schema to catch missing fields at build time

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter parsing | Custom YAML parser | gray-matter (already installed) | Handles YAML, JSON, TOML; battle-tested; installed in Phase 6 |
| MDX rendering | Custom markdown renderer | next-mdx-remote/rsc (already installed) | Turbopack-compatible; handles React components in MDX; proven in Phase 6 |
| Metadata validation | Manual type checking | Zod schemas (already installed) | Type-safe; runtime validation; clear error messages; established in Phase 6 |
| Date formatting | String manipulation | date-fns (already installed) | Handles timezones; consistent formatting; lightweight |
| Tag similarity | Custom scoring algorithm | Jaccard similarity (simple formula) | Well-understood algorithm; no dependencies; adequate for small datasets |
| Interactive image slider | Custom drag implementation | shadcn/ui Comparison component OR react-compare-slider | Keyboard accessible; touch-friendly; handles edge cases |

**Key insight:** Phase 6 established robust MDX infrastructure. Don't reinvent - extend the existing blog pattern with case study-specific metadata. The complexity is in content structure and UX design, not in technical implementation.

## Common Pitfalls

### Pitfall 1: Breaking Existing Homepage CaseStudies Component
**What goes wrong:** Migrating data to MDX breaks src/components/sections/case-studies.tsx which imports from src/data/case-studies.ts
**Why it happens:** Eager refactoring without considering existing dependencies
**How to avoid:** Keep src/data/case-studies.ts as is, or update CaseStudies component to fetch from getAllCaseStudies() utility. Check imports before deleting old data files.
**Warning signs:** Homepage case studies section disappears or errors after MDX migration

### Pitfall 2: Async Params Not Awaited
**What goes wrong:** TypeScript error or runtime error accessing params.slug directly
**Why it happens:** Next.js 15 changed params to Promise type - must await before accessing
**How to avoid:** Always destructure params with await: `const { slug } = await params`
**Warning signs:** "params.slug is undefined" or TypeScript error about Promise<{ slug: string }>

### Pitfall 3: Missing notFound() Call
**What goes wrong:** Page renders with null data or crashes with undefined errors
**Why it happens:** Not handling case where getCaseStudyBySlug returns null
**How to avoid:** Always check if data exists and call notFound() if null (see Pattern 4)
**Warning signs:** White screen or "Cannot read property of null" errors

### Pitfall 4: Metadata Field Name Conflicts
**What goes wrong:** Case study fields clash with blog post fields causing type errors
**Why it happens:** Reusing field names with different meanings (e.g., "author" for case study vs blog post)
**How to avoid:** Design case study schema independently - use "client" not "author", "testimonial" not "quote"
**Warning signs:** TypeScript errors about incompatible types when combining blog and case study utilities

### Pitfall 5: Related Content with Zero Results
**What goes wrong:** "Related Case Studies" section shows nothing, creating empty space
**Why it happens:** No tag overlap, or current case study is the only one
**How to avoid:** Fall back to "latest case studies" if similarity score too low, or hide section if < 2 related items
**Warning signs:** Empty section in UI with heading but no content

### Pitfall 6: Heavy Client Bundle from Workflow Visualizations
**What goes wrong:** Page loads slowly due to large React Flow or similar library
**Why it happens:** Using interactive diagram library when static image would suffice
**How to avoid:** Start with static images. Only add interactive components if user testing shows clear value.
**Warning signs:** Lighthouse performance score drops, "Large JavaScript bundle" warnings

### Pitfall 7: Inconsistent Slug Naming
**What goes wrong:** Links from homepage CaseStudies cards 404 on case study detail pages
**Why it happens:** Slug in src/data/case-studies.ts doesn't match MDX filename
**How to avoid:** Use exact same slug value: if MDX is adventure-tours.mdx, data file slug must be "adventure-tours"
**Warning signs:** Homepage card links to /case-studies/adventure-tours-response-automation but MDX file is adventure-tours.mdx

## Code Examples

Verified patterns from official sources and existing codebase:

### Case Study Schema (Zod)
```typescript
// Pattern from src/lib/schemas/blog.ts (Phase 6)
import { z } from 'zod';

const testimonialSchema = z.object({
  quote: z.string().min(1, 'Testimonial quote is required'),
  author: z.string().min(1, 'Testimonial author is required'),
  role: z.string().min(1, 'Author role is required'),
  company: z.string().min(1, 'Company name is required'),
});

const metricResultSchema = z.object({
  metric: z.string(),
  before: z.string(),
  after: z.string(),
  improvement: z.string(),
});

export const caseStudySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  client: z.string().min(1, 'Client name is required'),
  industry: z.enum(['Tour Operator', 'Travel Agency', 'Boutique Hotels', 'Other']),
  metric: z.string().min(1, 'Primary metric is required'),
  metricValue: z.string().min(1, 'Metric value is required'),
  testimonial: testimonialSchema,
  beforeWorkflow: z.string().optional(), // Path to before image
  afterWorkflow: z.string().optional(),  // Path to after image
  results: z.array(metricResultSchema).min(1, 'At least one result metric required'),
  tags: z.array(z.string()).default([]),
  slug: z.string().min(1, 'Slug is required'),
});

export type CaseStudyMetadata = z.infer<typeof caseStudySchema>;
```

### Case Study Detail Page Component
```typescript
// Pattern from src/app/blog/[slug]/page.tsx (Phase 6)
import { getCaseStudyBySlug, getAllCaseStudies, getRelatedCaseStudies } from '@/lib/case-studies';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { FadeIn } from '@/components/motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MetricsDisplay, TestimonialBlock, WorkflowComparison, RelatedCaseStudies } from '@/components/case-study';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) return {};

  return {
    title: `${study.title} | RomAIx Case Studies`,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = getRelatedCaseStudies(slug, 2);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/case-studies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Case Studies
      </Link>

      <FadeIn>
        <article>
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                {study.industry}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{study.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span>{study.client}</span>
              <span>·</span>
              <time dateTime={study.date}>
                {format(new Date(study.date), 'MMMM yyyy')}
              </time>
            </div>
          </header>

          {/* Hero Metric */}
          <div className="bg-primary/5 rounded-lg p-8 mb-12">
            <div className="text-6xl font-bold text-primary mb-2">
              {study.metricValue}
            </div>
            <div className="text-xl text-muted-foreground">
              {study.metric}
            </div>
          </div>

          {/* Story Content */}
          <div className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto max-w-4xl mb-12">
            <MDXRemote source={study.content} />
          </div>

          {/* Before/After Workflow */}
          {study.beforeWorkflow && study.afterWorkflow && (
            <WorkflowComparison
              beforeImage={study.beforeWorkflow}
              afterImage={study.afterWorkflow}
            />
          )}

          {/* Quantified Results */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">The Results</h2>
            <MetricsDisplay results={study.results} />
          </section>

          {/* Client Testimonial */}
          <TestimonialBlock testimonial={study.testimonial} />

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <RelatedCaseStudies studies={relatedStudies} />
          )}
        </article>
      </FadeIn>
    </div>
  );
}
```

### Case Studies Listing Page with Filtering
```typescript
// Pattern from src/app/blog/page.tsx (Phase 6)
import { getAllCaseStudies } from '@/lib/case-studies';
import { CaseStudyCard } from '@/components/case-study';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

interface CaseStudiesPageProps {
  searchParams: Promise<{ industry?: string }>;
}

export const metadata = {
  title: 'Case Studies | RomAIx',
  description: 'See how we\'ve helped travel businesses save time and increase conversions',
};

export default async function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
  const params = await searchParams;
  const selectedIndustry = params.industry;

  const allStudies = getAllCaseStudies();

  const filteredStudies = selectedIndustry
    ? allStudies.filter((study) => study.industry === selectedIndustry)
    : allStudies;

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Case Studies</h1>
          <p className="text-lg text-muted-foreground">
            Real results from real travel businesses
          </p>
        </header>
      </FadeIn>

      {/* Industry filter UI */}
      <IndustryFilter selectedIndustry={selectedIndustry} />

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudies.map((study, index) => (
          <StaggerItem key={study.slug} delay={index * 0.1}>
            <CaseStudyCard study={study} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static case study data in JSON/TS | MDX with frontmatter | 2024-2025 | Content team can edit case studies without touching code; supports rich formatting |
| Client-side rendering | generateStaticParams + SSG | Next.js 13+ (2023) | Better SEO, faster page loads, prerendered HTML for all case studies |
| Complex ML recommendations | Tag-based similarity (Jaccard) | Ongoing trend | Simple algorithm adequate for small datasets; no training data required |
| params as object | params as Promise | Next.js 15 (2024) | Better streaming support; must await params before accessing |
| Dynamic imports for MDX | next-mdx-remote/rsc | Next.js 16 + Turbopack (2025) | Turbopack-compatible; runtime rendering without build-time import issues |

**Deprecated/outdated:**
- **@next/mdx with compile-time imports**: Breaks with Turbopack in Next.js 16 - use next-mdx-remote/rsc instead (established in Phase 6)
- **metadata object without generateMetadata**: Static metadata can't access dynamic route params - use async generateMetadata function
- **Synchronous params access**: Next.js 15 made params a Promise - always await before destructuring

## Open Questions

Things that couldn't be fully resolved:

1. **Interactive vs Static Workflow Visualization**
   - What we know: Both react-compare-slider and static images are viable; shadcn/ui has Comparison component
   - What's unclear: User preference for interactive slider vs simple side-by-side images
   - Recommendation: Start with static images (Pattern 5), add interactive slider in future enhancement if user requests it

2. **Industry Filter Implementation**
   - What we know: Blog uses category filter with URL params pattern (Phase 6)
   - What's unclear: Whether industry filter needs same pattern or simpler approach (only 4 industries vs many blog categories)
   - Recommendation: Mirror blog's CategoryFilter pattern for consistency unless only 3-4 total case studies exist

3. **Case Study Data Migration Strategy**
   - What we know: src/data/case-studies.ts exists with 3 case studies; homepage CaseStudies component imports it
   - What's unclear: Whether to migrate data immediately or keep dual system temporarily
   - Recommendation: Keep src/data/case-studies.ts for homepage, gradually migrate to MDX, then update homepage component to use getAllCaseStudies() once MDX files are verified

## Sources

### Primary (HIGH confidence)
- Next.js Official Docs - Dynamic Routes: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
- Next.js Official Docs - generateMetadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Existing codebase: src/lib/blog.ts (Phase 6 verified pattern)
- Existing codebase: src/app/blog/[slug]/page.tsx (Phase 6 verified pattern)
- Existing codebase: src/lib/schemas/blog.ts (Zod schema pattern)

### Secondary (MEDIUM confidence)
- TheLinuxCode - Next.js 15 Dynamic Routes 2026 Guide: https://thelinuxcode.com/nextjs-dynamic-route-segments-in-the-app-router-2026-guide/
- Dev and Deliver - Next.js 15 Error Handling: https://devanddeliver.com/blog/frontend/next-js-15-error-handling-best-practices-for-code-and-routes
- Proofmap - B2B SaaS Case Study Examples 2025: https://proofmap.com/b2b-case-studies-examples-from-the-top-58-growing-saas-companies-in-2025/
- Webstacks - 14 Best B2B Case Study Examples: https://www.webstacks.com/blog/b2b-case-study
- Contensify - How to Write B2B SaaS Case Study 2026: https://contensifyhq.com/blog/how-to-write-a-b2b-saas-case-study/
- Croct Blog - Best React Before/After Image Comparison Slider Libraries: https://blog.croct.com/post/best-react-before-after-image-comparison-slider-libraries
- shadcn/ui - Comparison Component: https://www.shadcn.io/components/visualization/comparison
- React Flow Official Site: https://reactflow.dev
- Medium - Semantic Tag Filtering: https://medium.com/data-science/introducing-semantic-tag-filtering-enhancing-retrieval-with-tag-similarity-4f1b2d377a10
- Google Developers - Content-Based Filtering: https://developers.google.com/machine-learning/recommendation/content-based/basics

### Tertiary (LOW confidence)
- WebSearch results on case study design best practices (multiple sources, not directly verified)
- Community discussions on MDX frontmatter organization (no single authoritative source)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and verified in Phase 6; official Next.js docs confirm patterns
- Architecture: HIGH - Mirroring proven Phase 6 blog implementation with established patterns in codebase
- Pitfalls: HIGH - Based on Next.js 15 official docs, Phase 6 implementation experience, and verified async params requirement

**Research date:** 2026-01-30
**Valid until:** 2026-02-28 (30 days - stable ecosystem, established patterns unlikely to change)
