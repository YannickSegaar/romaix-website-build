import { SITE_URL, SITE_NAME } from '@/lib/constants';
import type { GhostPost } from '@/lib/ghost';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
    sameAs: [
      'https://twitter.com/romaix_ai',
      'https://linkedin.com/company/romaix',
    ],
    description:
      'Custom AI solutions for tour operators, travel agencies, and boutique hotels.',
    knowsAbout: [
      'AI automation for travel',
      'chatbot for tour operators',
      'AI booking agent for hotels',
      'WhatsApp automation',
      'workflow automation',
      'lead capture automation',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function blogPostingSchema(post: GhostPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.feature_image ?? undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    author:
      post.authors?.[0]
        ? { '@type': 'Person', name: post.authors[0].name }
        : { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    keywords: post.tags?.map((t) => t.name).join(', '),
  };
}
