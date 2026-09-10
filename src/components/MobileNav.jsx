import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Home, Folder, Settings } from 'lucide-react';

export default function MobileNav() {
  const { page, setPage } = useCampaign();

  if (page === 'landing') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0e17]/95 border-t border-[#1a1d2e] backdrop-blur-md px-6 py-3 flex items-center justify-around text-xs font-semibold">
      <button
        onClick={() => setPage('dashboard')}
        className={`flex flex-col items-center gap-1 ${
          page === 'dashboard' ? 'text-brand-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setPage('mycampaigns')}
        className={`flex flex-col items-center gap-1 ${
          page === 'mycampaigns' || page === 'results' ? 'text-brand-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Folder className="w-5 h-5" />
        <span>Campaigns</span>
      </button>

      <button
        onClick={() => setPage('settings')}
        className={`flex flex-col items-center gap-1 ${
          page === 'settings' ? 'text-brand-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </button>
    </div>
  );
}
