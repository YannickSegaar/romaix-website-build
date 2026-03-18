# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RomAIx is a marketing website for an AI automation company targeting the travel industry (tour operators, travel agencies, boutique hotels). Built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

## Commands

```bash
npm run dev          # Start dev server (Turbopack) — http://localhost:3000
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint (flat config, Next.js rules)
npm run analyze      # Bundle analysis (Turbopack)
npm run analyze:webpack  # Bundle analysis (Webpack)
```

**Demo page**: Visit `http://localhost:3000/demo` to preview hero variants (V2 gradient mesh, V3 morphing backgrounds), service visualizations (floating cards, interactive tabs, carousel, bento grid), the workflow diagram, and iPhone mockups.

## Architecture

### Rendering Strategy

Section components are **React Server Components** by default. Client interactivity is isolated into small `'use client'` wrapper components (animation wrappers, forms, interactive widgets). This keeps the JS bundle minimal.

### Animation Pattern

All Framer Motion animations use **enter-only** with `whileInView` and `viewport={{ once: true }}`. Animation wrapper components live in `src/components/motion/`. Parent sections stay as RSC — only the motion wrappers are client components.

### Content System

Blog posts and case studies are **MDX files** in `/content/posts/` and `/content/case-studies/` with gray-matter frontmatter. Rendered via `next-mdx-remote/rsc` (chosen for Turbopack compatibility). Zod schemas in `src/lib/schemas/` validate metadata.

### Form Pipeline

Forms use **React Hook Form + Zod** on client, submitted via **Server Actions** in `src/app/actions/`. Each submission sends dual emails via **Resend**: one notification to business, one confirmation to user. Spam protection uses a honeypot field.

### Color System

Uses **OKLCH color space** (defined in `src/app/globals.css`) for proper opacity modifiers. Brand primary is sage/teal (#587C74). shadcn/ui components use New York style.

### Workflow Diagram

`src/components/workflow/` implements an Attio-style animated workflow using `@xyflow/react` (React Flow). Custom nodes have conic gradient border sweeps, custom edges have progressive fill animations. Animation sequencing is in `hooks/use-workflow-animation.ts`.

## Key Paths

- `src/app/page.tsx` — Homepage (composes all sections)
- `src/app/demo/page.tsx` — Design demo page (all visual variants)
- `src/components/sections/` — Homepage sections
- `src/components/services/` — Service visualization variants
- `src/components/mockups/` — iPhone mockup components
- `src/components/workflow/` — React Flow workflow diagram
- `src/components/forms/` — Form components (client)
- `src/app/actions/` — Server Actions for form submission
- `src/lib/` — Utilities (cn(), email, blog/case-study helpers)
- `src/data/` — Static content data (FAQ, solutions, steps)
- `/content/` — MDX content files

## Environment Variables

```
RESEND_API_KEY        # Required for email (Resend)
NOTIFICATION_EMAIL    # Business email for lead notifications
NEXT_PUBLIC_SITE_URL  # Production URL (defaults via src/lib/constants.ts)
```

## Conventions

- Path alias: `@/` maps to `src/`
- Barrel exports via `index.ts` in component directories
- Tailwind CSS v4 with `@plugin` syntax in globals.css
- Analytics: Plausible proxied through Next.js rewrites for ad-blocker bypass
- Deployment target: Vercel
