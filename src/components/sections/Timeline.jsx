'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '@/profile/index.mjs';
import styles from './Timeline.module.css';

const timelineData = profile.journey;

function RollingYear({ value, play, delay }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!play) return undefined;

    let frame;
    let timeout;
    const duration = 1050;
    const startValue = 2000;

    timeout = window.setTimeout(() => {
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(startValue + (value - startValue) * eased));

        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [delay, play, value]);

  return <span aria-hidden="true">{displayValue}</span>;
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const dialogRef = useRef(null);
  const cardRefs = useRef([]);
  const [focused, setFocused] = useState(timelineData.length - 1);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [animateYears, setAnimateYears] = useState(false);

  const active = hovered ?? focused;
  const selectedYear = selected === null ? null : timelineData[selected];

  const scrollToYear = useCallback((index, behavior = 'smooth') => {
    const strip = stripRef.current;
    const card = cardRefs.current[index];
    if (!strip || !card) return;

    const stripRect = strip.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const left =
      strip.scrollLeft +
      cardRect.left -
      stripRect.left -
      (strip.clientWidth - card.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior });
  }, []);

  useEffect(() => {
    const latest = timelineData.length - 1;
    // Override CSS smooth scrolling during mount so cards never move underneath
    // a user's first trackpad click.
    scrollToYear(latest, 'instant');
  }, [scrollToYear]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || animateYears) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setAnimateYears(true);
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [animateYears]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedYear && !dialog.open) {
      dialog.showModal();
    } else if (!selectedYear && dialog.open) {
      dialog.close();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (!selectedYear) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedYear]);

  const openYear = (index) => {
    setFocused(index);
    scrollToYear(index);
    setSelected(index);
  };

  const closeDialog = () => setSelected(null);

  const closeFromBackdrop = (event) => {
    const dialog = event.currentTarget;
    const bounds = dialog.getBoundingClientRect();
    const isInside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!isInside) closeDialog();
  };

  const onCardKeyDown = (event, index) => {
    const direction =
      event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!direction) return;

    event.preventDefault();
    const next = Math.max(0, Math.min(timelineData.length - 1, index + direction));
    setFocused(next);
    scrollToYear(next);
    cardRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="timeline" className={styles.section}>
      <div className={styles.header}>
        <div className="eyebrow">The journey</div>
        <h2 className="section-title">From creator to automation engineer</h2>
      </div>

      <div
        className={styles.stripWrap}
        data-reveal-item
        style={{ '--reveal-delay': '0ms' }}
      >
        <div
          ref={stripRef}
          className={`scroller ${styles.strip}`}
        >
          <div className={styles.cardsRow}>
            {timelineData.map((item, index) => {
              const isActive = index === active;
              const isSelected = index === selected;
              return (
                <button
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  key={item.id}
                  type="button"
                  className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                  style={
                    isActive
                      ? {
                          borderColor: item.dotHue,
                          boxShadow: `0 0 0 1px ${item.dotHue}, 0 18px 46px -20px ${item.dotHue}99`,
                        }
                      : undefined
                  }
                  aria-haspopup="dialog"
                  aria-controls="timeline-detail-dialog"
                  aria-expanded={isSelected}
                  onFocus={() => setFocused(index)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => openYear(index)}
                  onKeyDown={(event) => onCardKeyDown(event, index)}
                >
                  <span
                    className={styles.year}
                    aria-label={item.year}
                    style={{ color: isActive ? item.dotHue : undefined }}
                  >
                    <RollingYear
                      value={Number(item.year)}
                      play={animateYears}
                      delay={180 + index * 90}
                    />
                  </span>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.openLabel}>View details</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="timeline-detail-dialog"
        className={styles.modalDialog}
        aria-labelledby="timeline-dialog-title"
        onPointerDown={closeFromBackdrop}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={closeDialog}
      >
        {selectedYear && (
          <div className={styles.modalFrame}>
            <div
              className={styles.modal}
              style={{ '--year-color': selectedYear.dotHue }}
            >
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close year details"
                onClick={closeDialog}
                autoFocus
              >
                ×
              </button>

              <div className={styles.modalHeader}>
                <span className={styles.modalYear}>{selectedYear.year}</span>
                <span className={styles.modalTag}>{selectedYear.tag}</span>
              </div>
              <h3 id="timeline-dialog-title" className={styles.modalTitle}>
                {selectedYear.title}
              </h3>
              <ul className={styles.modalList}>
                {selectedYear.bullets.map((bullet) => (
                  <li key={bullet} className={styles.modalListItem}>
                    <span className={styles.bulletDot} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
