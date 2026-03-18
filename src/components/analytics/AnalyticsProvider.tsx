'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 page_view on every App Router SPA navigation.
 * GoogleAnalytics from @next/third-parties handles the initial hard-load hit;
 * this component handles subsequent client-side route changes.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (!gaId || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    window.gtag('config', gaId, { page_path: url });
  }, [pathname, searchParams, gaId]);

  return null;
}
