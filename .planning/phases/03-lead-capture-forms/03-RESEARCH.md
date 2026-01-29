# Phase 03: Lead Capture & Forms - Research

**Researched:** 2026-01-29
**Domain:** Next.js 15 form handling with Server Actions, validation, and email notifications
**Confidence:** HIGH

## Summary

This research covers the standard stack and patterns for building production-ready forms in Next.js 15 with Server Actions. The ecosystem has converged on a clear best-practice stack: React Hook Form with Zod validation on the client, Server Actions for mutations, and Resend with React Email for transactional emails.

The key architectural insight is that modern Next.js forms use a hybrid validation approach - Zod schemas are shared between client and server, providing instant feedback while maintaining security. Server Actions are treated as public API endpoints requiring rate limiting, bot protection, and proper error handling despite their abstraction layer.

For this phase, the standard pattern involves: (1) shadcn/ui Field components with React Hook Form for client-side state and validation, (2) Server Actions with shared Zod schemas for server-side processing, (3) Resend API with React Email templates for notifications, and (4) multi-layered spam protection including honeypots, rate limiting, and optional reCAPTCHA.

**Primary recommendation:** Use shadcn/ui Field component + React Hook Form + Zod resolver for forms, Next.js Server Actions for submission handling, and Resend with React Email templates for notifications. Implement rate limiting with IP-based tracking for anonymous forms.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React Hook Form | 7.x | Client-side form state management | Industry standard, minimal re-renders, excellent TypeScript support |
| Zod | 3.x | Schema validation | TypeScript-first, works client and server, integrates with RHF via resolver |
| @hookform/resolvers | 3.x | Validation library bridge | Official adapter connecting React Hook Form to Zod |
| Resend | 4.x | Transactional email API | Modern developer experience, React Email integration, reliable delivery |
| React Email | 3.x+ | Email template components | React components for emails, Resend integration, visual editor support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui Form/Field | latest | Pre-built form UI components | When using shadcn/ui design system (already in project) |
| Sonner | 1.x | Toast notifications | Success/error feedback after form submission |
| next-safe-action | 7.x | Type-safe Server Actions | Optional - adds runtime validation and type safety for Server Actions |
| Upstash Rate Limit | latest | Rate limiting | Protect Server Actions from abuse (requires Redis) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Resend | SendGrid, Mailgun, Postmark | Resend has better DX and React Email integration; others are more enterprise-focused |
| React Hook Form | Formik, TanStack Form | RHF has better performance and smaller bundle; others have different API styles |
| Zod | Yup, Joi | Zod is TypeScript-native with better inference; others predate TS-first design |
| Calendly | Cal.com (self-hosted) | Calendly is simpler embed; Cal.com offers open-source customization |

**Installation:**
```bash
# Core form handling
npm install react-hook-form zod @hookform/resolvers

# shadcn/ui form components (if not already added)
npx shadcn@latest add form

# Email sending
npm install resend react-email

# Toast notifications
npx shadcn@latest add sonner

# Optional: Calendar integration (embed only, no npm package needed)
# Calendly: Use inline embed script
# Cal.com: Use inline embed script
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── actions/              # Server Actions (form handlers)
│   │   ├── contact.ts        # Contact form submission
│   │   ├── assessment.ts     # Free assessment request
│   │   └── demo.ts           # Demo booking
│   └── api/
│       └── send/
│           └── route.ts      # Alternative: API route for email (if not using Server Actions)
├── components/
│   ├── forms/                # Form components
│   │   ├── contact-form.tsx
│   │   ├── assessment-form.tsx
│   │   └── demo-form.tsx
│   └── emails/               # Email templates
│       ├── contact-notification.tsx
│       ├── contact-confirmation.tsx
│       └── assessment-notification.tsx
├── lib/
│   ├── schemas/              # Zod validation schemas
│   │   ├── contact.ts
│   │   ├── assessment.ts
│   │   └── demo.ts
│   ├── email.ts              # Resend client configuration
│   └── rate-limit.ts         # Rate limiting utilities
└── .env.local                # Environment variables (RESEND_API_KEY)
```

