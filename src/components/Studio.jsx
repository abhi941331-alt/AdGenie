import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AGE_GROUPS, PLATFORMS, CATEGORY_PROMPTS, enhancePrompt } from '../data/campaignData';
import { Sparkles, Check, Download, RefreshCw, Image, Video, Dices, Wand2, Eye, Filter, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Studio() {
  const {
    promptInput,
    setPromptInput,
    selectedAgeGroup,
    setSelectedAgeGroup,
    selectedPlatforms,
    togglePlatform,
    generatedCreatives,
    isGenerating,
    handleGenerate,
    triggerToast,
    setSelectedPreviewCreative,
  } = useCampaign();

  const [activeFilter, setActiveFilter] = useState('All');

  const handleSurpriseMe = () => {
    const randomItem = CATEGORY_PROMPTS[Math.floor(Math.random() * CATEGORY_PROMPTS.length)];
    setPromptInput(randomItem.prompt);
    if (randomItem.age) setSelectedAgeGroup(randomItem.age);
    triggerToast(`Loaded prompt template: ${randomItem.category}`);
  };

  const handleEnhance = () => {
    if (!promptInput.trim()) {
      triggerToast('Please type a short description first.');
      return;
    }
    const enhanced = enhancePrompt(promptInput);
    setPromptInput(enhanced);
    triggerToast('Added high-conversion offer & trust signals! ✨');
  };

  const filteredCreatives = generatedCreatives.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Image') return item.type === 'image';
    if (activeFilter === 'Video') return item.type === 'video';
    return item.platform.toLowerCase() === activeFilter.toLowerCase();
  });

  // Calculate Brief Quality Score
  const charLength = promptInput.trim().length;
  let qualityText = 'Enter product description to begin';
  let qualityColor = 'text-slate-500';
  let qualityWidth = '10%';
  if (charLength > 10 && charLength <= 40) {
    qualityText = 'Basic Brief — Add key promise for better results';
    qualityColor = 'text-amber-400';
    qualityWidth = '45%';
  } else if (charLength > 40) {
    qualityText = 'High Conversion Brief ✨ Ready to synthesize!';
    qualityColor = 'text-emerald-400';
    qualityWidth = '100%';
  }

  return (
    <section id="studio" className="py-24 border-t border-[#1a1d2e] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171a29] border border-admintOrange-500/30 text-admintOrange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Studio Generator</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Try the generator
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            Follow the 3 guided steps below. AdGenie builds platform-optimized image & video ad creatives in seconds.
          </p>
        </div>

        {/* 2-Column Guided Generator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Guided Inputs */}
          <div className="lg:col-span-5 admint-card p-6 sm:p-8 space-y-8 relative">
            {/* STEP 1 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-admint-500 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <label className="text-sm font-bold text-white tracking-tight">
                    Describe your product
                  </label>
                </div>

                {/* Surprise Me Button */}
                <button
                  onClick={handleSurpriseMe}
                  className="text-xs font-semibold text-admint-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>Surprise Me</span>
                </button>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  rows={4}
                  placeholder="e.g. A refillable stainless-steel water bottle that keeps drinks cold for 24 hours, made from recycled materials."
                  className="w-full bg-[#08090f] border border-[#202436] focus:border-admint-500 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none leading-relaxed"
                />

                {/* Prompt Enhancer Button */}
                <button
                  onClick={handleEnhance}
                  className="absolute bottom-3 right-3 text-[11px] font-bold text-slate-300 hover:text-white bg-[#171a29] hover:bg-[#20263b] border border-[#2b314d] px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all shadow-md"
                  title="Enhance prompt with guarantee & offer copy"
                >
                  <Wand2 className="w-3 h-3 text-admintOrange-400" />
                  <span>Enhance Brief</span>
                </button>
              </div>

              {/* Live Quality Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={qualityColor}>{qualityText}</span>
                  <span className="text-slate-500">{promptInput.length} chars</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#161826] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-admint-500 to-admintOrange-500 transition-all duration-300"
                    style={{ width: qualityWidth }}
                  />
                </div>
              </div>

              {/* Category Quick Selector Chips */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Or pick a ready category template:
                </span>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPromptInput(item.prompt);
                        if (item.age) setSelectedAgeGroup(item.age);
                        triggerToast(`Loaded ${item.category} brief!`);
                      }}
                      className="text-xs font-semibold text-slate-300 hover:text-white bg-[#08090f] hover:bg-[#161a29] border border-[#202436] hover:border-admint-500/50 px-3 py-1.5 rounded-xl transition-all"
                    >
                      {item.category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="space-y-3 pt-4 border-t border-[#1c1f2e]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-admint-500 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <label className="text-sm font-bold text-white tracking-tight">
                  Target Audience Age Group
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {AGE_GROUPS.map((age) => {
                  const isSelected = selectedAgeGroup === age.id;
                  return (
                    <button
                      key={age.id}
                      onClick={() => setSelectedAgeGroup(age.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-admint-500/15 border-admint-500 text-white shadow-lg'
                          : 'bg-[#08090f] border-[#202436] text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-white">{age.name}</span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900"
                          style={{ color: age.accent }}
                        >
                          {age.range}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{age.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3 */}
            <div className="space-y-3 pt-4 border-t border-[#1c1f2e]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-admint-500 text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <label className="text-sm font-bold text-white tracking-tight">
                  Target Platforms
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {PLATFORMS.map((plat) => {
                  const isSelected = selectedPlatforms.includes(plat.id);
                  return (
                    <button
                      key={plat.id}
                      onClick={() => togglePlatform(plat.id)}
                      className={`p-3 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all ${
                        isSelected
                          ? 'bg-admint-500/20 border-admint-500 text-white shadow-md'
                          : 'bg-[#08090f] border-[#202436] text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {isSelected && <Check className="w-3.5 h-3.5 text-admint-400" />}
                        <span>{plat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">{plat.ratio}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !promptInput.trim()}
              className="w-full py-4 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-sm shadow-xl shadow-admint-500/25 flex items-center justify-center gap-2 transition-all mt-4 group"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Synthesizing creative variants...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate ad creatives now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Right Column: Output Showcase & Live Filters */}
          <div id="studio-output" className="lg:col-span-7 admint-card p-6 sm:p-8 min-h-[520px] flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#1c1f2e]">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Generated Output Suite</h3>
                <p className="text-xs text-slate-400">Click any card for full-screen live preview & copy editor</p>
              </div>

              {/* Output Filter Pills */}
              {generatedCreatives.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 bg-[#08090f] p-1 rounded-xl border border-[#202436]">
                  {['All', 'Instagram', 'Facebook', 'YouTube', 'Image', 'Video'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        activeFilter === filter
                          ? 'bg-admint-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {generatedCreatives.length === 0 ? (
              <div className="flex-1 border-2 border-dashed border-[#202436] rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#171a29] text-admint-400 flex items-center justify-center shadow-inner">
                  <Wand2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Your Ad Creatives Will Build Here</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Select a prompt template or type your product brief on the left to synthesize instant ad variants.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {filteredCreatives.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPreviewCreative(item)}
                    className="relative rounded-2xl overflow-hidden border border-[#272c44] bg-[#08090f] flex flex-col justify-between group cursor-pointer hover:border-admint-500/60 transition-all duration-300 shadow-lg"
                  >
                    <div className="aspect-[4/5] relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase flex items-center gap-1">
                        {item.type === 'video' ? <Video className="w-3 h-3 text-purple-400" /> : <Image className="w-3 h-3 text-purple-400" />}
                        <span>{item.type}</span>
                      </div>

                      {/* Hover eye button */}
                      <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 text-admint-400" />
                      </div>

                      {/* Bottom Gradient Copy */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                        <span className="text-[10px] font-bold text-admint-400 tracking-wider uppercase">
                          {item.audience} · {item.platform}
                        </span>
                        <h4 className="text-sm font-black text-white leading-tight uppercase mt-1">
                          {item.headline}
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{item.subheading}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded bg-white text-slate-950 text-[9px] font-extrabold tracking-wider">
                            {item.cta}
                          </span>
                          <span className="text-[10px] text-admint-300 font-semibold flex items-center gap-1 group-hover:underline">
                            <span>Preview</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
