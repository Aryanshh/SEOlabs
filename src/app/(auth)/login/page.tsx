'use client';
import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import '../auth.css';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const isRegistered = searchParams.get('registered') === 'true';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError('An error occurred during authentication');
    }
    setLoading(false);
  };

  const handleFillDemo = () => {
    setEmail('demo@seolabs.ai');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="auth-card animate-scale-in">
      <div className="auth-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-primary)' }} />
          <span style={{ fontWeight: 800, fontSize: 18 }}>seolabs</span>
        </div>
        <h1>Access Flight Deck</h1>
        <p>Sign in to your search experimentation lab</p>
      </div>

      {isRegistered && (
        <div style={{
          padding: '10px 14px',
          background: 'rgba(5, 150, 105, 0.1)',
          border: '1px solid rgba(5, 150, 105, 0.3)',
          borderRadius: 8,
          color: '#059669',
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 16,
          textAlign: 'center'
        }}>
          Account created! Please sign in below.
        </div>
      )}

      {error && <div className="auth-error" style={{ marginBottom: 16 }}>{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label>Work Email</label>
          <input
            type="email"
            className="input"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Authenticating...' : 'Sign In to SEOlabs'}
        </button>

        <button
          type="button"
          onClick={handleFillDemo}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', marginTop: 8, fontSize: 12 }}
        >
          ⚡ Quick Fill Demo Account
        </button>
      </form>

      <div className="auth-footer">
        Don&apos;t have an account? <Link href="/register">Create one here</Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="auth-container">
      <Suspense fallback={<div className="auth-card" style={{ textAlign: 'center', padding: 40 }}>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
