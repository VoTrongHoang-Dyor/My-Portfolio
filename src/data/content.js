export const timelineData = [
  {
    year: '2022',
    title: 'Content & Programming Foundations',
    tag: 'Foundations',
    dotHue: '#caa83a',
    bullets: [
      'Created content across multiple social media platforms.',
      'Built core programming skills with Python and C#.',
      'School-level Excellent Student in Informatics — Ngũ Hành Sơn District, Đà Nẵng.',
    ],
  },
  {
    year: '2023',
    title: 'AI-Assisted Development & Automation',
    tag: 'Exploration',
    dotHue: '#3aa0c9',
    bullets: [
      'Applied ChatGPT to software development and content creation.',
      'Built first automation tools to boost productivity.',
      'Entered crypto & stock markets — practical experience in financial markets.',
    ],
  },
  {
    year: '2024',
    title: 'Browser Automation',
    tag: 'Engineering',
    dotHue: '#5b4ee8',
    bullets: [
      'Developed browser automation workflows with GPM Automation Software.',
      'Selenium-like browser control for repeatable, hands-off tasks.',
      'Scaled scripts into reliable, maintainable automation.',
    ],
  },
  {
    year: '2025',
    title: 'Freelance AI Automation Engineer',
    tag: 'Today',
    dotHue: '#3fae6e',
    bullets: [
      'Specialized in n8n workflow automation.',
      'AI Pain Point Discovery Workflow.',
      'TeraChat — enterprise communication platform.',
      'MCP-based long-term context management.',
    ],
  },
];

// Icons sourced from svgl.app API
export const skillCategories = [
  {
    label: 'AI & LLM',
    accent: '#5b4ee8',
    skills: [
      { name: 'LangChain',   icon: 'https://svgl.app/library/langchain-logo.svg' },
      { name: 'Hugging Face',icon: 'https://svgl.app/library/hugging_face.svg' },
      { name: 'OpenRouter',  icon: 'https://svgl.app/library/openrouter_light.svg' },
      { name: 'MCP',         icon: 'https://svgl.app/library/model-context-protocol-dark.svg' },
    ],
  },
  {
    label: 'Automation',
    accent: '#16a34a',
    skills: [
      { name: 'n8n', icon: 'https://svgl.app/library/n8n.svg' },
    ],
  },
  {
    label: 'Programming Languages',
    accent: '#3aa0c9',
    skills: [
      { name: 'Python', icon: 'https://svgl.app/library/python.svg' },
      { name: 'Kotlin', icon: 'https://svgl.app/library/kotlin.svg' },
      { name: 'Swift',  icon: 'https://svgl.app/library/swift.svg' },
      { name: 'C#',     icon: 'https://svgl.app/library/csharp.svg' },
      { name: 'Java',   icon: 'https://svgl.app/library/java.svg' },
      { name: 'Rust',   icon: 'https://svgl.app/library/rust.svg' },
      { name: 'Dart',   icon: 'https://svgl.app/library/dart.svg' },
      { name: 'Bash',   icon: 'https://svgl.app/library/bash.svg' },
      { name: 'Markdown', icon: 'https://svgl.app/library/markdown-light.svg' },
    ],
  },
  {
    label: 'Databases',
    accent: '#d98a3a',
    skills: [
      { name: 'PostgreSQL', icon: 'https://svgl.app/library/postgresql.svg' },
      { name: 'SQLite',     icon: 'https://svgl.app/library/sqlite.svg' },
    ],
  },
  {
    label: 'DevOps & Infrastructure',
    accent: '#e05c5c',
    skills: [
      { name: 'Docker',       icon: 'https://svgl.app/library/docker.svg' },
      { name: 'Git',          icon: 'https://svgl.app/library/git.svg' },
      { name: 'Cloudflare',   icon: 'https://svgl.app/library/cloudflare.svg' },
      { name: 'Google Cloud', icon: 'https://svgl.app/library/google-cloud.svg' },
    ],
  },
  {
    label: 'Browsers',
    accent: '#e07b2a',
    skills: [
      { name: 'Firefox',  icon: 'https://svgl.app/library/firefox.svg' },
      { name: 'Chromium', icon: 'https://svgl.app/library/chromium.svg' },
    ],
  },
  {
    label: 'Productivity',
    accent: '#6b7280',
    skills: [
      { name: 'Excel',      icon: 'https://svgl.app/library/microsoft-excel.svg' },
      { name: 'Word',       icon: 'https://svgl.app/library/microsoft-word.svg' },
      { name: 'PowerPoint', icon: 'https://svgl.app/library/microsoft-powerpoint.svg' },
    ],
  },
  {
    label: 'Platforms & APIs',
    accent: '#c77dff',
    skills: [
      { name: 'Twilio',   icon: 'https://svgl.app/library/twilio.svg' },
      { name: 'Shopify',  icon: 'https://svgl.app/library/shopify.svg' },
      { name: 'PayPal',   icon: 'https://svgl.app/library/paypal.svg' },
      { name: 'WhatsApp', icon: 'https://svgl.app/library/whatsapp-icon.svg' },
    ],
  },
];

