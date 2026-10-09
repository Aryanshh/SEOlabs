'use client';
import { useState } from 'react';
import { GoogleIcon, AiOverviewIcon } from '@/components/Icons';
import { analyzeTitleTag, analyzeMetaDescription } from '@/lib/seo-engine';

export default function AbTestingArenaPage() {
  const [targetKeyword, setTargetKeyword] = useState('best crm for startups');

  // Variant A
  const [titleA, setTitleA] = useState('Best CRM for Startups in 2026 (Tested & Compared)');
  const [metaA, setMetaA] = useState('We compared 15 startup CRMs based on pricing, pipeline automation, and ease of use. Discover which tool drove 3x more conversions.');

  // Variant B
  const [titleB, setTitleB] = useState('How to Choose a CRM for Your Startup: Top 7 Systems');
  const [metaB, setMetaB] = useState('Read our comprehensive guide to startup CRMs. Compare key features, customer reviews, and onboarding workflows for fast-growing teams.');

  const [simulated, setSimulated] = useState(false);

  // Analysis
  const analysisA_Title = analyzeTitleTag(titleA, targetKeyword);
  const analysisA_Meta = analyzeMetaDescription(metaA, targetKeyword);

  const analysisB_Title = analyzeTitleTag(titleB, targetKeyword);
  const analysisB_Meta = analyzeMetaDescription(metaB, targetKeyword);

  const scoreA = Math.round((analysisA_Title.score * 0.6 + analysisA_Meta.score * 0.4) * 100);
  const scoreB = Math.round((analysisB_Title.score * 0.6 + analysisB_Meta.score * 0.4) * 100);

  const ctrA = scoreA >= 85 ? 31.5 : scoreA >= 70 ? 15.2 : 6.8;
  const ctrB = scoreB >= 85 ? 31.5 : scoreB >= 70 ? 15.2 : 6.8;

  const estimatedVol = 6400;
  const clicksA = Math.round(estimatedVol * (ctrA / 100));
  const clicksB = Math.round(estimatedVol * (ctrB / 100));

  const winMargin = clicksA - clicksB;
  const winner = winMargin > 30 ? 'VARIANT_A' : winMargin < -30 ? 'VARIANT_B' : 'TIE';

  return (
    <div>
      <div className="page-header">
        <h1>A/B SERP Split-Test Arena</h1>
        <p>Pit two title hooks and meta descriptions head-to-head to forecast organic CTR and ranking differentials</p>
      </div>

      {/* Target Keyword Bar */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="input-group">
          <label>Target Query / Keyword for Match Scoring</label>
          <input
            className="input"
            value={targetKeyword}
            onChange={(e) => setTargetKeyword(e.target.value)}
            placeholder="e.g. best crm for startups"
          />
        </div>
      </div>

      {/* Side by Side Variant Inputs */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Variant A */}
        <div className="card" style={{ borderColor: winner === 'VARIANT_A' && simulated ? 'var(--accent-primary)' : undefined }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span className="badge badge-emerald">Variant A</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>
              {titleA.length} chars · {analysisA_Title.pixelWidth}px
            </span>
          </div>

          <div className="input-group" style={{ marginBottom: 14 }}>
            <label>Title Tag (&lt;title&gt;)</label>
            <input
              className="input"
              value={titleA}
              onChange={(e) => setTitleA(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Meta Description</label>
            <textarea
              className="textarea"
              rows={3}
              value={metaA}
              onChange={(e) => setMetaA(e.target.value)}
            />
          </div>
        </div>

        {/* Variant B */}
        <div className="card" style={{ borderColor: winner === 'VARIANT_B' && simulated ? 'var(--accent-primary)' : undefined }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span className="badge badge-yellow">Variant B</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>
              {titleB.length} chars · {analysisB_Title.pixelWidth}px
            </span>
          </div>

          <div className="input-group" style={{ marginBottom: 14 }}>
            <label>Title Tag (&lt;title&gt;)</label>
            <input
              className="input"
              value={titleB}
              onChange={(e) => setTitleB(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Meta Description</label>
            <textarea
              className="textarea"
              rows={3}
              value={metaB}
              onChange={(e) => setMetaB(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => setSimulated(true)}
        style={{ width: '100%', marginBottom: 24 }}
      >
        Run Head-to-Head Split Simulation
      </button>

      {/* Split Simulation Verdict */}
      {simulated && (
        <div className="animate-slide-right">
          {/* Winner Banner */}
          <div
            className="card"
            style={{
              marginBottom: 24,
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
              borderColor: 'var(--accent-primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>🏆</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>
                  Winner Verdict:{' '}
                  {winner === 'VARIANT_A'
                    ? 'Variant A Wins the SERP'
                    : winner === 'VARIANT_B'
                    ? 'Variant B Wins the SERP'
                    : 'Statistically Inconclusive / Tie'}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
                  {winner === 'VARIANT_A'
                    ? `Variant A yields +${Math.abs(winMargin)} more monthly organic search clicks with higher click-trigger density.`
                    : winner === 'VARIANT_B'
                    ? `Variant B yields +${Math.abs(winMargin)} more monthly organic search clicks with superior intent framing.`
                    : 'Both variants have identical optimization scores and pixel widths.'}
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Matrix */}
          <div className="grid-2">
            <div className="card">
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Variant A Metrics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Composite CTR Score:</span>
                  <strong>{scoreA}/100</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated SERP CTR:</span>
                  <strong>{ctrA}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Projected Monthly Clicks:</span>
                  <strong>{clicksA.toLocaleString()} clicks</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Google Desktop Truncation:</span>
                  <strong style={{ color: analysisA_Title.isTruncated ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
                    {analysisA_Title.isTruncated ? 'Yes (Ellipsis)' : 'No (Optimal)'}
                  </strong>
                </div>
                <div style={{ marginTop: 8, padding: 10, background: '#F8FAFC', borderRadius: 8, fontSize: 12 }}>
                  {analysisA_Title.feedback}
                </div>
              </div>
            </div>

            <div className="card">
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Variant B Metrics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Composite CTR Score:</span>
                  <strong>{scoreB}/100</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated SERP CTR:</span>
                  <strong>{ctrB}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Projected Monthly Clicks:</span>
                  <strong>{clicksB.toLocaleString()} clicks</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Google Desktop Truncation:</span>
                  <strong style={{ color: analysisB_Title.isTruncated ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
                    {analysisB_Title.isTruncated ? 'Yes (Ellipsis)' : 'No (Optimal)'}
                  </strong>
                </div>
                <div style={{ marginTop: 8, padding: 10, background: '#F8FAFC', borderRadius: 8, fontSize: 12 }}>
                  {analysisB_Title.feedback}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