### Pattern 1: Hybrid Client-Server Validation
**What:** Define Zod schema once, use on both client (React Hook Form) and server (Server Action)
**When to use:** All production forms requiring validation
**Example:**
```typescript
// Source: Next.js official docs + community patterns
// lib/schemas/contact.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>

// components/forms/contact-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact'
import { submitContactForm } from '@/app/actions/contact'
import { useActionState } from 'react'
import { toast } from 'sonner'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitContactForm(data)

    if (result.success) {
      toast.success('Message sent! We\'ll be in touch soon.')
      reset()
    } else {
      toast.error(result.error || 'Failed to send message')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('name')} placeholder="Name" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <input {...register('email')} type="email" placeholder="Email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register('phone')} placeholder="Phone (optional)" />
      </div>
      <div>
        <textarea {...register('message')} placeholder="Message" />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

// app/actions/contact.ts
'use server'

import { contactSchema } from '@/lib/schemas/contact'
import { sendContactNotification } from '@/lib/email'
import { headers } from 'next/headers'

export async function submitContactForm(data: unknown) {
  // Server-side validation (same schema)
  const parsed = contactSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Invalid form data',
      fieldErrors: parsed.error.flatten().fieldErrors
    }
  }

  // Rate limiting (IP-based for anonymous forms)
  const headersList = await headers()
  const ip = (headersList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  // TODO: Implement rate limiting check here
  // const { success } = await rateLimit.limit(`contact:${ip}`)
  // if (!success) return { success: false, error: 'Too many requests' }

  try {
    // Send email notification
    await sendContactNotification(parsed.data)

    // Store in database (if applicable)
    // await db.insert(leads).values(parsed.data)

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, error: 'Failed to process submission' }
  }
}
```

### Pattern 2: Server Action with useActionState (Alternative)
**What:** Use React's useActionState hook for Server Action state management
**When to use:** When you want the Server Action to directly manage form state without client-side validation
**Example:**
```typescript
// Source: Next.js official forms guide
// app/actions/contact-with-state.ts
'use server'

import { z } from 'zod'
import { contactSchema } from '@/lib/schemas/contact'

export type FormState = {
  message: string
  errors?: Record<string, string[]>
  success?: boolean
}

export async function submitContactWithState(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  }

  const parsed = contactSchema.safeParse(data)

  if (!parsed.success) {
    return {
      message: 'Validation failed',
      errors: parsed.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    // Send email
    await sendContactNotification(parsed.data)
    return { message: 'Message sent successfully!', success: true }
  } catch (error) {
    return { message: 'Failed to send message', success: false }
  }
}

// components/forms/contact-form-with-state.tsx
'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContactWithState } from '@/app/actions/contact-with-state'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  )
}

export function ContactFormWithState() {
  const [state, formAction] = useActionState(submitContactWithState, {
    message: '',
  })

  return (
    <form action={formAction} className="space-y-4">
      <input name="name" placeholder="Name" required />
      {state.errors?.name && (
        <p className="text-red-500">{state.errors.name[0]}</p>
      )}

      <input name="email" type="email" placeholder="Email" required />
      {state.errors?.email && (
        <p className="text-red-500">{state.errors.email[0]}</p>
      )}

      <textarea name="message" placeholder="Message" required />
      {state.errors?.message && (
        <p className="text-red-500">{state.errors.message[0]}</p>
      )}

      <SubmitButton />

      {state.message && (
        <p className={state.success ? 'text-green-500' : 'text-red-500'}>
          {state.message}
        </p>
      )}
    </form>
  )
}
```

