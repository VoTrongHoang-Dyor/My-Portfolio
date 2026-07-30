import Image from 'next/image';
import { profile } from '@/profile/index.mjs';
import styles from './About.module.css';

export default function About() {
  const copy = profile.messaging.web;

  return (
    <section id="about" className={`section ${styles.section}`}>
      <div
        className={`${styles.card} glass`}
        data-reveal-item
        style={{ '--reveal-delay': '0ms' }}
      >
        <div className={`eyebrow ${styles.aboutLabel}`}>About</div>
        <div className={styles.grid}>
          <div className={styles.portraitCol}>
            <div className={styles.portraitGlow} />
            <div className={styles.portraitFrame}>
              <Image
                src={profile.assets.portrait}
                alt={profile.identity.name}
                width={520}
                height={650}
                sizes="(max-width: 760px) 320px, 350px"
                className={styles.portrait}
              />
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>⚡</span>
              <div>
                <div className={styles.badgeTitle}>{copy.builderTitle}</div>
                <div className={styles.badgeSub}>{copy.builderSubtitle}</div>
              </div>
            </div>
          </div>
          <div>
            <p className={styles.lead}>
              {copy.aboutLeadPrefix}
              <span className={styles.accent}>{copy.aboutLeadEmphasis}</span>
              {copy.aboutLeadSuffix}
            </p>
            <p className={styles.body}>
              {copy.aboutBody} {copy.aboutAudienceLead}{' '}
              <strong>{copy.aboutDeveloperAudience}</strong>
              {copy.aboutDeveloperTail}
              <strong>{copy.aboutTeamAudience}</strong>
              {copy.aboutTeamTail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
