'use client';
import { useEffect, useState } from 'react';

interface ProgressData {
  totalXP: number;
  currentLevel: number;
  seoTier: string;
  tierDisplay: string;
  currentThresholdXP: number;
  requiredThresholdXP: number;
  percentage: number;
  nextLevelXP: number;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    iconEmoji: string;
    category: string;
    xpReward: number;
    earned: boolean;
    earnedAt: string | null;
  }>;
  unlockedFeatures: Array<{
    name: string;
    level: number;
    unlocked: boolean;
  }>;
}

export default function ProgressionPage() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/progress')
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
          <h1>SEO Career Progression</h1>
          <p>Levels, milestones, and algorithm mastery badges</p>
        </div>
        <div className="skeleton" style={{ height: 200, marginBottom: 24 }} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>SEO Career Progression</h1>
        <p>Advance through algorithm authority tiers, unlock simulator features, and earn SERP mastery badges</p>
      </div>

      {/* Level & XP Hero Card */}
      <div
        className="card"
        style={{
          marginBottom: 32,
          background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)',
          borderColor: 'var(--accent-primary)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: 8 }}>
              {data?.tierDisplay || 'SERP Scout'} Tier
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>
              Level {data?.currentLevel || 8} · Algorithm Authority
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent-primary)' }}>
              {data?.totalXP.toLocaleString()} XP
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Next Level at {data?.nextLevelXP.toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
            <span>Current Level Progress</span>
            <span style={{ fontWeight: 700 }}>{data?.percentage}% Completed</span>
          </div>
          <div className="progress-bar" style={{ height: 12 }}>
            <div className="progress-fill" style={{ width: `${data?.percentage}%` }} />
          </div>
        </div>
      </div>

      {/* Unlocked Lab Features */}
      <div className="card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Simulator Feature Unlocks</h3>
        <div className="grid-2">
          {data?.unlockedFeatures.map((feat) => (
            <div
              key={feat.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                background: feat.unlocked ? '#F0FDF4' : '#F8FAFC',
                border: `1px solid ${feat.unlocked ? '#BBF7D0' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: feat.unlocked ? 'var(--accent-primary)' : 'var(--border-color)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {feat.unlocked ? '✓' : `L${feat.level}`}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: feat.unlocked ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {feat.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  {feat.unlocked ? 'Unlocked & Active' : `Unlocks at Level ${feat.level}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="card">
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>SERP Mastery Badges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {data?.badges.map((b) => (
            <div
              key={b.id}
              style={{
                padding: 20,
                borderRadius: 'var(--radius-md)',
                background: b.earned ? 'white' : '#FAFAF9',
                border: `1px solid ${b.earned ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                boxShadow: b.earned ? '0 4px 14px rgba(5, 150, 105, 0.08)' : 'none',
                opacity: b.earned ? 1 : 0.65,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{b.iconEmoji}</span>
                <span className={`badge ${b.earned ? 'badge-emerald' : 'badge-yellow'}`}>
                  {b.earned ? 'UNLOCKED' : `+${b.xpReward} XP`}
                </span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{b.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {b.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
