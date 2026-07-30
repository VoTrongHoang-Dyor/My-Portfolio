import { profile } from '@/profile/index.mjs';
import styles from './Work.module.css';

const projects = profile.projects;

export default function Work() {
  return (
    <section id="work" className="section">
      <div className={styles.head}>
        <div>
          <div className="eyebrow">Selected work</div>
          <h2 className="section-title">Products I&apos;ve shipped</h2>
        </div>
        <span className={styles.meta}>{profile.messaging.web.workMeta}</span>
      </div>

      <div className={styles.list}>
        {projects.map((p, index) => (
          <article
            key={p.id}
            className={`${styles.card} glass`}
            data-reveal-item
            style={{ '--reveal-delay': `${index * 100}ms` }}
          >
            <div className={styles.repoBody}>
              <div className={styles.repoHead}>
                <h3 className={styles.name}>{p.name}</h3>
                <span className={styles.visibility}>Public</span>
              </div>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.repoMeta}>
                <span className={styles.languageDot} style={{ background: p.accent }} />
                <span>{p.kind}</span>
                <span className={styles.updated}>Portfolio project</span>
              </div>
            </div>
          </article>
        ))}

        {/* Placeholder — signals the portfolio is actively growing */}
        <div
          className={styles.placeholder}
          aria-label="More projects coming soon"
          data-reveal-item
          style={{ '--reveal-delay': `${projects.length * 100}ms` }}
        >
          <span className={styles.plus} aria-hidden="true">+</span>
          <div>
            <div className={styles.placeholderTitle}>More coming soon</div>
            <div className={styles.placeholderNote}>Portfolio actively updated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
