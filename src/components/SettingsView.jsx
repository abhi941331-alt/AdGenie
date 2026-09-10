import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { User, Mail, CreditCard, Bell, Sparkles, ArrowUpCircle } from 'lucide-react';

export default function SettingsView() {
  const { user, updateUser, triggerToast } = useCampaign();
  const [activeTab, setActiveTab] = useState('Profile');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(name, email);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="pb-4 border-b border-[#1f2238]">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f2238]">
        {['Profile', 'Billing', 'Notifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === tab
                ? 'border-brand-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab Main Grid */}
      {activeTab === 'Profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Information Card */}
          <div className="lg:col-span-7 adgenie-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white tracking-tight">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1 rounded-lg bg-[#090a10] border border-[#1f2238] text-slate-300 hover:text-white text-xs font-semibold"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-600 text-white font-black text-xl flex items-center justify-center shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{user.name}</div>
                <div className="text-xs text-slate-400">{user.email}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-[#090a10] border border-[#1f2238] focus:border-brand-500 rounded-xl py-3 pl-10 pr-4 text-xs text-white disabled:opacity-60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-[#090a10] border border-[#1f2238] focus:border-brand-500 rounded-xl py-3 pl-10 pr-4 text-xs text-white disabled:opacity-60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>

          {/* Right Column: Plan & API Usage Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Plan Card */}
            <div className="adgenie-card p-6 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan</div>
              <div>
                <h3 className="text-xl font-extrabold text-white">{user.plan}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Upgrade to get more credits and premium features.
                </p>
              </div>

              <button
                onClick={() => triggerToast('Upgrade Plan modal opened!')}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <ArrowUpCircle className="w-4 h-4" />
                <span>Upgrade Plan</span>
              </button>
            </div>

            {/* API Usage Card */}
            <div className="adgenie-card p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 uppercase tracking-wider">API Usage</span>
                <span className="text-white font-mono">{user.creditsUsed} / {user.totalCredits}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Credits Used</span>
                  <span>{Math.round((user.creditsUsed / user.totalCredits) * 100)}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#090a10] overflow-hidden border border-[#1f2238]">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-indigo-400 transition-all duration-300"
                    style={{ width: `${(user.creditsUsed / user.totalCredits) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'Billing' && (
        <div className="adgenie-card p-6 max-w-2xl text-xs space-y-3">
          <h3 className="text-sm font-bold text-white">Billing Information</h3>
          <p className="text-slate-400">No payment methods added. You are currently on the Free Plan.</p>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'Notifications' && (
        <div className="adgenie-card p-6 max-w-2xl text-xs space-y-3">
          <h3 className="text-sm font-bold text-white">Notification Preferences</h3>
          <p className="text-slate-400">Email digest notifications for new campaign completion are active.</p>
        </div>
      )}
    </div>
  );
}
