'use client';

import { Suspense } from 'react';
import { AnalyticsProvider } from './AnalyticsProvider';

/**
 * Wraps AnalyticsProvider in Suspense.
 * Required because useSearchParams() needs a Suspense boundary in App Router.
 */
export function AnalyticsProviderWrapper() {
  return (
    <Suspense fallback={null}>
      <AnalyticsProvider />
    </Suspense>
  );
}
