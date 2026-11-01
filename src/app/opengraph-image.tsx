import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SEOlabs — The Algorithmic SERP Flight Simulator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FCFBF7',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#ffffff',
              }}
            />
          </div>
          <span style={{ fontSize: '38px', fontWeight: 900, color: '#1C1917', letterSpacing: '-1.5px' }}>
            seolabs
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#D1FAE5',
              padding: '8px 20px',
              borderRadius: '100px',
              color: '#065F46',
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '0.5px',
            }}
          >
            ALGORITHMIC SERP FLIGHT SIMULATOR & GEO TESTING LAB
          </div>
          <h1
            style={{
              fontSize: '66px',
              fontWeight: 900,
              color: '#1C1917',
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-2px',
            }}
          >
            Simulate the rank. <br />
            <span style={{ color: '#059669' }}>Master search algorithms.</span>
          </h1>
          <p style={{ fontSize: '24px', color: '#78716C', maxWidth: '880px', margin: 0, lineHeight: 1.4 }}>
            Test title hooks, Google Helpful Content signals, AI Overviews citation rates, and SERP CTR before indexing begins.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '2px solid #E7E5E4',
            paddingTop: '32px',
            color: '#A8A29E',
            fontSize: '20px',
            fontWeight: 700,
          }}
        >
          <span>https://seolabs.space</span>
          <span>Google RankBrain • Helpful Content • GEO • E-E-A-T</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
