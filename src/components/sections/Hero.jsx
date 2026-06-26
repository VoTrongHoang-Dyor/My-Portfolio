import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header id="top" className={styles.hero}>
      <div className={styles.grid}>
        {/* Left — portrait in a glass frame */}
        <div className={styles.portraitCol}>
          <div className={styles.portraitGlow} />
          <div className={styles.portraitFrame}>
            <Image
              src="/hoang-portrait.png"
              alt="Võ Trọng Hoàng"
              width={520}
              height={620}
              priority
              className={styles.portrait}
            />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>⚡</span>
            <div>
              <div className={styles.badgeTitle}>Builder mindset</div>
              <div className={styles.badgeSub}>Ships products, not slides</div>
            </div>
          </div>
        </div>

        {/* Right — headline + CTAs */}
        <div className={styles.textCol}>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            Available for freelance · AI Automation
          </div>

          <h1 className={styles.title}>
            I build AI agents &amp; automation that do the work.
          </h1>

          <p className={styles.subtitle}>
            Freelance AI Automation Engineer specializing in{' '}
            <strong>n8n workflows</strong>, browser automation, and LLM-powered
            tools — turning repetitive work into reliable systems.
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
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll down">
        <span>Scroll</span>
        <span className={styles.scrollArrow}>↓</span>
      </a>
    </header>
  );
}
