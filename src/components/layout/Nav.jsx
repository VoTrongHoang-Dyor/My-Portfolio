import Image from 'next/image';
import { profile } from '@/profile/index.mjs';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/SocialIcons';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <Image
            className={styles.logo}
            src={profile.assets.portrait}
            alt=""
            aria-hidden="true"
            width={38}
            height={38}
            priority
          />
          <span className={styles.name}>{profile.identity.name}</span>
        </a>

        <div className={styles.right}>
          <div className={styles.links}>
            {profile.navigation.primary.map(({ label, href }) => (
              <a key={label} href={href} className={styles.link}>
                {label}
              </a>
            ))}
          </div>
          <div className={styles.social}>
            <a
              href={profile.identity.github}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
            >
              <GitHubIcon className={styles.socialIcon} />
            </a>
            <a
              href={profile.identity.linkedin}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className={styles.socialIcon} />
            </a>
          </div>

          <a href="#contact" className={styles.cta}>
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
