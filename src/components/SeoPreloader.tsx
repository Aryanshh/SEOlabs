'use client';

import { useEffect, useState } from 'react';

export default function SeoPreloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    // Check if session has already loaded to keep navigation snappy
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('seolabs_loaded') === 'true') {
          setVisible(false);
          return;
        }
      } catch {
        // ignore storage errors
      }
    }

    const t1 = setTimeout(() => setProgress(70), 180);
    const t2 = setTimeout(() => setProgress(100), 400);
    const t3 = setTimeout(() => {
      setFading(true);
      try {
        sessionStorage.setItem('seolabs_loaded', 'true');
      } catch {
        // ignore storage errors
      }
    }, 600);
    const t4 = setTimeout(() => setVisible(false), 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`seolabs-preloader ${fading ? 'fade-out' : ''}`}
      aria-hidden="true"
    >
      <div className="seolabs-preloader-brand">
        <div className="seolabs-preloader-circle">
          <div className="seolabs-preloader-dot" />
        </div>
        <span className="seolabs-preloader-title">seolabs</span>
      </div>

      <div className="seolabs-preloader-track">
        <div
          className="seolabs-preloader-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
