import { profile } from '@/profile/index.mjs';
import styles from './Hero.module.css';

export default function Hero() {
  const copy = profile.messaging.web;

  return (
    <header id="top" className={styles.hero}>
      <div className={styles.textCol}>
        <h1 className={styles.title}>
          {copy.heroTitle}
        </h1>

        <p className={styles.subtitle}>
          {copy.heroSubtitleLead}
          <strong>{copy.heroSubtitleEmphasis}</strong>
          {copy.heroSubtitleTail}
        </p>

        <div className={styles.actions}>
          <a href="#work" className={styles.btnPrimary}>
            View my work
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            Get in touch
          </a>
        </div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll down">
        <span>Scroll</span>
        <span className={styles.scrollArrow}>↓</span>
      </a>
    </header>
  );
}