### Pattern 3: Resend Email Notifications
**What:** Send transactional emails using Resend API with React Email templates
**When to use:** All form submissions that require email notifications
**Example:**
```typescript
// Source: Resend official docs
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactNotification(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  try {
    // Send to business
    await resend.emails.send({
      from: 'RomAIx <noreply@romaix.com>',
      to: ['leads@romaix.com'],
      subject: 'New Contact Form Submission',
      react: ContactNotificationEmail(data),
    })

    // Send confirmation to user
    await resend.emails.send({
      from: 'RomAIx <noreply@romaix.com>',
      to: [data.email],
      subject: 'Thanks for contacting RomAIx',
      react: ContactConfirmationEmail({ name: data.name }),
    })
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

// components/emails/contact-notification.tsx
import { Html, Head, Body, Container, Text, Section } from '@react-email/components'

export function ContactNotificationEmail({
  name,
  email,
  phone,
  message,
}: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif' }}>
        <Container>
          <Section>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
              New Contact Form Submission
            </Text>
            <Text><strong>Name:</strong> {name}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            {phone && <Text><strong>Phone:</strong> {phone}</Text>}
            <Text><strong>Message:</strong></Text>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

### Pattern 4: Calendar Integration (Calendly/Cal.com)
**What:** Embed third-party scheduling widgets for demo booking
**When to use:** When demo booking requires calendar availability checking
**Example:**
```typescript
// Source: Calendly integration guides
// components/forms/demo-booking.tsx
'use client'

import { InlineWidget } from 'react-calendly'

export function DemoBooking() {
  return (
    <div className="calendly-inline-widget-wrapper">
      <InlineWidget
        url="https://calendly.com/romaix/demo"
        styles={{ height: '700px' }}
      />
    </div>
  )
}

// Alternative: Cal.com embed
export function DemoBookingCalcom() {
  return (
    <div>
      <iframe
        src="https://cal.com/romaix/demo"
        width="100%"
        height="700"
        frameBorder="0"
      />
    </div>
  )
}
```

### Pattern 5: Multi-Layer Spam Protection
**What:** Combine honeypot, rate limiting, and server-side validation for bot protection
**When to use:** All public-facing forms
**Example:**
```typescript
// Source: Community best practices + Arcjet blog
// components/forms/protected-contact-form.tsx
'use client'

export function ProtectedContactForm() {
  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot field - hidden from humans, filled by bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
        }}
      />

      {/* Real form fields */}
      <input name="name" required />
      <input name="email" type="email" required />
      {/* ... */}
    </form>
  )
}

// app/actions/protected-contact.ts
'use server'

import { headers } from 'next/headers'

