import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  Terminal,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { PIPELINE_STEPS } from '../data/campaignData';

export default function PipelineTrace() {
  const { activeStep, progressPercent, setPage } = useCampaign();

  const isComplete = progressPercent >= 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <Cpu className="w-4 h-4 animate-spin-slow" />
          <span>GPT-4o Multi-Node Reasoning Trace</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {isComplete ? 'Campaign Synthesis Complete!' : 'Engineering Creative Campaign Brief...'}
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          AdGenie v4.0 is processing brief semantics, analyzing platform heuristics, drafting copy variants, and scoring conversion quality.
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>
              {isComplete ? 'Pipeline Done (100%)' : `Node ${activeStep + 1} of ${PIPELINE_STEPS.length}`}
            </span>
            <span className="font-mono text-brand-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 transition-all duration-500 shadow-lg shadow-brand-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Execution Nodes Box */}
      <div className="p-6 rounded-2xl bg-[#181f2a] border border-[#273142] space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#273142] pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" />
            <span>AI PIPELINE EXECUTION NODES</span>
          </div>
          <span className="text-brand-400 font-mono">STREAMING OUTPUT</span>
        </div>

        <div className="space-y-3">
          {PIPELINE_STEPS.map((step, idx) => {
            const isDone = idx < activeStep || isComplete;
            const isCurrent = idx === activeStep && !isComplete;

            return (
              <div
                key={step.label}
                className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                  isDone
                    ? 'bg-slate-900/60 border-brand-500/30 text-slate-200'
                    : isCurrent
                    ? 'bg-brand-500/10 border-brand-500/60 text-white shadow-lg shadow-brand-500/10'
                    : 'bg-slate-900/20 border-slate-800/60 text-slate-500 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-brand-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[10px] text-slate-500">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">{step.label}</h4>
                    {isDone && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        EXECUTED
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/30 animate-pulse">
                        PROCESSING...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{step.desc}</p>
                  {isDone && (
                    <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60 mt-1">
                      ➜ {step.fact}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {isComplete && (
          <div className="pt-4 text-center">
            <button
              onClick={() => setPage('results')}
              className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm inline-flex items-center gap-2 shadow-xl shadow-brand-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>View Generated Campaign</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
