import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { ArrowLeft, Play, Pause, Download, Share2, Maximize2, ChevronLeft, ChevronRight, Clock, Monitor, Film } from 'lucide-react';

export default function VideoPreviewView() {
  const { currentCampaign, selectedVariantIndex, setSelectedVariantIndex, setPage, triggerToast } = useCampaign();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!currentCampaign || !currentCampaign.variants[selectedVariantIndex]) return null;

  const activeVariant = currentCampaign.variants[selectedVariantIndex];

  const handleDownloadVideo = () => {
    const text = [
      `Downloading ${currentCampaign.title} - ${activeVariant.name}`,
      `Format: ${activeVariant.format}`,
      `Resolution: ${activeVariant.resolution}`,
      `Duration: ${activeVariant.duration}`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeVariant.id}-video-spec.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Video file download initiated!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('Shareable preview link copied to clipboard!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="space-y-2 pb-6 border-b border-[#1f2238]">
        <button
          onClick={() => setPage('results')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Results</span>
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Video Ad Preview</h1>
          <span className="px-3 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-bold">
            {activeVariant.name}
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video Player & Scene Thumbnails */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Video Display Player */}
          <div className="adgenie-card p-4 overflow-hidden relative group">
            <div className="aspect-square max-h-[480px] mx-auto rounded-2xl overflow-hidden relative bg-slate-950 border border-white/10 flex items-center justify-center">
              <img
                src={activeVariant.imageUrl}
                alt={activeVariant.headline}
                className="w-full h-full object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                <div className="text-3xl font-extrabold text-white tracking-tight uppercase leading-tight">
                  {activeVariant.overlayText}
                </div>
              </div>

              {/* Center Play/Pause Button Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute w-16 h-16 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
              </button>

              {/* Bottom Video Playback Bar Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-brand-400 transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-mono text-slate-300">0:00 / 0:15</span>
                </div>
                <button onClick={() => triggerToast('Fullscreen preview')} className="hover:text-brand-400 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Scene Carousel */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedVariantIndex(Math.max(0, selectedVariantIndex - 1))}
              className="p-2 rounded-xl bg-[#131522] border border-[#1f2238] text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 grid grid-cols-4 sm:grid-cols-5 gap-3">
              {currentCampaign.variants.map((varItem, idx) => (
                <div
                  key={varItem.id}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all relative ${
                    selectedVariantIndex === idx ? 'border-brand-500 scale-105 shadow-lg' : 'border-[#1f2238] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={varItem.imageUrl} alt={varItem.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-white">
                    {varItem.name}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedVariantIndex(Math.min(currentCampaign.variants.length - 1, selectedVariantIndex + 1))}
              className="p-2 rounded-xl bg-[#131522] border border-[#1f2238] text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Video Details & Download Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="adgenie-card p-6 space-y-6">
            <h3 className="text-base font-bold text-white tracking-tight">Video Details</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#090a10] border border-[#1f2238]">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400" /> Duration
                </span>
                <span className="font-bold text-white">{activeVariant.duration}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#090a10] border border-[#1f2238]">
                <span className="text-slate-400 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-brand-400" /> Resolution
                </span>
                <span className="font-bold text-white">{activeVariant.resolution}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#090a10] border border-[#1f2238]">
                <span className="text-slate-400 flex items-center gap-2">
                  <Film className="w-4 h-4 text-brand-400" /> Format
                </span>
                <span className="font-bold text-white">{activeVariant.format}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleDownloadVideo}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Video</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full py-3 rounded-xl bg-[#090a10] hover:bg-[#16192c] border border-[#1f2238] text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