export async function submitProtectedContact(formData: FormData) {
  // Check honeypot
  const honeypot = formData.get('website')
  if (honeypot) {
    console.log('Bot detected via honeypot')
    return { success: false, error: 'Invalid submission' }
  }

  // Rate limiting by IP
  const headersList = await headers()
  const ip = (headersList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  // Check rate limit (5 requests per minute per IP)
  const rateLimitKey = `contact:${ip}`
  // const { success } = await rateLimit.limit(rateLimitKey)
  // if (!success) {
  //   return { success: false, error: 'Too many requests. Please try again later.' }
  // }

  // Validate and process form
  // ...
}
```

### Anti-Patterns to Avoid
- **Storing API keys in client code:** Always use environment variables and access in Server Actions only
- **Client-only validation:** Always validate on server even with client-side validation
- **Returning 429 status codes from Server Actions:** Return structured error objects instead
- **Using global form state libraries:** React Hook Form handles local state efficiently without Redux/Zustand
- **Hand-rolling email HTML:** Use React Email components for maintainable, responsive templates
- **Exposing Server Actions without rate limiting:** Treat them like public API endpoints

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email HTML templates | Manual HTML/CSS with inline styles | React Email components | Cross-client compatibility is hard; React Email handles Outlook, Gmail, Apple Mail quirks |
| Form validation logic | Custom validation functions | Zod schemas | Type inference, composable schemas, better error messages, shared client/server |
| Rate limiting | Manual Redis counters | Upstash Rate Limit or similar | Handles distributed systems, sliding windows, atomic operations |
| Email delivery | Direct SMTP connection | Resend/SendGrid API | Deliverability, reputation management, bounce handling, analytics |
| Calendar scheduling | Custom availability checker | Calendly/Cal.com embed | Timezone handling, conflict resolution, reminders, integrations |
| Toast notifications | Custom portal/positioning | Sonner | Accessibility, animations, stacking, keyboard shortcuts |
| Bot detection | Simple timestamp checks | Honeypots + reCAPTCHA + rate limiting | Bots are sophisticated; multi-layer defense required |

**Key insight:** Form handling seems simple but production requirements (validation, security, deliverability, accessibility) make pre-built solutions essential. The React Hook Form + Zod + Resend stack is battle-tested by thousands of production apps.

## Common Pitfalls

### Pitfall 1: Missing Server-Side Validation
**What goes wrong:** Relying only on client-side validation allows malicious users to bypass checks by crafting direct HTTP requests to Server Actions
**Why it happens:** Developers assume Server Actions are "protected" because they're defined in server files
**How to avoid:** Always validate in Server Actions using the same Zod schema. Server Actions are public endpoints accessible via POST requests
**Warning signs:** Form accepts invalid data when submitted via curl/Postman

### Pitfall 2: Not Rate Limiting Server Actions
**What goes wrong:** Attackers spam forms, triggering hundreds of emails and exhausting email quotas
**Why it happens:** Server Actions look like internal functions but are public HTTP endpoints
**How to avoid:** Implement IP-based rate limiting for anonymous forms (5 requests/minute is reasonable). Use `headers()` from next/headers to get IP
**Warning signs:** Sudden spike in form submissions from same IP, email quota warnings

### Pitfall 3: Exposing Resend API Key to Client
**What goes wrong:** API key visible in browser network tab or bundled JavaScript
**Why it happens:** Using API key in Client Components or forgetting 'use server' directive
**How to avoid:** Only access `process.env.RESEND_API_KEY` in Server Actions or API routes. Never prefix with NEXT_PUBLIC_
**Warning signs:** Environment variable undefined in Server Action, or key visible in browser DevTools

### Pitfall 4: Not Handling Email Send Failures
**What goes wrong:** Form appears successful but email never sends; user and business both unaware
**Why it happens:** Not catching Resend API errors or assuming sends always succeed
**How to avoid:** Wrap email sends in try/catch, log failures, optionally store submissions in database as backup
**Warning signs:** Users report not receiving confirmations, leads going missing

### Pitfall 5: Form Resets Before Submission Completes
**What goes wrong:** Form clears while Server Action is still processing, user clicks submit again, duplicate submissions
**Why it happens:** Calling reset() before waiting for Server Action promise
**How to avoid:** Only reset form after successful Server Action response: `if (result.success) reset()`
**Warning signs:** Multiple identical submissions from same user

### Pitfall 6: Incorrect useActionState Type Signature
**What goes wrong:** TypeScript errors or runtime crashes when using useActionState with Server Actions
**Why it happens:** Server Action must accept `prevState` as first parameter when used with useActionState
**How to avoid:** Change signature from `async function submit(data: FormData)` to `async function submit(prevState: State, data: FormData)`
**Warning signs:** "Function signature doesn't match" TypeScript error

### Pitfall 7: Not Setting Email "From" Domain Correctly
**What goes wrong:** Emails go to spam or fail to send with "Domain not verified" error
**Why it happens:** Using unverified domain in Resend "from" field, or using @gmail.com/@yahoo.com
**How to avoid:** Verify custom domain in Resend dashboard, use format: `Name <noreply@yourdomain.com>`
**Warning signs:** Resend API returns 403 or emails consistently land in spam

### Pitfall 8: Honeypot Only Spam Prevention
**What goes wrong:** ~75% of modern bots still bypass honeypot fields by selectively filling forms
**Why it happens:** Assumption that honeypots are sufficient; bots have evolved
**How to avoid:** Use multi-layer approach: honeypot + rate limiting + server validation + optional reCAPTCHA
**Warning signs:** Still receiving obvious bot submissions despite honeypot

### Pitfall 9: Forgetting to Handle Pending States
**What goes wrong:** Users click submit multiple times because no loading indicator, causing duplicate submissions
**Why it happens:** Not using `useFormStatus` or `isSubmitting` state
**How to avoid:** Disable submit button and show loading text using `isSubmitting` from React Hook Form or `pending` from useFormStatus
**Warning signs:** Multiple rapid submissions in logs from same user

### Pitfall 10: Using .env Instead of .env.local for Secrets
**What goes wrong:** API keys accidentally committed to Git and exposed publicly
**Why it happens:** Confusion about which .env files are gitignored
**How to avoid:** Always use `.env.local` for secrets. Add `.env*.local` to .gitignore. Never commit API keys
**Warning signs:** Git showing .env in staging area, GitHub security alerts

## Code Examples

Verified patterns from official sources:

### Example 1: Complete Contact Form with shadcn/ui
```typescript
// Source: shadcn/ui forms documentation + Next.js guides
// components/forms/contact-form-complete.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitContactForm } from '@/app/actions/contact'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactFormComplete() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitContactForm(data)

    if (result.success) {
      toast.success('Message sent! We\'ll be in touch soon.')
      reset()
    } else {
      toast.error(result.error || 'Failed to send message')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        {...register('website' as any)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] w-[1px] h-[1px]"
      />

      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us about your project..."
          rows={5}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

### Example 2: Email Template with React Email
```typescript
// Source: React Email + Resend documentation
// components/emails/contact-notification.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from '@react-email/components'

interface ContactNotificationProps {
  name: string
  email: string
  phone?: string
  message: string
}

export function ContactNotificationEmail({
  name,
  email,
  phone,
  message,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>
          </Section>

          {phone && (
            <Section style={section}>
              <Text style={label}>Phone:</Text>
              <Link href={`tel:${phone}`} style={link}>
                {phone}
              </Link>
            </Section>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={message}>{message}</Text>
          </Section>

          <Text style={footer}>
            Sent from RomAIx website contact form
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const section = {
  padding: '0 48px',
}

const label = {
  fontSize: '14px',
  color: '#888',
  margin: '0 0 4px',
}

const value = {
  fontSize: '16px',
  color: '#333',
  margin: '0 0 20px',
}

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
}

const message = {
  fontSize: '16px',
  color: '#333',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
}
```

### Example 3: Rate Limiting Implementation
```typescript
// Source: Next.js Weekly + Arcjet blog
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create Redis client (requires Upstash account)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Create rate limiter: 5 requests per 60 seconds
export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '60s'),
  analytics: true,
})

// Usage in Server Action
// app/actions/contact-with-rate-limit.ts
'use server'

import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rate-limit'

export async function submitContactWithRateLimit(data: unknown) {
  // Get IP address
  const headersList = await headers()
  const ip = (headersList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  // Check rate limit
  const identifier = `contact:${ip}`
  const { success, limit, remaining, reset } = await rateLimit.limit(identifier)

  if (!success) {
    const resetDate = new Date(reset)
    return {
      success: false,
      error: `Too many requests. Please try again after ${resetDate.toLocaleTimeString()}`,
    }
  }

  // Process form submission
  // ...
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| API routes for forms | Server Actions | Next.js 13+ (2023) | Simpler code, automatic serialization, better colocation |
| useFormState | useActionState | React 19 (2024) | Better naming, same functionality |
| Custom email HTML | React Email components | 2023+ | Maintainable templates, better compatibility |
| Yup validation | Zod validation | 2022+ | Better TypeScript inference, smaller bundle |
| SendGrid/Mailgun | Resend | 2023+ | Modern API, React Email integration, better DX |
| reCAPTCHA v2 (checkbox) | reCAPTCHA v3 (invisible) + multi-layer | 2020+ | Better UX, no user interaction required |
| shadcn/ui Toast component | Sonner | 2024+ | Better animations, performance, accessibility |
| Formik | React Hook Form | 2021+ | Better performance, smaller bundle, less re-renders |

**Deprecated/outdated:**
- **useFormState:** Renamed to useActionState in React 19; same functionality, better naming
- **shadcn/ui Form component:** Now recommends Field component instead; less abstraction over react-hook-form
- **Pages Router API routes for forms:** App Router Server Actions are now standard for mutations
- **Manual FormData parsing with Object.fromEntries:** React Hook Form handles this better with TypeScript support

## Open Questions

Things that couldn't be fully resolved:

1. **Calendar Integration Choice**
   - What we know: Calendly has simpler embed, Cal.com offers open-source customization
   - What's unclear: Whether requirement FORM-03 implies custom form OR calendar embed
   - Recommendation: Start with Calendly inline embed (fastest), can swap to Cal.com later if customization needed. Or build simple form that collects preferred times and manually schedules.

2. **Rate Limiting Library Requirement**
   - What we know: Rate limiting is essential for Server Actions; Upstash is popular choice
   - What's unclear: Whether project has Redis infrastructure or wants third-party service
   - Recommendation: For MVP, implement simple in-memory rate limiting with Map and timestamps. For production, add Upstash Ratelimit (requires account) or use Vercel's built-in rate limiting if deployed there.

3. **Email Domain Verification Timeline**
   - What we know: Resend requires domain verification before sending to prevent spam
   - What's unclear: Whether RomAIx domain is already verified or needs setup
   - Recommendation: During development, use Resend's sandbox mode (can send to verified recipient emails). For production, verify romaix.com domain in Resend dashboard (add DNS records, ~24h verification).

4. **Success Confirmation for Demo Booking**
   - What we know: Requirement says "receive booking confirmation"
   - What's unclear: Whether confirmation is shown on-page or sent via email
   - Recommendation: Both - show success message on page immediately, AND send email confirmation with calendar invite attachment.

5. **Form Submission Storage**
   - What we know: Phase focuses on email notifications
   - What's unclear: Whether submissions should be stored in database for CRM/backup
   - Recommendation: For Phase 3, focus on email notifications only (requirement FORM-05). Can add database storage in future phase if needed.

## Sources

### Primary (HIGH confidence)
- Next.js Official Forms Guide: https://nextjs.org/docs/app/guides/forms
- React Hook Form Documentation: https://react-hook-form.com/docs/useform
- Resend Next.js Integration: https://resend.com/docs/send-with-nextjs
- shadcn/ui Forms: https://ui.shadcn.com/docs/components/form
- Next.js Weekly Rate Limiting: https://nextjsweekly.com/blog/rate-limiting-server-actions

### Secondary (MEDIUM confidence)
- [Next.js 15 Server Actions Guide 2026](https://medium.com/@saad.minhas.codes/next-js-15-server-actions-complete-guide-with-real-examples-2026-6320fbfa01c3)
- [Type-Safe Form Validation in Next.js 15](https://www.abstractapi.com/guides/email-validation/type-safe-form-validation-in-next-js-15-with-zod-and-react-hook-form)
- [Handling Forms in Next.js with RHF, Zod, and Server Actions](https://medium.com/@techwithtwin/handling-forms-in-next-js-with-react-hook-form-zod-and-server-actions-e148d4dc6dc1)
- [React Email Resend Integration](https://react.email/docs/integrations/resend)
- [Protecting React Hook Form from Spam](https://blog.arcjet.com/protecting-a-react-hook-form-from-spam/)
- [Calendly Next.js Integration Guide](https://medium.com/@dileep18052001/integrate-calendly-with-next-js-step-by-step-guide-dbb0b2fc30c9)
- [Sonner Toast Component](https://ui.shadcn.com/docs/components/sonner)
- [Next.js Environment Variables Guide](https://nextjs.org/docs/pages/guides/environment-variables)

### Tertiary (LOW confidence)
- Multiple DEV Community articles on form patterns (verified approaches with official docs)
- GitHub discussions on Server Actions validation patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs, Context7, and widespread community adoption confirm React Hook Form + Zod + Resend + Server Actions as standard
- Architecture: HIGH - Patterns verified from official Next.js and Resend documentation, with clear code examples
- Pitfalls: HIGH - Sourced from official docs warnings, GitHub issues, and community blog posts describing production problems

**Research date:** 2026-01-29
**Valid until:** ~30 days (stable ecosystem; Next.js 16 not expected soon; Zod, RHF, Resend APIs are stable)
