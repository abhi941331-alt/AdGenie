import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  Sparkles,
  Shuffle,
  Send,
  Users,
  Radio,
  Coins,
  Smartphone,
  Eye,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import {
  PLATFORMS,
  AUDIENCES,
  BUDGETS,
  PROMPT_SAMPLES,
  extractProductName
} from '../data/campaignData';

export default function CampaignArchitect() {
  const {
    form,
    updateForm,
    startGeneration,
    openInPreviewStudio,
    triggerToast
  } = useCampaign();

  const charCount = form.description.length;
  const productName = extractProductName(form.description);

  const selectedAudience = AUDIENCES.find((a) => a.id === form.audience) || AUDIENCES[0];
  const selectedPlatform = PLATFORMS.find((p) => p.id === form.platform) || PLATFORMS[0];

  const handleRandomSample = () => {
    const random = PROMPT_SAMPLES[Math.floor(Math.random() * PROMPT_SAMPLES.length)];
    updateForm('description', random.prompt);
    triggerToast(`Loaded sample: ${random.title}`);
  };

  const getQualityHint = () => {
    if (charCount === 0) return { text: 'Add product description for best AI performance', color: 'text-slate-400' };
    if (charCount < 30) return { text: 'Brief description (Add key benefits & specs)', color: 'text-amber-400' };
    if (charCount < 100) return { text: 'Good brief depth! GPT-4o will generate sharp hooks', color: 'text-emerald-400' };
    return { text: 'Excellent detail! Optimal prompt quality score', color: 'text-brand-400' };
  };

  const quality = getQualityHint();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Workspace Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Prompt & Config Builder */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Prompt Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Campaign Generator</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              What ad campaign are we launching today?
            </h1>
            <p className="text-slate-400 text-sm">
              Describe your product promise. AdGenie AI will engineer copy variants, hooks, visual styling, and target platform specs in seconds.
            </p>
          </div>

          {/* Quick Inspiration Chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Try sample briefs:</span>
              <button
                onClick={handleRandomSample}
                className="flex items-center gap-1 text-brand-400 hover:text-brand-300 font-medium"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Insert Random Sample</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {PROMPT_SAMPLES.map((sample) => (
                <button
                  key={sample.title}
                  onClick={() => updateForm('description', sample.prompt)}
                  className="px-3 py-1.5 rounded-xl bg-[#181f2a] hover:bg-slate-800 border border-[#273142] hover:border-brand-500/50 text-xs text-slate-300 transition-all text-left"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Box */}
          <div className="p-4 rounded-2xl bg-[#181f2a] border border-[#273142] focus-within:border-brand-500/60 shadow-xl space-y-3 transition-all">
            <textarea
              value={form.description}
              onChange={(e) => updateForm('description', e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="e.g. Wireless noise-cancelling headphones with 30hr battery life, spatial audio, and quick USB-C charge..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none resize-none"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#273142] pt-3">
              <div className="text-xs flex items-center gap-2">
                <span className="font-mono text-slate-400">{charCount}/500 chars</span>
                <span className="text-slate-600">•</span>
                <span className={`font-medium ${quality.color}`}>{quality.text}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleRandomSample}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Random</span>
                </button>

                <button
                  onClick={startGeneration}
                  disabled={!form.description.trim()}
                  className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
                >
                  <span>Generate Campaign</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Cards Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Campaign Parameters & Scoping
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Target Audience Card */}
              <div className="p-4 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Users className="w-4 h-4 text-brand-400" />
                  <span>Target Audience</span>
                </label>
                <div className="space-y-1.5">
                  {AUDIENCES.map((aud) => (
                    <button
                      key={aud.id}
                      onClick={() => updateForm('audience', aud.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        form.audience === aud.id
                          ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40 font-bold'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      {aud.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Channel Card */}
              <div className="p-4 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Radio className="w-4 h-4 text-brand-400" />
                  <span>Platform Channel</span>
                </label>
                <div className="space-y-1.5">
                  {PLATFORMS.map((plat) => (
                    <button
                      key={plat.id}
                      onClick={() => updateForm('platform', plat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                        form.platform === plat.id
                          ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40 font-bold'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <span>{plat.id}</span>
                      <span className="text-[10px] font-mono opacity-60">{plat.aspectRatio}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Card */}
              <div className="p-4 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Coins className="w-4 h-4 text-brand-400" />
                  <span>Creative Variants Scope</span>
                </label>
                <div className="space-y-1.5">
                  {BUDGETS.map((bgt) => (
                    <button
                      key={bgt.id}
                      onClick={() => updateForm('budget', bgt.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        form.budget === bgt.id
                          ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40 font-bold'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <div className="font-semibold">{bgt.id}</div>
                      <div className="text-[10px] text-slate-400">{bgt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 cols: Real-Time Phone Preview Rail */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wider uppercase">Live Mockup Rail</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {selectedPlatform.aspectLabel}
            </span>
          </div>

          {/* Mobile Phone Mockup Box */}
          <div className="p-4 rounded-3xl bg-[#141b26] border border-[#273142] shadow-2xl flex flex-col items-center">
            {/* Phone Container */}
            <div className="w-full max-w-[280px] phone-frame-mockup bg-black border-4 border-slate-800 relative aspect-[9/16] flex flex-col justify-between p-4 text-white overflow-hidden shadow-2xl">
              {/* Phone Notch */}
              <div className="phone-notch-bar">
                <span className="camera-dot" />
                <span className="speaker-line" />
              </div>

              {/* Live Gradient Hue Background */}
              <div
                className="absolute inset-0 z-0 opacity-80 transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, hsl(${selectedAudience.hue} 70% 45%), hsl(${(selectedAudience.hue + 50) % 360} 65% 25%))`
                }}
              />

              {/* Social Overlay Header */}
              <div className="relative z-10 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xs text-white border border-white/30">
                    AG
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold truncate max-w-[120px]">
                      {selectedAudience.handle}
                    </div>
                    <div className="text-[9px] text-white/70">Sponsored • {selectedPlatform.id}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
                  {selectedPlatform.aspectRatio}
                </span>
              </div>

              {/* Central Copy Card Preview */}
              <div className="relative z-10 my-auto p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 space-y-2 shadow-lg">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-500/80 text-white inline-block">
                  AI Ad Copy Preview
                </span>
                <h4 className="text-sm font-extrabold leading-snug text-white">
                  {form.description.trim() ? `Stop scrolling. Meet ${productName}.` : 'Your Ad Headline Will Appear Here'}
                </h4>
                <p className="text-[10px] text-slate-200 line-clamp-2">
                  {form.description.trim() ? form.description : 'Enter a product brief on the left to see live copy synthesis in action.'}
                </p>
                <div className="pt-1">
                  <button className="w-full py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold shadow hover:bg-slate-100 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Social Engagement Actions Footer */}
              <div className="relative z-10 flex items-center justify-between text-[10px] text-white/80 pb-2">
                <span>❤️ 4.8k Likes</span>
                <span>💬 242 Comments</span>
                <span>🚀 890 Shares</span>
              </div>
            </div>

            <button
              onClick={() => openInPreviewStudio(null)}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-400 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Expand in Ad Preview Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
