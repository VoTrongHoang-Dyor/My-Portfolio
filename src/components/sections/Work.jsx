import { projects } from '@/data/content';
import styles from './Work.module.css';

export default function Work() {
  return (
    <section id="work" className="section">
      <div className={styles.head}>
        <div>
          <div className="eyebrow">Selected work</div>
          <h2 className="section-title">Products I&apos;ve shipped</h2>
        </div>
        <span className={styles.meta}>2025 · Personal AI products</span>
      </div>

      <div className={styles.grid}>
        {projects.map((p) => (
          <article key={p.name} className={`${styles.card} glass`}>
            <div
              className={styles.banner}
              style={{
                background: `radial-gradient(120% 120% at 30% 20%, ${p.accent}55, transparent 70%)`,
              }}
            >
              <span className={styles.icon}>{p.icon}</span>
            </div>
            <div className={styles.body}>
              <span className={styles.kind} style={{ color: p.accent }}>
                {p.kind}
              </span>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.desc}>{p.desc}</p>
            </div>
          </article>
        ))}

        {/* Placeholder — signals the portfolio is actively growing */}
        <div className={styles.placeholder} aria-label="More projects coming soon">
          <span className={styles.plus} aria-hidden="true">
            +
          </span>
          <span className={styles.placeholderTitle}>More coming soon</span>
          <span className={styles.placeholderNote}>Portfolio actively updated</span>
        </div>
      </div>
    </section>
  );
}
