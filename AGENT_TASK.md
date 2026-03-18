# Agent Task: T3 + T4 + T5

Working repo: /root/.openclaw/workspace-mc-4fb802a9-65f4-4822-8d5a-24884e533722/repo
(Next.js 16, App Router, src/ layout, Tailwind, shadcn/ui, TypeScript)

Execute all three tasks in order. Commit after each.

---

## CONFIRMED FACTS (already verified)

Ghost API is live:
- URL: http://187.124.168.142:2368
- Content API key: 3cff02bcf6fc380d3adbf6b915
- 4 real posts + 1 "coming-soon" default → filter out slug "coming-soon"
- Real slugs: what-is-ai-booking-agent, best-ai-chatbot-platforms-ski-schools, voiceflow-vs-botpress-tour-operators, how-to-automate-lead-capture-tour-company
- API: GET /ghost/api/content/posts/?key=KEY&limit=all&include=tags,authors
- No @tryghost/content-api in package.json — use native fetch()

Current state:
- src/lib/blog.ts: fs-based MDX reader (keep it — case-studies uses similar pattern)
- src/app/blog/page.tsx: imports from @/lib/blog, uses getAllPosts(), getAllCategories()
- src/app/blog/[slug]/page.tsx: imports from @/lib/blog, uses MDXRemote, dynamicParams=false
- src/components/sections/blog-preview.tsx: imports getAllPosts from @/lib/blog
- src/app/sitemap.ts: calls getAllPosts() from @/lib/blog, getAllCaseStudies() from @/lib/case-studies
- src/app/layout.tsx: uses PlausibleProvider from next-plausible
- package.json: has next-plausible, does NOT have @next/third-parties

Existing blog components (keep interfaces, adapt props):
- BlogCard: expects { slug, title, description, date, category, readTime, image }
- BlogGrid: expects posts: BlogPost[]  — we'll pass mapped objects
- CategoryFilter: client component with useSearchParams

---

## TASK 1 — T3: Replace MDX blog with Ghost Content API

### 1. Create src/lib/ghost.ts

```typescript
const GHOST_URL = process.env.GHOST_URL || "http://187.124.168.142:2368";
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY || "3cff02bcf6fc380d3adbf6b915";

export type GhostTag = { id: string; name: string; slug: string };
export type GhostAuthor = { id: string; name: string; slug: string; profile_image: string | null };

export type GhostPost = {
  id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  primary_tag: GhostTag | null;
  tags: GhostTag[];
  authors: GhostAuthor[];
};

async function ghostFetch(endpoint: string): Promise<Response> {
  const url = `${GHOST_URL}/ghost/api/content/${endpoint}&key=${GHOST_KEY}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Ghost API error: ${res.status}`);
  return res;
}

export async function getAllPosts(): Promise<GhostPost[]> {
  const res = await ghostFetch("posts/?limit=all&include=tags,authors&filter=visibility:public");
  const data = await res.json();
  const posts: GhostPost[] = data.posts ?? [];
  return posts.filter((p) => p.slug !== "coming-soon");
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const res = await ghostFetch(`posts/slug/${slug}/?include=tags,authors`);
    const data = await res.json();
    return data.posts?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
```

### 2. Rewrite src/app/blog/page.tsx

- Import getAllPosts from @/lib/ghost (not @/lib/blog)
- Add: export const revalidate = 60
- Map GhostPost to BlogCard props:
  - description = post.excerpt
  - date = post.published_at
  - category = post.primary_tag?.name ?? "General"
  - readTime = post.reading_time || 1
  - image = post.feature_image ?? "/blog-placeholder.jpg"
- Derive categories: [...new Set(posts.map(p => p.primary_tag?.name ?? "General"))]
- Keep CategoryFilter, BlogGrid, FadeIn usage
- Keep searchParams category filtering logic but source categories from Ghost posts
- Add export const metadata with title "Blog | RomAIx"

Key: BlogGrid expects posts with a shape matching BlogCard props. Create a mapped array:
```typescript
const mappedPosts = allPosts.map(p => ({
  slug: p.slug,
  title: p.title,
  description: p.excerpt,
  date: p.published_at,
  category: p.primary_tag?.name ?? "General",
  readTime: p.reading_time || 1,
  image: p.feature_image ?? "/blog-placeholder.jpg",
}));
```
Pass mappedPosts to BlogGrid (BlogGrid accepts BlogPost[] — the mapped shape matches).

### 3. Rewrite src/app/blog/[slug]/page.tsx

- Import getPostBySlug, getAllPostSlugs from @/lib/ghost
- export const revalidate = 60
- export const dynamicParams = true (remove the false one)
- generateStaticParams: async, calls getAllPostSlugs()
- generateMetadata: uses GhostPost fields (title, excerpt→description, feature_image→OG image, published_at)
- Remove: import { MDXRemote } from 'next-mdx-remote/rsc'
- Render content: <div className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto max-w-4xl" dangerouslySetInnerHTML={{ __html: post.html }} />
- Tags: use post.tags array (GhostTag[]), display tag.name
- Author: post.authors?.[0]?.name ?? "RomAIx Team"
- Date: format(new Date(post.published_at), 'MMMM d, yyyy')
- Feature image: guard with {post.feature_image && <Image src={post.feature_image} ... />}
- Keep back link, FadeIn, ArrowLeft, existing layout structure

### 4. Update src/components/sections/blog-preview.tsx

