import React from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ResultsView from './components/ResultsView';
import VideoPreviewView from './components/VideoPreviewView';
import SettingsView from './components/SettingsView';
import MyCampaignsView from './components/MyCampaignsView';
import MobileNav from './components/MobileNav';
import Toast from './components/Toast';

function AppContent() {
  const { page } = useCampaign();

  if (page === 'landing') {
    return <LandingPage />;
  }

  const renderCurrentView = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardView />;
      case 'results':
        return <ResultsView />;
      case 'videopreview':
        return <VideoPreviewView />;
      case 'settings':
        return <SettingsView />;
      case 'mycampaigns':
        return <MyCampaignsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 font-sans relative selection:bg-brand-500 selection:text-white">
      <Sidebar />

      {/* Main Workspace Area with Sidebar Offset */}
      <main className="md:pl-64 min-h-screen pb-20 md:pb-12">
        <div className="max-w-7xl mx-auto p-6 md:p-10">{renderCurrentView()}</div>
      </main>

      <MobileNav />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}
