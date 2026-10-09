'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleIcon, AiOverviewIcon, BingIcon, YouTubeIcon, AmazonIcon, LocalMapsIcon } from '@/components/Icons';

interface AnalyticsData {
  overview: {
    totalSimulations: number;
    avgRank: number;
    avgSeoScore: number;
    avgGeoScore: number;
    totalTrafficValue: number;
    totalClicks: number;
    badgesEarned: number;
    level: number;
    tier: string;
  };
  engineDistribution: { engine: string; count: number }[];
  rankBuckets: { top3: number; page1: number; page2Plus: number };
  recentSimulations: Array<{
    id: string;
    searchEngine: string;
    searchIntent: string;
    predictedRank: number;
    predictedCtr: number;
    monthlyClicks: number;
    trafficValue: number;
    overallSeoScore: number;
    geoCitationScore: number;
    createdAt: string;
    title: string;
    targetKeyword: string;
  }>;
}

const ENGINE_LABELS: Record<string, { name: string; icon: React.ReactNode }> = {
  GOOGLE: { name: 'Google Search', icon: <GoogleIcon size={16} /> },
  AI_OVERVIEW: { name: 'AI Overviews (GEO)', icon: <AiOverviewIcon size={16} /> },
  BING: { name: 'Bing Copilot', icon: <BingIcon size={16} /> },
  YOUTUBE: { name: 'YouTube vSEO', icon: <YouTubeIcon size={16} /> },
  AMAZON: { name: 'Amazon A9', icon: <AmazonIcon size={16} /> },
  LOCAL_MAPS: { name: 'Local Maps Pack', icon: <LocalMapsIcon size={16} /> },
};

export default function DashboardOverviewPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>SERP Command Center</h1>
          <p>Real-time telemetry on simulated rankings and algorithmic experiments</p>
        </div>
        <div className="grid-4" style={{ marginBottom: 24 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: 130 }} />
          ))}
        </div>
      </div>
    );
  }

  const o = data?.overview;

  return (
    <div>
      <div className="page-header">
        <h1>SERP Command Center</h1>
        <p>Real-time telemetry on simulated rankings, GEO citations, and organic search tests</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <div className="stat-card animate-fade-in">
          <div className="stat-icon-text">EXPERIMENTS</div>
          <div className="stat-value">{o?.totalSimulations || 0}</div>
          <div className="stat-label">Total Simulated Tests</div>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-icon-text">AVG SERP RANK</div>
          <div className="stat-value" style={{ color: (o?.avgRank || 10) <= 3 ? 'var(--accent-primary)' : 'inherit' }}>
            #{o?.avgRank ? o.avgRank.toFixed(1) : '1.0'}
          </div>
          <div className="stat-label">Predicted Organic Position</div>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-icon-text">AI OVERVIEW GEO</div>
          <div className="stat-value" style={{ color: 'var(--accent-violet)' }}>
            {o?.avgGeoScore || 85}%
          </div>
          <div className="stat-label">AI Citation Probability</div>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-icon-text">PROJECTED TRAFFIC VALUE</div>
          <div className="stat-value" style={{ color: 'var(--accent-success)' }}>
            ${o?.totalTrafficValue ? o.totalTrafficValue.toLocaleString() : '0'}
          </div>
          <div className="stat-label">Estimated Monthly CPC Value</div>
        </div>
      </div>

      {/* Quick Actions + Engine Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div className="card animate-fade-in">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Quick Lab Operations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/dashboard/create" className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
              <span>＋</span> Launch New SEO Studio Experiment
            </Link>
            <Link href="/dashboard/ab-testing" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <span>⚡</span> Head-to-Head A/B Split Test Arena
            </Link>
            <Link href="/dashboard/progress" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <span>☆</span> Progression, Tier Ranks &amp; Badges
            </Link>
            <Link href="/dashboard/analytics" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <span>▤</span> Deep SERP &amp; CTR Analytics
            </Link>
          </div>
        </div>

        <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Search Engine Coverage</h3>
          {data?.engineDistribution && data.engineDistribution.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {data.engineDistribution.map((e) => {
                const total = data.engineDistribution.reduce((acc, curr) => acc + curr.count, 0);
                const pct = total > 0 ? Math.round((e.count / total) * 100) : 0;
                const engineMeta = ENGINE_LABELS[e.engine] || { name: e.engine, icon: null };
                return (
                  <div key={e.engine}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13, alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                        {engineMeta.icon}
                        {engineMeta.name}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {e.count} tests ({pct}%)
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: 14, padding: '24px 0', textAlign: 'center' }}>
              Run simulations to analyze platform distribution across Google, AI Overviews, Bing, and YouTube.
            </div>
          )}
        </div>
      </div>

      {/* Recent Experiments */}
      <div className="card animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Search Experiments</h3>
          <Link href="/dashboard/simulations" className="btn btn-ghost btn-sm">
            View All Experiments →
          </Link>
        </div>

        {data?.recentSimulations && data.recentSimulations.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.recentSimulations.map((sim) => {
              const engineMeta = ENGINE_LABELS[sim.searchEngine] || { name: sim.searchEngine, icon: null };
              return (
                <div
                  key={sim.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '14px 18px',
                    background: 'var(--bg-glass)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', width: 28 }}>
                    {engineMeta.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sim.title || 'Untitled Test'}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 8, marginTop: 2 }}>
                      <span>Target: &ldquo;{sim.targetKeyword}&rdquo;</span>
                      <span>·</span>
                      <span>{new Date(sim.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: sim.predictedRank <= 3 ? 'var(--accent-primary)' : 'inherit' }}>
                        #{sim.predictedRank.toFixed(1)}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rank</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{sim.predictedCtr}%</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CTR</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-violet)' }}>
                        {sim.geoCitationScore}%
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>GEO Cit.</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>No Experiments Simulated Yet</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
              Launch your first test in the SEO Studio to see predicted Google rank, CTR, and AI Overview citations.
            </p>
            <Link href="/dashboard/create" className="btn btn-primary">
              Launch First SERP Simulation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
