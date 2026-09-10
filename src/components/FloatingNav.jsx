import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export default function FloatingNav() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { setActiveTab } = useCampaign();

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPercent(scrolled);
      setShowBackToTop(winScroll > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStudio = () => {
    setActiveTab('home');
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-admint-500 via-purple-400 to-admintOrange-500 transition-all duration-150"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Floating Action Dock */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 animate-fadeIn">
          <button
            onClick={scrollToStudio}
            className="px-4 py-2.5 rounded-full bg-admint-500 hover:bg-admint-600 active:scale-95 text-white font-bold text-xs shadow-2xl shadow-admint-500/40 flex items-center gap-2 backdrop-blur-md border border-white/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Generator</span>
          </button>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#121422]/90 hover:bg-[#1f2438] text-white flex items-center justify-center backdrop-blur-md border border-[#272b44] shadow-xl transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
