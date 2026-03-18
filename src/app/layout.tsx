import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/constants'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'
import { AnalyticsProviderWrapper } from '@/components/analytics/AnalyticsProviderWrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - AI Automation for Travel Industry`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <head>
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <Toaster />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gaId && <AnalyticsProviderWrapper />}
      </body>
    </html>
  )
}
