import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AGE_GROUPS, PLATFORMS, SAMPLE_PROMPTS } from '../data/campaignData';
import { Sparkles, Check, Download, RefreshCw, Image, Video } from 'lucide-react';

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
  } = useCampaign();

  const handleDownload = (creative) => {
    const text = [
      `AdGenie Creative Export`,
      `Title: ${creative.title}`,
      `Headline: ${creative.headline}`,
      `Subheading: ${creative.subheading}`,
      `Audience: ${creative.audience}`,
      `Platform: ${creative.platform} (${creative.ratio})`,
      `CTA: ${creative.cta}`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adgenie-${creative.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Creative exported successfully!');
  };

  return (
    <section id="studio" className="py-24 border-t border-[#1a1d2e] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171a29] border border-admintOrange-500/30 text-admintOrange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Studio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Try the generator
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            Describe a product, choose who it's for, and pick your platforms. Watch the creatives build in real time.
          </p>
        </div>

        {/* 2-Column Generator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 admint-card p-6 space-y-6">
            {/* Product Description Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Product description
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                rows={4}
                placeholder="e.g. A refillable stainless-steel water bottle that keeps drinks cold for 24 hours, made from recycled materials."
                className="w-full bg-[#0b0c14] border border-[#202436] focus:border-admint-500 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
              />

              {/* Sample Prompts */}
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">Try a sample prompt:</span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PROMPTS.slice(0, 3).map((sample, i) => (
                    <button
                      key={i}
                      onClick={() => setPromptInput(sample)}
                      className="text-[11px] text-slate-300 hover:text-white bg-[#161826] hover:bg-[#1f2438] border border-[#24293f] px-2.5 py-1 rounded-lg transition-colors truncate max-w-xs"
                    >
                      "{sample.slice(0, 30)}..."
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Age Group */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Target age group
              </label>
              <div className="grid grid-cols-2 gap-3">
                {AGE_GROUPS.map((age) => {
                  const isSelected = selectedAgeGroup === age.id;
                  return (
                    <button
                      key={age.id}
                      onClick={() => setSelectedAgeGroup(age.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-admint-500/15 border-admint-500 text-white'
                          : 'bg-[#0b0c14] border-[#202436] text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-bold text-white">{age.name}</div>
                      <div className="text-xs text-slate-400">{age.range}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platforms */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Platforms
              </label>
              <div className="flex flex-wrap gap-2.5">
                {PLATFORMS.map((plat) => {
                  const isSelected = selectedPlatforms.includes(plat.id);
                  return (
                    <button
                      key={plat.id}
                      onClick={() => togglePlatform(plat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-admint-500/20 border-admint-500 text-white'
                          : 'bg-[#0b0c14] border-[#202436] text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-admint-400" />}
                      <span>{plat.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{plat.ratio}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !promptInput.trim()}
              className="w-full py-3.5 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-sm shadow-xl shadow-admint-500/25 flex items-center justify-center gap-2 transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing creative variants...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate ad creatives</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Output Showcase */}
          <div id="studio-output" className="lg:col-span-7 admint-card p-6 min-h-[480px] flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1c1f2e]">
              <h3 className="text-base font-bold text-white tracking-tight">Output</h3>
              {generatedCreatives.length > 0 && (
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-admint-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              )}
            </div>

            {generatedCreatives.length === 0 ? (
              <div className="flex-1 border-2 border-dashed border-[#202436] rounded-xl flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#171a29] text-slate-500 flex items-center justify-center">
                  <Image className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-400 max-w-sm">
                  Your generated image and video ads will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {generatedCreatives.map((item) => (
                  <div
                    key={item.id}
                    className="relative rounded-2xl overflow-hidden border border-[#272c44] bg-[#090a0f] flex flex-col justify-between group"
                  >
                    <div className="aspect-[4/5] relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase flex items-center gap-1">
                        {item.type === 'video' ? <Video className="w-3 h-3 text-purple-400" /> : <Image className="w-3 h-3 text-purple-400" />}
                        <span>{item.type}</span>
                      </div>

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
                          <button
                            onClick={() => handleDownload(item)}
                            className="p-1.5 rounded-lg bg-black/60 hover:bg-admint-500 text-white transition-colors"
                            title="Export creative"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
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
