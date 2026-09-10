import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { ArrowLeft, Download, Edit3, Copy, Check, Play, Sparkles } from 'lucide-react';

export default function ResultsView() {
  const { currentCampaign, setPage, viewVideoPreview, triggerToast } = useCampaign();
  const [activeTab, setActiveTab] = useState('Variants');
  const [copiedId, setCopiedId] = useState(null);

  if (!currentCampaign) return null;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerToast('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadAll = () => {
    const text = currentCampaign.variants
      .map(
        (v) =>
          `[${v.name}] (Score: ${v.score})\nHeadline: ${v.headline}\nCaption: ${v.caption}\nCTA: ${v.cta}\n----------------------------------`
      )
      .join('\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCampaign.title.toLowerCase().replace(/\s+/g, '-')}-variants.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Downloaded all variants bundle!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1f2238]">
        <div className="space-y-2">
          <button
            onClick={() => setPage('dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Campaigns</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{currentCampaign.title}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              {currentCampaign.platform}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              {currentCampaign.status}
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Generated {currentCampaign.variants.length} ad variants · {currentCampaign.timeAgo}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download All</span>
          </button>

          <button
            onClick={() => setPage('dashboard')}
            className="px-4 py-2.5 rounded-xl bg-[#131522] border border-[#1f2238] text-slate-300 hover:text-white font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Campaign</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#1f2238]">
        {['Variants', 'Video Ads', 'Images', 'Text Content'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-xs font-bold transition-all relative border-b-2 ${
              activeTab === tab
                ? 'border-brand-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid of 3 Variant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCampaign.variants.map((variant, idx) => (
          <div
            key={variant.id}
            className="adgenie-card p-5 space-y-4 flex flex-col justify-between group hover:border-brand-500/50 transition-all shadow-xl relative"
          >
            <div className="space-y-4">
              {/* Card Header & Score Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">{variant.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold">
                  Score: {variant.score}
                </span>
              </div>

              {/* Poster Image with Overlay Text */}
              <div
                onClick={() => viewVideoPreview(idx)}
                className="aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10 group cursor-pointer"
              >
                <img
                  src={variant.imageUrl}
                  alt={variant.headline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-4 flex flex-col justify-end pointer-events-none">
                  <div className="text-base font-extrabold text-white tracking-tight uppercase leading-tight">
                    {variant.overlayText}
                  </div>
                </div>
              </div>

              {/* Headline Block */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Headline</span>
                  <button
                    onClick={() => handleCopy(variant.headline, `${variant.id}-hl`)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Copy Headline"
                  >
                    {copiedId === `${variant.id}-hl` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs font-extrabold text-white">{variant.headline}</div>
              </div>

              {/* Caption Block */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Caption</span>
                  <button
                    onClick={() => handleCopy(variant.caption, `${variant.id}-cap`)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Copy Caption"
                  >
                    {copiedId === `${variant.id}-cap` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">{variant.caption}</div>
              </div>

              {/* CTA Block */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CTA</span>
                  <button
                    onClick={() => handleCopy(variant.cta, `${variant.id}-cta`)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Copy CTA"
                  >
                    {copiedId === `${variant.id}-cta` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs font-bold text-brand-400">{variant.cta}</div>
              </div>
            </div>

            {/* Click to Preview Button */}
            <button
              onClick={() => viewVideoPreview(idx)}
              className="w-full py-2.5 rounded-xl bg-[#171a2b] hover:bg-brand-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Preview Video Ad</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
