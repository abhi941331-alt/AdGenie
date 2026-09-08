import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  LayoutDashboard,
  Sparkles,
  Smartphone,
  History,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  FolderKanban,
  Wand2,
  Sliders,
  ChevronRight
} from 'lucide-react';

export default function Sidebar() {
  const {
    page,
    setPage,
    sidebarOpen,
    toggleSidebar,
    campaigns,
    loadCampaign,
    form,
    updateForm
  } = useCampaign();

  const navItems = [
    { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
    { id: 'campaign', label: 'Campaign Architect', icon: Sparkles },
    { id: 'preview', label: 'Ad Preview Studio', icon: Smartphone },
    { id: 'history', label: 'Campaign Archives', icon: History },
  ];

  const handleNewCampaign = () => {
    updateForm('description', '');
    setPage('campaign');
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#141b26] border-r border-[#273142] transition-all duration-300 flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#273142]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 shrink-0">
            <Wand2 className="w-5 h-5" />
          </div>
          {sidebarOpen && (
            <div className="flex items-center gap-2 font-bold text-lg text-white whitespace-nowrap">
              <span>AdGenie</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                v4.0
              </span>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
        </button>
      </div>

      {/* New Campaign Action Button */}
      <div className="p-3">
        <button
          onClick={handleNewCampaign}
          className={`w-full py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all ${
            !sidebarOpen && 'px-0'
          }`}
          title="New Campaign"
        >
          <Plus className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span>New Campaign</span>}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = page === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title={item.label}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Recent Campaigns Section */}
      {sidebarOpen && (
        <div className="px-4 py-3 border-t border-[#273142]/60">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            <span>Recent Campaigns</span>
            <FolderKanban className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {campaigns.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => loadCampaign(c)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-brand-400 truncate flex items-center justify-between group transition-colors"
              >
                <span className="truncate">{c.title}</span>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-brand-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User Pro Footer Pill */}
      <div className="p-3 border-t border-[#273142]">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
            PRO
          </div>
          {sidebarOpen && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-200 truncate">Marketer Pro</span>
              <span className="text-[10px] text-slate-400 truncate">GPT-4o Engine Active</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
