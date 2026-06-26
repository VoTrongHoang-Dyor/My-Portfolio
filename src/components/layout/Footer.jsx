import { SITE, FOOTER_LINKS, SUPPORT_LINKS } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.logo}>{SITE.initials}</span>
        <span className={styles.copy}>{SITE.copyright}</span>
      </div>
      <div className={styles.right}>
        <div className={styles.support}>
          {SUPPORT_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className={styles.supportLink}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
            >
              <img
                className={styles.supportIcon}
                src={icon}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={20}
                height={20}
              />
            </a>
          ))}
        </div>
        <div className={styles.links}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className={styles.link}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
