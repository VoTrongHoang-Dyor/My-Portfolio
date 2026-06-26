import { education, spokenLanguages } from '@/data/content';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="eyebrow">Education &amp; languages</div>
      <h2 className="section-title">Studying and building in parallel</h2>

      <div className={styles.grid}>
        {/* Degree */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardTag}>Education</div>
          <h3 className={styles.degree}>{education.degree}</h3>
          <p className={styles.school}>{education.school}</p>
          <span className={styles.status}>{education.status}</span>
          <p className={styles.note}>{education.note}</p>
        </div>

        {/* Spoken languages */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardTag}>Spoken languages</div>
          <ul className={styles.langs}>
            {spokenLanguages.map((l) => (
              <li key={l.name} className={styles.lang}>
                <span className={styles.langDot} style={{ background: l.accent }} />
                <span className={styles.langName}>{l.name}</span>
                <span className={styles.langLevel}>{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
