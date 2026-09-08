import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  Sparkles,
  CheckCircle2,
  Copy,
  Smartphone,
  RotateCcw,
  Lightbulb,
  Share2,
  Award,
  Layers
} from 'lucide-react';
import { PLATFORMS } from '../data/campaignData';

export default function GeneratedResults() {
  const {
    currentCampaign,
    setPage,
    openInPreviewStudio,
    triggerToast
  } = useCampaign();

  if (!currentCampaign) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-slate-400">No campaign loaded yet.</p>
        <button
          onClick={() => setPage('campaign')}
          className="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs"
        >
          Create New Campaign
        </button>
      </div>
    );
  }

  const platformObj = PLATFORMS.find((p) => p.id === currentCampaign.platform) || PLATFORMS[0];

  const handleCopyVariant = (variant) => {
    const text = `VARIANT ${variant.id}\nHEADLINE: ${variant.headline}\nCAPTION: ${variant.caption}\nCTA: ${variant.cta}`;
    navigator.clipboard.writeText(text);
    triggerToast(`Copied Variant ${variant.id} to clipboard!`);
  };

  const handleCopyAll = () => {
    const text = currentCampaign.variants
      .map((v) => `[VARIANT ${v.id}]\nHeadline: ${v.headline}\nCaption: ${v.caption}\nCTA: ${v.cta}\n`)
      .join('\n---\n\n');
    navigator.clipboard.writeText(text);
    triggerToast('Copied all variant copy to clipboard!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Results Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#273142] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Generation Complete</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {currentCampaign.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Target Audience: <strong className="text-slate-200">{currentCampaign.audience}</strong></span>
            <span>•</span>
            <span>Channel: <strong className="text-slate-200">{currentCampaign.platform} ({platformObj.aspectRatio})</strong></span>
            <span>•</span>
            <span>Scope: <strong className="text-slate-200">{currentCampaign.budget}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage('campaign')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Run Another Brief</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-brand-500/20 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy All Variants</span>
          </button>
        </div>
      </div>

      {/* Generated Creative Variants Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Engineered Copy & Creative Variants ({currentCampaign.variants.length})
          </h3>
          <span className="text-xs text-slate-400 font-mono">GPT-4o Synthesized</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCampaign.variants.map((v) => (
            <div
              key={v.id}
              className="p-6 rounded-2xl bg-[#181f2a] border border-[#273142] hover:border-brand-500/50 transition-all space-y-4 flex flex-col justify-between shadow-xl group"
            >
              <div className="space-y-4">
                {/* Variant Header Swatch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-brand-400">
                      {v.id}
                    </span>
                    <span className="text-xs font-bold text-slate-200">Variant {v.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 text-xs font-extrabold flex items-center gap-1 border border-brand-500/30">
                      <Award className="w-3 h-3" />
                      {v.score}/100
                    </span>
                  </div>
                </div>

                {/* Color Swatch Preview Line */}
                <div
                  className="w-full h-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, hsl(${v.hue} 75% 50%), hsl(${(v.hue + 45) % 360} 70% 30%))`
                  }}
                />

                {/* Headline Hook */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Headline Hook
                  </span>
                  <p className="text-sm font-extrabold text-white leading-snug">
                    {v.headline}
                  </p>
                </div>

                {/* Body Caption */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Primary Caption
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {v.caption}
                  </p>
                </div>

                {/* CTA */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Call To Action
                  </span>
                  <div className="w-full py-2 px-3 rounded-xl bg-slate-800 text-center font-bold text-xs text-white border border-slate-700">
                    {v.cta}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#273142] flex items-center gap-2">
                <button
                  onClick={() => openInPreviewStudio(currentCampaign)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-brand-500/20 hover:text-brand-400 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 text-brand-400" />
                  <span>Preview Studio</span>
                </button>

                <button
                  onClick={() => handleCopyVariant(v)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Copy Variant Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Performance Recommendations Block */}
      {currentCampaign.tips && currentCampaign.tips.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Lightbulb className="w-4 h-4" />
            <h3>AI Performance Optimization Recommendations</h3>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {currentCampaign.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
