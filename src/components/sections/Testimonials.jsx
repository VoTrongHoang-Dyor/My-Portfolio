import Image from 'next/image';
import { testimonials } from '@/data/content';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="eyebrow">What people say</div>
      <h2 className="section-title">Words from people I&apos;ve worked with</h2>

      <div className={styles.grid}>
        {testimonials.map((t) => (
          <figure key={t.role} className={`${styles.card} glass`}>
            <span className={styles.quoteMark} style={{ color: t.accent }} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className={styles.quote}>{t.quote}</blockquote>
            <figcaption className={styles.who}>
              {t.avatar ? (
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={36}
                  height={36}
                  className={styles.avatar}
                />
              ) : (
                <span className={styles.avatar} style={{ background: `${t.accent}26`, color: t.accent }}>
                  {t.role.charAt(0)}
                </span>
              )}
              <span className={styles.whoText}>
                {t.name && <span className={styles.name}>{t.name}</span>}
                <span className={styles.role}>{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
