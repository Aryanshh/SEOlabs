'use client';
import { usePathname } from 'next/navigation';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './dashboard.css';

interface ProgressData {
  totalXP: number;
  currentLevel: number;
  seoTier: string;
  tierDisplay: string;
}

function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetch('/api/user/progress')
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, []);

  const links = [
    { href: '/dashboard', icon: '○', label: 'Overview' },
    { href: '/dashboard/create', icon: '＋', label: 'SEO Studio' },
    { href: '/dashboard/simulations', icon: '◷', label: 'Experiments' },
    { href: '/dashboard/ab-testing', icon: '⚡', label: 'Split Arena' },
    { href: '/dashboard/analytics', icon: '▤', label: 'SERP Insights' },
    { href: '/dashboard/progress', icon: '☆', label: 'Progression' },
    { href: '/dashboard/leaderboard', icon: '△', label: 'Leaderboard' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-circle" />
        </div>
        <span className="sidebar-title">SEOlabs</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">SERP Flight Deck</div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
          >
            <span className="link-icon">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-actions">
          <Link href="/dashboard/profile" className="user-action-link">
            Profile
          </Link>
          <Link href="/dashboard/settings" className="user-action-link">
            Settings
          </Link>
          <Link href="/" className="user-action-link">
            Landing
          </Link>
        </div>

        <div className="sidebar-user-card">
          <div className="sidebar-avatar">
            {session?.user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {session?.user?.name || 'Aryan SEO'}
            </div>
            <div className="sidebar-user-tier">
              {progress?.totalXP !== undefined
                ? `Lv.${progress.currentLevel} · ${progress.tierDisplay}`
                : 'Lv.8 · SERP Scout'}
            </div>
          </div>
          <button
            className="logout-btn"
            onClick={() => signOut({ callbackUrl: '/' })}
            title="Sign out"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}

function DashboardTopbar() {
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetch('/api/user/progress')
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-topbar">
      <div className="topbar-title">Search Experiment Laboratory</div>
      <div className="topbar-actions">
        <div className="topbar-xp">
          <span>⚡ XP</span>
          <span>{progress?.totalXP !== undefined ? progress.totalXP.toLocaleString() : '1,450'}</span>
        </div>
        <Link href="/dashboard/create" className="btn btn-accent btn-sm">
          + New Experiment
        </Link>
      </div>
    </div>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <main className="dashboard-main">
        <DashboardTopbar />
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DashboardShell>{children}</DashboardShell>
    </SessionProvider>
  );
}
