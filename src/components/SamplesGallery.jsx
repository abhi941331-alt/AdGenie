import React, { useState } from 'react';
import { PRESET_CREATIVES } from '../data/campaignData';
import { Sparkles, Download, Image, Video, Search, Eye } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export default function SamplesGallery() {
  const [filterAudience, setFilterAudience] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedPreviewCreative, triggerToast } = useCampaign();

  const filteredItems = PRESET_CREATIVES.filter((c) => {
    const matchesAudience = filterAudience === 'All' || c.audience === filterAudience;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAudience && matchesSearch;
  });

  return (
    <div className="py-16 space-y-12">
      {/* Gallery Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171a29] border border-admintOrange-500/30 text-admintOrange-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Sample gallery</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          One product. Every audience. Endless creatives.
        </h1>

        <p className="text-slate-400 text-base leading-relaxed">
          Each sample below was synthesized from a single prompt. Click any card for interactive copy editing and live device preview.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-4 max-w-xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sample ad creatives (e.g. cold brew, serum, running)..."
              className="w-full bg-[#08090f] border border-[#202436] focus:border-admint-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Gen Z', 'Millennial', 'Gen X', 'Boomer'].map((aud) => (
              <button
                key={aud}
                onClick={() => setFilterAudience(aud)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterAudience === aud
                    ? 'bg-admint-500 text-white shadow-lg shadow-admint-500/25'
                    : 'bg-[#121422] border border-[#202436] text-slate-400 hover:text-white'
                }`}
              >
                {aud}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Preset Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPreviewCreative(item)}
            className="rounded-2xl overflow-hidden border border-[#202436] bg-[#090a0f] hover:border-admint-500/60 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-xl"
          >
            <div className="aspect-[4/5] relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase flex items-center gap-1">
                {item.type === 'video' ? <Video className="w-3 h-3 text-purple-400" /> : <Image className="w-3 h-3 text-purple-400" />}
                <span>{item.type}</span>
              </div>

              <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-admint-500/90 text-white text-[10px] font-bold uppercase">
                {item.audience}
              </div>

              {/* Hover overlay icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-2">
                <Eye className="w-4 h-4 text-admint-400" />
                <span>Click to Preview & Edit Copy</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-admint-400 tracking-wider uppercase">
                  {item.platform} ({item.ratio})
                </span>
                <h3 className="text-base font-black text-white leading-tight uppercase mt-1">
                  {item.headline}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.subheading}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-white text-slate-950 text-[10px] font-extrabold tracking-wider">
                    {item.cta}
                  </span>
                  <span className="text-xs font-semibold text-admint-400">
                    Live Preview ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
