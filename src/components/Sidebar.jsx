import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Sparkles, Home, PlusCircle, Folder, Settings, ArrowUpCircle } from 'lucide-react';

export default function Sidebar() {
  const { page, setPage, user, triggerToast } = useCampaign();

  if (page === 'landing') return null;

  return (
    <aside className="w-64 bg-[#0d0e17] border-r border-[#1a1d2e] min-h-screen p-5 flex flex-col justify-between fixed top-0 left-0 z-30">
      <div className="space-y-8">
        {/* Logo */}
        <button
          onClick={() => setPage('landing')}
          className="flex items-center gap-3 text-left focus:outline-none group px-2"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AdGenie</span>
        </button>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 text-sm font-medium">
          <button
            onClick={() => setPage('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              page === 'dashboard'
                ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#151726]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setPage('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              page === 'create'
                ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#151726]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>

          <button
            onClick={() => setPage('mycampaigns')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              page === 'mycampaigns'
                ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#151726]'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>My Campaigns</span>
          </button>

          <button
            onClick={() => setPage('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              page === 'settings'
                ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#151726]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* User Profile Card at Bottom */}
      <div className="bg-[#131522] border border-[#1f2238] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{user.name}</div>
            <div className="text-[10px] text-slate-400 font-medium">{user.plan}</div>
          </div>
        </div>

        <button
          onClick={() => triggerToast('Upgrade options requested!')}
          className="w-full py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-brand-600/20"
        >
          <ArrowUpCircle className="w-3.5 h-3.5" />
          <span>Upgrade</span>
        </button>
      </div>
    </aside>
  );
}
