'use client';
import { useEffect, useState } from 'react';

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  level: number;
  tier: string;
  totalXP: number;
  simulationsCount: number;
  bestRank: number;
  badgesCount: number;
}

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((d) => {
        setLeaders(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>Algorithm Tacticians Leaderboard</h1>
          <p>Global ranking of SEO practitioners and simulator experimenters</p>
        </div>
        <div className="skeleton" style={{ height: 300 }} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Algorithm Tacticians Leaderboard</h1>
        <p>Global ranking of SEO practitioners, SERP experimenters, and GEO specialists</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              <th style={{ padding: '16px 20px', width: 60 }}>Rank</th>
              <th style={{ padding: '16px 20px' }}>Practitioner</th>
              <th style={{ padding: '16px 20px' }}>Tier / Level</th>
              <th style={{ padding: '16px 20px' }}>Best SERP Rank</th>
              <th style={{ padding: '16px 20px' }}>Simulations</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Total XP</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((u) => (
              <tr
                key={u.id}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  background: u.rank === 1 ? 'rgba(245, 158, 11, 0.04)' : undefined,
                  transition: 'background 0.2s',
                }}
              >
                <td style={{ padding: '18px 20px', fontWeight: 800 }}>
                  {u.rank === 1 ? '👑 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : `#${u.rank}`}
                </td>
                <td style={{ padding: '18px 20px', fontWeight: 700 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: 'var(--gradient-emerald)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {u.name[0]?.toUpperCase() || 'S'}
                    </div>
                    <span>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: '18px 20px' }}>
                  <span className="badge badge-emerald">Lv.{u.level} · {u.tier}</span>
                </td>
                <td style={{ padding: '18px 20px', fontWeight: 700, color: u.bestRank <= 3 ? 'var(--accent-primary)' : 'inherit' }}>
                  #{u.bestRank.toFixed(1)}
                </td>
                <td style={{ padding: '18px 20px' }}>
                  {u.simulationsCount} tests
                </td>
                <td style={{ padding: '18px 20px', textAlign: 'right', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {u.totalXP.toLocaleString()} XP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
