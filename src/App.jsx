import React from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Studio from './components/Studio';
import AgeAwareSection from './components/AgeAwareSection';
import FeaturesSection from './components/FeaturesSection';
import CtaBanner from './components/CtaBanner';
import SamplesGallery from './components/SamplesGallery';
import Footer from './components/Footer';
import SignInModal from './components/SignInModal';
import Toast from './components/Toast';

function AppContent() {
  const { activeTab } = useCampaign();

  return (
    <div className="min-h-screen bg-[#0b0c14] text-slate-100 font-sans relative selection:bg-admint-500 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6">
        {activeTab === 'samples' ? (
          <SamplesGallery />
        ) : (
          <>
            <Hero />
            <HowItWorks />
            <Studio />
            <AgeAwareSection />
            <FeaturesSection />
            <CtaBanner />
          </>
        )}
      </main>

      <Footer />
      <SignInModal />
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
