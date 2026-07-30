import 'server-only';
import { normalizeOrigin } from '@/profile/artifacts.mjs';

const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL;

export const SITE_URL = normalizeOrigin(deploymentHost);

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}
