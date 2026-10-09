'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleIcon, AiOverviewIcon, BingIcon, YouTubeIcon, AmazonIcon, LocalMapsIcon } from '@/components/Icons';

interface SimulationItem {
  id: string;
  searchEngine: string;
  searchIntent: string;
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
  algorithmFactors: Record<string, { score: number; weight: number; feedback: string }> | null;
  recommendations: string[];
  timeline: { month: number; label: string; predictedRank: number; projectedClicks: number }[];
  createdAt: string;
  experiment?: {
    title: string;
    targetKeyword: string;
    body: string;
    contentType: string;
    schemaType: string;
  };
  aiIntentMatch?: string;
  aiStrategicAdvice?: string;
}

const ENGINE_ICONS: Record<string, React.ReactNode> = {
  GOOGLE: <GoogleIcon size={18} />,
  AI_OVERVIEW: <AiOverviewIcon size={18} />,
  BING: <BingIcon size={18} />,
  YOUTUBE: <YouTubeIcon size={18} />,
  AMAZON: <AmazonIcon size={18} />,
  LOCAL_MAPS: <LocalMapsIcon size={18} />,
};

export default function SimulationsHistoryPage() {
  const [sims, setSims] = useState<SimulationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SimulationItem | null>(null);
  const [filterEngine, setFilterEngine] = useState<string>('ALL');

  useEffect(() => {
    fetch('/api/simulations')
      .then((r) => r.json())
      .then((d) => {
        setSims(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => {
        setSims([]);
        setLoading(false);
      });
  }, []);

  const filteredSims = filterEngine === 'ALL'
    ? sims
    : sims.filter((s) => s.searchEngine === filterEngine);

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>Experiments History</h1>
          <p>Browsing simulated search experiments</p>
        </div>
        <div className="grid-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: 160 }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Experiments History</h1>
          <p>{sims.length} simulated search test{sims.length !== 1 ? 's' : ''} recorded in lab</p>
        </div>
        <Link href="/dashboard/create" className="btn btn-primary">
          + New Experiment
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 6 }}>
        {['ALL', 'GOOGLE', 'AI_OVERVIEW', 'BING', 'YOUTUBE'].map((eng) => (
          <button
            key={eng}
            type="button"
            className={`btn btn-sm ${filterEngine === eng ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterEngine(eng)}
          >
            {eng.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {filteredSims.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🧪</div>
          <h3 style={{ marginBottom: 8, fontWeight: 700 }}>No Experiments Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
            {filterEngine !== 'ALL' ? `No experiments recorded for ${filterEngine}.` : 'Head over to the SEO Studio to run your first simulation!'}
          </p>
          <Link href="/dashboard/create" className="btn btn-primary">
            Launch SEO Studio
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 24 }}>
          {/* List of experiments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredSims.map((sim) => (
              <div
                key={sim.id}
                className="card"
                style={{
                  cursor: 'pointer',
                  borderColor: selected?.id === sim.id ? 'var(--accent-primary)' : undefined,
                  boxShadow: selected?.id === sim.id ? '0 4px 20px -2px rgba(5, 150, 105, 0.15)' : undefined,
                }}
                onClick={() => setSelected(sim)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', width: 28 }}>
                    {ENGINE_ICONS[sim.searchEngine] || <GoogleIcon size={18} />}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sim.experiment?.title || 'Untitled Test'}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      Keyword: &ldquo;{sim.experiment?.targetKeyword}&rdquo; · {sim.searchEngine} · {new Date(sim.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, fontSize: 13, borderTop: '1px solid var(--border-color)', paddingTop: 10 }}>
                  <span>
                    <strong>Rank:</strong> #{sim.predictedRank.toFixed(1)}
                  </span>
                  <span>
                    <strong>CTR:</strong> {sim.predictedCtr}%
                  </span>
                  <span>
                    <strong>Clicks:</strong> {sim.monthlyClicks.toLocaleString()}/mo
                  </span>
                  <span style={{ color: 'var(--accent-violet)' }}>
                    <strong>GEO:</strong> {sim.geoCitationScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Drilldown Panel */}
          {selected && (
            <div className="animate-slide-right">
              <div className="card" style={{ position: 'sticky', top: 90 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800 }}>Experiment Telemetry</h3>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>
                    ✕ Close
                  </button>
                </div>

                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
                  {selected.experiment?.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
                  Target: &ldquo;{selected.experiment?.targetKeyword}&rdquo; · Schema: {selected.experiment?.schemaType}
                </div>

                {/* Metrics Matrix */}
                <div className="grid-2" style={{ gap: 10, marginBottom: 20 }}>
                  {[
                    { label: 'Predicted SERP Rank', val: `#${selected.predictedRank.toFixed(1)}` },
                    { label: 'Predicted CTR', val: `${selected.predictedCtr}%` },
                    { label: 'Monthly Clicks', val: selected.monthlyClicks.toLocaleString() },
                    { label: 'Traffic Value / Mo', val: `$${selected.trafficValue.toLocaleString()}` },
                    { label: 'AI Overview GEO Score', val: `${selected.geoCitationScore}%` },
                    { label: 'E-E-A-T Score', val: `${selected.eeatScore}/100` },
                    { label: 'Helpful Content Index', val: `${selected.helpfulContentScore}/100` },
                    { label: 'Overall SEO Score', val: `${selected.overallSeoScore}/100` },
                  ].map((m) => (
                    <div
                      key={m.label}
                      style={{
                        padding: '10px 14px',
                        background: 'var(--bg-glass)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{m.val}</div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                {selected.recommendations && selected.recommendations.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                      Strategic Recommendations
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {selected.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '8px 12px',
                            background: '#F8FAFC',
                            borderRadius: 8,
                            fontSize: 12,
                            lineHeight: 1.4,
                          }}
                        >
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Advice */}
                {selected.aiStrategicAdvice && (
                  <div
                    style={{
                      padding: 14,
                      background: 'rgba(139, 92, 246, 0.06)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: 4 }}>
                      AI Strategic Advice
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                      {selected.aiStrategicAdvice}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
