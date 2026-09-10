import React, { useState, useEffect } from 'react';
import { X, Copy, Download, Check, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export default function AdPreviewModal({ creative, onClose, onNext, onPrev }) {
  const { triggerToast } = useCampaign();
  const [headline, setHeadline] = useState(creative?.headline || '');
  const [subheading, setSubheading] = useState(creative?.subheading || '');
  const [copiedField, setCopiedField] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (creative) {
      setHeadline(creative.headline);
      setSubheading(creative.subheading);
    }
  }, [creative]);

  if (!creative) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    triggerToast(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadFullBundle = () => {
    const text = [
      `==========================================`,
      `AdGenie AI — Optimized Ad Creative Export`,
      `==========================================`,
      `Product/Campaign: ${creative.title}`,
      `Audience Demographics: ${creative.audience}`,
      `Target Channel: ${creative.platform} (${creative.ratio})`,
      `Format Type: ${creative.type.toUpperCase()}`,
      `------------------------------------------`,
      `HEADLINE:`,
      headline,
      `------------------------------------------`,
      `CAPTION / SUBHEADING:`,
      subheading,
      `------------------------------------------`,
      `CALL TO ACTION (CTA):`,
      creative.cta,
      `------------------------------------------`,
      `TAG: ${creative.tag}`,
      `==========================================`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adgenie-${creative.id}-ad-bundle.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Ad Bundle downloaded!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#10121d] border border-[#272c44] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Buttons if list provided */}
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-admint-500 flex items-center justify-center backdrop-blur-md transition-colors"
            title="Previous Creative"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-admint-500 flex items-center justify-center backdrop-blur-md transition-colors"
            title="Next Creative"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Left Side: Live Phone Mockup Preview */}
        <div className="lg:w-1/2 bg-[#08090f] p-8 flex flex-col items-center justify-center relative overflow-y-auto min-h-[360px]">
          <div className="w-full max-w-[300px] rounded-[32px] border-4 border-[#24293f] bg-black shadow-2xl overflow-hidden relative group">
            {/* Phone Notch */}
            <div className="w-28 h-4 bg-[#24293f] mx-auto rounded-b-xl flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800" />
              <span className="w-6 h-1 rounded-full bg-slate-800" />
            </div>

            {/* Poster Image / Video Mockup */}
            <div className="aspect-[4/5] relative">
              <img src={creative.imageUrl} alt={creative.title} className="w-full h-full object-cover" />

              {/* Video Audio Toggle Overlay */}
              {creative.type === 'video' && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-admint-400" />}
                </button>
              )}

              {/* Dynamic Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-admint-500/90 text-white text-[9px] font-extrabold tracking-wider w-max mb-1">
                  <span>{creative.audience}</span> · <span>{creative.platform}</span>
                </div>

                <h3 className="text-base font-black text-white leading-tight uppercase tracking-tight">
                  {headline}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{subheading}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-white text-slate-950 text-[10px] font-black tracking-wider shadow-lg">
                    {creative.cta}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{creative.tag}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs font-semibold text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-admint-400" />
            <span>Interactive Live Social Feed Preview</span>
          </div>
        </div>

        {/* Right Side: Interactive Controls & Copy Editor */}
        <div className="lg:w-1/2 p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-admintOrange-500/20 text-admintOrange-400 text-xs font-bold">
                  {creative.platform}
                </span>
                <span className="text-xs text-slate-400 font-medium">Aspect Ratio: {creative.ratio}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{creative.title}</h2>
            </div>

            {/* Editable Headline */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Headline (Editable)
                </label>
                <button
                  onClick={() => copyToClipboard(headline, 'Headline')}
                  className="text-xs font-semibold text-admint-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedField === 'Headline' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'Headline' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-[#08090f] border border-[#24293f] focus:border-admint-500 rounded-xl p-3 text-sm text-white focus:outline-none transition-colors font-bold"
              />
            </div>

            {/* Editable Subheading / Caption */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Caption / Hook (Editable)
                </label>
                <button
                  onClick={() => copyToClipboard(subheading, 'Caption')}
                  className="text-xs font-semibold text-admint-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedField === 'Caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'Caption' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                rows={3}
                className="w-full bg-[#08090f] border border-[#24293f] focus:border-admint-500 rounded-xl p-3 text-xs text-slate-300 focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Quick Action Footer Buttons */}
          <div className="pt-4 border-t border-[#1c1f2e] flex flex-wrap items-center gap-3">
            <button
              onClick={() => copyToClipboard(`${headline}\n\n${subheading}\n\nCTA: ${creative.cta}`, 'Full Ad Copy')}
              className="flex-1 py-3 px-4 rounded-xl bg-[#171a29] hover:bg-[#20253b] border border-[#2a304d] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Full Ad Copy</span>
            </button>

            <button
              onClick={handleDownloadFullBundle}
              className="flex-1 py-3 px-4 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 text-white font-semibold text-xs shadow-lg shadow-admint-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Ad Bundle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
