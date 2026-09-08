import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export default function CtaBanner() {
  const { setActiveTab } = useCampaign();

  const scrollToStudio = () => {
    setActiveTab('home');
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 border-t border-[#1a1d2e] relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#151726] to-[#0c0d15] border border-admint-500/30 p-12 text-center space-y-6 shadow-2xl overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-admint-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Your next campaign is one sentence away
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Start generating platform-optimized image and video ads tailored to your audience — free to try, no credit card required.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={scrollToStudio}
              className="px-7 py-4 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 text-white font-bold text-sm shadow-xl shadow-admint-500/30 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start generating free</span>
            </button>

            <button
              onClick={scrollToStudio}
              className="px-6 py-4 rounded-xl bg-[#090a0f] hover:bg-[#141624] border border-[#272c44] text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <span>Book a demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
