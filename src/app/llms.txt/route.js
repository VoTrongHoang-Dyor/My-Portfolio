import { buildProfileArtifact } from '@/profile/server.mjs';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildProfileArtifact('llms', { origin: SITE_URL }), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
