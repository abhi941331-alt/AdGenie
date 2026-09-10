import React, { createContext, useContext, useState } from 'react';
import { generateCreativesFromPrompt, PRESET_CREATIVES } from '../data/campaignData';

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [promptInput, setPromptInput] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('gen-z');
  const [heroAgeGroup, setHeroAgeGroup] = useState('gen-z');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'facebook']);
  const [generatedCreatives, setGeneratedCreatives] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedPreviewCreative, setSelectedPreviewCreative] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignIn = (username, password) => {
    if (!username) {
      triggerToast('Please enter a username');
      return false;
    }
    setUser({ name: username });
    setIsSignInOpen(false);
    triggerToast(`Welcome back, ${username}!`);
    return true;
  };

  const handleSignOut = () => {
    setUser(null);
    triggerToast('Signed out successfully.');
  };

  const togglePlatform = (platId) => {
    if (selectedPlatforms.includes(platId)) {
      if (selectedPlatforms.length === 1) {
        triggerToast('Please keep at least one platform selected.');
        return;
      }
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platId]);
    }
  };

  const handleGenerate = () => {
    if (!promptInput.trim()) {
      triggerToast('Please enter or select a product description brief.');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const results = generateCreativesFromPrompt(promptInput, selectedAgeGroup, selectedPlatforms);
      setGeneratedCreatives(results);
      setIsGenerating(false);
      triggerToast(`Generated ${results.length} platform-tailored ad creatives!`);

      // Smooth scroll to output
      const outputElem = document.getElementById('studio-output');
      if (outputElem) {
        outputElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  return (
    <CampaignContext.Provider
      value={{
        user,
        isSignInOpen,
        setIsSignInOpen,
        activeTab,
        setActiveTab,
        promptInput,
        setPromptInput,
        selectedAgeGroup,
        setSelectedAgeGroup,
        heroAgeGroup,
        setHeroAgeGroup,
        selectedPlatforms,
        togglePlatform,
        generatedCreatives,
        isGenerating,
        handleSignIn,
        handleSignOut,
        handleGenerate,
        toastMessage,
        triggerToast,
        PRESET_CREATIVES,
        selectedPreviewCreative,
        setSelectedPreviewCreative,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
