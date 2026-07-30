import Image from 'next/image';
import { profile } from '@/profile/index.mjs';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Image
          className={styles.logo}
          src={profile.assets.portrait}
          alt=""
          aria-hidden="true"
          width={34}
          height={34}
        />
        <span className={styles.copy}>{profile.identity.copyright}</span>
      </div>
      <div className={styles.right}>
        <div className={styles.support}>
          {profile.supportLinks.map(({ id, label, href, icon }) => (
            <a
              key={id}
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
          {profile.navigation.footer.map(({ label, href }) => (
            <a key={label} href={href} className={styles.link}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
