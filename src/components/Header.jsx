import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  Sun,
  Moon,
  Share2,
  Sparkles,
  ChevronDown,
  Bot,
  Zap,
  Layers
} from 'lucide-react';

export default function Header() {
  const {
    sidebarOpen,
    theme,
    toggleTheme,
    triggerToast,
    setPage,
    page
  } = useCampaign();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('App link copied to clipboard!');
  };

  return (
    <header
      className={`h-16 fixed top-0 right-0 z-30 bg-[#0f141c]/90 backdrop-blur-md border-b border-[#273142] transition-all duration-300 flex items-center justify-between px-6 ${
        sidebarOpen ? 'left-64' : 'left-16'
      }`}
    >
      {/* Left side: Model Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 font-medium cursor-pointer hover:border-brand-500/50 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>AdGenie GPT-4o Engine</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ● Online
        </span>
      </div>

      {/* Right side: Controls & Theme Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage('preview')}
          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            page === 'preview'
              ? 'bg-brand-500/20 text-brand-400 border-brand-500/40'
              : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Live Studio Simulator</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-all active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Share</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400" />
          )}
        </button>
      </div>
    </header>
  );
}
