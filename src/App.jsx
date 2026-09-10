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
import AdPreviewModal from './components/AdPreviewModal';
import FloatingNav from './components/FloatingNav';
import Toast from './components/Toast';

function AppContent() {
  const { activeTab, selectedPreviewCreative, setSelectedPreviewCreative } = useCampaign();

  return (
    <div className="min-h-screen bg-[#0b0c14] text-slate-100 font-sans relative selection:bg-admint-500 selection:text-white">
      <FloatingNav />
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

      {/* Interactive Ad Preview & Copy Editor Modal */}
      {selectedPreviewCreative && (
        <AdPreviewModal
          creative={selectedPreviewCreative}
          onClose={() => setSelectedPreviewCreative(null)}
        />
      )}
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
