// AdGenie Campaign Architect Data & Mock Database

export const INITIAL_USER = {
  name: 'Nimish Gupta',
  email: 'nimish@gmail.com',
  plan: 'Free Plan',
  creditsUsed: 12,
  totalCredits: 100,
};

export const INITIAL_STATS = {
  totalCampaigns: 12,
  adsGenerated: 36,
  avgEngagementScore: 78,
};

export const AUDIENCE_OPTIONS = [
  { id: 'youth', label: 'Youth (18-25)' },
  { id: 'professionals', label: 'Professionals (26-40)' },
  { id: 'general', label: 'General Audience (41-60)' },
];

export const PLATFORM_OPTIONS = [
  { id: 'instagram', label: 'Instagram', color: '#E1306C' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2' },
];

export const BUDGET_OPTIONS = [
  { id: 'starter', label: 'Starter' },
  { id: 'standard', label: 'Standard' },
  { id: 'scale', label: 'Scale' },
];

export const RECENT_CAMPAIGNS_DATA = [
  {
    id: 'camp-1',
    title: 'Wireless Earbuds',
    description: 'Wireless earbuds with long battery life, active noise cancellation, and crystal clear sound.',
    platform: 'Instagram',
    audience: 'Youth (18-25)',
    budget: 'Standard',
    status: 'Completed',
    timeAgo: '2 minutes ago',
    score: 92,
    variants: [
      {
        id: 'var-1',
        name: 'Variant 1',
        score: 92,
        headline: 'Crystal Clear Sound',
        caption: 'Experience music like never before.',
        cta: 'Get Yours Today',
        overlayText: 'Small Size. Big Sound.',
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-wireless-earbuds-42998-large.mp4',
        duration: '15 seconds',
        resolution: '1080 x 1080 (Instagram)',
        format: 'MP4',
      },
      {
        id: 'var-2',
        name: 'Variant 2',
        score: 78,
        headline: 'Freedom in Every Beat',
        caption: 'Stay connected. Stay you.',
        cta: 'Shop Now',
        overlayText: 'Music In Your World',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-wireless-earbuds-42998-large.mp4',
        duration: '15 seconds',
        resolution: '1080 x 1080 (Instagram)',
        format: 'MP4',
      },
      {
        id: 'var-3',
        name: 'Variant 3',
        score: 85,
        headline: 'Premium Sound. Everyday.',
        caption: 'Designed for your lifestyle.',
        cta: 'Buy Now',
        overlayText: 'Premium Sound For Everyday',
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-wireless-earbuds-42998-large.mp4',
        duration: '15 seconds',
        resolution: '1080 x 1080 (Instagram)',
        format: 'MP4',
      },
    ],
  },
  {
    id: 'camp-2',
    title: 'Protein Bar Launch',
    description: 'High protein organic energy bar with zero added sugar.',
    platform: 'YouTube',
    audience: 'Youth (18-25)',
    budget: 'Standard',
    status: 'Completed',
    timeAgo: '4 days ago',
    score: 88,
    variants: [
      {
        id: 'var-2-1',
        name: 'Variant 1',
        score: 88,
        headline: 'Fuel Your Workout',
        caption: '20g protein. Zero added sugar.',
        cta: 'Order Now',
        overlayText: 'PURE ENERGY',
        imageUrl: 'https://images.unsplash.com/photo-1622484210800-88517572bf92?auto=format&fit=crop&w=800&q=80',
        duration: '20 seconds',
        resolution: '1920 x 1080 (YouTube)',
        format: 'MP4',
      },
    ],
  },
  {
    id: 'camp-3',
    title: 'Skincare Product',
    description: 'Botanical hydration serum for instant glowing skin.',
    platform: 'Facebook',
    audience: 'General Audience (41-60)',
    budget: 'Standard',
    status: 'Completed',
    timeAgo: '1 week ago',
    score: 94,
    variants: [
      {
        id: 'var-3-1',
        name: 'Variant 1',
        score: 94,
        headline: 'Radiance Redefined',
        caption: 'Discover the glow within.',
        cta: 'Learn More',
        overlayText: 'NATURAL GLOW',
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        duration: '15 seconds',
        resolution: '1080 x 1080 (Facebook)',
        format: 'MP4',
      },
    ],
  },
];
