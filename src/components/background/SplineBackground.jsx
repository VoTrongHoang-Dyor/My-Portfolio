'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { profile } from '@/profile/index.mjs';
import styles from './SplineBackground.module.css';

// Spline needs the browser (WebGL/window), so load it client-only.
// ssr:false is only valid inside a Client Component in Next.js.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

/**
 * Fixed, full-viewport 3D scene that sits behind the entire page.
 * pointer-events:none keeps normal scrolling; a dark scrim on top deepens the
 * scene so the glass content and white type stay readable.
 */
export default function SplineBackground() {
  const [isPreparing, setIsPreparing] = useState(true);

  useEffect(() => {
    // Network, WebGL, or the remote scene can fail without firing onLoad.
    // Never leave a full-screen loading surface over the portfolio forever.
    const fallback = window.setTimeout(() => setIsPreparing(false), 8000);
    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <div className={`${styles.fixedLayer} ${isPreparing ? styles.loading : ''}`}>
      <div className={styles.canvasWrap} aria-hidden="true">
        <Spline
          scene={profile.assets.splineScene}
          onLoad={() => setIsPreparing(false)}
        />
      </div>

      {/* Dark gradient scrim for contrast over the blue scene */}
      <div className={styles.scrim} aria-hidden="true" />

      {/* Loading state while the scene streams from the CDN */}
      {isPreparing && (
        <div className={styles.loader} role="status" aria-live="polite">
          <div className={styles.thinkingDots} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className={styles.loaderText}>Preparing the interactive experience…</p>
        </div>
      )}
    </div>
  );
}
