import { buildProfileArtifact } from '@/profile/server.mjs';
import { SITE_URL } from '@/lib/seo';

export default function StructuredData() {
  const graph = buildProfileArtifact('json-ld', { origin: SITE_URL });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: graph,
      }}
    />
  );
}
