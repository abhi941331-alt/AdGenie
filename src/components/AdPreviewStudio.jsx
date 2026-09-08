import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  Smartphone,
  Tablet,
  Sliders,
  Copy,
  Download,
  Share2,
  CheckCircle,
  Sparkles,
  Layers,
  Eye,
  Type,
  Palette,
  ShieldAlert
} from 'lucide-react';
import { PLATFORMS, AUDIENCES } from '../data/campaignData';

export default function AdPreviewStudio() {
  const { currentCampaign, triggerToast } = useCampaign();

  const [selectedPlatformId, setSelectedPlatformId] = useState(currentCampaign?.platform || 'Instagram');
  const [deviceFrame, setDeviceFrame] = useState('phone'); // 'phone' | 'card'
  const [showSafeZone, setShowSafeZone] = useState(false);

  // Live editable state
  const firstVariant = currentCampaign?.variants?.[0] || {
    headline: 'Stop scrolling. This changes everything.',
    caption: 'Discover the next evolution in performance.',
    cta: 'Shop Now & Save 20%',
    hue: 280
  };

  const [editableHeadline, setEditableHeadline] = useState(firstVariant.headline);
  const [editableCaption, setEditableCaption] = useState(firstVariant.caption);
  const [editableCta, setEditableCta] = useState(firstVariant.cta);
  const [bgHue, setBgHue] = useState(firstVariant.hue || 280);

  const activePlatform = PLATFORMS.find((p) => p.id === selectedPlatformId) || PLATFORMS[0];
  const activeAudience = AUDIENCES.find((a) => a.id === currentCampaign?.audience) || AUDIENCES[0];

  const handleCopyCopy = () => {
    const text = `HEADLINE: ${editableHeadline}\nCAPTION: ${editableCaption}\nCTA: ${editableCta}\nPLATFORM: ${activePlatform.name} (${activePlatform.aspectRatio})`;
    navigator.clipboard.writeText(text);
    triggerToast('Copied full creative copy to clipboard!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#273142] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Ad Preview Simulator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Ad Preview Studio
          </h1>
          <p className="text-slate-400 text-sm">
            Simulate, edit copy, tweak gradient color hues, and test visual safe zones for target social feeds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyCopy}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all"
          >
            <Copy className="w-4 h-4" />
            <span>Export Copy Specs</span>
          </button>
        </div>
      </div>

      {/* Platform & Frame Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#181f2a] border border-[#273142]">
        {/* Platform Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {PLATFORMS.map((plat) => (
            <button
              key={plat.id}
              onClick={() => setSelectedPlatformId(plat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedPlatformId === plat.id
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{plat.id}</span>
              <span className="text-[10px] font-mono opacity-80">({plat.aspectRatio})</span>
            </button>
          ))}
        </div>

        {/* View Options */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrame('phone')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              deviceFrame === 'phone'
                ? 'bg-slate-800 text-brand-400 border-brand-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Smartphone Mockup"
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile</span>
          </button>

          <button
            onClick={() => setDeviceFrame('card')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              deviceFrame === 'card'
                ? 'bg-slate-800 text-brand-400 border-brand-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Widescreen Card View"
          >
            <Tablet className="w-4 h-4" />
            <span>Card View</span>
          </button>

          <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              showSafeZone
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Safe Zones</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Interactive Device Preview Area */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-3xl bg-[#141b26] border border-[#273142] relative min-h-[520px] overflow-hidden">
          <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>RENDERING: {activePlatform.name}</span>
          </div>

          {/* Smartphone Mode */}
          {deviceFrame === 'phone' ? (
            <div className="w-full max-w-[320px] phone-frame-mockup bg-black border-4 border-slate-800 relative aspect-[9/16] flex flex-col justify-between p-5 text-white overflow-hidden shadow-2xl transition-all">
              {/* Phone Notch */}
              <div className="phone-notch-bar">
                <span className="camera-dot" />
                <span className="speaker-line" />
              </div>

              {/* Dynamic HSL Gradient */}
              <div
                className="absolute inset-0 z-0 opacity-85 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, hsl(${bgHue} 75% 48%), hsl(${(bgHue + 55) % 360} 70% 28%))`
                }}
              />

              {/* Safe Zone Overlay */}
              {showSafeZone && (
                <div className="absolute inset-0 z-20 border-2 border-dashed border-amber-400/70 pointer-events-none flex items-center justify-center">
                  <span className="bg-amber-500 text-black font-extrabold text-[9px] px-2 py-0.5 rounded shadow">
                    SAFE ZONE ({activePlatform.safeZone})
                  </span>
                </div>
              )}

              {/* Top Header */}
              <div className="relative z-10 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-xs text-white border border-white/30">
                    AG
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-extrabold truncate max-w-[130px]">
                      {activeAudience.handle}
                    </div>
                    <div className="text-[10px] text-white/70">Sponsored • {selectedPlatformId}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                  {activePlatform.aspectRatio}
                </span>
              </div>

              {/* Main Copy Card Box */}
              <div className="relative z-10 my-auto p-5 rounded-2xl bg-black/50 backdrop-blur-lg border border-white/20 space-y-2.5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-500 text-white">
                    {selectedPlatformId} Ad
                  </span>
                  <span className="text-[10px] font-mono text-white/80">High CTR Variant</span>
                </div>

                <h3 className="text-base font-extrabold leading-snug text-white">
                  {editableHeadline}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {editableCaption}
                </p>

                <div className="pt-2">
                  <button className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-lg transition-transform active:scale-95">
                    {editableCta}
                  </button>
                </div>
              </div>

              {/* Footer Engagement */}
              <div className="relative z-10 flex items-center justify-between text-xs text-white/90 pb-1 font-medium">
                <span>❤️ 12.4k Likes</span>
                <span>💬 548 Comments</span>
                <span>🔖 Save</span>
              </div>
            </div>
          ) : (
            /* Widescreen Banner Card Mode */
            <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 relative overflow-hidden shadow-2xl space-y-4">
              <div
                className="absolute inset-0 z-0 opacity-70 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, hsl(${bgHue} 75% 45%), hsl(${(bgHue + 60) % 360} 70% 25%))`
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                  {activePlatform.name} ({activePlatform.aspectRatio})
                </span>
                <span className="text-xs font-semibold text-white/80">Sponsored Campaign</span>
              </div>

              <div className="relative z-10 p-6 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 space-y-3">
                <h3 className="text-xl font-extrabold text-white">{editableHeadline}</h3>
                <p className="text-sm text-slate-200 leading-relaxed">{editableCaption}</p>
                <div className="pt-2 flex items-center gap-4">
                  <button className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg transition-all">
                    {editableCta}
                  </button>
                  <span className="text-xs text-slate-300">Target Audience: {activeAudience.id}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 5 Cols: Live Editing Toolbar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-5">
            <div className="flex items-center gap-2 border-b border-[#273142] pb-3">
              <Sliders className="w-4 h-4 text-brand-400" />
              <h3 className="font-bold text-white text-base">Live Ad Copy & Theme Editor</h3>
            </div>

            {/* Editable Headline */}
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-brand-400" />
                  Headline Hook
                </span>
                <span className="text-[10px] text-slate-500">Live updating</span>
              </label>
              <input
                type="text"
                value={editableHeadline}
                onChange={(e) => setEditableHeadline(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Editable Caption */}
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Body Caption & Hashtags</span>
              </label>
              <textarea
                rows={3}
                value={editableCaption}
                onChange={(e) => setEditableCaption(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-brand-500 resize-none"
              />
            </div>

            {/* Editable CTA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Call To Action (CTA)</label>
              <input
                type="text"
                value={editableCta}
                onChange={(e) => setEditableCta(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Color Gradient Hue Slider */}
            <div className="space-y-2 pt-2 border-t border-[#273142]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-brand-400" />
                  Poster Gradient Hue
                </span>
                <span className="font-mono text-brand-400">{bgHue}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={bgHue}
                onChange={(e) => setBgHue(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Platform Spec Heuristics Note */}
          <div className="p-5 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Platform Spec Guidelines
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePlatform.note}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-brand-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Ratio: {activePlatform.aspectLabel} • Duration: {activePlatform.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
