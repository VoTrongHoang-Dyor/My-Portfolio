import { canonicalProfile } from './source.mjs';

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.values(value).forEach(deepFreeze);
  return value;
}

const [emailUser, emailDomain] = canonicalProfile.identity.email.split('@');

if (!emailUser || !emailDomain) {
  throw new Error('Canonical profile email must contain one @ separator');
}

/**
 * Client-safe compatibility projection.
 *
 * It deliberately preserves the shapes used by the current React components,
 * while every field is derived from the canonical profile.
 */
export const profile = deepFreeze({
  schemaVersion: canonicalProfile.schemaVersion,
  reviewedAt: canonicalProfile.reviewedAt,
  identity: {
    ...canonicalProfile.identity,
    emailParts: {
      user: emailUser,
      domain: emailDomain,
    },
  },
  messaging: canonicalProfile.messaging,
  navigation: canonicalProfile.navigation,
  supportLinks: canonicalProfile.supportLinks,
  assets: canonicalProfile.assets,
  journey: canonicalProfile.journey,
  skills: canonicalProfile.skills,
  projects: canonicalProfile.projects,
  education: canonicalProfile.education,
  spokenLanguages: canonicalProfile.spokenLanguages,
  testimonials: canonicalProfile.testimonials,
});
