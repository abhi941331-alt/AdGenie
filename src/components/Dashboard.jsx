import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  Award,
  Sparkles,
  Plus,
  Play,
  ArrowUpRight,
  ChevronRight,
  Smartphone,
  Copy,
  Trash2,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { PLATFORMS } from '../data/campaignData';

export default function Dashboard() {
  const {
    campaigns,
    dashboardStats,
    setPage,
    loadCampaign,
    openInPreviewStudio,
    deleteCampaign,
    triggerToast
  } = useCampaign();

  const handleCopyHeadlines = (camp) => {
    const text = camp.variants.map((v) => `${v.id}: ${v.headline}`).join('\n');
    navigator.clipboard.writeText(text);
    triggerToast(`Copied ${camp.variants.length} variant headlines!`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-900/80 via-[#181f2a] to-slate-900 border border-brand-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Performance Dashboard v4.0</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Campaign Analytics & Optimization Hub
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Track multi-channel ad performance, generate AI-optimized copy variants, and simulate social media previews across Instagram, Meta, YouTube, and LinkedIn.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                EXPORTS OPTIMIZED FOR
              </span>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E1306C]" />
                  Instagram
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
                  YouTube
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1877F2]" />
                  Meta
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                  LinkedIn
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPage('campaign')}
            className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-semibold flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Launch New Brief</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3 hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Campaigns</span>
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{campaigns.length}</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14%
            </span>
          </div>
          <p className="text-xs text-slate-400">Total active multi-channel briefs</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3 hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Click-Through Rate</span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{dashboardStats.avgCtr}</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.8%
            </span>
          </div>
          <p className="text-xs text-slate-400">Outperforming industry average (2.9%)</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3 hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Reach</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{dashboardStats.totalImpressions}</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +28%
            </span>
          </div>
          <p className="text-xs text-slate-400">Projected impression score</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-3 hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Quality Score</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{dashboardStats.avgScore}/100</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              High Tier
            </span>
          </div>
          <p className="text-xs text-slate-400">GPT-4o copy clarity index</p>
        </div>
      </div>

      {/* Analytics & Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Share Distribution */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-6">
          <div className="flex items-center justify-between border-b border-[#273142] pb-4">
            <div>
              <h3 className="font-bold text-lg text-white">Platform Performance Breakdown</h3>
              <p className="text-xs text-slate-400">Share of impression reach & CTR benchmark by channel</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
              Live Heuristics
            </span>
          </div>

          <div className="space-y-4">
            {dashboardStats.platformShare.map((item) => (
              <div key={item.platform} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-200 font-semibold">{item.platform}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <span>CTR: <strong className="text-white">{item.ctr}</strong></span>
                    <span>Share: <strong className="text-white">{item.share}%</strong></span>
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.share}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations Card */}
        <div className="p-6 rounded-2xl bg-[#181f2a] border border-[#273142] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>AI Conversion Insights</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">
              3 Optimization Quick Wins for Your Next Campaign
            </h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Instagram Reels:</strong> Videos with hooks in the first 2.5s yield 42% higher retention.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Meta Video & Reels:</strong> Fast-paced vertical video hooks beat static banners by 2.8x.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>LinkedIn B2B:</strong> Highlight metrics (e.g. 2 min setup, 30hr battery) in bold.
                </span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setPage('campaign')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-400 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <span>Apply Insights in Architect</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Campaigns Table */}
      <div className="p-6 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#273142] pb-4">
          <div>
            <h3 className="font-bold text-lg text-white">Active Campaigns Overview</h3>
            <p className="text-xs text-slate-400">Manage, preview, export, or edit generated creative briefs</p>
          </div>
          <button
            onClick={() => setPage('history')}
            className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
          >
            <span>View All Archives</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase font-semibold border-b border-[#273142]">
              <tr>
                <th className="p-3.5">Campaign Title</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5">Audience</th>
                <th className="p-3.5">Est. CTR</th>
                <th className="p-3.5">AI Score</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#273142]">
              {campaigns.map((camp) => {
                const platformObj = PLATFORMS.find((p) => p.id === camp.platform) || PLATFORMS[0];
                return (
                  <tr key={camp.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="p-3.5 font-semibold text-white max-w-xs truncate">
                      {camp.title}
                    </td>
                    <td className="p-3.5">
                      <span
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium text-white inline-flex items-center gap-1"
                        style={{ backgroundColor: platformObj.color }}
                      >
                        {camp.platform}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">{camp.audience}</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-semibold">
                      {camp.metrics?.ctr || '4.2%'}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 font-semibold">
                        {camp.metrics?.score || 92}/100
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold uppercase">
                        {camp.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => openInPreviewStudio(camp)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-brand-500/20 hover:text-brand-400 text-slate-400 transition-colors"
                        title="Simulate in Ad Preview Studio"
                      >
                        <Smartphone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => loadCampaign(camp)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="View Generated Results"
                      >
                        <Play className="w-4 h-4 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleCopyHeadlines(camp)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title="Copy Copy Variants"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCampaign(camp.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

