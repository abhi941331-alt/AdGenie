import React, { useState, useRef } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  Video,
  FileText,
  BarChart3,
  Instagram,
  Youtube,
  Facebook,
  CheckCircle2,
  ChevronDown,
  Play,
  Zap,
  Layers,
  Sliders,
  X,
  Sparkle,
  Target,
  ExternalLink,
} from 'lucide-react';

export default function LandingPage() {
  const { setPage } = useCampaign();
  const [activeNav, setActiveNav] = useState('home');
  const [activeDemo, setActiveDemo] = useState('earbuds');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeBadgeModal, setActiveBadgeModal] = useState(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activePlatformFilter, setActivePlatformFilter] = useState('instagram');

  // Mouse tilt tracking state for 3D card tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const demoPresets = {
    earbuds: {
      id: 'earbuds',
      title: 'Wireless Earbuds',
      headline: 'Small Size. Big Sound.',
      subheading: 'Active Noise Cancellation & 30hr Battery Life.',
      btnText1: 'Go Wireless',
      btnText2: 'Shop Now',
      badgeText: 'Everyday',
      // High quality dark studio earbuds images
      mainImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      leftImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      rightVideoThumb: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    },
    coffee: {
      id: 'coffee',
      title: 'Cold Brew Coffee',
      headline: 'Your Morning Escape.',
      subheading: 'Artisan Cold Brew Delivered Fresh Weekly.',
      btnText1: 'Try Cold Brew',
      btnText2: 'Order Fresh',
      badgeText: 'Artisan',
      mainImage: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
      leftImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      rightVideoThumb: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    },
    matcha: {
      id: 'matcha',
      title: 'Ceremonial Matcha',
      headline: 'Calm Energy. Zero Crash.',
      subheading: '100% Organic Japanese Green Tea Powder.',
      btnText1: 'Feel Focused',
      btnText2: 'Get Matcha',
      badgeText: 'Organic',
      mainImage: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
      leftImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      rightVideoThumb: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=800&q=80',
    },
    shoes: {
      id: 'shoes',
      title: 'Velocity Running Shoes',
      headline: 'Own The Night Run.',
      subheading: 'Lightspeed Cushioning & Neon Reflective Design.',
      btnText1: 'Run Faster',
      btnText2: 'Shop Shoes',
      badgeText: 'Pro Run',
      mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      leftImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
      rightVideoThumb: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    },
    serum: {
      id: 'serum',
      title: 'Botanical Vitality Serum',
      headline: 'Radiance Redefined.',
      subheading: 'Discover Glowing Hydration from Pure Botanicals.',
      btnText1: 'Unlock Glow',
      btnText2: 'Try Formula',
      badgeText: 'Glowing',
      mainImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      leftImage: 'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&w=800&q=80',
      rightVideoThumb: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    },
  };

  const currentDemo = demoPresets[activeDemo] || demoPresets.earbuds;

  const scrollToSection = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const badgeDetails = {
    images: {
      title: 'AI Generated Product Images',
      icon: <ImageIcon className="w-5 h-5 text-purple-400" />,
      description: 'AdGenie transforms plain product photos into studio-quality background scenes with dynamic lighting, shadows, and lifestyle settings tailored for high-converting ads.',
      stats: '3.4x Higher CTR than flat photos',
    },
    copy: {
      title: 'AI Ad Copy & Captions',
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      description: 'Generate high-converting headlines, emotional hooks, body text, and strategic calls-to-action tuned specifically for social media audience demographics.',
      stats: '15+ Headline variations in 5 seconds',
    },
    video: {
      title: 'Short Video Ad Motion Presets',
      icon: <Video className="w-5 h-5 text-emerald-400" />,
      description: 'Automatically generate 15-second motion video ads complete with smooth transitions, animated text captions, and soundtrack beats ready for Instagram Reels and YouTube Shorts.',
      stats: 'Export in 1080p & 4K 60fps',
    },
    platform: {
      title: 'Platform Optimized Ratios',
      icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
      description: 'Every image and video asset is formatted with proper safe zones, typography scaling, and aspect ratios for Instagram (4:5), YouTube (16:9), and Facebook (4:5).',
      stats: 'Zero manual resizing required',
    },
    estimated: {
      title: 'AI Performance Estimation',
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      description: 'Our proprietary scoring model rates every ad variant for visual clarity, headline punch, brand placement, and emotional resonance before you launch.',
      stats: 'Average conversion boost +42%',
    },
  };

  const faqs = [
    {
      q: 'How does AdGenie create ad content?',
      a: 'AdGenie uses advanced AI models trained on top-performing social ad campaigns to turn a simple product description into platform-optimized headlines, captions, static image ads, and motion video presets.',
    },
    {
      q: 'What platforms are supported?',
      a: 'AdGenie generates ad formats perfectly sized for Instagram (4:5 Feed & Reels), YouTube (16:9 Landscape & Shorts), and Facebook (4:5 & 1:1 Feed).',
    },
    {
      q: 'Can I edit the generated copy and variants?',
      a: 'Yes! Every generated variant includes interactive inline text editing, one-click copy buttons, and full ad bundle export capabilities.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes, AdGenie includes a Free Plan with 12 initial credits so you can start creating campaigns right away without a credit card.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 font-sans relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#08090f]/90 backdrop-blur-md border-b border-[#181a2e] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-white/20 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">AdGenie</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('home')}
              className={`hover:text-white transition-colors relative py-1 ${
                activeNav === 'home' ? 'text-purple-400 font-bold' : ''
              }`}
            >
              Home
              {activeNav === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className={`hover:text-white transition-colors relative py-1 ${
                activeNav === 'features' ? 'text-purple-400 font-bold' : ''
              }`}
            >
              Features
              {activeNav === 'features' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className={`hover:text-white transition-colors relative py-1 ${
                activeNav === 'pricing' ? 'text-purple-400 font-bold' : ''
              }`}
            >
              Pricing
              {activeNav === 'pricing' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`hover:text-white transition-colors relative py-1 ${
                activeNav === 'about' ? 'text-purple-400 font-bold' : ''
              }`}
            >
              About
              {activeNav === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage('dashboard')}
              className="text-sm font-semibold text-slate-200 hover:text-white px-5 py-2.5 rounded-xl bg-[#131522] border border-[#20243b] hover:border-purple-500/50 hover:bg-[#1a1d30] transition-all"
            >
              Login
            </button>
            <button
              onClick={() => setPage('dashboard')}
              className="px-6 py-2.5 rounded-xl bg-purple-button-gradient hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-purple-600/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section matching Screenshot 1 */}
      <section id="home" className="relative pt-12 pb-32">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                Turn Your Product <br />
                Into <span className="text-purple-gradient">Powerful Ads</span> <br />
                with AI
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg pt-2">
                Create platform-optimized ad content — headlines, captions, stunning images and short videos — in minutes.
              </p>
            </div>

            {/* Start Creating CTA */}
            <div className="pt-2">
              <button
                onClick={() => setPage('dashboard')}
                className="px-8 py-4 rounded-xl bg-purple-button-gradient hover:opacity-95 text-white font-bold text-base shadow-xl shadow-purple-600/35 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95 group"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Supported Platforms */}
            <div className="pt-6 border-t border-[#181a2e] flex items-center gap-6 text-sm font-semibold text-slate-300">
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Instagram className="w-4 h-4 text-[#E1306C]" /> Instagram
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Youtube className="w-4 h-4 text-[#FF0000]" /> YouTube
              </span>
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Facebook className="w-4 h-4 text-[#1877F2]" /> Facebook
              </span>
            </div>
          </div>

          {/* Right Column Showcase Stack (Matching Screenshot 1 closely!) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
            {/* Interactive Demo Switcher */}
            <div className="mb-6 bg-[#121424]/90 p-1.5 rounded-2xl border border-[#20243b] flex items-center gap-1 shadow-lg backdrop-blur-md z-20">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 hidden sm:inline flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Demo Sample:
              </span>
              {Object.keys(demoPresets).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeDemo === key
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#1c1f38]'
                  }`}
                >
                  {demoPresets[key].title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Main Overlapping Cards Container */}
            <div
              className="relative w-full max-w-xl h-[460px] flex items-center justify-center perspective-[1200px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Sparkle decorative star icons matching screenshot */}
              <div className="absolute top-2 left-16 text-purple-400 animate-pulse pointer-events-none z-30">
                <Sparkle className="w-6 h-6 fill-purple-400/40" />
              </div>
              <div className="absolute bottom-16 right-10 text-cyan-400 animate-pulse pointer-events-none z-30">
                <Sparkle className="w-4 h-4 fill-cyan-400/40" />
              </div>

              {/* LEFT CARD (Tilted behind main card) */}
              <div
                className="absolute left-0 top-8 w-56 h-72 rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 transform -rotate-12 hover:-rotate-6 hover:z-20 cursor-pointer group"
                onClick={() => setPage('dashboard')}
              >
                <img
                  src={currentDemo.leftImage}
                  alt="Product context"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-3 flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm w-fit">
                    <ImageIcon className="w-3 h-3 text-purple-400" />
                    <span>Product Shot</span>
                  </div>
                </div>
              </div>

              {/* RIGHT CARD (Horizontal video card angled behind main card) */}
              <div
                className="absolute right-0 bottom-10 w-64 h-44 rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 transform rotate-6 hover:rotate-2 hover:z-20 cursor-pointer group bg-[#111322]"
                onClick={() => setPage('videopreview')}
              >
                <img
                  src={currentDemo.rightVideoThumb}
                  alt="Video ad preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-4 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-extrabold tracking-wider uppercase">
                      Reels 16:9
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-300 font-medium pt-1">
                      <span>0:15 / Motion Ad</span>
                      <span className="text-emerald-400 font-bold">Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER MAIN CARD (Vertical 4:5 Poster matching Screenshot 1) */}
              <div
                ref={cardRef}
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'none',
                }}
                className="relative z-20 w-72 sm:w-80 h-[380px] rounded-3xl border-2 border-purple-500/50 bg-[#121424] p-3 shadow-2xl cursor-pointer group"
                onClick={() => setPage('dashboard')}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={currentDemo.mainImage}
                    alt={currentDemo.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Brand overlay watermark */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-extrabold text-white">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>AdGenie AI</span>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c16] via-slate-950/40 to-transparent p-5 flex flex-col justify-end space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                        {currentDemo.headline}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {currentDemo.subheading}
                      </p>
                    </div>

                    {/* Bottom CTA buttons rendered inside ad view */}
                    <div className="pt-2 flex items-center gap-2">
                      <button className="flex-1 py-2 px-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all text-center">
                        {currentDemo.btnText1}
                      </button>
                      <button className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-600/40 transition-all text-center">
                        {currentDemo.btnText2}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 FLOATING GLASS BADGES Matching Screenshot 1 */}
              {/* Badge 1: Top Right */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBadgeModal('images');
                }}
                className="absolute top-2 right-4 glass-badge px-3.5 py-2 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2 cursor-pointer z-30 animate-float-slow hover:scale-105 transition-all"
              >
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span>AI Generated images</span>
              </div>

              {/* Badge 2: Middle Right */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBadgeModal('copy');
                }}
                className="absolute top-32 -right-8 glass-badge px-3.5 py-2 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2 cursor-pointer z-30 animate-float-reverse hover:scale-105 transition-all"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>AI Copy & Captions</span>
              </div>

              {/* Badge 3: Bottom Left */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBadgeModal('images');
                }}
                className="absolute bottom-12 -left-8 glass-badge px-3.5 py-2 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2 cursor-pointer z-30 animate-float-slow hover:scale-105 transition-all"
              >
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                <span>AI Generated images</span>
              </div>

              {/* Badge 4: Bottom Center */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBadgeModal('platform');
                }}
                className="absolute -bottom-6 left-1/3 glass-badge px-3.5 py-2 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2 cursor-pointer z-30 hover:scale-105 transition-all"
              >
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>Platform Optimized</span>
              </div>

              {/* Badge 5: Bottom Right */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBadgeModal('estimated');
                }}
                className="absolute -bottom-4 right-6 glass-badge px-3.5 py-2 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2 cursor-pointer z-30 animate-float-reverse hover:scale-105 transition-all"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Estimated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Dark Wave Graphic at Bottom of Hero */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-40">
          <svg
            className="relative block w-full h-16 sm:h-28"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z"
              fill="#101224"
            ></path>
          </svg>
        </div>
      </section>

      {/* Feature Highlight Modal when clicking Floating Badges */}
      {activeBadgeModal && badgeDetails[activeBadgeModal] && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#121424] border border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
            <button
              onClick={() => setActiveBadgeModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1f38] text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                {badgeDetails[activeBadgeModal].icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {badgeDetails[activeBadgeModal].title}
                </h3>
                <span className="text-xs font-semibold text-purple-400">
                  {badgeDetails[activeBadgeModal].stats}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {badgeDetails[activeBadgeModal].description}
            </p>

            <div className="pt-4 border-t border-[#1e223c] flex justify-end gap-3">
              <button
                onClick={() => setActiveBadgeModal(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveBadgeModal(null);
                  setPage('dashboard');
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30"
              >
                Try It in Campaign Creator →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="py-24 border-t border-[#181a2e] relative bg-[#090a12]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Everything Included
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              A Complete AI Ad Creation Suite
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Generate platform-sized static visuals, short video ads, and engaging copy in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => setActiveBadgeModal('images')}
              className="adgenie-card p-6 space-y-4 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Generated Images</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Produce stunning product photography overlays tailored for high engagement across all devices.
              </p>
            </div>

            <div
              onClick={() => setActiveBadgeModal('copy')}
              className="adgenie-card p-6 space-y-4 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Ad Copy & Captions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate high-converting headlines, hooks, and call-to-actions instantly with AI tuning.
              </p>
            </div>

            <div
              onClick={() => setActiveBadgeModal('video')}
              className="adgenie-card p-6 space-y-4 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Short Video Ads</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create short-form video motion presets sized for Instagram Reels and YouTube Shorts.
              </p>
            </div>

            <div
              onClick={() => setActiveBadgeModal('platform')}
              className="adgenie-card p-6 space-y-4 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Platform Optimized</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sized and formatted specifically for Instagram, YouTube, and Facebook feeds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-[#181a2e] relative">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Flexible Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Simple Plans For Every Creator
            </h2>

            {/* Monthly / Annual Billing Toggle */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className={`text-xs font-bold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  isAnnual ? 'bg-purple-600' : 'bg-[#1e223c]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
                Annual <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="adgenie-card p-8 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Free Plan</h3>
                <div className="text-4xl font-extrabold text-white">
                  $0 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Perfect for trying out AI ad creative generation.</p>
                <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-[#1c1f38]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 12 Initial Generation Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3 Ad Variants Per Campaign
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard Resolution Exports
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setPage('dashboard')}
                className="w-full py-3 rounded-xl bg-[#171a2b] hover:bg-[#22273e] text-white font-bold text-xs transition-colors"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="adgenie-card p-8 space-y-6 flex flex-col justify-between relative border-2 border-purple-500 shadow-2xl shadow-purple-600/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-button-gradient text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Most Popular
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                <div className="text-4xl font-extrabold text-white">
                  {isAnnual ? '$23' : '$29'} <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Ideal for growing brands and marketers.</p>
                <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-[#1c1f38]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100 Credits Per Month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Short Video Ad Generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full HD & 4K Exports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instagram, YouTube & FB Sizing
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setPage('dashboard')}
                className="w-full py-3 rounded-xl bg-purple-button-gradient hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Agency Plan */}
            <div className="adgenie-card p-8 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Agency Plan</h3>
                <div className="text-4xl font-extrabold text-white">
                  {isAnnual ? '$63' : '$79'} <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <p className="text-xs text-slate-400">For high-volume creative agencies.</p>
                <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-[#1c1f38]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority Fast Rendering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated Account Manager
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setPage('dashboard')}
                className="w-full py-3 rounded-xl bg-[#171a2b] hover:bg-[#22273e] text-white font-bold text-xs transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About & FAQ Section */}
      <section id="about" className="py-24 border-t border-[#181a2e] relative bg-[#090a12]">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything You Need To Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="adgenie-card p-5 space-y-2 cursor-pointer hover:border-purple-500/40 transition-all"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between text-base font-bold text-white">
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-purple-400' : 'text-slate-500'
                    }`}
                  />
                </div>
                {openFaq === idx && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-3 border-t border-[#1a1d30]">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 border-t border-[#181a2e] relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#121424] via-[#1a1c36] to-[#121424] border border-purple-500/40 p-10 sm:p-16 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Start Creating Powerful Ads Today
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Transform your product description into launch-ready ad content for Instagram, YouTube, and Facebook in minutes.
            </p>
            <button
              onClick={() => setPage('dashboard')}
              className="px-9 py-4 rounded-xl bg-purple-button-gradient hover:opacity-95 text-white font-bold text-base shadow-xl shadow-purple-600/40 inline-flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Start Creating Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#181a2e] py-10 text-xs text-slate-500 text-center bg-[#06070c]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AdGenie AI</span>
          </div>
          <div>© 2026 AdGenie AI Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
