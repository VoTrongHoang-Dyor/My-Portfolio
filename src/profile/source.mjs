const identity = {
  id: 'vo-trong-hoang',
  name: 'Võ Trọng Hoàng',
  careerLevel: 'Junior',
  role: 'Systems Builder',
  headline: 'AI Automation & Systems Builder',
  currentRole: 'Freelance Systems Builder',
  email: 'votronghoang.dy@gmail.com',
  github: 'https://github.com/VoTrongHoang-Dyor',
  linkedin: 'https://www.linkedin.com/in/tronghoang-dyor',
  copyright: '© 2026 Võ Trọng Hoàng — Systems Builder',
  // Kept deliberately narrow: one core identity plus one adjacent role.
  // Broadening this list dilutes the narrative instead of widening reach.
  targetRoles: [
    'AI Automation Engineer',
    'Automation Engineer',
    'Solutions Engineer',
  ],
  coreStrengths: [
    'System Thinking',
    'Product Thinking',
    'Workflow Automation',
    'AI Automation',
    'AI Agents',
    'Model Context Protocol (MCP)',
    'Retrieval-Augmented Generation (RAG)',
    'Python',
  ],
};

const messaging = {
  candidateSummary:
    'Builder focused on understanding problems and designing simpler, more scalable systems. Works across workflow automation, APIs, browser automation, AI agents, Model Context Protocol, and Retrieval-Augmented Generation, choosing software, automation, and AI based on the problem rather than the tool. Building toward the intersection of engineering, systems thinking, product, and business.',
  metadataDescription:
    'Portfolio of Võ Trọng Hoàng — AI Automation & Systems Builder. Turns complex and repetitive work into simpler systems using automation, software, and AI.',
  openGraphDescription:
    'AI Automation & Systems Builder working across workflow automation, APIs, browser automation, AI agents, and Model Context Protocol.',
  twitterDescription:
    'Systems Builder — automation, software, AI, and product thinking for problems worth solving.',
  web: {
    heroTitle: 'I build systems that make complex work simpler.',
    heroSubtitleLead: '',
    heroSubtitleEmphasis: 'Systems Builder',
    heroSubtitleTail: ' | Automation • Software • AI • Product',
    builderTitle: 'Builder mindset',
    builderSubtitle: 'Ships products, not slides',
    aboutLeadPrefix: 'I start with the ',
    aboutLeadEmphasis: 'problem',
    aboutLeadSuffix: ', not the technology.',
    aboutBody: [
      'I look at how work actually happens, where friction and unnecessary complexity come from, and where better systems can create leverage. From there, I design and build practical solutions using software, automation, and AI when they genuinely improve the outcome.',
      "My work spans workflow automation, APIs, browser automation, AI agents, MCP, and tools such as Python, n8n, and Make. But the technology is only part of the work. I'm equally interested in understanding processes, making good trade-offs, and deciding what should be automated, what should remain human, and how a system can stay useful as it grows.",
    ],
    aboutClosing: [
      'I care about outcomes over novelty: less unnecessary work, better processes, and systems that create durable value.',
      "I'm building toward the intersection of engineering, systems thinking, product, and business — with the long-term goal of creating products and systems around problems worth solving.",
    ],
    contactTitle: 'Have a problem worth solving?',
    contactBody:
      "If something in your work is slow, manual, or harder than it needs to be, I'd like to hear about it — whether you're an engineer who needs reliable tooling or a team buried in repetitive work.",
    workMeta: '2025–2026 · Personal products & systems',
  },
  readme: {
    motto: 'Good technology starts with a good understanding of the problem.',
    intro:
      'Systems Builder — **Automation • Software • AI • Product**. I start with the problem, not the technology, and build practical systems with software, automation, and AI when they genuinely improve the outcome.',
    aboutLead: 'I start with the problem, not the technology.',
    aboutBody:
      'I look at how work actually happens, where friction and unnecessary complexity come from, and where better systems can create leverage. From there, I design and build practical solutions using software, automation, and AI when they genuinely improve the outcome — deciding what should be automated, what should remain human, and how a system can stay useful as it grows.',
    portfolioNote:
      '📌 Portfolio actively updated — more projects coming soon.',
    contactTitle: 'Have a problem worth solving?',
    contactBody:
      "If something in your work is slow, manual, or harder than it needs to be, I'd like to hear about it — whether you're an engineer who needs reliable tooling or a team buried in repetitive work.",
    supportIntro:
      'If my work or projects have helped you, consider supporting me — it keeps the side projects shipping.',
  },
};

