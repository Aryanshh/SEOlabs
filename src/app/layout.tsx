import type { Metadata, Viewport } from 'next';
import Providers from '@/components/Providers';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://seolabs.space'),
  title: {
    default: 'SEOlabs — The Algorithmic SERP Flight Simulator & GEO Testing Lab',
    template: '%s | SEOlabs SERP Simulator',
  },
  description:
    'Official SEOlabs Platform: Simulate Google RankBrain, Helpful Content signals, AI Overviews citation probability, and SERP click-through rates in a zero-risk search algorithm laboratory before crawling begins.',
  applicationName: 'SEOlabs',
  authors: [{ name: 'SEOlabs Algorithm Engineering Lab', url: 'https://seolabs.space' }],
  creator: 'SEOlabs Team',
  publisher: 'SEOlabs',
  keywords: [
    'SEOlabs',
    'SEO labs',
    'seolabs.space',
    'SEOlabs AI',
    'SERP flight simulator',
    'SERP simulator',
    'Google SERP simulator',
    'Generative Engine Optimization',
    'GEO testing tool',
    'Google AI Overviews citation predictor',
    'Helpful Content System audit',
    'title tag pixel width calculator',
    'SERP CTR prediction model',
    'search engine algorithm testing',
    'E-E-A-T score analyzer',
    'A/B search snippet testing',
  ],
  alternates: {
    canonical: 'https://seolabs.space',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://seolabs.space',
    siteName: 'SEOlabs',
    title: 'SEOlabs — The Algorithmic SERP Flight Simulator & GEO Testing Lab',
    description:
      'Simulate Google RankBrain, Helpful Content, AI Overviews citations, and SERP click-through rates before crawling begins.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SEOlabs Algorithmic SERP Flight Simulator and Testing Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEOlabs — The Algorithmic SERP Flight Simulator',
    description:
      'Test title hooks, content depth, E-E-A-T, and Generative Engine Optimization in a zero-risk search lab.',
    images: ['/opengraph-image'],
    creator: '@seolabs',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://seolabs.space/#website',
      url: 'https://seolabs.space',
      name: 'SEOlabs',
      alternateName: [
        'SEO Labs',
        'seolabs',
        'seolabs.space',
        'SEOlabs AI',
        'SEOlabs SERP Simulator',
      ],
      description: 'The Official SEOlabs Algorithmic SERP Flight Simulator & GEO Testing Lab',
      publisher: { '@id': 'https://seolabs.space/#organization' },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://seolabs.space/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://seolabs.space/#organization',
      name: 'SEOlabs',
      alternateName: ['SEO Labs', 'seolabs', 'seolabs.space', 'SEOlabs Engineering'],
      url: 'https://seolabs.space',
      logo: {
        '@type': 'ImageObject',
        url: 'https://seolabs.space/icon.svg',
        caption: 'SEOlabs Search Radar Logo',
      },
      sameAs: [
        'https://github.com/Aryanshh/SEOlabs',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://seolabs.space/#application',
      name: 'SEOlabs SERP Flight Simulator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All (Modern Web Browsers)',
      url: 'https://seolabs.space',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '138',
      },
      featureList: [
        'Google RankBrain & Helpful Content System scoring',
        'Google AI Overviews citation prediction & GEO audit',
        'Desktop & mobile SERP pixel width truncation simulation',
        'A/B split-testing title tag arena with CTR curves',
        '24-month crawl velocity roadmap and compounding calculator',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://seolabs.space/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a SERP flight simulator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A SERP flight simulator is a controlled testing ground that replicates modern search engine ranking algorithms—including Google RankBrain, the Helpful Content System, and AI Overviews—enabling digital marketers and technical SEOs to test title tags, search intent, schema, and CTR curves in a zero-risk lab before search engine bots crawl the page.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does SEOlabs simulate Google AI Overviews and GEO citations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEOlabs calculates content information gain, entity definition density, semantic query alignment, and structured data hierarchy to estimate the exact probability that a webpage will earn citations inside Google AI Overviews and LLM search engines like SearchGPT.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is SERP title pixel width truncation crucial for SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Google truncates desktop title tags exceeding ~600 pixels (typically 55-60 characters) and mobile titles exceeding ~680 pixels with an ellipsis (...). Truncation cuts off high-impact keywords and CTR triggers. SEOlabs visualizes pixel boundaries with sub-pixel typography rendering before publication.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do SERP click-through rate (CTR) curves predict traffic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Modern organic CTR is heavily distributed by position, rich snippets, and AI Overview placement. Rank #1 typically captures 28-32% of clicks, while positions #4-10 receive under 5%. SEOlabs models real-world 2026 CTR distributions to forecast monthly organic clicks accurately.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I test title tags head-to-head with A/B simulation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The SEOlabs A/B Arena lets you evaluate two competing title tags and meta descriptions simultaneously, predicting winner margins, expected click lifts, and SERP visibility before pushing changes to production.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Reenie+Beanie&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
