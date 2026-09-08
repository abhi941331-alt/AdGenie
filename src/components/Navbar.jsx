import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Sparkles, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, setIsSignInOpen, activeTab, setActiveTab, handleSignOut } = useCampaign();

  const scrollToSection = (id) => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090a0f]/90 backdrop-blur-md border-b border-[#1c1f2e] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-admint-500 flex items-center justify-center text-white shadow-lg shadow-admint-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AdGenie</span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-white transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('studio')}
            className="hover:text-white transition-colors"
          >
            Studio
          </button>
          <button
            onClick={() => {
              setActiveTab('samples');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors ${
              activeTab === 'samples' ? 'text-admint-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Samples
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-white transition-colors"
          >
            Features
          </button>
        </nav>

        {/* Right Auth / Action Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300">
                Hi, <strong className="text-white">{user.name}</strong>
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-[#202436] hover:bg-[#151824] transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSignInOpen(true)}
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => scrollToSection('studio')}
                className="px-5 py-2.5 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-admint-500/25 transition-all"
              >
                Start free
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
