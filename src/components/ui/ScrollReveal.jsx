'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const offsets = {
  up: { x: 0, y: 120, rotateX: 5 },
  left: { x: -132, y: 24, rotateX: 0 },
  right: { x: 132, y: 24, rotateX: 0 },
};

export default function ScrollReveal({ children, direction = 'up' }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.16,
    margin: '0px 0px -12% 0px',
  });
  const shouldReduceMotion = mounted && reduceMotion;
  const revealed = mounted && (isInView || shouldReduceMotion);
  const offset = shouldReduceMotion
    ? { x: 0, y: 0, rotateX: 0 }
    : offsets[direction] ?? offsets.up;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReduceMotion(preference.matches);

    setMounted(true);
    syncPreference();
    preference.addEventListener('change', syncPreference);

    return () => preference.removeEventListener('change', syncPreference);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="scroll-reveal-shell"
      data-revealed={revealed}
      initial={false}
      animate={
        revealed
          ? {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              filter: 'blur(0px)',
            }
          : {
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.965,
              filter: shouldReduceMotion ? 'blur(0px)' : 'blur(12px)',
              ...offset,
            }
      }
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.95,
        delay: shouldReduceMotion ? 0 : 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
