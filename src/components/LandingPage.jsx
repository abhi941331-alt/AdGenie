import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Sparkles, ArrowRight, Image, Video, FileText, BarChart3, Instagram, Youtube, Facebook } from 'lucide-react';

export default function LandingPage() {
  const { setPage } = useCampaign();

  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 font-sans relative overflow-hidden">
      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AdGenie</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => setPage('landing')} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => setPage('landing')} className="hover:text-white transition-colors">Features</button>
          <button onClick={() => setPage('landing')} className="hover:text-white transition-colors">Pricing</button>
          <button onClick={() => setPage('landing')} className="hover:text-white transition-colors">About</button>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setPage('dashboard')} className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2">
            Login
          </button>
          <button
            onClick={() => setPage('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Hero Text */}
        <div className="lg:col-span-7 space-y-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Turn Your Product Into{' '}
            <span className="text-purple-gradient block sm:inline">Powerful Ads</span> with AI
          </h1>

          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            AdGenie helps you create platform-optimized ad content — headlines, captions, stunning images and short videos — in minutes.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setPage('dashboard')}
              className="px-8 py-4 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-base shadow-xl shadow-brand-500/30 flex items-center gap-2.5 transition-all group"
            >
              <span>Start Creating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Social Platform Badges */}
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-400 pt-4">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Instagram className="w-4 h-4 text-[#E1306C]" /> Instagram
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Youtube className="w-4 h-4 text-[#FF0000]" /> YouTube
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Facebook className="w-4 h-4 text-[#1877F2]" /> Facebook
            </span>
          </div>
        </div>

        {/* Right Hero Floating Glass Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Main Showcase Card */}
            <div className="rounded-3xl border border-[#272a44] bg-[#121422] p-5 shadow-2xl space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
                  alt="Earbuds"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-5 flex flex-col justify-end">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Small Size.</h3>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Big Sound.</h3>
                  <div className="mt-3 px-3 py-1 bg-white text-slate-950 text-[10px] font-black rounded-lg w-max">
                    Get Yours Today
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -left-6 bg-[#16192c]/90 border border-brand-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xl flex items-center gap-2 backdrop-blur-md">
              <Image className="w-4 h-4 text-purple-400" />
              <span>AI Generated Images</span>
            </div>

            <div className="absolute top-1/3 -right-8 bg-[#16192c]/90 border border-brand-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xl flex items-center gap-2 backdrop-blur-md">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Ad Copy & Captions</span>
            </div>

            <div className="absolute -bottom-6 left-4 bg-[#16192c]/90 border border-brand-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xl flex items-center gap-2 backdrop-blur-md">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Short Video Ads</span>
            </div>

            <div className="absolute -bottom-4 -right-6 bg-[#16192c]/90 border border-brand-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xl flex items-center gap-2 backdrop-blur-md">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Platform Optimized</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
