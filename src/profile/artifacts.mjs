import { canonicalProfile } from './source.mjs';

const ARTIFACTS = new Set([
  'metadata',
  'json-ld',
  'profile-json',
  'llms',
  'readme',
]);

export function normalizeOrigin(value) {
  const candidate = value || 'http://localhost:3000';
  const isBareLocalhost =
    !candidate.startsWith('http://') &&
    !candidate.startsWith('https://') &&
    /^(localhost|127(?:\.\d+){3})(:\d+)?(?:\/|$)/i.test(candidate);
  const withProtocol =
    candidate.startsWith('http://') || candidate.startsWith('https://')
      ? candidate
      : `${isBareLocalhost ? 'http' : 'https'}://${candidate}`;

  let parsed;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new Error(`Invalid site origin: ${value}`);
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Site origin must use http or https');
  }
  if (parsed.username || parsed.password) {
    throw new Error('Site origin must not contain credentials');
  }

  return parsed.origin;
}

export function absoluteUrl(path = '/', origin) {
  return new URL(path, `${normalizeOrigin(origin)}/`).toString();
}

function machineProfile(source, origin) {
  const { identity, skills, projects, journey, education, spokenLanguages } =
    source;

  return {
    schemaVersion: source.schemaVersion,
    lastReviewed: source.reviewedAt,
    candidate: {
      name: identity.name,
      careerLevel: identity.careerLevel,
      headline: identity.headline,
      currentRole: identity.currentRole,
      targetRoles: identity.targetRoles,
      summary: source.messaging.candidateSummary,
      coreStrengths: identity.coreStrengths,
      contact: {
        email: identity.email,
        linkedin: identity.linkedin,
        github: identity.github,
      },
    },
    skills: skills.categories.map((category) => ({
      id: category.id,
      group: category.label,
      items: category.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
      })),
    })),
    programmingProficiency: skills.proficiency.map(({ id, name, level }) => ({
      id,
      name,
      level,
    })),
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      type: project.kind,
      year: project.year,
      summary: project.desc,
      status: project.status,
      problem: project.problem,
      solution: project.solution,
      role: project.role,
      technology: project.technology,
      outcome: project.outcome,
      links: project.links,
    })),
    practicalExperience: journey.map((item) => ({
      id: item.id,
      year: item.year,
      title: item.title,
      stage: item.tag,
      evidence: item.bullets,
    })),
    education: {
      id: education.id,
      degree: education.degree,
      school: education.school,
      status: education.status,
      note: education.note,
    },
    spokenLanguages: spokenLanguages.map(({ id, name, level }) => ({
      id,
      name,
      level,
    })),
    evidencePolicy: source.evidencePolicy,
    canonicalUrl: normalizeOrigin(origin),
    machineReadableResources: {
      json: absoluteUrl('/profile.json', origin),
      llmsText: absoluteUrl('/llms.txt', origin),
      sitemap: absoluteUrl('/sitemap.xml', origin),
    },
  };
}

