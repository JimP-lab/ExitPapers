import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Soldier, MilitaryFieldProfile } from '../types';
import { DigitalPaper } from './DigitalPaper';

interface SoldierPortalProps {
  soldiers: Soldier[]; // In a real app, this would come from an API based on search
  fieldProfile: MilitaryFieldProfile;
  onBack: () => void;
}

export const SoldierPortal: React.FC<SoldierPortalProps> = ({ soldiers, fieldProfile, onBack }) => {
  const [query, setQuery] = useState('');
  const [foundSoldier, setFoundSoldier] = useState<Soldier | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = soldiers.find(s => 
      s.surname.toLowerCase() === query.toLowerCase() && s.isApproved
    );
    
    if (result) {
      setFoundSoldier(result);
      setError('');
    } else {
      setError('No approved exit paper found for this surname. Please check with your commander.');
      setFoundSoldier(null);
    }
  };

  if (foundSoldier) {
    return <DigitalPaper soldier={foundSoldier} fieldProfile={fieldProfile} onClose={() => setFoundSoldier(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Return to Login
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">ExitPapers Portal</h1>
          <p className="text-slate-400">Enter your credentials to access your digital pass.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Soldier Surname</label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Paraschakis"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20"
            >
              Retrieve Exit Paper
            </button>
          </form>
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-8">
          Authorized personnel only. Unauthorized access is a punishable offense.
        </p>
      </div>
    </div>
  );
};
