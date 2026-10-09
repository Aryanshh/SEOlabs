'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface UserData {
  totalXP: number;
  currentLevel: number;
  tierDisplay: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<UserData | null>(null);

  useEffect(() => {
    fetch('/api/user/progress')
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>SEO Specialist Profile</h1>
        <p>Manage your algorithmic simulation credentials and laboratory profile</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 24,
                background: 'var(--gradient-emerald)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              {session?.user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>{session?.user?.name || 'Aryan SEO'}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{session?.user?.email || 'demo@seolabs.ai'}</p>
              <span className="badge badge-emerald" style={{ marginTop: 8 }}>
                {progress?.tierDisplay || 'SERP Scout'} · Level {progress?.currentLevel || 8}
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Total Algorithm XP</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-primary)' }}>
              {progress?.totalXP?.toLocaleString() || '1,450'} XP
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Lab Capabilities</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
              <span>Full Google Search SERP Simulator</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
              <span>Google AI Overviews &amp; GEO Citation Predictor</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
              <span>Head-to-Head A/B Split Test Arena</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
              <span>E-E-A-T &amp; Helpful Content System Validator</span>
            </li>
          </ul>

          <div style={{ marginTop: 24 }}>
            <Link href="/dashboard/create" className="btn btn-primary">
              Launch SEO Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
