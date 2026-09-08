import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export default function Footer() {
  const { setActiveTab } = useCampaign();

  const scrollToSection = (id) => {
    setActiveTab('home');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080d] border-t border-[#1a1d2e] py-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-admint-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>AdGenie</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            AI-powered platform-optimized image and video ad creative generator.
          </p>
        </div>

        {/* Product Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => scrollToSection('studio')} className="hover:text-white transition-colors">
                Studio
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('samples');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors"
              >
                Samples
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
                Features
              </button>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer transition-colors">About</li>
            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-[#141624] text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© 2026 AdGenie AI Inc. All rights reserved.</div>
        <div>Built with React & Tailwind CSS</div>
      </div>
    </footer>
  );
}
