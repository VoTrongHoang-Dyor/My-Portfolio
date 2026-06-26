'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { languageProficiency } from '@/data/content';
import styles from './SkillShowcase.module.css';

const AUTOPLAY_MS = 5000;

// Level → colour token (blue for Competent, gray for Advanced Beginner)
const LEVEL = {
  Competent: { dot: '#2563eb', badgeBg: '#e3edff', badgeFg: '#1d4ed8' },
  'Advanced Beginner': { dot: '#9aa1ad', badgeBg: '#eceef1', badgeFg: '#5b626e' },
};

export default function SkillShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = languageProficiency.length;
  const current = languageProficiency[active];
  const tone = LEVEL[current.level] ?? LEVEL['Advanced Beginner'];

  const advance = () => setActive((a) => (a + 1) % len);

  return (
    <div className={styles.block}>
      <div className={styles.intro}>
        <div className="eyebrow">Real talk</div>
        <h3 className={styles.heading}>How deep does each language go?</h3>
      </div>

      {/* Hovering anywhere pauses the 5s auto-rotation */}
      <div
        className={styles.shell}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.grid}>
          {/* Left — language list / mobile chip row */}
          <div className={styles.list} role="tablist" aria-label="Programming languages">
            {languageProficiency.map((lang, i) => {
              const t = LEVEL[lang.level] ?? LEVEL['Advanced Beginner'];
              const isActive = i === active;
              return (
                <button
                  key={lang.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                  onClick={() => setActive(i)}
                >
                  <img
                    className={styles.logo}
                    src={lang.logo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                  <span className={styles.dot} style={{ background: t.dot }} />
                  <span className={styles.itemName}>{lang.name}</span>
                  <span className={styles.itemLevel}>{lang.level}</span>

                  {/* 5s progress bar under the active item; drives auto-advance */}
                  {isActive && (
                    <span className={styles.progress} aria-hidden="true">
                      <span
                        className={styles.progressFill}
                        style={{
                          background: t.dot,
                          animationDuration: `${AUTOPLAY_MS}ms`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                        onAnimationEnd={advance}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — dynamic context card */}
          <div className={styles.panel} role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={styles.card}
              >
                <span
                  className={styles.badge}
                  style={{ background: tone.badgeBg, color: tone.badgeFg }}
                >
                  {current.level}
                </span>
                <h4 className={styles.cardName}>{current.name}</h4>
                <p className={styles.cardDesc}>{current.desc}</p>

                {/* Short, professional code sample for the language */}
                <div className={styles.code}>
                  <div className={styles.codeBar}>
                    <span className={styles.dots} aria-hidden="true">
                      <i /> <i /> <i />
                    </span>
                    <span className={styles.codeLang}>{current.lang}</span>
                  </div>
                  <pre className={styles.pre}>
                    <code>{current.code}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
