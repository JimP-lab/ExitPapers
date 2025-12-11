import React, { useState } from 'react';
import { MapPin, Navigation, User, ChevronRight } from 'lucide-react';
import { MilitaryFieldProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: MilitaryFieldProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [profile, setProfile] = useState<MilitaryFieldProfile>({
    name: '',
    location: '',
    address: '',
    commanderName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Field Registration</h2>
          <p className="text-slate-500 mt-2">Establish your digital command post. This information will appear on all issued Exit Papers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Military Field Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Navigation className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="pl-10 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 py-3"
                  placeholder="e.g. Fort Alpha - 34th Division"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Location / City</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="pl-10 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 py-3"
                  placeholder="e.g. Nevada"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Base Address</label>
              <input
                type="text"
                required
                className="block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 py-3 px-4"
                placeholder="Building 4, Sector 7"
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Commander in Charge</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="pl-10 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 py-3"
                  placeholder="Col. John Smith"
                  value={profile.commanderName}
                  onChange={(e) => setProfile({...profile, commanderName: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/20"
            >
              Initialize Command Dashboard
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
