/**
 * Single source of truth for every piece of copy and every number on the page.
 * Edit here — the sections read from this file.
 */

export const site = {
  name: "LinkCore Media",
  wordmark: "LINKCORE",
  handle: "@linkcore_media",
  instagram: "https://www.instagram.com/linkcore_media/",
  phones: ["+1 214-680-1927", "+1 940-344-9206"],
  email: "hello@linkcoremedia.com",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const ticker = [
  "STOP THE SCROLL",
  "RETENTION IS REVENUE",
  "POST LESS — WIN MORE",
  "HOOKS OVER HASHTAGS",
  "WE DON'T CHASE VIRALITY",
  "CONTENT THAT COMPOUNDS",
];

export const problems = [
  {
    n: "01",
    title: "You post into the void",
    body: "Three reels a week, 400 views each, zero inbound. Volume without a system is just noise you paid for.",
  },
  {
    n: "02",
    title: "Your hook dies in 1.2s",
    body: "The algorithm decided before your intro finished. If the first second doesn't earn the second one, nothing after it matters.",
  },
  {
    n: "03",
    title: "No angle, no thesis",
    body: "You're making content about your product instead of content about the problem your buyer wakes up thinking about.",
  },
  {
    n: "04",
    title: "You can't tell what worked",
    body: "No retention read, no hook tests, no iteration loop. So every month you start from zero and call it consistency.",
  },
];

export const services = [
  {
    n: "01",
    title: "Content Strategy & Positioning",
    body: "We pin down your message, your buyer, and the angles nobody else in your niche is running. Then we build a roadmap tied to business outcomes, not vanity metrics.",
    bullets: ["Positioning & message map", "Audience + competitor teardown", "Angle and hook bank"],
  },
  {
    n: "02",
    title: "Short-Form Video Production",
    body: "Scripting, shooting, editing — end to end for Reels, TikTok and Shorts. Built to stop the scroll in frame one and hold attention to the last beat.",
    bullets: ["Scripts written for retention", "Platform-native editing", "Captions, sound, pacing, hooks"],
  },
  {
    n: "03",
    title: "Social Systems & Analytics",
    body: "A repeatable posting, testing and iteration engine — with reporting that actually tells you which hook earned the watch time.",
    bullets: ["Posting calendar & cadence", "Hook + retention testing", "Monthly performance read"],
  },
];

export const stats = [
  { value: "4–5", label: "videos shipped / week at Pro" },
  { value: "48h", label: "typical edit turnaround" },
  { value: "100%", label: "platform-native, no repurposed fluff" },
  { value: "3", label: "client slots open this month" },
];

export const process = [
  {
    n: "01",
    title: "Discovery & Audit",
    body: "We tear down your current content, your audience, and your goals. You get an honest read on what's working, what's dead weight, and where the opening is.",
  },
  {
    n: "02",
    title: "Strategy & Scripts",
    body: "We map angles, hooks and storylines into a content roadmap. Every script has a job: earn the first second, hold the middle, land the action.",
  },
  {
    n: "03",
    title: "Production & Edit",
    body: "We produce and cut each piece for the platform it lives on. Pacing, captions, sound design, and cut rhythm tuned for retention.",
  },
  {
    n: "04",
    title: "Launch & Iterate",
    body: "We ship, track and adjust against real data. What retained gets scaled. What didn't gets killed. Every month sharper than the last.",
  },
];

/**
 * Portfolio: official Instagram embeds (instagram.com/reel/<id>/embed).
 * Swap the shortcodes for whichever reels should be featured.
 *
 * `zoom` is the iframe width as a % of the card. Instagram renders each reel's
 * media at its own height, so this is the dial that pushes the white
 * likes/comment chrome below the card's clipped window. Raise it if a reel
 * shows white at the bottom; lower it if the video looks over-cropped.
 */
export const reels = [
  { id: "DZi_sH2IApu", caption: "Founder short-form", zoom: 152 },
  { id: "DaQe-vgIMK4", caption: "Creator growth cut", zoom: 152 },
  { id: "DZ6JUMbowbV", caption: "Brand story piece", zoom: 225 },
];

/**
 * PLACEHOLDER TESTIMONIALS — replace with real, approved client quotes
 * before this page goes live.
 */
export const testimonials = [
  {
    quote:
      "They rebuilt how we talk about the product. Same offer, sharper angle — inbound stopped being a coin flip.",
    name: "Placeholder Name",
    handle: "@placeholder",
    role: "Founder, SaaS",
  },
  {
    quote:
      "First month they killed half my content ideas and replaced them with better ones. That was worth the retainer alone.",
    name: "Placeholder Name",
    handle: "@placeholder",
    role: "Creator",
  },
  {
    quote:
      "Fast turnarounds, native edits, and a report I actually read. No agency theater.",
    name: "Placeholder Name",
    handle: "@placeholder",
    role: "Small business owner",
  },
];

export const pricing = [
  {
    id: "starter",
    name: "Starter",
    price: "$800",
    prefix: "from",
    frequency: "/month",
    description: "Get a real cadence running without guessing.",
    features: [
      "8 short-form videos per month (~2 / week)",
      "Kickoff strategy call or questionnaire",
      "Content calendar — what goes live, and when",
      "Month-end analytics recap: views, watch time, top posts",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$1,000–1,200",
    prefix: "from",
    frequency: "/month",
    description: "The one most clients pick. Volume plus a real feedback loop.",
    features: [
      "12 short-form videos per month (~3 / week)",
      "Kickoff strategy call + mid-month check-in",
      "Detailed calendar with themes and hook ideas",
      "Deeper analytics: top hooks, retention notes, next moves",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$1,500+",
    prefix: "from",
    frequency: "/month",
    description: "Full-send. Built for founders scaling a real content engine.",
    features: [
      "16–20 short-form videos per month (4–5 / week)",
      "Full monthly strategy: angles, hooks, storytelling frameworks",
      "Two strategy calls: kickoff and end-of-month review",
      "Detailed report with next-month recommendations",
      "Priority support and faster turnarounds",
    ],
  },
];

export const faqs = [
  {
    q: "Do I have to be on camera?",
    a: "No. Plenty of our best-performing work is voiceover, screen capture, b-roll and text-led. If you do want to be on camera, we'll script it so you're not improvising.",
  },
  {
    q: "How fast do we see results?",
    a: "Cadence starts week one. Meaningful data comes around week four — that's the first real retention read. Compounding shows up over months, not days. Anyone promising otherwise is selling you a lottery ticket.",
  },
  {
    q: "What do you need from me?",
    a: "A kickoff call, access to raw footage or a short filming routine, and quick approvals. We handle strategy, scripting, editing, calendar and reporting.",
  },
  {
    q: "Is there a long contract?",
    a: "Monthly retainers. No twelve-month lock-in. We'd rather keep the account by producing than by paperwork.",
  },
  {
    q: "You're teenagers. Why does that help me?",
    a: "Because we grew up inside the platforms you're trying to win on. We're not translating trends from a slide deck — we watch them form. That's the whole edge.",
  },
  {
    q: "What if my niche is boring?",
    a: "There are no boring niches, only boring angles. Plumbing, compliance software, dental — the constraint is the framing, and framing is the job.",
  },
];
