---
phase: 08-seo-performance-deployment
plan: 03
subsystem: analytics-tooling
tags: [plausible, analytics, bundle-analyzer, performance, privacy]
dependency-graph:
  requires: [08-01]
  provides: [analytics-integration, bundle-analysis-tooling]
  affects: [deployment, performance-monitoring]
tech-stack:
  added: [next-plausible@3.12.5, @next/bundle-analyzer@16.1.6]
  patterns: [withPlausibleProxy, withBundleAnalyzer]
key-files:
  created: []
  modified: [next.config.mjs, package.json, src/app/layout.tsx]
decisions:
  - id: turbopack-analyzer
    choice: "Dual analyzer scripts (Turbopack + Webpack)"
    reason: "Next.js 16 Turbopack requires experimental-analyze; webpack mode for detailed HTML reports"
metrics:
  duration: 7.5 min
  completed: 2026-01-30
---

# Phase 8 Plan 03: Analytics & Bundle Analyzer Summary

**One-liner:** Plausible analytics with ad-blocker bypass proxy + dual bundle analyzer (Turbopack/Webpack) for performance verification

## What Was Done

### Task 1: Install dependencies and configure next.config.mjs
- Installed `next-plausible` for privacy-focused analytics
- Installed `@next/bundle-analyzer` as dev dependency for bundle size analysis
- Updated `next.config.mjs` with chained config wrappers:
  - `withPlausibleProxy()` - proxies analytics script through site domain
  - `withBundleAnalyzer` - enabled via `ANALYZE=true` environment variable
- Added npm scripts:
  - `analyze` - Turbopack experimental analyzer (quick, interactive)
  - `analyze:webpack` - Webpack mode with detailed HTML reports in `.next/analyze/`

### Task 2: Add PlausibleProvider to root layout
- Imported `PlausibleProvider` from `next-plausible`
- Wrapped body content with `<PlausibleProvider domain="romaix.ai">`
- Analytics script loads from `/js/script.js` (proxied path)
- Events sent to `/proxy/api/event` (first-party requests)

## Key Artifacts

| File | Purpose |
|------|---------|
| `next.config.mjs` | Chained config: withBundleAnalyzer(withPlausibleProxy()(withMDX(nextConfig))) |
| `package.json` | Added analyze scripts and dependencies |
| `src/app/layout.tsx` | PlausibleProvider wrapper for analytics |

## Technical Details

### Plausible Proxy Configuration
The `withPlausibleProxy` wrapper creates:
- `/js/script.js` - proxies Plausible's tracking script
- `/proxy/api/event` - proxies analytics event endpoint

This makes analytics requests appear as first-party traffic, bypassing most ad blockers.

### Bundle Analyzer Options
```bash
npm run analyze         # Turbopack analyzer at http://localhost:4000
npm run analyze:webpack # Webpack HTML reports in .next/analyze/
```

## Deviations from Plan

### Adaptation: Dual Analyzer Scripts
**Reason:** Next.js 16 with Turbopack doesn't support traditional @next/bundle-analyzer
**Change:** Added two scripts:
- `analyze` uses `next experimental-analyze` for Turbopack
- `analyze:webpack` uses `--webpack` flag for detailed HTML reports
**Impact:** Better tooling - quick analysis with Turbopack, detailed reports with Webpack

## Verification Results

- [x] next-plausible and @next/bundle-analyzer in dependencies
- [x] `npm run build` completes without errors
- [x] `npm run analyze:webpack` generates HTML reports in `.next/analyze/`
- [x] Production build includes proxied Plausible script at `/js/script.js`
- [x] PlausibleProvider wrapping app content in root layout

## Commits

| Hash | Message |
|------|---------|
| 2377bb1 | chore(08-03): add Plausible analytics proxy and bundle analyzer |
| b61ac2e | feat(08-03): add PlausibleProvider to root layout |

## Next Phase Readiness

**What's available:**
- Privacy-focused analytics ready for production
- Ad-blocker bypass through proxied analytics
- Bundle analysis tooling for performance verification

**For 08-04 (Image Optimization):**
- Can now verify bundle size impact of image optimizations
- Analytics will track user engagement to measure optimization effectiveness
