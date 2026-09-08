import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/campaignData';
import { PenTool, Users, Wand2, Rocket } from 'lucide-react';

const iconMap = {
  PenTool: PenTool,
  Users: Users,
  Wand2: Wand2,
  Rocket: Rocket,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t border-[#1a1d2e] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold text-admintOrange-400 uppercase tracking-widest">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four steps from idea to launch-ready ads
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((item) => {
            const IconComponent = iconMap[item.icon] || PenTool;
            return (
              <div
                key={item.step}
                className="admint-card p-6 space-y-5 relative group hover:border-admint-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-admint-500/15 border border-admint-500/30 text-admint-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-600 group-hover:text-slate-400 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