export const projects = [
  {
    name: 'AI Pain Point Discovery',
    kind: 'Workflow',
    icon: '🎯',
    bg: '#eef0ff',
    accent: '#5b4ee8',
    desc: 'An automated workflow that surfaces real, solvable pain points worth building for.',
  },
  {
    name: 'TeraChat',
    kind: 'Platform',
    icon: '💬',
    bg: '#eaf6ef',
    accent: '#3fae6e',
    desc: 'An enterprise communication platform for fast, organized team conversations.',
  },
  {
    name: 'MCP Context Manager',
    kind: 'Infrastructure',
    icon: '🧠',
    bg: '#fdf0e6',
    accent: '#d98a3a',
    desc: 'MCP-based long-term context management so LLMs remember what matters.',
  },
];

export const education = {
  degree: 'B.A. in English Language',
  school: 'Quảng Nam University of Education',
  status: '3rd-year undergraduate · in progress',
  note: 'A language major by training, an automation engineer by practice — I build the technical side in parallel with my degree.',
};

// Spoken languages (distinct from the programming stack)
export const spokenLanguages = [
  { name: 'Vietnamese', level: 'Native', accent: '#3fae6e' },
  { name: 'English', level: 'B2 · Upper-Intermediate', accent: '#5b4ee8' },
  { name: 'Chinese', level: 'HSK 3', accent: '#e05c5c' },
];

/**
 * Honest, self-aware take on programming proficiency, framed as a WhatsApp
 * chat. Uses the Dreyfus skill model: Advanced Beginner everywhere except
 * Python, which is at Competent.
 */
export const proficiencyChat = {
  contact: 'Hiring Manager',
  status: 'online',
  messages: [
    { from: 'them', text: 'Hey! Really liked the portfolio 👀', time: '09:24' },
    { from: 'them', text: 'How proficient are you, honestly, across all those languages?', time: '09:24' },
    {
      from: 'me',
      text: 'Straight answer: Advanced Beginner with most of them — Kotlin, Swift, C#, Java, Rust, Dart, Bash.',
      time: '09:26',
    },
    { from: 'me', text: "I can read and ship in them, but I'm still building real depth.", time: '09:26' },
    {
      from: 'me',
      text: "Python is the exception → Competent. It's my daily driver for automation & LLM tooling. 🐍",
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
export const languageProficiency = [
  {
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
    name: 'Swift',
    logo: '/logos/swift.svg',
    lang: 'swift',
    level: 'Advanced Beginner',
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
    name: 'Dart',
    logo: '/logos/dart.svg',
    lang: 'dart',
    level: 'Advanced Beginner',
    desc: 'Familiar with Flutter widget trees. Can build basic cross-platform screens and manage simple state.',
    code: `class CounterText extends StatelessWidget {
  const CounterText({super.key, required this.count});
  final int count;

  @override
  Widget build(BuildContext context) => Text('Count: \$count');
}`,
  },
  {
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

export const testimonials = [
  {
    role: 'Technical Lead',
    accent: '#5b4ee8',
    quote:
      'He has strong systems thinking and tends to tackle problems at the root rather than just patching symptoms. I really value his self-learning ability and his drive to understand how things truly work. One thing to improve: he sometimes overthinks before getting started, so his progress doesn’t always match his potential.',
  },
  {
    role: 'Colleague',
    accent: '#3fae6e',
    quote:
      'He’s easy to work with — always open to discussion and genuinely willing to listen to other perspectives. He often brings thoughtful, in-depth ideas, especially around product and security. That said, when presenting, he could be more concise and structured so others can follow along more easily.',
  },
  {
    role: 'Product Manager / CEO',
    accent: '#d98a3a',
    quote:
      'He doesn’t just care about getting tasks done — he wants to build products that deliver real value. He’s accountable and consistently looks for ways to improve after every setback. If he keeps building his technical foundation and stays disciplined in execution, he has the potential to grow into a genuinely strong engineer or product builder.',
  },
];
