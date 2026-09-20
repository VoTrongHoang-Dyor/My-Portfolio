'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/profile/index.mjs';
import { GmailIcon } from './SocialIcons';

/**
 * Icon-only email link.
 *
 * This deliberately mirrors ObfuscatedEmail: the address never reaches the
 * server-rendered markup. The `mailto:` href is attached only after hydration,
 * so a scraper reading the static HTML finds nothing. Before hydration the link
 * is inert (see the click guard below) rather than pointing somewhere wrong.
 */
export default function SocialEmailLink({ className, iconClassName }) {
  const [href, setHref] = useState(null);

  useEffect(() => {
    const { user, domain } = profile.identity.emailParts;
    setHref(`mailto:${user}@${domain}`);
  }, []);

  return (
    <a
      className={className}
      href={href ?? '#'}
      title="Email"
      aria-label="Email"
      rel="nofollow"
      onClick={href ? undefined : (event) => event.preventDefault()}
    >
      <GmailIcon className={iconClassName} />
    </a>
  );
}
