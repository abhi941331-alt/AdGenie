import React from 'react';
import { ArrowRight, Play, Zap, Layers, Sparkles, Eye } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { AGE_GROUPS } from '../data/campaignData';

export default function Hero() {
  const { setActiveTab, heroAgeGroup, setHeroAgeGroup, setSelectedPreviewCreative } = useCampaign();

  const scrollToSection = (id) => {
    setActiveTab('home');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const demographicShowcases = {
    'gen-z': {
      title: 'Velocity X Running Shoes',
      headline: 'OWN THE NIGHT VELOCITY X',
      subheading: 'UNLEASH YOUR ENERGY. LIGHTSPEED CUSHIONING NEON IGNITION',
      cta: 'SHOP NOW ↗',
      tag: '@KINETIC_RUN',
      audience: 'GEN Z · 16-24',
      platform: 'INSTAGRAM',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    },
    'millennial': {
      title: 'Aurora Cold Brew Coffee',
      headline: 'YOUR MORNING ESCAPE',
      subheading: 'AURORA COLD BREW. SMOOTH. BOLD. REFRESHING.',
      cta: 'Shop Now',
      tag: '@auroracoldbrew',
      audience: 'MILLENNIAL · 25-40',
      platform: 'FACEBOOK',
      imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    },
    'gen-x': {
      title: 'Auræ Vitality Serum',
      headline: 'RADIANCE REDEFINED',
      subheading: 'Discover the glow within. Lightweight. Potent. Pure.',
      cta: 'Explore Formula',
      tag: 'AURAE SKIN',
      audience: 'GEN X · 41-56',
      platform: 'INSTAGRAM',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    },
    'boomer': {
      title: 'HydratePro Stainless Bottle',
      headline: 'HYDRATION ELEVATED',
      subheading: '24hr Cold Insulation. Recycled Grade Stainless Steel.',
      cta: 'Claim 20% Off',
      tag: 'HYDRATE PRO',
      audience: 'BOOMER · 57+',
      platform: 'YOUTUBE',
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    },
  };

  const activeCard = demographicShowcases[heroAgeGroup] || demographicShowcases['gen-z'];

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-admint-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161826] border border-admint-500/30 text-admint-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-admintOrange-400 fill-admintOrange-400" />
            <span>From one sentence to a full campaign</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Describe your product.{' '}
            <span className="text-purple-gradient block sm:inline">Get ads that convert.</span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            AdGenie turns a short product description into platform-optimized image and video ad creatives,
            automatically tuned to the target age group you want to reach.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('studio')}
              className="px-7 py-4 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 text-white font-bold text-base shadow-xl shadow-admint-500/30 flex items-center gap-2 transition-all group"
            >
              <span>Generate your first ad</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-6 py-4 rounded-xl bg-[#141624] hover:bg-[#1c2033] border border-[#272c44] text-slate-200 font-semibold text-base flex items-center gap-2.5 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-200" />
              <span>See how it works</span>
            </button>
          </div>

          {/* Platform Badges */}
          <div className="pt-8 border-t border-[#1c1f2e] space-y-3">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              EXPORTS OPTIMIZED FOR
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-300">
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#E1306C]" /> Instagram
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#1877F2]" /> Facebook
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#FF0000]" /> YouTube
              </span>
            </div>
          </div>
        </div>

        {/* Right Column Interactive Demographic Showcase */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          {/* Interactive Target Demographic Switcher Pills */}
          <div className="mb-4 bg-[#141624] p-1.5 rounded-2xl border border-[#24293f] flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 hidden sm:inline">
              Preview Tone:
            </span>
            {AGE_GROUPS.map((age) => (
              <button
                key={age.id}
                onClick={() => setHeroAgeGroup(age.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  heroAgeGroup === age.id
                    ? 'bg-admint-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#1f2438]'
                }`}
              >
                {age.name}
              </button>
            ))}
          </div>

          {/* Interactive Card Preview */}
          <div className="relative w-full max-w-sm">
            <div
              onClick={() =>
                setSelectedPreviewCreative({
                  id: activeCard.title.toLowerCase().replace(/\s+/g, '-'),
                  title: activeCard.title,
                  headline: activeCard.headline,
                  subheading: activeCard.subheading,
                  cta: activeCard.cta,
                  type: 'image',
                  audience: heroAgeGroup.toUpperCase(),
                  platform: activeCard.platform,
                  ratio: '4:5',
                  imageUrl: activeCard.imageUrl,
                  tag: activeCard.tag,
                })
              }
              className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl bg-slate-900 group cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={activeCard.imageUrl}
                  alt={activeCard.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Click overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-xs">
                  <Eye className="w-4 h-4 text-admint-400" />
                  <span>Click to Preview & Edit Ad Copy</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-admint-400 tracking-wider uppercase">
                    {activeCard.audience} · {activeCard.platform}
                  </span>
                  <h3 className="text-base font-black text-white leading-tight uppercase tracking-tight mt-1">
                    {activeCard.headline}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{activeCard.subheading}</p>
                  <div className="mt-3 inline-block px-3 py-1.5 rounded bg-white text-slate-950 text-[10px] font-extrabold tracking-wider w-max shadow-lg">
                    {activeCard.cta}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Indicator Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#121422]/90 backdrop-blur-md border border-[#272b44] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 w-max">
              <div className="w-7 h-7 rounded-lg bg-admint-500/20 text-admint-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Interactive Real-time Ad Rendering</span>
                </div>
                <div className="text-[10px] text-slate-400">Click card above for instant interactive copy editor.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
