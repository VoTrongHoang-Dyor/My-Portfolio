import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={`${styles.card} glass`}>
        <div className={styles.glow} />
        <div className={styles.inner}>
          <div className="eyebrow">Let&apos;s work together</div>
          <h2 className={styles.title}>Got a workflow worth automating?</h2>
          <p className={styles.body}>
            Whether you&apos;re a developer who needs reliable tooling or a team
            drowning in repetitive tasks, I&apos;d love to hear about it.
          </p>
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
