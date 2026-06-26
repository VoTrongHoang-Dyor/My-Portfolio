'use client';

import { useEffect, useRef } from 'react';
import { EMAIL_PARTS } from '@/lib/site';

/**
 * ObfuscatedEmail
 * Renders a clickable "mailto" button without ever exposing the address to the
 * server-rendered HTML or to naive scrapers:
 *
 *  1. The address is split into parts in site.js and only joined at runtime.
 *  2. The link is injected into a *closed* Shadow DOM, so the email lives in an
 *     encapsulated tree that page-level scripts and most harvesters can't read,
 *     and the button's styles are isolated from the rest of the page.
 *
 * Before hydration a non-clickable fallback button is shown (no address), then
 * the real link is swapped in once JS runs.
 */
const BUTTON_CSS = `
  :host { display: inline-flex; }
  a {
    display: inline-flex; align-items: center; gap: 8px;
    background: #7c83ff; color: #0a0c1a;
    font-family: inherit; font-weight: 700; font-size: 15px;
    padding: 15px 26px; border-radius: 13px; text-decoration: none;
    box-shadow: 0 14px 34px -12px rgba(124, 131, 255, 0.8);
    transition: transform 0.2s ease;
  }
  a:hover { transform: translateY(-2px); }
`;

const fallbackStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: '#7c83ff',
  color: '#0a0c1a',
  fontWeight: 700,
  fontSize: 15,
  padding: '15px 26px',
  borderRadius: 13,
  boxShadow: '0 14px 34px -12px rgba(124, 131, 255, 0.8)',
};

export default function ObfuscatedEmail({ label = 'Email me' }) {
  const hostRef = useRef(null);
  const attachedRef = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    // Guard against React StrictMode running effects twice in dev.
    if (!host || attachedRef.current) return;
    attachedRef.current = true;

    const shadow = host.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = BUTTON_CSS;

    const link = document.createElement('a');
    link.href = `mailto:${EMAIL_PARTS.user}@${EMAIL_PARTS.domain}`;
    link.textContent = label;
    link.rel = 'nofollow';

    shadow.append(style, link);
  }, [label]);

  return (
    <span ref={hostRef}>
      {/* Pre-hydration fallback; hidden once the shadow root attaches */}
      <span style={fallbackStyle}>{label}</span>
    </span>
  );
}
