import { proficiencyChat } from '@/data/content';
import styles from './ProficiencyChat.module.css';

/**
 * Programming proficiency shown as a WhatsApp-style chat — an honest take on
 * how deep each language goes (Advanced Beginner everywhere except Python).
 */
export default function ProficiencyChat() {
  const { contact, status, messages } = proficiencyChat;

  return (
    <div className={styles.block}>
      <div className={styles.intro}>
        <div className="eyebrow">Real talk</div>
        <h3 className={styles.heading}>How deep does each language go?</h3>
      </div>

      <div className={styles.phone}>
        {/* Chat header */}
        <div className={styles.bar}>
          <span className={styles.avatar} aria-hidden="true">
            🧑‍💼
          </span>
          <div className={styles.barText}>
            <span className={styles.contact}>{contact}</span>
            <span className={styles.status}>{status}</span>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.thread}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.row} ${m.from === 'me' ? styles.rowMe : styles.rowThem}`}
            >
              <div className={`${styles.bubble} ${m.from === 'me' ? styles.me : styles.them}`}>
                <span className={styles.text}>{m.text}</span>
                <span className={styles.meta}>
                  {m.time}
                  {m.from === 'me' && <span className={styles.ticks}>✓✓</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className={styles.legend}>
        Skill levels follow the Dreyfus model — an honest scale, not a buzzword list.
      </p>
    </div>
  );
}
