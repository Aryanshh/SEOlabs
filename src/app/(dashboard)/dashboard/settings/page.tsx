'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Laboratory Settings</h1>
        <p>Configure search engine simulator keys, AI models, and algorithmic parameters</p>
      </div>

      <div className="card" style={{ maxWidth: 640 }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="input-group">
            <label>Google Gemini API Key (For AI Pro SEO Analysis)</label>
            <input
              type="password"
              className="input"
              placeholder="Enter your Gemini API key (optional)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Used for automated information gain auditing and strategic recommendations.
            </span>
          </div>

          <div className="input-group">
            <label>Default Search Engine for New Tests</label>
            <select className="select" defaultValue="GOOGLE">
              <option value="GOOGLE">Google Search (RankBrain + Helpful Content)</option>
              <option value="AI_OVERVIEW">AI Overviews (GEO Generative Citation)</option>
              <option value="BING">Bing Copilot</option>
            </select>
          </div>

          <div className="input-group">
            <label>SERP CTR Curve Preset</label>
            <select className="select" defaultValue="MODERN">
              <option value="MODERN">2026 Modern Blend (Desktop + Mobile + AI Overviews)</option>
              <option value="CLASSIC">Classic 10 Blue Links</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="submit" className="btn btn-primary">
              Save Laboratory Preferences
            </button>
            {saved && (
              <span style={{ color: 'var(--accent-primary)', fontSize: 13, fontWeight: 700 }}>
                ✓ Preferences Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
