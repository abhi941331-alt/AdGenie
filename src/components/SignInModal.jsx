import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { X, Sparkles, Lock, User } from 'lucide-react';

export default function SignInModal() {
  const { isSignInOpen, setIsSignInOpen, handleSignIn } = useCampaign();
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('pwd123');

  if (!isSignInOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignIn(username, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121422] border border-[#24293f] rounded-2xl p-8 shadow-2xl space-y-6">
        {/* Close button */}
        <button
          onClick={() => setIsSignInOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a1d2e] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-admint-500/20 text-admint-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sign in to AdGenie</h2>
          <p className="text-xs text-admintOrange-400 font-semibold bg-admintOrange-500/10 py-1 px-3 rounded-md border border-admintOrange-500/20 inline-block">
            Demo credentials: user / pwd123
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-[#0b0c14] border border-[#202436] focus:border-admint-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#0b0c14] border border-[#202436] focus:border-admint-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-admint-500 hover:bg-admint-600 active:scale-95 text-white font-bold text-sm shadow-xl shadow-admint-500/25 transition-all mt-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