- Make async server component
- Import getAllPosts from @/lib/ghost
- Map GhostPost → BlogCard props same as blog/page.tsx
- Keep "no posts" early return

### 5. Create .env.local (if missing):
```
GHOST_URL=http://187.124.168.142:2368
GHOST_CONTENT_API_KEY=3cff02bcf6fc380d3adbf6b915
NEXT_PUBLIC_GA_ID=
```

Commit: "feat(T3): replace MDX blog with Ghost Content API"

---

## TASK 2 — T4: SEO — sitemap, JSON-LD, generateMetadata

### 1. Update src/app/sitemap.ts

Replace `import { getAllPosts } from '@/lib/blog'` with `import { getAllPosts } from '@/lib/ghost'`
Use post.published_at for lastModified.
Function stays async (Ghost fetch is async).
Keep getAllCaseStudies unchanged.

### 2. Create src/components/seo/JsonLd.tsx

```tsx
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```
(No "use client" — server component)

### 3. Create src/lib/structured-data.ts

```typescript
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { GhostPost } from "@/lib/ghost";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    sameAs: ["https://twitter.com/romaix_ai", "https://linkedin.com/company/romaix"],
    description: "Custom AI solutions for tour operators, travel agencies, and boutique hotels.",
    knowsAbout: ["AI automation for travel", "chatbot for tour operators", "AI booking agent for hotels", "WhatsApp automation"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function blogPostingSchema(post: GhostPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.feature_image ?? undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    author: post.authors?.[0]
      ? { "@type": "Person", name: post.authors[0].name }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    keywords: post.tags?.map((t) => t.name).join(", "),
  };
}
```

### 4. Update src/app/layout.tsx — add JSON-LD in <head>

Add these imports:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
```

Add inside <head> tag (add explicit <head> if not present):
```tsx
<head>
  <JsonLd schema={organizationSchema()} />
  <JsonLd schema={websiteSchema()} />
</head>
```

### 5. Update src/app/blog/[slug]/page.tsx — add BlogPosting JSON-LD

Add imports:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostingSchema } from "@/lib/structured-data";
```

Add before <article> (inside the return, wrapped in a Fragment or div):
```tsx
<>
  <JsonLd schema={blogPostingSchema(post)} />
  <div className="container...">
    ...existing content...
  </div>
</>
```

### 6. Check/add generateMetadata on key pages

For each of these, check if metadata is exported. If not, add a minimal one:
- src/app/page.tsx → add if missing
- src/app/about/page.tsx → add if missing
- src/app/contact/page.tsx → add if missing

Do NOT overwrite existing metadata exports.

Commit: "feat(T4): Ghost slugs in sitemap, Organization+BlogPosting JSON-LD, generateMetadata audit"

---

## TASK 3 — T5: Replace Plausible with GA4

### 1. Run package changes:
```bash
npm uninstall next-plausible
npm install @next/third-parties
```

### 2. Update src/app/layout.tsx:
- REMOVE: `import PlausibleProvider from 'next-plausible'`
- REMOVE: `<PlausibleProvider domain="romaix.ai">` and its closing tag
- ADD: `import { GoogleAnalytics } from '@next/third-parties/google'`
- ADD: `import { AnalyticsProviderWrapper } from '@/components/analytics/AnalyticsProviderWrapper'`
- ADD at top of RootLayout function: `const gaId = process.env.NEXT_PUBLIC_GA_ID;`
- ADD before </body>: `{gaId && <GoogleAnalytics gaId={gaId} />}` and `{gaId && <AnalyticsProviderWrapper />}`
- Keep Header, Footer, Toaster, JSON-LD exactly as-is

### 3. Create src/components/analytics/AnalyticsProvider.tsx:
```tsx
"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    if (!gaId || typeof window === "undefined" || typeof window.gtag !== "function") return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window.gtag("config", gaId, { page_path: url });
  }, [pathname, searchParams, gaId]);

  return null;
}
```

### 4. Create src/components/analytics/AnalyticsProviderWrapper.tsx:
```tsx
"use client";
import { Suspense } from "react";
import { AnalyticsProvider } from "./AnalyticsProvider";

export function AnalyticsProviderWrapper() {
  return <Suspense fallback={null}><AnalyticsProvider /></Suspense>;
}
```

### 5. Create src/lib/analytics.ts:
```typescript
declare global {
  interface Window { gtag: (...args: unknown[]) => void; }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(...args);
}

export function trackCtaClick(label: string, destination?: string) {
  gtag("event", "cta_click", { event_category: "engagement", event_label: label, destination: destination ?? "" });
}

export function trackFormSubmit(formId: string) {
  gtag("event", "form_submit", { event_category: "conversion", event_label: formId });
  gtag("event", "generate_lead", { currency: "USD", value: 0, form_id: formId });
}
```

Commit: "feat(T5): replace next-plausible with GA4, add AnalyticsProvider for SPA route tracking"

---

## FINAL: Build check

Run: npm run build

If it fails, diagnose and fix. Common issues:
- BlogCard image prop null → use fallback "/blog-placeholder.jpg"
- BlogGrid expects BlogPost type → mapped object shape should match; if type error, create a local type alias or cast
- MDXRemote still imported somewhere → remove
- Missing imports in layout.tsx
- window.gtag type → add declare global in analytics.ts

Fix all errors and rebuild until it passes.

After successful build, run:
openclaw system event --text "Done: T3+T4+T5 on romaix-website-build. Ghost blog live (4 posts), JSON-LD wired, GA4 replacing Plausible. Build passed." --mode now
