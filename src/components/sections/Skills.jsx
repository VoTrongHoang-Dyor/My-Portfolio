'use client';

import dynamic from 'next/dynamic';
import SkillShowcase from '@/components/ui/SkillShowcase';

// The graph's node layout comes from an iterative physics simulation whose
// floating-point output can drift a hair between the server and browser JS
// engines, which React's hydration diff treats as a mismatch. It's also a
// drag/hover-driven client widget with no meaningful server-rendered state,
// so render it client-only instead of reconciling it against SSR markup.
const SkillsGraph = dynamic(() => import('./SkillsGraph'), {
  ssr: false,
  // Reserve the graph's space (viewBox is 1000x660) so nothing jumps once it mounts.
  loading: () => <div style={{ marginTop: 36, width: '100%', aspectRatio: '1000 / 660' }} />,
});

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="eyebrow">Toolbox</div>
      <h2 className="section-title">What I build with</h2>
      <SkillsGraph />
      <SkillShowcase />
    </section>
  );
}
