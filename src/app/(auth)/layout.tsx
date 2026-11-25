import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In & Access Lab',
  description:
    'Sign in to your SEOlabs SERP flight simulator dashboard. Access the algorithm testing lab, A/B title arena, and rank prediction models.',
  alternates: {
    canonical: 'https://seolabs.space/login',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
