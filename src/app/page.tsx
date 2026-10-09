'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './theme.css';
import { GoogleIcon, AiOverviewIcon } from '@/components/Icons';

export default function SeoLabsLanding() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

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

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setJoined(true);
  };

  return (
    <div className="seolabs-landing">
      <div className="grain-overlay" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Navigation */}
      <nav className="nav-container">
        <Link href="/" className="logo">
          <div className="logo-circle">
            <div className="logo-dot" />
          </div>
          <span style={{ fontWeight: 800, letterSpacing: -0.8, fontSize: 19 }}>
            seolabs
          </span>
        </Link>

        <div style={{ height: 40, overflow: 'hidden', textAlign: 'center' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/dashboard/create" className="nav-cta">
            Launch SERP Lab
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section hero">
        <div className="hero-split">
          <div className="hero-content">
            <h1 className="reveal">
              Master the <br />
              algorithm, <span className="cursive cursive-word">intentionally</span>
            </h1>
            <p className="reveal" style={{ transitionDelay: '0.2s' }}>
              The flight simulator for search engines &amp; AI discovery. Test title tags, search intent, schema markup, and Generative Engine Optimization in a zero-risk lab before crawling begins.
            </p>
            <div className="cta-group reveal" style={{ transitionDelay: '0.4s' }}>
              <Link href="/dashboard/create" className="btn btn-primary">
                Launch SERP Lab
              </Link>
              <Link href="/dashboard" className="btn btn-secondary">
                Explore Overview
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
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 54, fontWeight: 900, letterSpacing: -2, color: 'var(--cl-stone-900)' }}>
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
      <div className="marquee-container reveal">
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
      <section className="section">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 70 }}>
          <h2 style={{ fontSize: 52, fontWeight: 800, letterSpacing: -2, marginBottom: 20 }}>
            A simulator that <span className="cursive" style={{ color: 'var(--cl-emerald)', fontSize: 72 }}>predicts</span>
          </h2>
          <p style={{ color: 'var(--cl-stone-500)', maxWidth: 620, margin: '0 auto', fontSize: 20 }}>
            We built SEOlabs to be your tactical digital testing ground. Every simulation is grounded in real-world search algorithm ranking mechanics.
          </p>
        </div>

        <div className="grid-2">
          <div className="card reveal" style={{ padding: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
              01 / SIMULATE
            </div>
            <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>Realistic SERP Algorithms</h3>
            <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
              Our engine models Google RankBrain, the Helpful Content System, E-E-A-T signals, and Bing IndexNow with weighted factor scoring.
            </p>
          </div>

          <div className="card reveal" style={{ padding: 48, transitionDelay: '0.2s' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
              02 / EXPERIMENT
            </div>
            <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>A/B Split-Test Arena</h3>
            <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
              Pit two title tags and meta snippets against each other before writing a line of code. Predict click win rates and SERP pixel truncation.
            </p>
          </div>

          <div className="card reveal" style={{ padding: 48, transitionDelay: '0.3s' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
              03 / GENERATIVE AI
            </div>
            <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>GEO &amp; AI Overviews</h3>
            <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
              Analyze whether your content structure satisfies Google AI Overviews and SearchGPT citations with direct answer and entity testing.
            </p>
          </div>

          <div className="card reveal" style={{ padding: 48, transitionDelay: '0.4s' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--cl-emerald)', marginBottom: 16 }}>
              04 / ROADMAP
            </div>
            <h3 style={{ fontSize: 28, marginBottom: 16, fontWeight: 800 }}>24-Month Crawl Velocity</h3>
            <p style={{ color: 'var(--cl-stone-500)', lineHeight: 1.6, fontSize: 17 }}>
              Forecast sandbox release dates, core update resilience, and long-term organic compounding through realistic crawl curves.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>SEO Practitioner Stories</h2>
          <p style={{ color: 'var(--cl-stone-500)', fontSize: 18, marginTop: 8 }}>How growth teams are eliminating SERP guesswork.</p>
        </div>

        <div className="diary-grid">
          <div className="diary-card reveal">
            <p className="diary-text">
              "SEOlabs has completely replaced our guessing game. We simulate every article's title hook, pixel width, and H2 hierarchy before drafting. Our Page One hit rate jumped from 34% to 78% in two months."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 1, background: 'var(--cl-stone-400)' }} />
              <span className="cursive" style={{ fontSize: 28, color: 'var(--cl-stone-500)' }}>Sarah T. (Organic Lead)</span>
            </div>
          </div>

          <div className="diary-card reveal" style={{ transitionDelay: '0.2s' }}>
            <p className="diary-text">
              "The AI Overview citation predictor alone is game changing. Testing our content structure against LLM information gain before publishing feels like having Google's algorithm source code right on our screen."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 1, background: 'var(--cl-stone-400)' }} />
              <span className="cursive" style={{ fontSize: 28, color: 'var(--cl-stone-500)' }}>David M. (Technical SEO)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion - Waitlist */}
      <section className="section">
        <div className="waitlist-card reveal">
          <h2 style={{ fontSize: 52, fontWeight: 800, letterSpacing: -2 }}>Ready for Page One?</h2>
          <p style={{ color: 'var(--cl-stone-500)', fontSize: 20, marginTop: 14 }}>
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
              />
              <button type="submit">Join Lab Access</button>
            </form>
          )}

          <p style={{ marginTop: 28, fontSize: 14, color: 'var(--cl-stone-400)', fontWeight: 600 }}>
            Zero risk. Immediate simulation. High-impact rankings.
          </p>
        </div>
      </section>

      <footer style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--cl-stone-400)', fontSize: 14, borderTop: '1px solid var(--cl-stone-200)' }}>
        <p style={{ fontWeight: 600 }}>&copy; 2026 SEOlabs. Built for the next generation of search engine strategists.</p>
      </footer>
    </div>
  );
}
