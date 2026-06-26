import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className={`${styles.card} glass`}>
        <div className={styles.grid}>
          <div className="eyebrow">About</div>
          <div>
            <p className={styles.lead}>
              I started with content &amp; code, fell for automation, and now I
              design AI systems end-to-end — from{' '}
              <span className={styles.accent}>discovering the pain point</span> to
              shipping the workflow that solves it.
            </p>
            <p className={styles.body}>
              Comfortable across Python and C#, fluent in n8n and browser
              automation, and obsessed with giving LLMs the context they need to
              be genuinely useful. I build for two crowds:{' '}
              <strong>developers</strong> who want clean, extensible tooling, and{' '}
              <strong>teams</strong> who just want the busywork gone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
