// Admint Campaign Architect Data & Generator Logic

export const AGE_GROUPS = [
  { id: 'gen-z', name: 'Gen Z', range: '16–24', accent: '#a78bfa' },
  { id: 'millennial', name: 'Millennial', range: '25–40', accent: '#f97316' },
  { id: 'gen-x', name: 'Gen X', range: '41–56', accent: '#ec4899' },
  { id: 'boomer', name: 'Boomer', range: '57+', accent: '#14b8a6' },
];

export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', ratio: '4:5', aspectClass: 'aspect-[4/5]' },
  { id: 'facebook', name: 'Facebook', ratio: '4:5', aspectClass: 'aspect-[4/5]' },
  { id: 'youtube', name: 'YouTube', ratio: '16:9', aspectClass: 'aspect-[16/9]' },
];

export const SAMPLE_PROMPTS = [
  "A refillable stainless-steel water bottle that keeps drinks cold for 24 hours, made from recycled materials.",
  "Organic cold-pressed ceremonial grade matcha green tea powder for calm energy and focus.",
  "Lightweight high-cushion road running shoes engineered for high-energy return.",
  "Artisan cold brew coffee subscription delivered fresh weekly with customizable roast profiles.",
  "AI-powered resume builder tailored to ATS algorithms in 2 minutes.",
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Describe your product',
    description: 'Paste a sentence or two — what it is, what makes it great. No brief, no brand deck required.',
    icon: 'PenTool',
  },
  {
    step: '02',
    title: 'Pick your audience',
    description: "Choose a target age group. AdGenie adapts tone, pacing, color, and copy to match who's watching.",
    icon: 'Users',
  },
  {
    step: '03',
    title: 'Generate creatives',
    description: 'Our models produce image and video ads sized and styled for each platform you select.',
    icon: 'Wand2',
  },
  {
    step: '04',
    title: 'Export & launch',
    description: 'Download ready-to-run creatives, or push them straight into your ad manager to go live.',
    icon: 'Rocket',
  },
];

export const AGE_AWARE_CARDS = [
  {
    title: 'Gen Z',
    range: '16–24',
    color: '#a78bfa',
    bullets: ['Fast cuts & trends', 'Bold, saturated color', 'Native to short-form video'],
  },
  {
    title: 'Millennial',
    range: '25–40',
    color: '#f97316',
    bullets: ['Story-led messaging', 'Clean, aspirational visuals', 'Value & authenticity cues'],
  },
  {
    title: 'Gen X',
    range: '41–56',
    color: '#ec4899',
    bullets: ['Clear benefits up front', 'Trust & credibility signals', 'Balanced pacing'],
  },
  {
    title: 'Boomer',
    range: '57+',
    color: '#14b8a6',
    bullets: ['Legible, larger type', 'Straightforward copy', 'Warm, familiar tone'],
  },
];

export const FEATURES = [
  {
    title: 'Image & video, together',
    description: 'Generate static creatives and short-form video from the same prompt — no separate tools or handoffs.',
    icon: 'Image',
  },
  {
    title: 'Platform-perfect sizing',
    description: 'Every asset is exported in the exact aspect ratio and safe zones each platform expects.',
    icon: 'LayoutGrid',
  },
  {
    title: 'Seconds, not days',
    description: 'A full set of on-brand variants is ready in the time it takes to write a caption.',
    icon: 'Gauge',
  },
  {
    title: 'Built-in variants for testing',
    description: 'Ship multiple headlines and hooks per creative so you can A/B test from day one.',
    icon: 'FlaskConical',
  },
  {
    title: 'Copy that matches the visual',
    description: "Headlines and CTAs are written alongside the imagery, tuned to your audience's voice.",
    icon: 'Languages',
  },
  {
    title: 'Motion presets',
    description: 'Choose energetic, cinematic, or minimal motion styles to fit the campaign mood.',
    icon: 'Video',
  },
];

