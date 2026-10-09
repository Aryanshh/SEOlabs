import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SEOlabs — The Algorithmic SERP Flight Simulator',
  description: 'Test title hooks, content depth, E-E-A-T, and Generative Engine Optimization in a zero-risk search lab.',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