function buildMetadata(source, origin) {
  const { identity, messaging, assets } = source;

  return {
    metadataBase: new URL(normalizeOrigin(origin)),
    title: `${identity.name} | Junior AI Automation Engineer`,
    description: messaging.metadataDescription,
    applicationName: `${identity.name} — Portfolio`,
    authors: [{ name: identity.name, url: normalizeOrigin(origin) }],
    creator: identity.name,
    category: 'technology',
    keywords: [
      'AI Automation Engineer',
      'AI Agent Developer',
      'Workflow Automation',
      'Python Automation',
      'AI Integration',
      'Model Context Protocol',
      'MCP Developer',
      'RAG Application',
      'n8n Automation',
      'Product Builder',
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${identity.name} | Junior AI Automation Engineer`,
      description: messaging.openGraphDescription,
      url: '/',
      siteName: `${identity.name} Portfolio`,
      locale: 'en_US',
      type: 'profile',
      images: [
        {
          url: assets.portrait,
          width: 1024,
          height: 1024,
          alt: `${identity.name}, Junior AI Automation Engineer`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${identity.name} | Junior AI Automation Engineer`,
      description: messaging.twitterDescription,
      images: [assets.portrait],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    other: {
      'candidate:career_level': identity.careerLevel,
      'candidate:target_roles': identity.targetRoles.join(', '),
      'candidate:core_skills': identity.coreStrengths.join(', '),
      'ai:profile': absoluteUrl('/profile.json', origin),
      'ai:summary': absoluteUrl('/llms.txt', origin),
    },
  };
}

function buildJsonLd(source, origin) {
  const machine = machineProfile(source, origin);
  const siteUrl = normalizeOrigin(origin);
  const projectNodes = machine.projects.map((project) => ({
    '@type': 'CreativeWork',
    '@id': `${siteUrl}/#project-${project.id}`,
    name: project.name,
    description: project.summary,
    abstract: project.solution,
    creativeWorkStatus: project.status,
    creator: { '@id': `${siteUrl}/#person` },
    url: `${siteUrl}/#work`,
    keywords: project.technology.join(', '),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Problem', value: project.problem },
      { '@type': 'PropertyValue', name: 'Solution', value: project.solution },
      { '@type': 'PropertyValue', name: 'My role', value: project.role },
      { '@type': 'PropertyValue', name: 'Outcome', value: project.outcome },
    ],
  }));
  const journeyNode = {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#journey`,
    name: `${machine.candidate.name} practical experience`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: machine.practicalExperience.length,
    itemListElement: machine.practicalExperience.map((item, index) => ({
      '@type': 'ListItem',
      '@id': `${siteUrl}/#${item.id}`,
      position: index + 1,
      name: `${item.year} — ${item.title}`,
      description: item.evidence.join(' '),
    })),
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: machine.candidate.name,
        url: siteUrl,
        image: absoluteUrl(source.assets.portrait, origin),
        description: machine.candidate.summary,
        jobTitle: machine.candidate.headline,
        email: `mailto:${machine.candidate.contact.email}`,
        sameAs: [
          machine.candidate.contact.linkedin,
          machine.candidate.contact.github,
        ],
        knowsAbout: machine.candidate.coreStrengths,
        knowsLanguage: machine.spokenLanguages.map((language) => ({
          '@type': 'Language',
          name: language.name,
          proficiencyLevel: language.level,
        })),
        additionalProperty: machine.programmingProficiency.map((entry) => ({
          '@type': 'PropertyValue',
          name: `${entry.name} programming proficiency`,
          value: entry.level,
        })),
        hasOccupation: machine.candidate.targetRoles.map((role) => ({
          '@type': 'Occupation',
          name: role,
          experienceRequirements: 'Junior level',
        })),
        memberOf: {
          '@type': 'CollegeOrUniversity',
          name: machine.education.school,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: `${machine.candidate.name} Portfolio`,
        description: machine.candidate.summary,
        inLanguage: 'en',
        publisher: { '@id': `${siteUrl}/#person` },
        hasPart: [
          ...projectNodes.map((project) => ({ '@id': project['@id'] })),
          { '@id': journeyNode['@id'] },
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profile`,
        url: siteUrl,
        name: `${machine.candidate.name} — AI Automation Portfolio`,
        description: machine.candidate.summary,
        inLanguage: 'en',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#person` },
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
      ...projectNodes,
      journeyNode,
    ],
  };

  return JSON.stringify(graph).replace(/</g, '\\u003c');
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function projectSection(project) {
  return [
    `### ${project.name}`,
    `- Type: ${project.type}`,
    `- Status: ${project.status}`,
    `- Summary: ${project.summary}`,
    `- Problem: ${project.problem}`,
    `- Solution: ${project.solution}`,
    `- My role: ${project.role}`,
    `- Technology: ${project.technology.join(', ')}`,
    `- Outcome: ${project.outcome}`,
  ].join('\n');
}

function experienceSection(item) {
  return [
    `### ${item.year} — ${item.title}`,
    `Stage: ${item.stage}`,
    bullets(item.evidence),
  ].join('\n');
}

function buildLlms(source, origin) {
  const machine = machineProfile(source, origin);
  const {
    candidate,
    projects,
    practicalExperience,
    programmingProficiency,
    education,
    spokenLanguages,
    evidencePolicy,
  } = machine;

  return [
    `# ${candidate.name} — ${candidate.headline}`,
    '',
    `Canonical portfolio: ${machine.canonicalUrl}`,
    '',
    '## Candidate summary',
    candidate.summary,
    '',
    `Career level: ${candidate.careerLevel}`,
    `Current role: ${candidate.currentRole}`,
    '',
    '## Target roles',
    bullets(candidate.targetRoles),
    '',
    '## Core strengths',
    bullets(candidate.coreStrengths),
    '',
    '## Contact and identity',
    `- Email: ${candidate.contact.email}`,
    `- LinkedIn: ${candidate.contact.linkedin}`,
    `- GitHub: ${candidate.contact.github}`,
    '',
    '## Featured projects',
    projects.map(projectSection).join('\n\n'),
    '',
    '## Practical experience',
    practicalExperience.map(experienceSection).join('\n\n'),
    '',
    '## Programming proficiency',
    bullets(
      programmingProficiency.map(
        (entry) => `${entry.name}: ${entry.level}`,
      ),
    ),
    '',
    '## Education',
    `- Degree: ${education.degree}`,
    `- Institution: ${education.school}`,
    `- Status: ${education.status}`,
    '',
    '## Spoken languages',
    bullets(
      spokenLanguages.map((language) => `${language.name}: ${language.level}`),
    ),
    '',
    '## Evidence policy',
    evidencePolicy.note,
    'Information still needed:',
    bullets(evidencePolicy.missingEvidence),
    '',
    '## Machine-readable resources',
    `- JSON profile: ${machine.machineReadableResources.json}`,
    `- Sitemap: ${machine.machineReadableResources.sitemap}`,
  ].join('\n');
}

function tableRow(values) {
  return `| ${values.join(' | ')} |`;
}

function buildReadme(source) {
  const { identity, messaging, education, spokenLanguages } = source;

  return [
    '<!-- Generated from src/profile/source.mjs. Run `npm run profile:write` to update. -->',
    '',
    `# ${identity.name} — ${identity.role}`,
    '',
    `> *"${messaging.readme.motto}"*`,
    '',
    messaging.readme.intro,
    '',
    '## 👤 About',
    '',
    messaging.readme.aboutLead,
    '',
    messaging.readme.aboutBody,
    '',
    '---',
    '',
    '## 🎓 Education & Languages',
    '',
    `**${education.degree}**`,
    `${education.school} — ${education.status}`,
    '',
    `> ${education.note}`,
    '',
    '### Spoken Languages',
    '',
    tableRow(['Language', 'Level']),
    tableRow(['---', '---']),
    ...spokenLanguages.map((language) =>
      tableRow([language.name, language.level]),
    ),
    '',
    '---',
    '',
    '## 🗺️ Journey',
    '',
    ...source.journey.flatMap((item) => [
      `### ${item.year} — ${item.title} \`${item.tag.toUpperCase()}\``,
      ...item.bullets.map((bullet) => `- ${bullet}`),
      '',
    ]),
    '---',
    '',
    '## 🛠️ Skills & Toolbox',
    '',
    '### Programming Languages',
    '',
    tableRow(['Language', 'Level']),
    tableRow(['---', '---']),
    ...source.skills.proficiency.map((entry) =>
      tableRow([entry.name, entry.level]),
    ),
    '',
    '### Skill Categories',
    '',
    ...source.skills.categories.map(
      (category) => `- **${category.label}** — ${category.summary}`,
    ),
    '',
    '---',
    '',
    '## 🚀 Selected Work',
    '',
    ...source.projects.flatMap((project) => [
      `### ${project.icon} ${project.name} \`${project.kind.toUpperCase()} · ${project.year}\``,
      project.desc,
      '',
    ]),
    `> ${messaging.readme.portfolioNote}`,
    '',
    '---',
    '',
    '## 💬 What People Say',
    '',
    ...source.testimonials.flatMap((testimonial) => [
      `> *"${testimonial.quote}"*`,
      `> — **${testimonial.role}**`,
      '',
    ]),
    '---',
    '',
    '## 📬 Contact',
    '',
    `**${messaging.readme.contactTitle}**`,
    '',
    messaging.readme.contactBody,
    '',
    `📧 [${identity.email}](mailto:${identity.email})`,
    '',
    '---',
    '',
    '## ☕ Support',
    '',
    messaging.readme.supportIntro,
    '',
    `[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](${source.supportLinks[0].href})`,
    `[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](${source.supportLinks[1].href})`,
    '',
    `- ☕ Ko-fi — ${source.supportLinks[0].href}`,
    `- 💸 PayPal — ${source.supportLinks[1].href}`,
    '',
    identity.copyright,
    '',
  ].join('\n');
}

export function buildProfileArtifact(kind, context = {}) {
  if (!ARTIFACTS.has(kind)) {
    throw new Error(`Unknown profile artifact: ${kind}`);
  }

  const origin = normalizeOrigin(context.origin);
  switch (kind) {
    case 'metadata':
      return buildMetadata(canonicalProfile, origin);
    case 'json-ld':
      return buildJsonLd(canonicalProfile, origin);
    case 'profile-json':
      return machineProfile(canonicalProfile, origin);
    case 'llms':
      return buildLlms(canonicalProfile, origin);
    case 'readme':
      return buildReadme(canonicalProfile);
    default:
      throw new Error(`Unhandled profile artifact: ${kind}`);
  }
}
