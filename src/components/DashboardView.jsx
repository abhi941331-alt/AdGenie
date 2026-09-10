import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Bell, Sparkles, TrendingUp, ChevronRight, Instagram, Youtube, Facebook, ArrowRight } from 'lucide-react';
import { AUDIENCE_OPTIONS, BUDGET_OPTIONS, PLATFORM_OPTIONS } from '../data/campaignData';

export default function DashboardView() {
  const { user, stats, campaigns, createCampaign, viewCampaign } = useCampaign();

  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState(AUDIENCE_OPTIONS[0].label);
  const [platform, setPlatform] = useState(PLATFORM_OPTIONS[0].label);
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1].label);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCampaign({ description, audience, platform, budget });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Welcome back, {user.name.split(' ')[0]}!</span>
            <span>👋</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Create amazing ad campaigns with the power of AI.</p>
        </div>

        <button className="w-10 h-10 rounded-xl bg-[#131522] border border-[#1f2238] text-slate-400 hover:text-white flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Create New Campaign Form */}
        <div className="lg:col-span-7 adgenie-card p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Create New Campaign</h2>
            <p className="text-xs text-slate-400">Fill in a few details and let AI do the magic.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Product Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Product Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="e.g. Wireless earbuds with long battery life and great sound..."
                className="w-full bg-[#090a10] border border-[#1f2238] focus:border-brand-500 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors resize-none leading-relaxed"
                required
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-[#090a10] border border-[#1f2238] focus:border-brand-500 rounded-xl p-3 text-xs text-white focus:outline-none transition-colors"
              >
                {AUDIENCE_OPTIONS.map((aud) => (
                  <option key={aud.id} value={aud.label} className="bg-[#121422]">
                    {aud.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Platform
              </label>
              <div className="flex flex-wrap gap-3">
                {PLATFORM_OPTIONS.map((plat) => {
                  const isSelected = platform === plat.label;
                  return (
                    <button
                      key={plat.id}
                      type="button"
                      onClick={() => setPlatform(plat.label)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-brand-600/20 border-brand-500 text-white shadow-md'
                          : 'bg-[#090a10] border-[#1f2238] text-slate-400 hover:text-white'
                      }`}
                    >
                      {plat.id === 'instagram' && <Instagram className="w-4 h-4 text-[#E1306C]" />}
                      {plat.id === 'youtube' && <Youtube className="w-4 h-4 text-[#FF0000]" />}
                      {plat.id === 'facebook' && <Facebook className="w-4 h-4 text-[#1877F2]" />}
                      <span>{plat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Tier */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Budget Tier
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#090a10] border border-[#1f2238] focus:border-brand-500 rounded-xl p-3 text-xs text-white focus:outline-none transition-colors"
              >
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b.id} value={b.label} className="bg-[#121422]">
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Generate Ad Content</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Quick Stats & Recent Campaigns */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Stats Card */}
          <div className="adgenie-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#090a10] border border-[#1f2238] rounded-xl p-3.5">
                <div className="text-[11px] font-semibold text-slate-400">Total Campaigns</div>
                <div className="text-2xl font-extrabold text-white mt-1">{stats.totalCampaigns}</div>
              </div>

              <div className="bg-[#090a10] border border-[#1f2238] rounded-xl p-3.5">
                <div className="text-[11px] font-semibold text-slate-400">Ads Generated</div>
                <div className="text-2xl font-extrabold text-white mt-1">{stats.adsGenerated}</div>
              </div>
            </div>

            <div className="bg-[#090a10] border border-[#1f2238] rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-slate-400">Avg. Engagement Score</div>
                <div className="text-lg font-extrabold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span>{stats.avgEngagementScore}%</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Recent Campaigns Card */}
          <div className="adgenie-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight">Recent Campaigns</h3>
            <div className="space-y-2">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  onClick={() => viewCampaign(camp.id)}
                  className="bg-[#090a10] hover:bg-[#16192c] border border-[#1f2238] hover:border-brand-500/40 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                        {camp.title}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {camp.platform} · {camp.timeAgo}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
