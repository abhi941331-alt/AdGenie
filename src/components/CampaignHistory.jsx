import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  Search,
  Filter,
  ArrowUpDown,
  History,
  Play,
  Smartphone,
  Copy,
  Trash2,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { PLATFORMS } from '../data/campaignData';

export default function CampaignHistory() {
  const {
    campaigns,
    loadCampaign,
    openInPreviewStudio,
    deleteCampaign,
    triggerToast
  } = useCampaign();

  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'score'

  const filteredCampaigns = campaigns
    .filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.audience.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPlatform = platformFilter === 'All' || c.platform === platformFilter;

      return matchSearch && matchPlatform;
    })
    .sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA = a.metrics?.score || 0;
        const scoreB = b.metrics?.score || 0;
        return scoreB - scoreA;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleCopyHeadlines = (camp) => {
    const text = camp.variants.map((v) => `${v.id}: ${v.headline}`).join('\n');
    navigator.clipboard.writeText(text);
    triggerToast(`Copied ${camp.variants.length} headlines for ${camp.title}`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* History Header */}
      <div className="space-y-2 border-b border-[#273142] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <History className="w-3.5 h-3.5" />
          <span>Campaign Archives</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Campaign History & Creative Vault
        </h1>
        <p className="text-slate-400 text-sm">
          Access, filter, reload, or simulate previous AI-generated creative briefs and ad copy suites.
        </p>
      </div>

      {/* Tools Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#181f2a] border border-[#273142]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns by title, product promise, or audience..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Platform Select */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-brand-500 font-medium"
          >
            <option value="All">All Platforms</option>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}
              </option>
            ))}
          </select>

          {/* Sort Button */}
          <button
            onClick={() => setSortBy(sortBy === 'recent' ? 'score' : 'recent')}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-400" />
            <span>{sortBy === 'recent' ? 'Most Recent' : 'Highest Score'}</span>
          </button>
        </div>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3">
          <p className="text-slate-400 text-sm">No campaigns match your current search filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setPlatformFilter('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-brand-400 text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCampaigns.map((camp) => {
            const platformObj = PLATFORMS.find((p) => p.id === camp.platform) || PLATFORMS[0];
            const dateStr = new Date(camp.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={camp.id}
                className="p-6 rounded-2xl bg-[#181f2a] border border-[#273142] hover:border-brand-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white inline-flex items-center gap-1"
                      style={{ backgroundColor: platformObj.color }}
                    >
                      {camp.platform}
                    </span>

                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-brand-400 transition-colors">
                    {camp.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-800">
                    <span className="text-slate-400">Audience: <strong className="text-slate-200">{camp.audience}</strong></span>
                    <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 font-bold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {camp.metrics?.score || 92}/100
                    </span>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-3 border-t border-[#273142] flex items-center justify-between gap-2">
                  <button
                    onClick={() => loadCampaign(camp)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-brand-500/20 hover:text-brand-400 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Results</span>
                  </button>

                  <button
                    onClick={() => openInPreviewStudio(camp)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Simulate in Ad Preview Studio"
                  >
                    <Smartphone className="w-4 h-4 text-brand-400" />
                  </button>

                  <button
                    onClick={() => handleCopyHeadlines(camp)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Copy Variant Headlines"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteCampaign(camp.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors"
                    title="Delete Archive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
