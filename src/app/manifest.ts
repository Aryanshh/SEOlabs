import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SEOlabs — The Algorithmic SERP Flight Simulator',
    short_name: 'SEOlabs',
    description: 'Test title hooks, content depth, E-E-A-T, and Generative Engine Optimization in a zero-risk search lab.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFBF7',
    theme_color: '#059669',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
