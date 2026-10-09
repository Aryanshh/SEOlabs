'use client';
import React, { useState } from 'react';
import { GoogleIcon, AiOverviewIcon } from './Icons';

interface SerpPreviewProps {
  title: string;
  metaDescription: string;
  urlSlug: string;
  targetKeyword: string;
  schemaType?: string;
  richSnippetEligible?: boolean;
}

export function SerpPreview({
  title,
  metaDescription,
  urlSlug,
  targetKeyword,
  schemaType,
  richSnippetEligible,
}: SerpPreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'ai_overview' | 'social'>('desktop');

  const displayTitle = title || 'Your Optimized Title Tag Will Appear Here';
  const cleanSlug = urlSlug?.replace(/^\//, '') || 'article-title-slug';
  const displayUrl = `https://example.com > ${cleanSlug.replace(/-/g, ' ')}`;
  const displayMeta = metaDescription || 'Enter a meta description to see how your snippet appears to searchers on Google. Ensure your primary keyword is included for maximum CTR bolding.';

  // Highlight primary keyword in meta description
  const highlightKeyword = (text: string, kw: string) => {
    if (!kw || !kw.trim()) return text;
    const parts = text.split(new RegExp(`(${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === kw.toLowerCase() ? (
        <strong key={i} style={{ color: 'inherit', fontWeight: 700 }}>
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="card" style={{ padding: 20, marginBottom: 20 }}>
      {/* Header & Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GoogleIcon size={18} />
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-secondary)' }}>
            Live SERP Snippet Preview
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'desktop' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('desktop')}
          >
            Desktop SERP
          </button>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'mobile' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('mobile')}
          >
            Mobile
          </button>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'ai_overview' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('ai_overview')}
          >
            <AiOverviewIcon size={14} color={viewMode === 'ai_overview' ? '#fff' : '#8B5CF6'} /> AI Overview
          </button>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'social' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('social')}
          >
            Social OG
          </button>
        </div>
      </div>

      {/* Mode 1: Google Desktop */}
      {viewMode === 'desktop' && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: '20px 24px',
            border: '1px solid #e2e8f0',
            fontFamily: 'Arial, sans-serif',
            color: '#202124',
            maxWidth: 650,
          }}
        >
          {/* Breadcrumb line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: '#f1f3f4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#1a73e8',
              }}
            >
              SEO
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#202124', lineHeight: 1.2 }}>Example Labs</div>
              <div style={{ fontSize: 11, color: '#5f6368', lineHeight: 1.2 }}>{displayUrl}</div>
            </div>
          </div>

          {/* Title line */}
          <h3
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: '#1a0dab',
              margin: '0 0 6px 0',
              lineHeight: 1.3,
              cursor: 'pointer',
              textDecoration: 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: title.length > 65 ? 'nowrap' : 'normal',
            }}
          >
            {displayTitle}
          </h3>

          {/* Meta Description snippet */}
          <p
            style={{
              fontSize: 14,
              color: '#4d5156',
              lineHeight: 1.58,
              margin: 0,
            }}
          >
            {highlightKeyword(displayMeta, targetKeyword)}
          </p>

          {/* Rich Snippet Pills (if FAQ or schema) */}
          {richSnippetEligible && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #f1f3f4', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 11, color: '#70757a', fontWeight: 600 }}>✦ RICH RESULTS ACCORDION</div>
              <div style={{ fontSize: 13, color: '#1a0dab', display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#f8fafc', borderRadius: 8 }}>
                <span>Frequently Asked: How does this rank #1?</span>
                <span style={{ color: '#70757a' }}>▼</span>
              </div>
              <div style={{ fontSize: 13, color: '#1a0dab', display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#f8fafc', borderRadius: 8 }}>
                <span>What are the Core Web Vitals requirements?</span>
                <span style={{ color: '#70757a' }}>▼</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Google Mobile */}
      {viewMode === 'mobile' && (
        <div
          style={{
            maxWidth: 380,
            background: '#ffffff',
            borderRadius: 24,
            padding: '16px 18px',
            border: '2px solid #e2e8f0',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            color: '#202124',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#1a73e8', fontWeight: 700 }}>
              S
            </div>
            <div style={{ fontSize: 12, color: '#3c4043' }}>example.com</div>
          </div>
          <h4
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: '#1a0dab',
              margin: '0 0 8px 0',
              lineHeight: 1.3,
            }}
          >
            {displayTitle}
          </h4>
          <p style={{ fontSize: 13, color: '#4d5156', lineHeight: 1.5, margin: 0 }}>
            {highlightKeyword(displayMeta, targetKeyword)}
          </p>
        </div>
      )}

      {/* Mode 3: Google AI Overview / SearchGPT Citation */}
      {viewMode === 'ai_overview' && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
            border: '1.5px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 20,
            padding: 24,
            maxWidth: 650,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <AiOverviewIcon size={20} color="#7C3AED" />
            <span style={{ fontSize: 14, fontWeight: 800, color: '#6D28D9', letterSpacing: 0.5 }}>
              AI OVERVIEW · SYNTHESIZED ANSWER
            </span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: 16 }}>
            "{displayMeta.slice(0, 180)}... According to extensive testing, pages with direct answer structures and verified author credentials are overwhelmingly prioritized as authoritative sources."
          </p>

          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
            FEATURED CITATION SOURCE:
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              background: '#ffffff',
              borderRadius: 100,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#7C3AED', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              ✓
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>
              {displayTitle.slice(0, 36)}...
            </div>
            <span style={{ fontSize: 11, color: '#64748B' }}>example.com</span>
          </div>
        </div>
      )}

      {/* Mode 4: Social / OpenGraph Card */}
      {viewMode === 'social' && (
        <div
          style={{
            maxWidth: 540,
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              height: 180,
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 24,
              color: '#ffffff',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.8, marginBottom: 8 }}>
              SEO LABS VERIFIED
            </div>
            <h4 style={{ fontSize: 22, fontWeight: 800, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              {displayTitle.slice(0, 50)}
            </h4>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
              example.com
            </div>
            <h5 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
              {displayTitle}
            </h5>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              {displayMeta.slice(0, 120)}...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
