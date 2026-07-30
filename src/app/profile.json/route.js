import { buildProfileArtifact } from '@/profile/server.mjs';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    buildProfileArtifact('profile-json', { origin: SITE_URL }),
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    },
  );
}
