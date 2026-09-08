import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCampaign();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-[#121422] border border-admint-500/50 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 backdrop-blur-md">
        <CheckCircle2 className="w-4 h-4 text-admint-400" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
