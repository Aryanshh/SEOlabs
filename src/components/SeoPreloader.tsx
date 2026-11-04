'use client';

import React, { useEffect, useState } from 'react';

interface SeoPreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // default ~2200ms
}

const SEO_NODES = [
  {
    id: 'crawl',
    label: 'CRAWL MATRIX',
    sublabel: 'Googlebot & Bingbot',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    color: '#059669',
  },
  {
    id: 'rank',
    label: 'SERP RANK #1',
    sublabel: 'Position & CTR Curves',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <circle cx="12" cy="19" r="2" fill="currentColor" />
      </svg>
    ),
    color: '#F59E0B',
  },
  {
    id: 'geo',
    label: 'AI OVERVIEWS',
    sublabel: 'GEO & LLM Citations',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
        <path d="M5 3v4M3 5h4" />
      </svg>
    ),
    color: '#8B5CF6',
  },
  {
    id: 'schema',
    label: 'SCHEMA GRAPH',
    sublabel: 'JSON-LD Entity Triples',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    color: '#0284C7',
  },
  {
    id: 'cwv',
    label: 'CORE VITALS',
    sublabel: 'Pixel Width & INP/LCP',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: '#10B981',
  },
];

const TELEMETRY_LOGS = [
  'Initializing Algorithmic SERP Flight Simulator...',
  'Parsing Googlebot & Bingbot crawl directives...',
  'Calibrating RankBrain & Helpful Content neural weights...',
  'Synthesizing Google AI Overviews citation probability...',
  'Validating Schema.org Knowledge Graph structured triples...',
  'Simulating Desktop & Mobile title pixel boundaries...',
  'Systems calibrated. Launching SEOlabs...',
];

