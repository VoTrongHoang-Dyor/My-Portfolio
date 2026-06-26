/**
 * Central site configuration and constants.
 * Keep magic strings (URLs, contact info, nav structure) here so they live in
 * one place instead of being scattered across components.
 */

export const SITE = {
  name: 'Võ Trọng Hoàng',
  role: 'AI Automation Engineer',
  initials: 'VH',
  copyright: '© 2026 Võ Trọng Hoàng — AI Automation Engineer',
};

/**
 * Contact email split into parts so the full address never appears as a single
 * literal in the served HTML or JS bundle. It is reassembled at runtime inside
 * a Shadow DOM (see ObfuscatedEmail), which keeps it out of reach of naive
 * email-harvesting bots while staying clickable for real users.
 */
export const EMAIL_PARTS = {
  user: 'votronghoang.dy',
  domain: 'gmail.com',
};

/** Spline 3D scene streamed as the page background. */
export const SPLINE_SCENE_URL =
  'https://prod.spline.design/uDYIzXQEjETVH76K/scene.splinecode';

/** Primary navigation (header). */
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Praise', href: '#testimonials' },
];

/**
 * Support / "buy me a coffee" links shown in the footer.
 * Icons are sourced from svgl.app (already allow-listed in the CSP img-src).
 */
export const SUPPORT_LINKS = [
  {
    label: 'Buy me a coffee (Ko-fi)',
    href: 'https://ko-fi.com/tronghoang_dyor',
    icon: 'https://svgl.app/library/bmc.svg',
  },
  {
    label: 'Support via PayPal',
    href: 'https://paypal.me/TrongHoangDyor',
    icon: 'https://svgl.app/library/paypal.svg',
  },
];

/** Footer navigation. */
export const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Work', href: '#work' },
  { label: 'Praise', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];
