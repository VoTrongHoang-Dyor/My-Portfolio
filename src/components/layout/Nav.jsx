import { SITE, NAV_LINKS } from '@/lib/site';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <span className={styles.logo}>{SITE.initials}</span>
          <span className={styles.name}>{SITE.name}</span>
        </a>

        <div className={styles.right}>
          <div className={styles.links}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className={styles.link}>
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" className={styles.cta}>
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
