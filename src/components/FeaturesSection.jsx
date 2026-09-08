import React from 'react';
import { FEATURES } from '../data/campaignData';
import { Image, LayoutGrid, Gauge, FlaskConical, Languages, Video } from 'lucide-react';

const iconMap = {
  Image: Image,
  LayoutGrid: LayoutGrid,
  Gauge: Gauge,
  FlaskConical: FlaskConical,
  Languages: Languages,
  Video: Video,
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 border-t border-[#1a1d2e] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold text-admintOrange-400 uppercase tracking-widest">
            Everything included
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A full creative team, in one prompt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat) => {
            const IconComp = iconMap[feat.icon] || Image;
            return (
              <div
                key={feat.title}
                className="admint-card p-6 space-y-4 hover:border-admint-500/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-admint-500/15 border border-admint-500/30 text-admint-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
