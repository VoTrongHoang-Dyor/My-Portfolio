import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Content-Security-Policy.
 * Tuned to allow the Spline runtime (its CDN over *.spline.design, plus the
 * WebGL/wasm execution and web workers it needs) and the remote skill icons
 * from svgl.app, while locking everything else down.
 *
 * Note: 'unsafe-eval' / 'wasm-unsafe-eval' are required by the Spline 3D
 * runtime; 'unsafe-inline' covers Next.js' hydration bootstrap and font CSS.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://svgl.app https://*.spline.design",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
  "connect-src 'self' https://*.spline.design",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

/** Security headers applied to every response. */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Clickjacking protection (legacy + CSP frame-ancestors above)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Block MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Limit referrer leakage
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable powerful features this site never uses
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // Force HTTPS for two years (ignored on http/localhost)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next doesn't pick up an unrelated lockfile higher up.
  turbopack: {
    root: __dirname,
  },
  // Don't advertise the framework version.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