export default function SeoPreloader({ onComplete, minDuration = 2200 }: SeoPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if session has already calibrated to keep returning navigation instantaneous
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem('seolabs_calibrated');
    const totalDuration = hasSeen ? 1200 : minDuration;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(rawPct);

      // Rotate nodes based on progress
      const nodeStep = Math.min(SEO_NODES.length - 1, Math.floor((rawPct / 100) * SEO_NODES.length));
      setActiveNodeIndex(nodeStep);

      // Rotate telemetry logs
      const logStep = Math.min(TELEMETRY_LOGS.length - 1, Math.floor((rawPct / 100) * TELEMETRY_LOGS.length));
      setLogIndex(logStep);

      if (rawPct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsDone(true);
            try {
              sessionStorage.setItem('seolabs_calibrated', 'true');
            } catch {
              // ignore quota or privacy errors
            }
            if (onComplete) onComplete();
          }, 450);
        }, 150);
      }
    }, 35);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
        setIsFading(true);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [minDuration, onComplete]);

  if (isDone) return null;

  const currentNode = SEO_NODES[activeNodeIndex] || SEO_NODES[0];

  return (
    <div
      className={`seo-preloader-root ${isFading ? 'seo-preloader-fade' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="SEOlabs Flight Simulator Loading"
    >
      <div className="seo-preloader-backdrop" />
      <div className="seo-preloader-radar-bg" />

      {/* Main Container */}
      <div className="seo-preloader-hud">
        {/* Top Header Tagline */}
        <div className="seo-preloader-top">
          <div className="seo-preloader-badge">
            <span className="seo-preloader-ping" />
            <span className="seo-preloader-brand">SEOLABS™ FLIGHT SIMULATOR</span>
          </div>
          <button
            type="button"
            className="seo-preloader-skip"
            onClick={() => {
              setIsFading(true);
              setTimeout(() => {
                setIsDone(true);
                if (onComplete) onComplete();
              }, 200);
            }}
            title="Press Esc to Skip"
          >
            SKIP [ESC]
          </button>
        </div>

        {/* Central Radar Visual */}
        <div className="seo-preloader-radar-stage">
          {/* Concentric Calibration Rings */}
          <div className="seo-preloader-ring ring-outer" />
          <div className="seo-preloader-ring ring-mid" />
          <div className="seo-preloader-ring ring-inner" />

          {/* Rotating Laser Sweep */}
          <div className="seo-preloader-sweep" />

          {/* Orbiting SEO Sensor Nodes */}
          {SEO_NODES.map((node, i) => {
            const angle = (i / SEO_NODES.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 105; // radius in px
            const x = Math.round(Math.cos(angle) * radius);
            const y = Math.round(Math.sin(angle) * radius);
            const isActive = i === activeNodeIndex;
            const isCompleted = i < activeNodeIndex;

            return (
              <div
                key={node.id}
                className={`seo-node-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  borderColor: isActive ? node.color : undefined,
                  boxShadow: isActive ? `0 0 20px ${node.color}55` : undefined,
                }}
                title={node.label}
              >
                <div className="seo-node-icon" style={{ color: isActive ? node.color : undefined }}>
                  {node.icon}
                </div>
              </div>
            );
          })}

          {/* Central Logo Radar Hub */}
          <div className="seo-radar-center">
            <div className="seo-radar-core">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="3" fill="#059669" />
              </svg>
            </div>
            <div className="seo-radar-pct">{progress}%</div>
          </div>
        </div>

        {/* Active Node Detail Pill */}
        <div className="seo-active-node-box">
          <div className="seo-active-node-header">
            <span className="seo-node-dot" style={{ background: currentNode.color }} />
            <span className="seo-active-node-title" style={{ color: currentNode.color }}>
              {currentNode.label}
            </span>
            <span className="seo-active-node-sub">{currentNode.sublabel}</span>
          </div>

          {/* Terminal Telemetry Log */}
          <div className="seo-telemetry-feed">
            <span className="seo-feed-prefix">&gt;</span>
            <span className="seo-feed-text">{TELEMETRY_LOGS[logIndex]}</span>
          </div>
        </div>

        {/* Tactical Progress Meter */}
        <div className="seo-progress-track">
          <div
            className="seo-progress-bar"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, #059669 0%, ${currentNode.color} 100%)`,
            }}
          />
        </div>

        {/* Footer Metrics */}
        <div className="seo-preloader-footer">
          <span>ALGORITHM SIMULATION ENGINE</span>
          <span>CALIBRATION: {progress === 100 ? 'READY' : 'ACTIVE'}</span>
          <span>LATENCY: 1.2ms</span>
        </div>
      </div>

      <style jsx>{`
        .seo-preloader-root {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #09090b;
          color: #f4f4f5;
          font-family: var(--font-outfit, -apple-system, BlinkMacSystemFont, sans-serif);
          overflow: hidden;
          transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .seo-preloader-fade {
          opacity: 0;
          transform: scale(1.03);
          pointer-events: none;
        }

        .seo-preloader-backdrop {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(5, 150, 105, 0.12) 0%, rgba(9, 9, 11, 0.95) 70%, #09090b 100%);
          pointer-events: none;
        }

        .seo-preloader-radar-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .seo-preloader-hud {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 460px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
        }

        .seo-preloader-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 24px;
        }

        .seo-preloader-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .seo-preloader-ping {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #059669;
          box-shadow: 0 0 10px #059669;
          animation: ping 1.5s infinite;
        }

        @keyframes ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }

        .seo-preloader-brand {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #a1a1aa;
        }

        .seo-preloader-skip {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #71717a;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s;
        }

        .seo-preloader-skip:hover {
          color: #f4f4f5;
          border-color: #059669;
          background: rgba(5, 150, 105, 0.1);
        }

        /* Radar Stage */
        .seo-preloader-radar-stage {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .seo-preloader-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.07);
          pointer-events: none;
        }

        .ring-outer {
          width: 230px;
          height: 230px;
          border: 1px dashed rgba(5, 150, 105, 0.25);
          animation: spin-slow 24s linear infinite;
        }

        .ring-mid {
          width: 170px;
          height: 170px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ring-inner {
          width: 110px;
          height: 110px;
          border: 1px solid rgba(5, 150, 105, 0.18);
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Laser Sweep */
        .seo-preloader-sweep {
          position: absolute;
          width: 115px;
          height: 115px;
          top: 10px;
          right: 10px;
          transform-origin: 0% 100%;
          background: conic-gradient(from 0deg at 0% 100%, rgba(5, 150, 105, 0.35) 0deg, rgba(5, 150, 105, 0) 50deg);
          animation: radar-sweep 2.8s linear infinite;
          pointer-events: none;
          border-bottom-left-radius: 100%;
        }

        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Orbiting Node Pills */
        .seo-node-pill {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #18181b;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 5;
        }

        .seo-node-pill.active {
          background: #27272a;
          transform: scale(1.18) !important;
        }

        .seo-node-pill.completed {
          border-color: rgba(5, 150, 105, 0.5);
          background: rgba(5, 150, 105, 0.08);
        }

        .seo-node-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #71717a;
          transition: color 0.3s;
        }

        /* Radar Center */
        .seo-radar-center {
          position: relative;
          z-index: 8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: rgba(18, 18, 22, 0.95);
          border: 2px solid rgba(5, 150, 105, 0.5);
          box-shadow: 0 0 25px rgba(5, 150, 105, 0.3);
        }

        .seo-radar-core {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
          animation: pulse-core 2s ease-in-out infinite;
        }

        @keyframes pulse-core {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #059669); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 10px #10b981); }
        }

        .seo-radar-pct {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #f4f4f5;
          margin-top: 2px;
        }

        /* Active Node Box */
        .seo-active-node-box {
          width: 100%;
          background: rgba(24, 24, 27, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 16px;
          backdrop-filter: blur(10px);
        }

        .seo-active-node-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .seo-node-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .seo-active-node-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .seo-active-node-sub {
          font-size: 11px;
          color: #71717a;
          margin-left: auto;
        }

        .seo-telemetry-feed {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 11px;
          color: #a1a1aa;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .seo-feed-prefix {
          color: #059669;
          font-weight: bold;
        }

        .seo-feed-text {
          animation: ticker-in 0.25s ease-out;
        }

        @keyframes ticker-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Progress Track */
        .seo-progress-track {
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .seo-progress-bar {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.1s linear;
          box-shadow: 0 0 12px rgba(5, 150, 105, 0.7);
        }

        /* Footer */
        .seo-preloader-footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #52525b;
        }

        @media (max-width: 480px) {
          .seo-preloader-radar-stage {
            width: 210px;
            height: 210px;
          }
          .ring-outer {
            width: 190px;
            height: 190px;
          }
          .ring-mid {
            width: 140px;
            height: 140px;
          }
          .seo-node-pill {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>
  );
}
