import React from 'react';
import { ArrowRight, Play, Zap, Layers } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export default function Hero() {
  const { setActiveTab } = useCampaign();

  const scrollToSection = (id) => {
    setActiveTab('home');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
              className="px-7 py-4 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 text-white font-bold text-base shadow-xl shadow-admint-500/30 flex items-center gap-2 transition-all"
            >
              <span>Generate your first ad</span>
              <ArrowRight className="w-5 h-5" />
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

        {/* Right Column Showcase Cards */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md grid grid-cols-2 gap-4">
            {/* Card 1: Velocity X */}
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl bg-slate-900 group transform hover:-translate-y-1 transition-transform">
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                  alt="Velocity X"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-purple-400 tracking-wider uppercase">GEN Z · INSTAGRAM</span>
                  <h3 className="text-sm font-black text-white leading-tight uppercase tracking-tight">
                    OWN THE NIGHT VELOCITY X
                  </h3>
                  <p className="text-[10px] text-slate-300 mt-1 line-clamp-2">
                    UNLEASH YOUR ENERGY. LIGHTSPEED CUSHIONING NEON IGNITION
                  </p>
                  <div className="mt-2 inline-block px-2.5 py-1 rounded bg-white text-slate-950 text-[9px] font-extrabold tracking-wider w-max">
                    SHOP NOW ↗
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Aurora Cold Brew */}
            <div className="relative rounded-2xl overflow-hidden border border-orange-500/30 shadow-2xl bg-slate-900 group transform hover:-translate-y-1 transition-transform mt-8">
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80"
                  alt="Aurora Cold Brew"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-orange-400 tracking-wider uppercase">MILLENNIAL · FACEBOOK</span>
                  <h3 className="text-sm font-black text-white leading-tight uppercase tracking-tight">
                    YOUR MORNING ESCAPE
                  </h3>
                  <p className="text-[10px] text-slate-300 mt-1 line-clamp-2">
                    AURORA COLD BREW. SMOOTH. BOLD. REFRESHING.
                  </p>
                  <div className="mt-2 inline-block px-2.5 py-1 rounded bg-white text-slate-950 text-[9px] font-extrabold tracking-wider w-max">
                    Shop Now
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Variants Badge */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#121422]/90 backdrop-blur-md border border-[#272b44] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 w-max">
            <div className="w-8 h-8 rounded-lg bg-admint-500/20 text-admint-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>12 variants</span>
              </div>
              <div className="text-[11px] text-slate-400">Generated in a single run across 4 platforms.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
