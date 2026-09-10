import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Sparkles, ChevronRight, Folder } from 'lucide-react';

export default function MyCampaignsView() {
  const { campaigns, viewCampaign } = useCampaign();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="pb-4 border-b border-[#1f2238]">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">My Campaigns</h1>
        <p className="text-xs text-slate-400 mt-1">Manage and inspect all your AI-generated ad campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            onClick={() => viewCampaign(camp.id)}
            className="adgenie-card p-6 space-y-4 flex flex-col justify-between cursor-pointer hover:border-brand-500/50 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                  {camp.platform}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  {camp.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                {camp.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{camp.description}</p>
            </div>

            <div className="pt-3 border-t border-[#1f2238] flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{camp.timeAgo}</span>
              <span className="text-brand-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Results</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
