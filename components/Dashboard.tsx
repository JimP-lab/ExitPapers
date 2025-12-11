import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Search, FileSpreadsheet, CheckCircle2, 
  MoreVertical, LogOut, FileText, Send, Loader2
} from 'lucide-react';
import { Soldier, MilitaryFieldProfile, AppView } from '../types';
import { generateExitProtocol } from '../services/geminiService';

interface DashboardProps {
  profile: MilitaryFieldProfile;
  soldiers: Soldier[];
  setSoldiers: React.Dispatch<React.SetStateAction<Soldier[]>>;
  onChangeView: (view: AppView) => void;
  onLogout: () => void;
  onSelectSoldier: (soldier: Soldier) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  profile, 
  soldiers, 
  setSoldiers, 
  onLogout,
  onSelectSoldier
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImportMenu, setShowImportMenu] = useState(false);

  // Simulate parsing a file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      // Simple CSV parser for demo: Name,Surname,Rank,Age,ExitDate,RejoinDate
      const lines = text.split('\n');
      const newSoldiers: Soldier[] = lines.slice(1).map((line, index) => {
        const parts = line.split(',');
        if (parts.length < 5) return null;
        return {
          id: `imported-${Date.now()}-${index}`,
          name: parts[0]?.trim(),
          surname: parts[1]?.trim(),
          rank: parts[2]?.trim() || 'Pvt',
          age: parseInt(parts[3]?.trim()) || 20,
          exitDate: parts[4]?.trim(),
          rejoinDate: parts[5]?.trim(),
          isApproved: false,
          phoneNumber: '555-0123' // Mock phone
        };
      }).filter(Boolean) as Soldier[];

      setSoldiers(prev => [...prev, ...newSoldiers]);
      setShowImportMenu(false);
    };
    reader.readAsText(file);
  };

  const handleToggleApproval = async (soldier: Soldier) => {
    if (soldier.isApproved) {
      // Revoke
      setSoldiers(prev => prev.map(s => s.id === soldier.id ? { ...s, isApproved: false, approvalSignature: undefined } : s));
      return;
    }

    // Approve logic with AI generation
    setProcessingId(soldier.id);
    
    // Simulate API call to Gemini
    const signature = await generateExitProtocol(soldier, profile);
    
    setSoldiers(prev => prev.map(s => {
      if (s.id === soldier.id) {
        return {
          ...s,
          isApproved: true,
          approvalSignature: signature,
          approvalTimestamp: new Date().toISOString()
        };
      }
      return s;
    }));

    setProcessingId(null);
    
    // Simulate SMS Toast
    alert(`SMS Sent to ${soldier.rank} ${soldier.surname}: Exit Paper Generated.`);
  };

  const filteredSoldiers = soldiers.filter(s => 
    s.surname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">ExitPapers</h1>
              <p className="text-xs text-slate-400 font-mono tracking-wider">{profile.name.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{profile.commanderName}</p>
                <p className="text-xs text-slate-400">{profile.location}</p>
             </div>
             <button 
                onClick={onLogout}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                title="Logout"
             >
               <LogOut className="w-5 h-5 text-slate-300" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search soldier by name..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowImportMenu(!showImportMenu)}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl shadow-sm font-medium transition-colors"
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              Manage Lists
              <MoreVertical className="w-4 h-4 ml-2 text-slate-400" />
            </button>
            
            {showImportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-30">
                <label className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-700">Import Excel/CSV</span>
                  <input 
                    type="file" 
                    accept=".csv,.txt" // Simplified for this demo
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                </label>
                <button 
                  onClick={() => {
                    // Load mock data
                    const mockData: Soldier[] = [
                      { id: '1', name: 'Jim', surname: 'Paraschakis', age: 36, rank: 'Sgt', exitDate: '2025-12-10', rejoinDate: '2025-12-15', isApproved: false, phoneNumber: '555-0101' },
                      { id: '2', name: 'Sarah', surname: 'Connor', age: 29, rank: 'Cpl', exitDate: '2025-12-11', rejoinDate: '2025-12-14', isApproved: false, phoneNumber: '555-0102' },
                      { id: '3', name: 'John', surname: 'Rambo', age: 42, rank: 'Lt', exitDate: '2025-12-10', rejoinDate: '2025-12-20', isApproved: false, phoneNumber: '555-0103' },
                    ];
                    setSoldiers(prev => [...prev, ...mockData]);
                    setShowImportMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-left"
                >
                   <FileText className="w-4 h-4 text-slate-500" />
                   <span className="text-sm text-slate-700">Load Mock Data</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Soldiers Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Soldier</th>
                  <th className="px-6 py-4">Exit Period</th>
                  <th className="px-6 py-4">Rejoin Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Approve Exit</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSoldiers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No soldiers found in the list. Import a list to get started.
                    </td>
                  </tr>
                ) : (
                  filteredSoldiers.map((soldier) => (
                    <tr key={soldier.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                            {soldier.name[0]}{soldier.surname[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{soldier.surname}, {soldier.name}</p>
                            <p className="text-xs text-slate-500">Age: {soldier.age} • Rank: {soldier.rank}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {soldier.exitDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {soldier.rejoinDate}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${soldier.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          {soldier.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={soldier.isApproved} 
                              onChange={() => handleToggleApproval(soldier)}
                              disabled={processingId === soldier.id}
                            />
                            <div className={`
                              w-14 h-7 rounded-full peer 
                              peer-focus:ring-4 peer-focus:ring-emerald-300 
                              peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-0.5 after:left-[4px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-6 after:w-6 after:transition-all 
                              ${soldier.isApproved ? 'bg-emerald-500 peer-checked:bg-emerald-500' : 'bg-slate-200'}
                            `}></div>
                            
                            {processingId === soldier.id && (
                               <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                                  <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                               </div>
                            )}
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                         {soldier.isApproved && (
                           <button 
                             onClick={() => onSelectSoldier(soldier)}
                             className="text-emerald-600 hover:text-emerald-800 font-medium text-sm flex items-center justify-center gap-1 mx-auto"
                           >
                             <Send className="w-3 h-3" />
                             View Paper
                           </button>
                         )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
