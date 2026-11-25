import type { Metadata } from 'next';
import Link from 'next/link';
import '@/app/theme.css';

export const metadata: Metadata = {
  title: 'About SEOlabs (SEO Labs) — Research Methodology & SEO Simulator Engine',
  description:
    'Learn about the research foundation of SEOlabs (SEO Labs). An algorithmic SEO simulator bringing statistical rigor, neural intent modeling, and zero-risk experimentation to search marketing.',
  alternates: {
    canonical: 'https://seolabs.space/about',
  },
  openGraph: {
    title: 'About SEOlabs (SEO Labs) — Research Methodology & SEO Simulator Engine',
    description:
      'Learn about the research foundation of SEOlabs (SEO Labs). An algorithmic SEO simulator bringing statistical rigor and zero-risk experimentation to search marketing.',
    url: 'https://seolabs.space/about',
    siteName: 'SEOlabs (SEO Labs)',
    type: 'article',
  },
};

export default function AboutPage() {
  return (
    <div className="seolabs-landing">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />

      {/* Navigation Header */}
      <header className="nav-container">
        <Link href="/" className="logo" aria-label="SEOlabs (SEO Labs) Official Home" title="SEOlabs | SEO Labs">
          <div className="logo-circle">
            <div className="logo-dot" />
          </div>
          <span style={{ fontWeight: 800, letterSpacing: -0.8, fontSize: 19 }}>
            seolabs
          </span>
        </Link>

        <nav className="nav-links" aria-label="About Navigation">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/guides/seo-split-testing" className="nav-link">
            Guides
          </Link>
          <Link href="/login" className="nav-cta">
            Launch SEO Simulator
          </Link>
        </nav>
      </header>

      <main style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '860px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        <article>
          <header style={{ marginBottom: '48px', textAlign: 'center' }}>
            <span className="section-badge" style={{ marginBottom: '16px', display: 'inline-block' }}>
              Academic &amp; Engineering Foundation
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.2, color: 'var(--cl-stone-900)' }}>
              About SEOlabs (SEO Labs): The Scientific Approach to Search Algorithms
            </h1>
            <p style={{ marginTop: '16px', fontSize: '18px', color: 'var(--cl-stone-500)', lineHeight: 1.6 }}>
              Bridging the divide between empirical data science and modern search engine optimization.
            </p>
          </header>

          <section style={{ background: 'var(--cl-surface)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cl-stone-200)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: 'var(--cl-stone-900)' }}>
              Our Mission
            </h2>
            <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.7, fontSize: '16px', marginBottom: '16px' }}>
              Traditional search engine optimization has long been plagued by superstition, unverified correlation studies, and trial-and-error publishing. Every major algorithm update triggers panic across marketing teams because changes are tested directly on live production URLs.
            </p>
            <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.7, fontSize: '16px' }}>
              <strong>SEOlabs</strong> (also known as <strong>SEO Labs</strong>) was built to transform SEO into an empirical discipline. By providing a simulated search environment, SEOlabs allows digital marketers, engineers, and content creators to evaluate neural intent distance, title pixel truncation, and Generative Engine Optimization (GEO) before search engine bots crawl the page.
            </p>
          </section>

          <section style={{ background: 'var(--cl-surface)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cl-stone-200)', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: 'var(--cl-stone-900)' }}>
              The SEOlabs Algorithm Simulation Engine
            </h2>
            <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.7, fontSize: '16px', marginBottom: '20px' }}>
              The core SEOlabs simulator operates on four interconnected mathematical and algorithmic pillars:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: 'var(--cl-stone-100)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: '8px' }}>
                  1. Neural Intent Mapping
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--cl-stone-800)', lineHeight: 1.5 }}>
                  Models Google RankBrain and semantic embeddings to evaluate how closely document body text aligns with target search queries.
                </p>
              </div>

              <div style={{ padding: '20px', background: 'var(--cl-stone-100)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: '8px' }}>
                  2. Helpful Content &amp; E-E-A-T
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--cl-stone-800)', lineHeight: 1.5 }}>
                  Calculates original information gain, direct answers, and authority signals against search quality evaluator guidelines.
                </p>
              </div>

              <div style={{ padding: '20px', background: 'var(--cl-stone-100)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: '8px' }}>
                  3. Generative Engine Citations
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--cl-stone-800)', lineHeight: 1.5 }}>
                  Predicts the likelihood of earning citations in Google AI Overviews and SearchGPT through entity definition density.
                </p>
              </div>

              <div style={{ padding: '20px', background: 'var(--cl-stone-100)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: '8px' }}>
                  4. Sub-Pixel CTR Curves
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--cl-stone-800)', lineHeight: 1.5 }}>
                  Calculates sub-pixel title truncation (600px desktop / 680px mobile) and maps expected CTR across non-linear organic distributions.
                </p>
              </div>
            </div>
          </section>

          <section style={{ textAlign: 'center', padding: '40px 20px', background: '#D1FAE5', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#065F46', marginBottom: '12px' }}>
              Experience the SEOlabs SEO Simulator
            </h2>
            <p style={{ color: '#047857', maxWidth: '540px', margin: '0 auto 24px', fontSize: '15px' }}>
              Test your title tags, meta descriptions, and ranking hypotheses in a zero-risk environment before publishing.
            </p>
            <Link href="/login" className="btn btn-primary" style={{ display: 'inline-block' }}>
              Launch SEO Simulator Lab
            </Link>
          </section>
        </article>
      </main>

      {/* Semantic Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--cl-stone-400)', fontSize: 14, borderTop: '1px solid var(--cl-stone-200)' }}>
        <p style={{ fontWeight: 600 }}>&copy; 2026 SEOlabs. Built for the next generation of search engine strategists.</p>
        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none' }}>Home</Link>
          <Link href="/about" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none', fontWeight: 700 }}>About</Link>
          <Link href="/guides/seo-split-testing" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none' }}>Guides</Link>
          <Link href="/login" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none' }}>SEO Simulator</Link>
        </div>
      </footer>
    </div>
  );
}
