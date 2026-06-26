'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SPLINE_SCENE_URL } from '@/lib/site';
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
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.fixedLayer} aria-hidden="true">
      <div className={styles.canvasWrap}>
        <Spline scene={SPLINE_SCENE_URL} onLoad={() => setLoaded(true)} />
      </div>

      {/* Dark gradient scrim for contrast over the blue scene */}
      <div className={styles.scrim} />

      {/* Loading state while the scene streams from the CDN */}
      {!loaded && (
        <div className={styles.loader} role="status" aria-live="polite">
          <span className={styles.spinner} />
          <p className={styles.loaderText}>Loading 3D scene…</p>
        </div>
      )}
    </div>
  );
}