export const PRESET_CREATIVES = [
  {
    id: 'velocity-x',
    title: 'Velocity X Running Shoes',
    headline: 'OWN THE NIGHT VELOCITY X',
    subheading: 'UNLEASH YOUR ENERGY. LIGHTSPEED CUSHIONING NEON IGNITION',
    cta: 'SHOP NOW',
    type: 'image',
    audience: 'Gen Z',
    platform: 'Instagram',
    ratio: '4:5',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    overlayBg: 'linear-gradient(180deg, rgba(88,28,135,0.7) 0%, rgba(15,23,42,0.9) 100%)',
    tag: '@KINETIC_RUN',
  },
  {
    id: 'aurora-cold-brew',
    title: 'Aurora Cold Brew Coffee',
    headline: 'YOUR MORNING ESCAPE',
    subheading: 'AURORA COLD BREW. SMOOTH. BOLD. REFRESHING.',
    cta: 'Shop Now',
    type: 'image',
    audience: 'Millennial',
    platform: 'Facebook',
    ratio: '4:5',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    overlayBg: 'linear-gradient(180deg, rgba(30,27,75,0.4) 0%, rgba(15,23,42,0.85) 100%)',
    tag: '@auroracoldbrew',
  },
  {
    id: 'aera-skin',
    title: 'Auræ Vitality Serum',
    headline: 'RADIANCE REDEFINED',
    subheading: 'Discover the glow within. Lightweight. Potent. Pure.',
    cta: 'SHOP NOW',
    type: 'image',
    audience: 'Gen X',
    platform: 'Instagram',
    ratio: '4:5',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    overlayBg: 'linear-gradient(180deg, rgba(20,83,45,0.3) 0%, rgba(15,23,42,0.85) 100%)',
    tag: 'AURAE SKIN',
  },
  {
    id: 'matcha-fuel',
    title: 'Ceremonial Matcha Powder',
    headline: 'CALM ENERGY. ZERO CRASH.',
    subheading: 'Ceremonial Grade Organic Matcha. Focus for hours.',
    cta: 'Order Today',
    type: 'image',
    audience: 'Gen Z',
    platform: 'Facebook',
    ratio: '4:5',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    overlayBg: 'linear-gradient(180deg, rgba(6,78,59,0.5) 0%, rgba(15,23,42,0.9) 100%)',
    tag: '#MatchaVibes',
  },
  {
    id: 'hydrate-pro',
    title: 'HydratePro Smart Bottle',
    headline: 'HYDRATION ELEVATED',
    subheading: '24hr Insulation. Recycled Grade Stainless Steel.',
    cta: 'Claim 20% Off',
    type: 'image',
    audience: 'Boomer',
    platform: 'YouTube',
    ratio: '16:9',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    overlayBg: 'linear-gradient(180deg, rgba(30,58,138,0.5) 0%, rgba(15,23,42,0.85) 100%)',
    tag: 'HYDRATE PRO',
  },
];

export function generateCreativesFromPrompt(description, selectedAgeId, selectedPlatforms) {
  const ageObj = AGE_GROUPS.find((a) => a.id === selectedAgeId) || AGE_GROUPS[0];
  const noun = description.trim().split(/\s+/).slice(0, 3).join(' ') || 'Your Product';
  
  const results = [];

  const platformList = selectedPlatforms.length > 0
    ? PLATFORMS.filter((p) => selectedPlatforms.includes(p.id))
    : [PLATFORMS[0], PLATFORMS[1]];

  const headlinesByAge = {
    'gen-z': ['STOP SCROLLING. MEET ' + noun.toUpperCase(), 'YOUR NEW AESTHETIC MUST-HAVE', 'HIGH IMPACT. ZERO FRICTION.'],
    'millennial': [noun + ' — Elevate Your Daily Routine', 'Pure Quality, Crafted For You', 'The Upgrade You Deserve'],
    'gen-x': ['Built To Perform: ' + noun, 'Proven Results & Uncompromised Quality', 'Clear Benefits. Maximum Value.'],
    'boomer': ['Simple, Reliable ' + noun, 'Easy to Use. Exceptional Results.', 'Traditional Craftsmanship Meets Modern Design.'],
  };

  const images = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  ];

  platformList.forEach((platform, idx) => {
    const hlList = headlinesByAge[selectedAgeId] || headlinesByAge['gen-z'];
    const headline = hlList[idx % hlList.length];

    results.push({
      id: `gen-${Date.now()}-${idx}`,
      title: `${noun} for ${platform.name}`,
      headline: headline,
      subheading: description.length > 80 ? description.slice(0, 80) + '...' : description,
      cta: ageObj.id === 'gen-z' ? 'GET YOURS' : ageObj.id === 'millennial' ? 'Shop Now' : 'Learn More',
      type: idx % 2 === 0 ? 'image' : 'video',
      audience: ageObj.name,
      platform: platform.name,
      ratio: platform.ratio,
      imageUrl: images[idx % images.length],
      tag: `@adgenie.${platform.id}`,
    });
  });

  return results;
}
