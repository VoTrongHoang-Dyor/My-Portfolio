import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail';
import { profile } from '@/profile/index.mjs';
import styles from './Contact.module.css';

export default function Contact() {
  const copy = profile.messaging.web;

  return (
    <section id="contact" className={styles.section}>
      <div
        className={`${styles.card} glass`}
        data-reveal-item
        style={{ '--reveal-delay': '0ms' }}
      >
        <div className={styles.glow} />
        <div className={styles.inner}>
          <div className="eyebrow">Let&apos;s work together</div>
          <h2 className={styles.title}>{copy.contactTitle}</h2>
          <p className={styles.body}>{copy.contactBody}</p>
          <div className={styles.actions}>
            <ObfuscatedEmail label="Email me" />
            <a href="#top" className={styles.btnSecondary}>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
