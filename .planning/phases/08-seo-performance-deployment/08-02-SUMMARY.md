---
phase: 08-seo-performance-deployment
plan: 02
subsystem: seo
tags: [opengraph, og-image, social-sharing, next-og, satori, metadata]

# Dependency graph
requires:
  - phase: 08-seo-performance-deployment/01
    provides: "metadataBase, title template, SITE_URL constant"
  - phase: 06-blog-implementation
    provides: "getPostBySlug, getAllPosts utilities"
  - phase: 07-case-studies-detail-pages
    provides: "getCaseStudyBySlug, getAllCaseStudies utilities"
provides:
  - "OpenGraph article metadata for blog posts and case studies"
  - "Dynamic OG image generation for blog posts"
  - "Dynamic OG image generation for case studies"
  - "Default branded OG image for homepage and static pages"
affects: [deployment, social-sharing, link-previews]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ImageResponse from next/og for OG image generation"
    - "Satori CSS-in-JS with explicit display:flex on all containers"
    - "generateStaticParams for dynamic OG image routes"
    - "Bare title values with layout template inheritance"

key-files:
  created:
    - src/app/opengraph-image.tsx
    - src/app/blog/[slug]/opengraph-image.tsx
    - src/app/case-studies/[slug]/opengraph-image.tsx
  modified:
    - src/app/blog/[slug]/page.tsx
    - src/app/case-studies/[slug]/page.tsx

key-decisions:
  - "Bare titles in generateMetadata: Let root layout template apply automatically"
  - "Satori display:flex pattern: All container divs need explicit display for ImageResponse"
  - "Brand gradient in OG images: #587C74 to #3d5752 for consistent branding"
  - "generateStaticParams in OG files: Required for dynamicParams=false compatibility"

patterns-established:
  - "OG image file convention: opengraph-image.tsx in route directory"
  - "OG image sizing: 1200x630 PNG for all social platforms"
  - "Dynamic OG exports: size, contentType, generateStaticParams, generateMetadata, default"

# Metrics
duration: 6min
completed: 2026-01-30
---

# Phase 08-02: OpenGraph Metadata & Dynamic Images Summary

**Full OpenGraph metadata for blog/case study articles with dynamically generated branded preview images using next/og ImageResponse**

## Performance

- **Duration:** 6 min
- **Started:** 2026-01-30T13:52:21Z
- **Completed:** 2026-01-30T13:58:00Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Blog posts have complete OpenGraph metadata with article type, published time, and author
- Case studies have complete OpenGraph metadata with article type and published time
- Default OG image generates branded preview with RomAIx name and tagline
- Dynamic blog OG images show post title, category badge, and read time
- Dynamic case study OG images show hero metric value, metric name, title, and client
- All OG images are 1200x630 PNG format optimized for social platforms

## Task Commits

Each task was committed atomically:

1. **Task 1: Enhance dynamic route metadata with full OpenGraph** - `f6ccc91` (feat)
2. **Task 2: Create OpenGraph image generators** - `3f78568` (feat)

## Files Created/Modified
- `src/app/blog/[slug]/page.tsx` - Added OpenGraph article metadata with publishedTime and authors
- `src/app/case-studies/[slug]/page.tsx` - Added OpenGraph article metadata with publishedTime
- `src/app/opengraph-image.tsx` - Default branded OG image for homepage and static pages
- `src/app/blog/[slug]/opengraph-image.tsx` - Dynamic OG images per blog post with title and category
- `src/app/case-studies/[slug]/opengraph-image.tsx` - Dynamic OG images per case study with metric and title

## Decisions Made
- **Bare titles for template compatibility:** Removed manual `| RomAIx Blog` suffix from generateMetadata, letting root layout's title.template apply automatically for consistency
- **Satori CSS-in-JS display:flex requirement:** All container divs in ImageResponse must have explicit `display: 'flex'` to avoid rendering errors
- **Brand gradient for OG images:** Used linear-gradient from #587C74 to #3d5752 matching site branding
- **generateStaticParams in OG image files:** Required for routes with dynamicParams=false to ensure OG images generate for all valid slugs
- **generateMetadata for dynamic alt text:** Export generateMetadata returning {alt: title} for accessibility

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Satori display:flex requirement**
- **Found during:** Task 2 (OpenGraph image generators)
- **Issue:** ImageResponse rendering failed with "Expected <div> to have explicit display: flex or display: none if it has more than one child node"
- **Fix:** Added `display: 'flex'` to all container div style objects in OG image components
- **Files modified:** src/app/blog/[slug]/opengraph-image.tsx, src/app/case-studies/[slug]/opengraph-image.tsx
- **Verification:** All OG images render as valid 1200x630 PNG files
- **Committed in:** 3f78568 (Task 2 commit)

**2. [Rule 3 - Blocking] generateStaticParams required for dynamic OG images**
- **Found during:** Task 2 (OpenGraph image generators)
- **Issue:** Dynamic OG image routes returned 404 because page.tsx has dynamicParams=false
- **Fix:** Added generateStaticParams export to OG image files mirroring the page.tsx pattern
- **Files modified:** src/app/blog/[slug]/opengraph-image.tsx, src/app/case-studies/[slug]/opengraph-image.tsx
- **Verification:** OG image routes resolve and generate images for all posts/studies
- **Committed in:** 3f78568 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes essential for OG image functionality with Next.js App Router. No scope creep.

## Issues Encountered
- Initial 404 on dynamic OG image routes due to dynamicParams=false inheritance - resolved by adding generateStaticParams
- Satori CSS rendering errors - resolved by understanding Satori's flexbox requirement for multi-child containers

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All OpenGraph metadata complete for social sharing optimization
- Ready for 08-03 (Performance Optimization) and 08-04 (Deployment)
- OG images will generate at build time for production deployment

---
*Phase: 08-seo-performance-deployment*
*Completed: 2026-01-30*
