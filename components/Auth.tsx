import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { AppView } from '../types';

interface AuthProps {
  onLogin: (email: string) => void;
  onChangeView: (view: AppView) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onChangeView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <div className="mx-auto bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">ExitPapers</h1>
          <p className="text-slate-400 mt-2 text-sm">Military Leave Management System</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Military ID / Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                placeholder="commander@army.mil"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Passcode</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute right-3 top-3.5 text-slate-400 w-5 h-5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLogin ? 'Access Dashboard' : 'Create Field Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              {isLogin ? "New Military Field? Register here" : "Already registered? Login"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
             <button
              onClick={() => onChangeView(AppView.SOLDIER_PORTAL)}
              className="w-full py-2 px-4 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Access Soldier Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
