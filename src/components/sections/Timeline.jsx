'use client';

import { useEffect, useRef, useState } from 'react';
import { timelineData } from '@/data/content';
import styles from './Timeline.module.css';

export default function Timeline() {
  const stripRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [selected, setSelected] = useState(timelineData.length - 1);
  const [hovered, setHovered] = useState(null);

  const active = hovered ?? selected;
  const activeYear = timelineData[active];

  // On mount, bring the selected (latest) year into view if the strip overflows.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelectorAll(`[data-card]`)[selected];
    if (card && el.scrollWidth > el.clientWidth) {
      card.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Drag-to-scroll (also distinguishes a drag from a click) ──────────────
  const onPointerDown = (e) => {
    const el = stripRef.current;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.style.cursor = 'grabbing';
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };
  const onPointerMove = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    stripRef.current.scrollLeft = drag.current.startScroll - dx;
  };
  const onPointerUp = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    if (stripRef.current) stripRef.current.style.cursor = 'grab';
  };

  const onCardClick = (i) => {
    if (drag.current.moved) return; // it was a drag, not a click
    setSelected(i);
  };

  return (
    <section id="timeline" className={styles.section}>
      <div className={styles.header}>
        <div className="eyebrow">The journey</div>
        <h2 className="section-title">From creator to automation engineer</h2>
        <p className={styles.sub}>Drag the timeline · hover or tap a year to read more.</p>
      </div>

      {/* ── Horizontal, draggable timeline strip ── */}
      <div className={styles.stripWrap}>
        <div
          ref={stripRef}
          className={`scroller ${styles.strip}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className={styles.track}>
            {/* Row of equal-size year cards */}
            <div className={styles.cardsRow}>
              {timelineData.map((d, i) => {
                const isActive = i === active;
                const isSelected = i === selected;
                return (
                  <button
                    key={d.year}
                    data-card=""
                    type="button"
                    className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                    style={
                      isActive
                        ? {
                            borderColor: d.dotHue,
                            boxShadow: `0 0 0 1px ${d.dotHue}, 0 18px 50px -16px ${d.dotHue}66`,
                          }
                        : undefined
                    }
                    aria-pressed={isSelected}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onCardClick(i)}
                  >
                    <span className={styles.year} style={{ color: isActive ? 'var(--text)' : undefined }}>
                      {d.year}
                    </span>
                    <span className={styles.cardTitle}>{d.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Bold, diagonally-striped axis below the cards: one dot per year, arrow at the end */}
            <div className={styles.axis} aria-hidden="true">
              <span className={styles.axisBar} />
              <div className={styles.axisDots}>
                {timelineData.map((d, i) => {
                  const isActive = i === active;
                  return (
                    <span className={styles.dotSlot} key={d.year}>
                      <span
                        className={styles.axisDot}
                        style={{
                          background: isActive ? d.dotHue : 'rgba(255,255,255,.32)',
                          boxShadow: isActive ? `0 0 0 4px ${d.dotHue}33` : 'none',
                          transform: isActive ? 'scale(1.3)' : 'none',
                        }}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail panel for the active year ── */}
      <div className={styles.detailWrap}>
        <div className={`${styles.detail} glass`}>
          <div className={styles.detailHead}>
            <span className={styles.detailYear}>{activeYear.year}</span>
            <span className={styles.detailTitle}>{activeYear.title}</span>
            <span className={styles.detailTag} style={{ color: activeYear.dotHue }}>
              {activeYear.tag}
            </span>
          </div>
          <ul key={active} className={styles.list}>
            {activeYear.bullets.map((b) => (
              <li key={b} className={styles.listItem}>
                <span className={styles.bulletDot} style={{ background: activeYear.dotHue }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