const navigation = {
  primary: [
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#timeline' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#work' },
    { label: 'Praise', href: '#testimonials' },
  ],
  footer: [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Journey', href: '#timeline' },
    { label: 'Work', href: '#work' },
    { label: 'Praise', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
};

const supportLinks = [
  {
    id: 'support-kofi',
    label: 'Buy me a coffee (Ko-fi)',
    href: 'https://ko-fi.com/tronghoang_dyor',
    icon: 'https://svgl.app/library/bmc.svg',
  },
  {
    id: 'support-paypal',
    label: 'Support via PayPal',
    href: 'https://paypal.me/TrongHoangDyor',
    icon: 'https://svgl.app/library/paypal.svg',
  },
];

const assets = {
  portrait: '/hoang-portrait.png',
  splineScene:
    'https://prod.spline.design/uDYIzXQEjETVH76K/scene.splinecode',
};

const journey = [
  {
    id: 'journey-2022',
    year: '2022',
    title: 'Content & Programming Foundations',
    tag: 'Foundations',
    dotHue: '#D9622B',
    bullets: [
      'Created content across multiple social media platforms.',
      'Built core programming skills with Python and C#.',
      'School-level Excellent Student in Informatics — Ngũ Hành Sơn District, Đà Nẵng.',
    ],
  },
  {
    id: 'journey-2023',
    year: '2023',
    title: 'AI-Assisted Development & Automation',
    tag: 'Exploration',
    dotHue: '#E14F62',
    bullets: [
      'Applied ChatGPT to software development and content creation.',
      'Built first automation tools to boost productivity.',
      'Entered crypto & stock markets — practical experience in financial markets.',
    ],
  },
  {
    id: 'journey-2024',
    year: '2024',
    title: 'Browser Automation',
    tag: 'Engineering',
    dotHue: '#DA5597',
    bullets: [
      'Developed browser automation workflows with GPM Automation Software.',
      'Selenium-like browser control for repeatable, hands-off tasks.',
      'Scaled scripts into reliable, maintainable automation.',
    ],
  },
  {
    id: 'journey-2025',
    year: '2025',
    title: 'Freelance AI Automation Engineer',
    tag: 'Today',
    dotHue: '#E9A23B',
    bullets: [
      'Specialized in n8n workflow automation.',
      'AI Pain Point Discovery Workflow.',
      'TeraChat — enterprise communication platform.',
      'MCP-based long-term context management.',
    ],
  },
  {
    id: 'journey-2026',
    year: '2026',
    title: 'Fine-Tuned AI & Agent Systems',
    tag: 'Current Focus',
    dotHue: '#62C6C2',
    bullets: [
      'Developing practical skills in fine-tuning and evaluating language models for domain-specific business workflows.',
      'Designing AI harnesses and multi-agent teams that coordinate specialized tasks with clear roles, context, and guardrails.',
      'Building practical tools and support systems that help businesses and individuals automate work, organize knowledge, and make better decisions.',
      'Studying cryptocurrency fundamentals, utility, market structure, and the operating mechanics behind digital assets.',
    ],
  },
];

// Icons sourced from svgl.app API.
const skillCategories = [
  {
    id: 'ai-llm',
    label: 'AI & LLM',
    accent: '#5b4ee8',
    summary: 'LLM-powered tools, prompt engineering, and agent design',
    skills: [
      { id: 'langchain', name: 'LangChain', icon: 'https://svgl.app/library/langchain-logo.svg' },
      { id: 'hugging-face', name: 'Hugging Face', icon: 'https://svgl.app/library/hugging_face.svg' },
      { id: 'openrouter', name: 'OpenRouter', icon: 'https://svgl.app/library/openrouter_light.svg' },
      { id: 'mcp', name: 'MCP', icon: 'https://svgl.app/library/model-context-protocol-dark.svg' },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    accent: '#16a34a',
    summary: 'n8n workflows, browser automation, and process automation',
    skills: [
      { id: 'n8n', name: 'n8n', icon: 'https://svgl.app/library/n8n.svg' },
    ],
  },
  {
    id: 'programming-languages',
    label: 'Programming Languages',
    accent: '#3aa0c9',
    summary: 'Python, C#, Kotlin, Swift, Rust, Dart, and Bash',
    skills: [
      { id: 'python', name: 'Python', icon: 'https://svgl.app/library/python.svg' },
      { id: 'kotlin', name: 'Kotlin', icon: 'https://svgl.app/library/kotlin.svg' },
      { id: 'swift', name: 'Swift', icon: 'https://svgl.app/library/swift.svg' },
      { id: 'csharp', name: 'C#', icon: 'https://svgl.app/library/csharp.svg' },
      { id: 'java', name: 'Java', icon: 'https://svgl.app/library/java.svg' },
      { id: 'rust', name: 'Rust', icon: 'https://svgl.app/library/rust.svg' },
      { id: 'dart', name: 'Dart', icon: 'https://svgl.app/library/dart.svg' },
      { id: 'bash', name: 'Bash', icon: 'https://svgl.app/library/bash.svg' },
      { id: 'markdown', name: 'Markdown', icon: 'https://svgl.app/library/markdown-light.svg' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    accent: '#d98a3a',
    summary: 'Data storage and management',
    skills: [
      { id: 'postgresql', name: 'PostgreSQL', icon: 'https://svgl.app/library/postgresql.svg' },
      { id: 'sqlite', name: 'SQLite', icon: 'https://svgl.app/library/sqlite.svg' },
    ],
  },
  {
    id: 'devops-infrastructure',
    label: 'DevOps & Infrastructure',
    accent: '#e05c5c',
    summary: 'Docker, deployment pipelines, and cloud infrastructure',
    skills: [
      { id: 'docker', name: 'Docker', icon: 'https://svgl.app/library/docker.svg' },
      { id: 'git', name: 'Git', icon: 'https://svgl.app/library/git.svg' },
      { id: 'cloudflare', name: 'Cloudflare', icon: 'https://svgl.app/library/cloudflare.svg' },
      { id: 'google-cloud', name: 'Google Cloud', icon: 'https://svgl.app/library/google-cloud.svg' },
    ],
  },
  {
    id: 'browsers',
    label: 'Browsers',
    accent: '#e07b2a',
    summary: 'Browser automation and headless control',
    skills: [
      { id: 'firefox', name: 'Firefox', icon: 'https://svgl.app/library/firefox.svg' },
      { id: 'chromium', name: 'Chromium', icon: 'https://svgl.app/library/chromium.svg' },
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    accent: '#6b7280',
    summary: 'Workflow optimization tools',
    skills: [
      { id: 'excel', name: 'Excel', icon: 'https://svgl.app/library/microsoft-excel.svg' },
      { id: 'word', name: 'Word', icon: 'https://svgl.app/library/microsoft-word.svg' },
      { id: 'powerpoint', name: 'PowerPoint', icon: 'https://svgl.app/library/microsoft-powerpoint.svg' },
    ],
  },
  {
    id: 'platforms-apis',
    label: 'Platforms & APIs',
    accent: '#c77dff',
    summary: 'Third-party integrations and API orchestration',
    skills: [
      { id: 'twilio', name: 'Twilio', icon: 'https://svgl.app/library/twilio.svg' },
      { id: 'shopify', name: 'Shopify', icon: 'https://svgl.app/library/shopify.svg' },
      { id: 'paypal', name: 'PayPal', icon: 'https://svgl.app/library/paypal.svg' },
      { id: 'whatsapp', name: 'WhatsApp', icon: 'https://svgl.app/library/whatsapp-icon.svg' },
    ],
  },
];

const projects = [
  {
    id: 'ai-pain-point-discovery',
    name: 'AI Pain Point Discovery',
    kind: 'Workflow',
    year: '2025',
    icon: '🎯',
    bg: '#eef0ff',
    accent: '#5b4ee8',
    desc: 'An automated workflow that surfaces real, solvable pain points worth building for.',
    status: 'Prototype',
    problem:
      'Product discovery needs a repeatable way to surface real, solvable pain points instead of relying only on assumptions.',
    solution:
      'An automated workflow that organizes research signals and surfaces candidate pain points for validation.',
    role: 'Built the automation workflow as an independent portfolio project.',
    technology: ['Workflow automation', 'LLM-assisted analysis'],
    outcome:
      'A repeatable discovery workflow. No public performance metrics, repository, or demo have been supplied yet.',
    links: { repository: null, demo: null, caseStudy: null },
  },
  {
    id: 'terachat',
    name: 'TeraChat',
    kind: 'Platform',
    year: '2025',
    icon: '💬',
    bg: '#eaf6ef',
    accent: '#3fae6e',
    desc: 'An enterprise communication platform for fast, organized team conversations.',
    status: 'MVP',
    problem:
      'Team communication needs a faster, more organized way to keep conversations usable.',
    solution:
      'An enterprise communication platform for structured team conversations.',
    role: 'Built and shipped the platform as a personal product project.',
    technology: ['Application development', 'Communication workflows'],
    outcome:
      'A shipped portfolio product. No public adoption metrics or project-specific repository have been supplied yet.',
    links: { repository: null, demo: null, caseStudy: null },
  },
  {
    id: 'mcp-context-manager',
    name: 'MCP Context Manager',
    kind: 'Infrastructure',
    year: '2025',
    icon: '🧠',
    bg: '#fdf0e6',
    accent: '#d98a3a',
    desc: 'MCP-based long-term context management so LLMs remember what matters.',
    status: 'In Development',
    problem:
      'Large Language Model workflows can lose useful context between tasks and sessions.',
    solution:
      'A Model Context Protocol-based approach to long-term context management.',
    role: 'Designed and developed the context-management project independently.',
    technology: [
      'Model Context Protocol (MCP)',
      'Long-term context management',
    ],
    outcome:
      'A documented portfolio project in active development. Public evaluation results and a repository have not been supplied yet.',
    links: { repository: null, demo: null, caseStudy: null },
  },
];

const education = {
  id: 'education-quang-nam-university',
  degree: 'B.A. in English Language',
  school: 'Quảng Nam University of Education',
  status: '3rd-year undergraduate · in progress',
  note: 'A language major by training, an automation engineer by practice — I build the technical side in parallel with my degree.',
};

// Spoken languages (distinct from the programming stack)
const spokenLanguages = [
  { id: 'language-vietnamese', name: 'Vietnamese', level: 'Native', accent: '#3fae6e' },
  { id: 'language-english', name: 'English', level: 'B2 · Upper-Intermediate', accent: '#5b4ee8' },
  { id: 'language-chinese', name: 'Chinese', level: 'HSK 3', accent: '#e05c5c' },
];

/**
 * Honest, self-aware take on programming proficiency, framed as a WhatsApp
 * chat. Uses the Dreyfus skill model: Advanced Beginner everywhere except
 * Python, which is at Competent.
 */
const proficiencyChat = {
  contact: 'Hiring Manager',
  status: 'online',
  messages: [
    { from: 'them', text: 'Hey! Really liked the portfolio 👀', time: '09:24' },
    { from: 'them', text: 'How proficient are you, honestly, across all those languages?', time: '09:24' },
    {
      from: 'me',
      text: 'Straight answer: Advanced Beginner with Kotlin, C#, Java, Rust, and Bash.',
      time: '09:26',
    },
    { from: 'me', text: "I can read and ship in them, but I'm still building real depth.", time: '09:26' },
    {
      from: 'me',
      text: "Python is my daily driver at Competent level; Swift and Dart are also currently assessed as Competent.",
      time: '09:27',
    },
    { from: 'me', text: "I'd rather be honest than inflate a stack.", time: '09:27' },
    { from: 'them', text: 'Appreciate the honesty 🙌', time: '09:28' },
  ],
};

/**
 * Per-language proficiency for the interactive two-column showcase.
 * `level` is one of: "Competent" | "Advanced Beginner" (Dreyfus model).
 */
const languageProficiency = [
  {
    id: 'python',
    name: 'Python',
    logo: '/logos/python.svg',
    lang: 'python',
    level: 'Competent',
    desc: 'Capable of working independently, designing data flows, building APIs, and writing production-ready code with minimal supervision.',
    code: `@app.get("/users/{uid}")
async def get_user(uid: int) -> User:
    user = await db.fetch_one(
        users.select().where(users.c.id == uid)
    )
    if not user:
        raise HTTPException(404, "User not found")
    return User(**user)`,
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    logo: '/logos/kotlin.svg',
    lang: 'kotlin',
    level: 'Advanced Beginner',
    desc: 'Comfortable navigating existing Android codebases, fixing minor bugs, and implementing basic UI components under Senior guidance.',
    code: `@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello, $name!",
        style = MaterialTheme.typography.titleLarge,
        modifier = modifier.padding(16.dp),
    )
}`,
  },
  {
    id: 'swift',
    name: 'Swift',
    logo: '/logos/swift.svg',
    lang: 'swift',
    level: 'Competent',
    desc: 'Understanding of iOS app lifecycles. Can build simple views and integrate basic REST APIs.',
    code: `struct ProfileView: View {
    @State private var user: User?

    var body: some View {
        Text(user?.name ?? "Loading…")
            .task { user = try? await API.fetchUser() }
    }
}`,
  },
  {
    id: 'csharp',
    name: 'C#',
    logo: '/logos/csharp.svg',
    lang: 'csharp',
    level: 'Advanced Beginner',
    desc: 'Familiar with OOP principles and basic .NET architecture. Able to contribute to internal tools or simple CRUD operations.',
    code: `[HttpGet("{id}")]
public async Task<ActionResult<Product>> GetProduct(int id)
{
    var product = await _context.Products.FindAsync(id);
    return product is null ? NotFound() : Ok(product);
}`,
  },
  {
    id: 'java',
    name: 'Java',
    logo: '/logos/java.svg',
    lang: 'java',
    level: 'Advanced Beginner',
    desc: 'Solid grasp of core concepts. Capable of maintaining legacy enterprise code or writing unit tests.',
    code: `@Test
void shouldReturnSumOfTwoNumbers() {
    Calculator calc = new Calculator();
    assertEquals(5, calc.add(2, 3));
}`,
  },
  {
    id: 'rust',
    name: 'Rust',
    logo: '/logos/rust.svg',
    lang: 'rust',
    level: 'Advanced Beginner',
    desc: 'Understanding of ownership and memory safety concepts. Currently exploring CLI tool development.',
    code: `fn main() {
    let args: Vec<String> = std::env::args().collect();
    let name = args.get(1).map(String::as_str).unwrap_or("world");
    println!("Hello, {name}!");
}`,
  },
  {
    id: 'dart',
    name: 'Dart',
    logo: '/logos/dart.svg',
    lang: 'dart',
    level: 'Competent',
    desc: 'Familiar with Flutter widget trees. Can build basic cross-platform screens and manage simple state.',
    code: `class CounterText extends StatelessWidget {
  const CounterText({super.key, required this.count});
  final int count;

  @override
  Widget build(BuildContext context) => Text('Count: \$count');
}`,
  },
  {
    id: 'bash',
    name: 'Bash',
    logo: '/logos/bash.svg',
    lang: 'bash',
    level: 'Advanced Beginner',
    desc: 'Able to write simple automation scripts for CI/CD pipelines and navigate Linux environments.',
    code: `#!/usr/bin/env bash
set -euo pipefail

for svc in api web worker; do
  echo "Deploying $svc…"
  docker compose up -d --no-deps --build "$svc"
done`,
  },
];

const testimonials = [
  {
    id: 'testimonial-technical-lead',
    role: 'Technical Lead',
    name: 'Teryn Cael',
    avatar: '/testimonials/technical-lead.jpg',
    accent: '#5b4ee8',
    quote:
      'He has strong systems thinking and tends to tackle problems at the root rather than just patching symptoms. I really value his self-learning ability and his drive to understand how things truly work. One thing to improve: he sometimes overthinks before getting started, so his progress doesn’t always match his potential.',
  },
  {
    id: 'testimonial-colleague',
    role: 'Colleague',
    name: 'Zaren Vance',
    avatar: '/testimonials/colleague.jpg',
    accent: '#3fae6e',
    quote:
      'He’s easy to work with — always open to discussion and genuinely willing to listen to other perspectives. He often brings thoughtful, in-depth ideas, especially around product and security. That said, when presenting, he could be more concise and structured so others can follow along more easily.',
  },
  {
    id: 'testimonial-product-manager-ceo',
    role: 'Product Manager / CEO',
    name: 'Ives Sterling',
    avatar: '/testimonials/product-manager-ceo.jpg',
    accent: '#d98a3a',
    quote:
      'He doesn’t just care about getting tasks done — he wants to build products that deliver real value. He’s accountable and consistently looks for ways to improve after every setback. If he keeps building his technical foundation and stays disciplined in execution, he has the potential to grow into a genuinely strong engineer or product builder.',
  },
];

const evidencePolicy = {
  note:
    'This profile does not invent clients, revenue, certifications, years of experience, project metrics, or testimonials.',
  missingEvidence: [
    'Project-specific public repositories',
    'Live demos',
    'Case studies',
    'Measured project outcomes',
    'Public CV or résumé file',
  ],
};

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.values(value).forEach(deepFreeze);
  return value;
}

function assertUnique(records, label, select = (record) => record.id) {
  const seen = new Set();
  records.forEach((record) => {
    const value = select(record);
    if (!value || seen.has(value)) {
      throw new Error(`${label} must contain unique non-empty values: ${value}`);
    }
    seen.add(value);
  });
}

function assertUrl(value, label, { nullable = false } = {}) {
  if (nullable && value === null) return;
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} must be an absolute URL`);
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`${label} must use http or https`);
  }
}

export function defineCanonicalProfile(source) {
  assertUnique(source.journey, 'Journey IDs');
  assertUnique(source.journey, 'Journey years', (entry) => entry.year);
  assertUnique(source.projects, 'Project IDs');
  assertUnique(source.skills.categories, 'Skill category IDs');
  assertUnique(
    source.skills.categories.flatMap((category) => category.skills),
    'Skill IDs',
  );
  assertUnique(source.skills.proficiency, 'Proficiency IDs');
  assertUnique(source.spokenLanguages, 'Spoken language IDs');
  assertUnique(source.testimonials, 'Testimonial IDs');

  const skillIds = new Set(
    source.skills.categories.flatMap((category) =>
      category.skills.map((skill) => skill.id),
    ),
  );
  source.skills.proficiency.forEach((entry) => {
    if (!skillIds.has(entry.id)) {
      throw new Error(`Proficiency references unknown skill: ${entry.id}`);
    }
    if (!['Competent', 'Advanced Beginner'].includes(entry.level)) {
      throw new Error(`Unsupported proficiency level: ${entry.level}`);
    }
  });

  assertUrl(source.identity.github, 'GitHub URL');
  assertUrl(source.identity.linkedin, 'LinkedIn URL');
  source.supportLinks.forEach((link) => {
    assertUrl(link.href, `Support URL for ${link.id}`);
    assertUrl(link.icon, `Support icon for ${link.id}`);
  });
  assertUrl(source.assets.splineScene, 'Spline scene URL');
  source.skills.categories.forEach((category) => {
    category.skills.forEach((skill) => {
      assertUrl(skill.icon, `Icon URL for ${skill.id}`);
    });
  });
  source.projects.forEach((project) => {
    ['status', 'problem', 'solution', 'role', 'outcome'].forEach((field) => {
      if (!project[field]) {
        throw new Error(`Project ${project.id} is missing ${field}`);
      }
    });
    Object.entries(project.links).forEach(([name, url]) => {
      assertUrl(url, `${project.id}.${name}`, { nullable: true });
    });
  });

  return deepFreeze(source);
}

export const canonicalProfile = defineCanonicalProfile({
  schemaVersion: '1.0',
  reviewedAt: '2026-07-30',
  identity,
  messaging,
  navigation,
  supportLinks,
  assets,
  journey,
  skills: {
    categories: skillCategories,
    proficiency: languageProficiency,
    chat: proficiencyChat,
  },
  projects,
  education,
  spokenLanguages,
  testimonials,
  evidencePolicy,
});
