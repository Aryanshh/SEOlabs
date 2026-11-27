import type { Metadata, Viewport } from 'next';
import { Outfit, Reenie_Beanie } from 'next/font/google';
import Script from 'next/script';
import Providers from '@/components/Providers';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const reenie = Reenie_Beanie({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-reenie',
  weight: ['400'],
});

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://seolabs.space'),
  title: {
    default: 'SEOlabs (SEO Labs) — Official SERP & SEO Simulator',
    template: '%s | SEOlabs (SEO Labs)',
  },
  description:
    'SEOlabs (SEO Labs) is the official algorithmic SEO simulator and SERP flight deck. Test Google RankBrain, Helpful Content signals, and CTR curves before crawling.',
  applicationName: 'SEOlabs (SEO Labs)',
  authors: [{ name: 'SEOlabs Algorithm Engineering Lab', url: 'https://seolabs.space' }],
  creator: 'SEOlabs Team',
  publisher: 'SEOlabs',
  keywords: [
    'SEOlabs',
    'SEO labs',
    'seolabs',
    'seo labs',
    'SEO Labs simulator',
    'SEOlabs simulator',
    'SEO simulator',
    'seolabs.space',
    'Google SEO simulator',
    'SERP simulator',
    'Google SERP simulator',
    'algorithmic SEO simulator',
    'search engine simulator',
    'SERP flight simulator',
    'SEO testing lab',
    'Generative Engine Optimization',
    'GEO testing tool',
    'Google AI Overviews citation predictor',
    'Helpful Content System audit',
    'title tag pixel width calculator',
    'SERP CTR prediction model',
    'SEO algorithm testing',
    'E-E-A-T score analyzer',
    'SEO split testing',
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
    siteName: 'SEOlabs (SEO Labs)',
    title: 'SEOlabs (SEO Labs) — Official SERP & SEO Simulator',
    description:
      'SEOlabs (SEO Labs) is the official algorithmic SEO simulator and SERP flight deck. Test Google RankBrain, Helpful Content signals, and CTR curves before crawling.',
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
    title: 'SEOlabs (SEO Labs) — Official SERP & SEO Simulator',
    description:
      'SEOlabs (SEO Labs) is the official algorithmic SEO simulator. Test title hooks, content depth, E-E-A-T, and Generative Engine Optimization in a zero-risk search lab.',
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
        'seo labs',
        'SEOlabs (SEO Labs)',
        'SEOlabs SEO Simulator',
        'SEO Labs Simulator',
        'SEO Simulator',
        'seolabs.space',
        'SEOlabs Platform',
        'SEO Labs Platform',
      ],
      description: 'The Official SEOlabs (SEO Labs) SEO Simulator & Algorithmic SERP Testing Lab',
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
      legalName: 'SEOlabs (SEO Labs)',
      alternateName: [
        'SEO Labs',
        'seolabs',
        'seo labs',
        'SEOlabs (SEO Labs)',
        'seolabs.space',
        'SEOlabs Platform',
        'SEO Labs Platform',
        'SEOlabs SEO Simulator',
        'SEO Labs Simulator',
      ],
      url: 'https://seolabs.space',
      logo: {
        '@type': 'ImageObject',
        url: 'https://seolabs.space/icon.svg',
        caption: 'SEOlabs Search Radar Logo',
      },
      brand: {
        '@type': 'Brand',
        name: 'SEOlabs',
        alternateName: ['SEO Labs', 'seolabs', 'seo labs', 'SEOlabs SEO Simulator'],
      },
      description:
        'SEOlabs (also known as SEO Labs) is the official algorithmic SEO simulator and Generative Engine Optimization testing laboratory.',
      sameAs: [
        'https://github.com/Aryanshh/SEOlabs',
      ],
      knowsAbout: [
        'SEO Simulator',
        'SEO Labs',
        'Search Engine Optimization',
        'SERP Flight Simulation',
        'Google RankBrain Algorithm',
        'Helpful Content System',
        'Generative Engine Optimization (GEO)',
        'AI Overviews Citations',
        'Title Tag Truncation Modeling',
      ],
    },
    {
      '@type': ['SoftwareApplication', 'WebApplication'],
      '@id': 'https://seolabs.space/#software',
      name: 'SEOlabs (SEO Labs) SEO Simulator',
      alternateName: [
        'SEOlabs',
        'SEO Labs',
        'seolabs',
        'seo labs',
        'SEO Simulator',
        'SEOlabs SERP Simulator',
        'SEO Labs Simulator',
        'Google SEO Simulator',
      ],
      applicationCategory: 'BusinessApplication, DeveloperApplication, SEOApplication',
      operatingSystem: 'All Modern Web Browsers',
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
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Algorithmic SEO simulator for Google RankBrain & Helpful Content scoring',
        'Google AI Overviews citation prediction & GEO audit',
        'Desktop & mobile SERP pixel width truncation simulation',
        'A/B split-testing title tag arena with CTR curves',
        '24-month crawl velocity roadmap and compounding calculator',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://seolabs.space/#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://seolabs.space',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'SEOlabs Flight Simulator',
          item: 'https://seolabs.space/#simulator',
        },
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
        {
          '@type': 'Question',
          name: 'Who is SEOlabs built for and how do I get started?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEOlabs is built for SEO consultants, growth marketing teams, and content engineers who want to test SERP ranking hypotheses before indexing. You can sign in, configure target queries, and launch your first simulation in the flight deck.',
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
    <html lang="en" className={`${outfit.variable} ${reenie.variable}`}>
      <head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-P9J5JNTV"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={outfit.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9J5JNTV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
