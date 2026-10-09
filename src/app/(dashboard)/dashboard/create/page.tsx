'use client';
import { useState } from 'react';
import { GoogleIcon, AiOverviewIcon, BingIcon, YouTubeIcon, AmazonIcon, LocalMapsIcon } from '@/components/Icons';
import { SerpPreview } from '@/components/SerpPreview';

const SEARCH_ENGINES = [
  { id: 'GOOGLE', icon: <GoogleIcon size={18} />, name: 'Google Search' },
  { id: 'AI_OVERVIEW', icon: <AiOverviewIcon size={18} />, name: 'AI Overviews (GEO)' },
  { id: 'BING', icon: <BingIcon size={18} />, name: 'Bing Copilot' },
  { id: 'YOUTUBE', icon: <YouTubeIcon size={18} />, name: 'YouTube vSEO' },
  { id: 'AMAZON', icon: <AmazonIcon size={18} />, name: 'Amazon A9' },
  { id: 'LOCAL_MAPS', icon: <LocalMapsIcon size={18} />, name: 'Local Maps Pack' },
];

const CONTENT_TYPES = [
  { id: 'BLOG_ARTICLE', label: 'Blog Article' },
  { id: 'PILLAR_GUIDE', label: 'Pillar Guide' },
  { id: 'PRODUCT_PAGE', label: 'Product Page' },
  { id: 'LANDING_PAGE', label: 'Landing Page' },
  { id: 'CASE_STUDY', label: 'Case Study' },
  { id: 'LOCAL_SERVICE', label: 'Local Service' },
];

const SEARCH_INTENTS = [
  { id: 'INFORMATIONAL', label: 'Informational (Guides, What-is)' },
  { id: 'COMMERCIAL', label: 'Commercial (Best, Reviews, Vs)' },
  { id: 'TRANSACTIONAL', label: 'Transactional (Buy, Pricing)' },
  { id: 'NAVIGATIONAL', label: 'Navigational (Brand, Portal)' },
];

const SCHEMA_TYPES = [
  { id: 'ARTICLE', label: 'Article / News' },
  { id: 'FAQ_PAGE', label: 'FAQ Page (Rich Accordion)' },
  { id: 'HOW_TO', label: 'HowTo (Rich Steps)' },
  { id: 'PRODUCT', label: 'Product (Rich Review Stars)' },
  { id: 'LOCAL_BUSINESS', label: 'Local Business (NAP)' },
  { id: 'NONE', label: 'None / Standard' },
];

interface SimulationResultState {
  simulation: {
    predictedRank: number;
    predictedCtr: number;
    monthlyImpressions: number;
    monthlyClicks: number;
    trafficValue: number;
    geoCitationScore: number;
    eeatScore: number;
    helpfulContentScore: number;
    overallSeoScore: number;
    richSnippetEligible: boolean;
    algorithmFactors: Record<string, { score: number; weight: number; feedback: string }>;
    recommendations: string[];
    timeline: { month: number; label: string; predictedRank: number; projectedClicks: number; crawlStatus: string }[];
    variantBComparison?: {
      predictedRank: number;
      predictedCtr: number;
      monthlyClicks: number;
      overallScore: number;
      winMargin: number;
      winner: 'VARIANT_A' | 'VARIANT_B' | 'TIE';
      summary: string;
    };
    aiAnalysis?: {
      intentMatch: string;
      informationGain: string;
      snippetCritique: string;
      strategicAdvice: string;
      suggestedAltTitles: string[];
      suggestedFaqItems: { question: string; answer: string }[];
    };
  };
  xpAwarded: number;
  newBadges: string[];
}

