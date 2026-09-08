import React from 'react';
import { AGE_AWARE_CARDS } from '../data/campaignData';

export default function AgeAwareSection() {
  return (
    <section id="age-aware" className="py-24 border-t border-[#1a1d2e] relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold text-admintOrange-400 uppercase tracking-widest">
            Age-aware creative
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One product, tuned for every generation
          </h2>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            The same description produces meaningfully different ads. AdGenie shifts the visual language, pacing,
            and copy to resonate with the age group you're targeting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGE_AWARE_CARDS.map((card) => (
            <div
              key={card.title}
              className="admint-card p-6 space-y-6 flex flex-col justify-between hover:border-admint-500/40 transition-all"
            >
              <div className="flex items-center justify-between border-b border-[#1c1f2e] pb-4">
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <span
                  className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#161826]"
                  style={{ color: card.color }}
                >
                  {card.range}
                </span>
              </div>

              <ul className="space-y-3 flex-1">
                {card.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: card.color }} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
