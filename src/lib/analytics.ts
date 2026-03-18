/**
 * GA4 event tracking helpers — romaix.ai
 * Call from client components after user interactions.
 * No-ops when window.gtag is unavailable (SSR / GA not loaded).
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
}

/** Track a CTA button click */
export function trackCtaClick(label: string, destination?: string) {
  gtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: label,
    destination: destination ?? '',
  });
}

/** Track a contact/assessment form submission */
export function trackFormSubmit(formId: string) {
  gtag('event', 'form_submit', {
    event_category: 'conversion',
    event_label: formId,
  });
  gtag('event', 'generate_lead', {
    currency: 'USD',
    value: 0,
    form_id: formId,
  });
}

/** Track blog post engagement */
export function trackBlogRead(slug: string, title: string) {
  gtag('event', 'blog_read', {
    event_category: 'content',
    event_label: title,
    post_slug: slug,
  });
}

/** Track outbound link clicks */
export function trackOutboundLink(url: string, label?: string) {
  gtag('event', 'click', {
    event_category: 'outbound',
    event_label: label ?? url,
    transport_type: 'beacon',
  });
}