export default function CreateExperimentPage() {
  const [searchEngine, setSearchEngine] = useState('GOOGLE');
  const [contentType, setContentType] = useState('BLOG_ARTICLE');
  const [searchIntent, setSearchIntent] = useState('INFORMATIONAL');
  
  const [title, setTitle] = useState('The 10 Best AI SEO Tools for 2026 (Rank #1 Guide)');
  const [metaDesc, setMetaDesc] = useState('We tested 40+ AI SEO software suites to find the top tools that dominate Google Search and AI Overviews. Compare features, pricing, and algorithmic results.');
  const [urlSlug, setUrlSlug] = useState('/best-ai-seo-tools-2026');
  const [targetKeyword, setTargetKeyword] = useState('ai seo tools');
  const [keywordInput, setKeywordInput] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>(['generative engine optimization', 'rank tracker', 'serp simulation']);
  
  const [contentBody, setContentBody] = useState(`## What is Generative Engine Optimization (GEO)?
Generative Engine Optimization is the practice of structuring webpage data, direct factual claims, and authoritative citations so that Large Language Models—like Google AI Overviews and SearchGPT—cite your content as their primary source.

## How We Tested the Top AI SEO Tools
In our 90-day experiment, our organic growth team published 25 test pages across 5 domain tiers to measure crawl velocity and indexing speed.

* **Tool A:** Best for real-time keyword clustering.
* **Tool B:** Best for rich schema validation and FAQ generation.
* **Tool C:** Best for automated E-E-A-T entity matching.

### Actionable Next Steps
1. Structure your answers in direct 2-sentence summaries.
2. Embed valid JSON-LD schema on all pillar articles.`);

  const [schemaType, setSchemaType] = useState('FAQ_PAGE');

  // Split Test state
  const [isSplitTest, setIsSplitTest] = useState(false);
  const [variantBTitle, setVariantBTitle] = useState('AI SEO Tools: Complete 2026 Ranking Benchmark & Case Studies');
  const [variantBMeta, setVariantBMeta] = useState('Discover how modern teams rank in Google AI Overviews and traditional SERPs. See full benchmarks, case study metrics, and live rankings.');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResultState | null>(null);
  const [error, setError] = useState('');

  const addSecondaryKeyword = () => {
    const kw = keywordInput.trim();
    if (kw && !secondaryKeywords.includes(kw)) {
      setSecondaryKeywords([...secondaryKeywords, kw]);
      setKeywordInput('');
    }
  };

  const removeSecondaryKeyword = (kw: string) => {
    setSecondaryKeywords(secondaryKeywords.filter((k) => k !== kw));
  };

  const runSimulation = async () => {
    if (!title.trim() || !targetKeyword.trim() || !contentBody.trim()) {
      setError('Please provide a title, primary keyword, and content body.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      // 1. Create experiment draft
      const expRes = await fetch('/api/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchEngine,
          contentType,
          searchIntent,
          title,
          metaDescription: metaDesc,
          urlSlug,
          targetKeyword,
          secondaryKeywords,
          contentBody,
          schemaType,
          isSplitTest,
          variantBTitle: isSplitTest ? variantBTitle : undefined,
          variantBMeta: isSplitTest ? variantBMeta : undefined,
        }),
      });

      const expData = await expRes.json();
      if (!expRes.ok) throw new Error(expData.error || 'Failed to create experiment');

      // 2. Run simulation engine
      const simRes = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experimentId: expData.id }),
      });

      const simData = await simRes.json();
      if (!simRes.ok) throw new Error(simData.error || 'Simulation failed');

      setResult({
        simulation: simData.simulation,
        xpAwarded: simData.xpAwarded + (expData.xpAwarded || 0),
        newBadges: simData.newBadges || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed');
    }
    setLoading(false);
  };

  const wordCount = contentBody.trim().split(/\s+/).filter(Boolean).length;
  const titleLength = title.length;
  const metaLength = metaDesc.length;

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'var(--accent-success)';
    if (score >= 0.6) return 'var(--accent-secondary)';
    if (score >= 0.4) return 'var(--accent-warning)';
    return 'var(--accent-danger)';
  };

  return (
    <div>
      <div className="page-header">
        <h1>SEO Experiment Studio</h1>
        <p>Test title tags, keyword density, schema markup, and SERP algorithms in a risk-free flight lab</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1.1fr 0.9fr', gap: 24 }}>
        {/* Left: Input Studio */}
        <div>
          {/* Engine Selector */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 0.5 }}>
              Target Search Engine
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SEARCH_ENGINES.map((eng) => (
                <button
                  key={eng.id}
                  type="button"
                  className={`engine-chip ${searchEngine === eng.id ? 'active' : ''}`}
                  onClick={() => setSearchEngine(eng.id)}
                >
                  {eng.icon}
                  {eng.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type & Intent */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="grid-2">
              <div className="input-group">
                <label>Page / Content Type</label>
                <select className="select" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                  {CONTENT_TYPES.map((ct) => (
                    <option key={ct.id} value={ct.id}>{ct.label}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Target Search Intent</label>
                <select className="select" value={searchIntent} onChange={(e) => setSearchIntent(e.target.value)}>
                  {SEARCH_INTENTS.map((si) => (
                    <option key={si.id} value={si.id}>{si.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="input-group" style={{ marginBottom: 14 }}>
              <label>Primary Target Keyword *</label>
              <input
                className="input"
                placeholder="e.g. ai seo tools"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Secondary / LSI Keywords (Optional)</label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  className="input"
                  placeholder="Add secondary keyword..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSecondaryKeyword())}
                />
                <button type="button" className="btn btn-secondary" onClick={addSecondaryKeyword}>
                  Add
                </button>
              </div>
              {secondaryKeywords.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {secondaryKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="badge badge-emerald"
                      style={{ cursor: 'pointer' }}
                      onClick={() => removeSecondaryKeyword(kw)}
                      title="Click to remove"
                    >
                      {kw} ✕
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title & Meta */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="input-group" style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Page Title Tag (&lt;title&gt;) *</label>
                <span style={{ fontSize: 11, fontWeight: 700, color: titleLength > 60 ? 'var(--accent-danger)' : 'var(--text-muted)' }}>
                  {titleLength} / 60 chars {titleLength > 60 ? '(Truncation Risk)' : ''}
                </span>
              </div>
              <input
                className="input"
                placeholder="Captivating, keyword-rich title under 60 chars..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group" style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Meta Description Tag (&lt;meta name=&quot;description&quot;&gt;)</label>
                <span style={{ fontSize: 11, fontWeight: 700, color: metaLength > 160 ? 'var(--accent-warning)' : 'var(--text-muted)' }}>
                  {metaLength} / 160 chars
                </span>
              </div>
              <textarea
                className="textarea"
                rows={3}
                placeholder="Compelling SERP snippet that entices clicks..."
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Target URL Slug</label>
              <input
                className="input"
                placeholder="/best-ai-seo-tools-2026"
                value={urlSlug}
                onChange={(e) => setUrlSlug(e.target.value)}
              />
            </div>
          </div>

          {/* Content Body Editor */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Article / Content Body (Markdown) *
              </label>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {wordCount} words · ~{Math.ceil(wordCount / 200)} min read
              </span>
            </div>
            <textarea
              className="textarea"
              rows={8}
              placeholder="Write or paste your article markdown here. Include H2/H3 headers, direct definitions, data tables, and FAQ..."
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
            />
          </div>

          {/* Technical Schema */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="input-group">
              <label>Structured Schema Markup Type</label>
              <select className="select" value={schemaType} onChange={(e) => setSchemaType(e.target.value)}>
                {SCHEMA_TYPES.map((st) => (
                  <option key={st.id} value={st.id}>{st.label}</option>
                ))}
              </select>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                Structured data unlocks Google rich snippet accordions, FAQ pills, and star ratings.
              </span>
            </div>
          </div>

          {/* A/B Split Test Toggle */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>A/B SERP Split Test</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Test Variant A vs Variant B title and meta snippet side-by-side
                </div>
              </div>
              <button
                type="button"
                className={`btn btn-sm ${isSplitTest ? 'btn-accent' : 'btn-secondary'}`}
                onClick={() => setIsSplitTest(!isSplitTest)}
              >
                {isSplitTest ? 'Split Test Enabled' : 'Enable Split Test'}
              </button>
            </div>

            {isSplitTest && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
                <div className="input-group" style={{ marginBottom: 12 }}>
                  <label>Variant B: Alternative Title Tag</label>
                  <input
                    className="input"
                    value={variantBTitle}
                    onChange={(e) => setVariantBTitle(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Variant B: Alternative Meta Description</label>
                  <textarea
                    className="textarea"
                    rows={2}
                    value={variantBMeta}
                    onChange={(e) => setVariantBMeta(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {error && <div style={{ color: 'var(--accent-danger)', marginBottom: 16, fontWeight: 600 }}>{error}</div>}

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={runSimulation}
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Simulating Search Engine Algorithms...' : 'Run SERP Algorithmic Flight Simulation'}
          </button>
        </div>

        {/* Right: Live Preview & Simulation Results */}
        <div>
          {/* Real-time SERP Snippet Preview */}
          <SerpPreview
            title={title}
            metaDescription={metaDesc}
            urlSlug={urlSlug}
            targetKeyword={targetKeyword}
            schemaType={schemaType}
            richSnippetEligible={schemaType === 'FAQ_PAGE' || schemaType === 'HOW_TO'}
          />

          {/* Simulation Output */}
          {result && (
            <div className="animate-slide-right">
              {/* XP & Badges Notification */}
              {(result.xpAwarded > 0 || result.newBadges.length > 0) && (
                <div
                  className="card"
                  style={{
                    marginBottom: 16,
                    background: 'rgba(5, 150, 105, 0.08)',
                    borderColor: 'rgba(5, 150, 105, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="badge badge-emerald">⚡ XP +{result.xpAwarded}</span>
                  {result.newBadges.map((b) => (
                    <span key={b} className="badge badge-yellow">
                      🏆 {b} UNLOCKED
                    </span>
                  ))}
                </div>
              )}

              {/* Primary SERP Metrics */}
              <div className="grid-3" style={{ marginBottom: 16 }}>
                <div className="stat-card" style={{ textAlign: 'center' }}>
                  <div className="stat-icon-text">PREDICTED RANK</div>
                  <div className="stat-value" style={{ color: result.simulation.predictedRank <= 3 ? 'var(--accent-primary)' : 'inherit' }}>
                    #{result.simulation.predictedRank.toFixed(1)}
                  </div>
                  <div className="stat-label">
                    {result.simulation.predictedRank <= 3 ? 'Top 3 Front Page' : 'First Page'}
                  </div>
                </div>

                <div className="stat-card" style={{ textAlign: 'center' }}>
                  <div className="stat-icon-text">EST. CTR</div>
                  <div className="stat-value">{result.simulation.predictedCtr}%</div>
                  <div className="stat-label">Organic Click Rate</div>
                </div>

                <div className="stat-card" style={{ textAlign: 'center' }}>
                  <div className="stat-icon-text">AI OVERVIEW GEO</div>
                  <div className="stat-value" style={{ color: 'var(--accent-violet)' }}>
                    {result.simulation.geoCitationScore}%
                  </div>
                  <div className="stat-label">Citation Probability</div>
                </div>
              </div>

              {/* Traffic & Organic Value */}
              <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 0.5 }}>
                  Organic Traffic &amp; Value Forecast
                </div>
                <div className="grid-3">
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>
                      {result.simulation.monthlyClicks.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Projected Monthly Clicks</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>
                      {result.simulation.monthlyImpressions.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Monthly Search Impr.</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-success)' }}>
                      ${result.simulation.trafficValue.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Estimated Value / Mo</div>
                  </div>
                </div>
              </div>

              {/* Split Test Head-to-Head Winner (If applicable) */}
              {result.simulation.variantBComparison && (
                <div
                  className="card"
                  style={{
                    marginBottom: 16,
                    background: '#F8FAFC',
                    borderColor: 'var(--accent-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 16 }}>⚡</span>
                    <span style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase' }}>
                      A/B Split Test Result: {result.simulation.variantBComparison.winner.replace(/_/g, ' ')} WINS
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
                    {result.simulation.variantBComparison.summary}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 12 }}>
                    <div style={{ padding: '8px 12px', background: 'white', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                      <strong>Variant A:</strong> #{result.simulation.predictedRank} · {result.simulation.predictedCtr}% CTR · {result.simulation.monthlyClicks} clicks
                    </div>
                    <div style={{ padding: '8px 12px', background: 'white', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                      <strong>Variant B:</strong> #{result.simulation.variantBComparison.predictedRank} · {result.simulation.variantBComparison.predictedCtr}% CTR · {result.simulation.variantBComparison.monthlyClicks} clicks
                    </div>
                  </div>
                </div>
              )}

              {/* Algorithm Factor Radar */}
              <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16, letterSpacing: 0.5 }}>
                  Algorithm Factor Breakdown
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {Object.entries(result.simulation.algorithmFactors).map(([key, val]) => (
                    <div key={key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span style={{ color: getScoreColor(val.score), fontWeight: 700 }}>
                          {Math.round(val.score * 100)}%{' '}
                          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                            ({Math.round(val.weight * 100)}% wt)
                          </span>
                        </span>
                      </div>
                      <div className="progress-bar" style={{ height: 6 }}>
                        <div
                          className="progress-fill"
                          style={{ width: `${val.score * 100}%`, background: getScoreColor(val.score) }}
                        />
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                        {val.feedback}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 0.5 }}>
                  Tactical Ranking Recommendations
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.simulation.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 10,
                        padding: '10px 14px',
                        background: 'var(--bg-glass)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 13,
                        lineHeight: 1.5,
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-primary)' }}>
                        ACTION
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12-Month Projection Timeline */}
              <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16, letterSpacing: 0.5 }}>
                  12-Month Crawl Velocity &amp; Ranking Trajectory
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120, paddingBottom: 8 }}>
                  {result.simulation.timeline.map((point) => {
                    const maxClicks = Math.max(...result.simulation.timeline.map((t) => t.projectedClicks), 1);
                    const heightPct = Math.max((point.projectedClicks / maxClicks) * 100, 8);
                    return (
                      <div
                        key={point.month}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                        title={`${point.label}: Rank #${point.predictedRank.toFixed(1)} (${point.projectedClicks} clicks)`}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: `${heightPct}%`,
                            background: 'var(--gradient-emerald)',
                            borderRadius: '6px 6px 0 0',
                            transition: 'height 0.4s ease',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                  {result.simulation.timeline.map((p) => (
                    <span key={p.month}>{p.label.split(' - ')[0]}</span>
                  ))}
                </div>
              </div>

              {/* AI Pro Strategic Advice */}
              {result.simulation.aiAnalysis && (
                <div
                  className="card"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <AiOverviewIcon size={18} color="#7C3AED" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#6D28D9', textTransform: 'uppercase' }}>
                      AI Pro Algorithm Audit
                    </span>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                    <strong>Search Intent:</strong> {result.simulation.aiAnalysis.intentMatch}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                    <strong>Information Gain:</strong> {result.simulation.aiAnalysis.informationGain}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                    <strong>Strategic Advice:</strong> {result.simulation.aiAnalysis.strategicAdvice}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
