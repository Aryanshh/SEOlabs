'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './theme.css';
import { GoogleIcon, AiOverviewIcon } from '@/components/Icons';
import SeoPreloader from '@/components/SeoPreloader';

export default function SeoLabsLanding() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const searchStats = [
    { engine: 'Google Search', metric: 'Helpful Content & EEAT' },
    { engine: 'AI Overviews & SearchGPT', metric: '94% Citation Model' },
    { engine: 'SERP CTR Curve', metric: 'Pixel Width & Truncation' },
    { engine: 'Bing Copilot', metric: 'IndexNow Real-Time Signals' },
    { engine: 'A/B Split Arena', metric: 'Head-to-Head Win Probability' },
    { engine: 'YouTube vSEO', metric: 'Semantic Tagging & Chapters' },
  ];

  const faqs = [
    {
      q: 'What is a SERP flight simulator?',
      a: 'A SERP flight simulator is a controlled testing ground that replicates modern search engine ranking algorithms—including Google RankBrain, the Helpful Content System, and AI Overviews—enabling digital marketers and technical SEOs to test title tags, search intent, schema, and CTR curves in a zero-risk lab before search engine bots crawl the page.',
    },
    {
      q: 'How does SEOlabs simulate Google AI Overviews and GEO citations?',
      a: 'SEOlabs calculates content information gain, entity definition density, semantic query alignment, and structured data hierarchy to estimate the exact probability that a webpage will earn citations inside Google AI Overviews and LLM search engines like SearchGPT.',
    },
    {
      q: 'Why is SERP title pixel width truncation crucial for SEO?',
      a: 'Google truncates desktop title tags exceeding ~600 pixels (typically 55-60 characters) and mobile titles exceeding ~680 pixels with an ellipsis (...). Truncation cuts off high-impact keywords and CTR triggers. SEOlabs visualizes pixel boundaries with sub-pixel typography rendering before publication.',
    },
    {
      q: 'How do SERP click-through rate (CTR) curves predict traffic?',
      a: 'Modern organic CTR is heavily distributed by position, rich snippets, and AI Overview placement. Rank #1 typically captures 28-32% of clicks, while positions #4-10 receive under 5%. SEOlabs models real-world 2026 CTR distributions to forecast monthly organic clicks accurately.',
    },
    {
      q: 'Can I test title tags head-to-head with A/B simulation?',
      a: 'Yes. The SEOlabs A/B Arena lets you evaluate two competing title tags and meta descriptions simultaneously, predicting winner margins, expected click lifts, and SERP visibility before pushing changes to production.',
    },
  ];

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setJoined(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="seolabs-landing">
      {/* Innovative SEO Holographic Preloader */}
      <SeoPreloader />

      <div className="grain-overlay" aria-hidden="true" />
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />

      {/* Navigation Header */}
      <header className="nav-container">
        <Link href="/" className="logo" aria-label="SEOlabs Home">
          <div className="logo-circle">
            <div className="logo-dot" />
          </div>
          <span style={{ fontWeight: 800, letterSpacing: -0.8, fontSize: 19 }}>
            seolabs
          </span>
        </Link>

        <div className="tagline-cycle-wrapper" aria-hidden="true">
          <div
            className="tagline-cycle"
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: 'var(--cl-stone-400)',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              animation: 'cycleTags 12s infinite',
            }}
          >
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Simulate the rank.
            </div>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Master the algorithm.
            </div>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Train your authority.
            </div>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Own the SERP.
            </div>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main Navigation">
          <Link href="/login" className="nav-link">
            Sign In
          </Link>
          <Link href="/login" className="nav-cta">
            Launch SERP Lab
          </Link>
        </nav>
      </header>

      {/* Main Semantic Landmark */}
      <main>
        {/* Hero Section */}
        <section className="section hero" aria-labelledby="hero-title">
          <div className="hero-split">
            <div className="hero-content">
              <h1 id="hero-title" className="reveal">
                <span className="hero-eyebrow">
                  <span className="pulse-dot" aria-hidden="true" />
                  SEOlabs™ Flight Simulator
                </span>
                <span className="hero-main-heading">
                  Master the algorithm, <span className="cursive cursive-word">intentionally</span>
                </span>
              </h1>
              <p className="reveal" style={{ transitionDelay: '0.2s' }}>
                <strong>SEOlabs</strong> is the algorithmic flight simulator for search engines &amp; AI discovery. Test title tags, search intent, schema markup, and Generative Engine Optimization in a zero-risk lab before crawling begins.
              </p>
              <div className="cta-group reveal" style={{ transitionDelay: '0.4s' }}>
                <Link href="/login" className="btn btn-primary">
                  Launch SERP Lab
                </Link>
                <Link href="/login" className="btn btn-secondary">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="hero-visual reveal" style={{ transitionDelay: '0.6s' }}>
              <div className="mockup-container">
                <div className="serp-card-mockup serp-back">
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', marginBottom: 8 }}>
                    AI OVERVIEW CITATION PROBABILITY
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 900, color: '#065F46' }}>
                    94.2%
                  </div>
                  <div style={{ fontSize: 12, color: '#047857', marginTop: 6 }}>
                    Direct entity definition verified
                  </div>
                </div>

                <div className="serp-card-mockup serp-main">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <GoogleIcon size={20} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--cl-stone-400)', textTransform: 'uppercase' }}>
                      Google SERP Simulation
                    </span>
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 4 }}>
                    PREDICTED RANK
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 'clamp(36px, 9vw, 54px)', fontWeight: 900, letterSpacing: -2, color: 'var(--cl-stone-900)', lineHeight: 1 }}>
                      #1.2
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--cl-emerald)' }}>
                      Top 3 Guaranteed
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: '1px solid var(--cl-stone-100)', paddingTop: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--cl-stone-400)', fontWeight: 700 }}>ESTIMATED CTR</div>
                      <div style={{ fontSize: 20, fontWeight: 800 }}>31.8%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--cl-stone-400)', fontWeight: 700 }}>MONTHLY CLICKS</div>
                      <div style={{ fontSize: 20, fontWeight: 800 }}>+4,820</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#F0FDF4', borderRadius: 100 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cl-emerald)' }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#065F46' }}>
                      Helpful Content System Score: 96/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <div className="marquee-container reveal" aria-hidden="true">
          <div className="marquee-content">
            {[...searchStats, ...searchStats].map((s, i) => (
              <div key={i} className="scenario-card">
                <span className="scenario-time">{s.engine}</span>
                <span className="scenario-text">{s.metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <section className="section" aria-labelledby="features-title">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 id="features-title" className="section-heading">
              A simulator that <span className="cursive" style={{ color: 'var(--cl-emerald)', fontSize: '1.25em' }}>predicts</span>
            </h2>
            <p className="section-subheading">
              We built SEOlabs to be your tactical digital testing ground. Every simulation is grounded in real-world search algorithm ranking mechanics.
            </p>
          </div>

          <div className="grid-2">
            <article className="card reveal" style={{ padding: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
                01 / SIMULATE
              </div>
              <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>Realistic SERP Algorithms</h3>
              <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
                Our engine models Google RankBrain, the Helpful Content System, E-E-A-T signals, and Bing IndexNow with weighted factor scoring.
              </p>
            </article>

            <article className="card reveal" style={{ padding: 48, transitionDelay: '0.2s' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
                02 / EXPERIMENT
              </div>
              <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>A/B Split-Test Arena</h3>
              <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
                Pit two title tags and meta snippets against each other before writing a line of code. Predict click win rates and SERP pixel truncation.
              </p>
            </article>

            <article className="card reveal" style={{ padding: 48, transitionDelay: '0.3s' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
                03 / GENERATIVE AI
              </div>
              <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>GEO &amp; AI Overviews</h3>
              <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
                Analyze whether your content structure satisfies Google AI Overviews and SearchGPT citations with direct answer and entity testing.
              </p>
            </article>

            <article className="card reveal" style={{ padding: 48, transitionDelay: '0.4s' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
                04 / ROADMAP
              </div>
              <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>24-Month Crawl Velocity</h3>
              <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
                Forecast sandbox release dates, core update resilience, and long-term organic compounding through realistic crawl curves.
              </p>
            </article>
          </div>
        </section>

        {/* Topical Authority: Algorithm Mechanics Guide */}
        <section className="section" aria-labelledby="guide-title">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-badge">
              Topical Knowledge Base
            </span>
            <h2 id="guide-title" className="section-heading">
              How Google Ranks Content in 2026
            </h2>
            <p className="section-subheading">
              Modern search engines rely on multi-layered neural systems. Here is how SEOlabs quantifies the primary ranking pillars.
            </p>
          </div>

          <div className="guide-grid reveal">
            <div className="guide-box">
              <span className="guide-tag">Neural Ranking</span>
              <h3 className="guide-title">RankBrain &amp; Intent Mapping</h3>
              <p className="guide-desc">
                Google connects ambiguous search queries to semantic concepts using deep learning models. SEOlabs assesses semantic distance between your content body and target user intents to ensure topical coverage.
              </p>
            </div>

            <div className="guide-box">
              <span className="guide-tag">Generative Search</span>
              <h3 className="guide-title">GEO &amp; AI Overview Citations</h3>
              <p className="guide-desc">
                Generative Engine Optimization (GEO) prioritizes structured data, authoritative entity definitions, and high information gain. SEOlabs scores content on citation readiness for Gemini-powered search summaries.
              </p>
            </div>

            <div className="guide-box">
              <span className="guide-tag">User Behavior</span>
              <h3 className="guide-title">SERP CTR Curves &amp; Pixel Boundaries</h3>
              <p className="guide-desc">
                Desktop snippets cap at 600px width; mobile snippets cap at 680px. High click-through rate (CTR) title hooks at positions 1-3 drive logarithmic organic traffic multiplication.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" aria-labelledby="stories-title">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 id="stories-title" className="section-heading">SEO Practitioner Stories</h2>
            <p className="section-subheading">How growth teams are eliminating SERP guesswork.</p>
          </div>

          <div className="diary-grid">
            <blockquote className="diary-card reveal">
              <p className="diary-text">
                &ldquo;SEOlabs has completely replaced our guessing game. We simulate every article&apos;s title hook, pixel width, and H2 hierarchy before drafting. Our Page One hit rate jumped from 34% to 78% in two months.&rdquo;
              </p>
              <footer style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 1, background: 'var(--cl-stone-400)' }} />
                <cite className="cursive" style={{ fontSize: 28, color: 'var(--cl-stone-500)', fontStyle: 'normal' }}>Sarah T. (Organic Lead)</cite>
              </footer>
            </blockquote>

            <blockquote className="diary-card reveal" style={{ transitionDelay: '0.2s' }}>
              <p className="diary-text">
                &ldquo;The AI Overview citation predictor alone is game changing. Testing our content structure against LLM information gain before publishing feels like having Google&apos;s algorithm source code right on our screen.&rdquo;
              </p>
              <footer style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 1, background: 'var(--cl-stone-400)' }} />
                <cite className="cursive" style={{ fontSize: 28, color: 'var(--cl-stone-500)', fontStyle: 'normal' }}>David M. (Technical SEO)</cite>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* FAQ Accordion Section (Rich Snippet Target) */}
        <section className="section" aria-labelledby="faq-title">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-badge">
              Frequently Asked Questions
            </span>
            <h2 id="faq-title" className="section-heading">
              Everything You Need to Know
            </h2>
            <p className="section-subheading">
              Answers regarding SERP flight simulation, search algorithms, and ranking mechanics.
            </p>
          </div>

          <div className="faq-container reveal">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.q}</span>
                  <span className={`faq-icon ${openFaq === index ? 'open' : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>
                {openFaq === index && (
                  <div id={`faq-answer-${index}`} className="faq-body">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Conversion - Waitlist */}
        <section className="section" aria-labelledby="cta-title">
          <div className="waitlist-card reveal">
            <h2 id="cta-title" className="section-heading">Ready for Page One?</h2>
            <p className="section-subheading" style={{ marginTop: 12 }}>
              Join thousands of SEO specialists simulating algorithms before indexing.
            </p>

            {joined ? (
              <div
                className="animate-scale-in"
                style={{
                  marginTop: 36,
                  padding: '20px',
                  background: '#D1FAE5',
                  borderRadius: '100px',
                  color: '#065F46',
                  fontWeight: 700,
                  display: 'inline-block',
                }}
              >
                ✓ You are on the flight list! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="waitlist-form">
                <input
                  type="email"
                  placeholder="Enter your work email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Work email address"
                />
                <button type="submit">Join Lab Access</button>
              </form>
            )}

            <p style={{ marginTop: 28, fontSize: 14, color: 'var(--cl-stone-400)', fontWeight: 600 }}>
              Zero risk. Immediate simulation. High-impact rankings.
            </p>
          </div>
        </section>
      </main>

      {/* Semantic Footer with SEO Links */}
      <footer style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--cl-stone-400)', fontSize: 14, borderTop: '1px solid var(--cl-stone-200)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <Link href="/login" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
          <Link href="/login" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none', fontWeight: 600 }}>SERP Lab</Link>
          <Link href="/login" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none', fontWeight: 600 }}>A/B Split Arena</Link>
          <Link href="/login" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none', fontWeight: 600 }}>Leaderboard</Link>
          <a href="https://github.com/Aryanshh/SEOlabs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cl-stone-500)', textDecoration: 'none', fontWeight: 600 }}>GitHub</a>
        </div>
        <p style={{ fontWeight: 600 }}>&copy; 2026 SEOlabs. Built for the next generation of search engine strategists.</p>
        <p style={{ fontSize: 12, marginTop: 8, color: 'var(--cl-stone-400)' }}>
          seolabs.space — Algorithmic SERP Flight Simulator, Google Helpful Content &amp; Generative Engine Optimization Lab.
        </p>
      </footer>
    </div>
  );
}
