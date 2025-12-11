import React from 'react';
import { QrCode, ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import { Soldier, MilitaryFieldProfile } from '../types';

interface DigitalPaperProps {
  soldier: Soldier;
  fieldProfile: MilitaryFieldProfile;
  onClose: () => void;
}

export const DigitalPaper: React.FC<DigitalPaperProps> = ({ soldier, fieldProfile, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg min-h-[600px] shadow-2xl rounded-sm overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-300">
        
        {/* Paper Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center print:hidden">
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm font-bold">
            <Download className="w-4 h-4" /> Save PDF
          </button>
        </div>

        {/* The Paper Content */}
        <div className="p-8 flex-1 flex flex-col bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          
          {/* Official Header */}
          <div className="text-center mb-8 border-b-2 border-slate-900 pb-6">
            <div className="mx-auto w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-widest">Exit Approval</h2>
            <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Official Document • {fieldProfile.name}</p>
          </div>

          {/* Soldier Details */}
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-1">Soldier Name</p>
                <p className="font-serif text-lg font-bold text-slate-900">{soldier.surname}, {soldier.name}</p>
              </div>
              <div>
                <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-1">Rank / Age</p>
                <p className="font-serif text-lg text-slate-900">{soldier.rank} / {soldier.age}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-1">Exit Date</p>
                    <p className="text-xl font-mono font-bold text-emerald-700">{soldier.exitDate}</p>
                 </div>
                 <div>
                    <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-1">Rejoin Date</p>
                    <p className="text-xl font-mono font-bold text-rose-700">{soldier.rejoinDate}</p>
                 </div>
               </div>
            </div>
          </div>

          {/* AI Generated Protocol */}
          <div className="mb-8">
             <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-2">Commander's Protocol</p>
             <div className="font-serif text-slate-800 text-sm leading-relaxed italic border-l-4 border-slate-300 pl-4">
               "{soldier.approvalSignature || 'Authorization granted per standard military protocol.'}"
             </div>
          </div>

          {/* Footer / Signature */}
          <div className="mt-auto pt-8 flex items-end justify-between">
            <div className="text-center">
               <div className="w-24 h-24 bg-white border border-slate-200 p-1">
                 <QrCode className="w-full h-full text-slate-900" />
               </div>
               <p className="text-[10px] text-slate-400 mt-1 uppercase">Scan to Verify</p>
            </div>
            
            <div className="text-right">
              <div className="h-16 flex items-end justify-end mb-2">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-12 opacity-80" />
              </div>
              <p className="text-sm font-bold text-slate-900 uppercase border-t border-slate-900 pt-2 inline-block min-w-[150px] text-center">
                {fieldProfile.commanderName}
              </p>
              <p className="text-xs text-slate-500 uppercase">Commanding Officer</p>
            </div>
          </div>
        </div>
        
        {/* Mobile visual effect bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"></div>
      </div>
    </div>
  );
};
