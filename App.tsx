import React, { useState } from 'react';
import { Auth } from './components/Auth';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { SoldierPortal } from './components/SoldierPortal';
import { DigitalPaper } from './components/DigitalPaper';
import { LandingPage } from './components/LandingPage';
import { AppView, MilitaryFieldProfile, Soldier } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  
  // App State
  const [fieldProfile, setFieldProfile] = useState<MilitaryFieldProfile | null>(null);
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [selectedSoldierForPaper, setSelectedSoldierForPaper] = useState<Soldier | null>(null);

  const handleLogin = (email: string) => {
    // In a real app, check auth.
    // If no profile exists, go to onboarding. Else dashboard.
    // For demo, we assume first login needs onboarding.
    if (!fieldProfile) {
      setCurrentView(AppView.ONBOARDING);
    } else {
      setCurrentView(AppView.DASHBOARD);
    }
  };

  const handleOnboardingComplete = (profile: MilitaryFieldProfile) => {
    setFieldProfile(profile);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentView(AppView.LANDING);
    setFieldProfile(null);
    setSoldiers([]);
  };

  return (
    <>
      {currentView === AppView.LANDING && (
        <LandingPage onEnterApp={() => setCurrentView(AppView.AUTH)} />
      )}

      {currentView === AppView.AUTH && (
        <Auth 
          onLogin={handleLogin} 
          onChangeView={setCurrentView} 
        />
      )}

      {currentView === AppView.ONBOARDING && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {currentView === AppView.DASHBOARD && fieldProfile && (
        <Dashboard 
          profile={fieldProfile}
          soldiers={soldiers}
          setSoldiers={setSoldiers}
          onChangeView={setCurrentView}
          onLogout={handleLogout}
          onSelectSoldier={setSelectedSoldierForPaper}
        />
      )}

      {currentView === AppView.SOLDIER_PORTAL && (
        <SoldierPortal 
          soldiers={soldiers}
          fieldProfile={fieldProfile || { // Fallback profile if admin hasn't set one up for demo
             name: "Central Command", location: "HQ", address: "Sector 1", commanderName: "General Admin"
          }}
          onBack={() => setCurrentView(AppView.AUTH)}
        />
      )}

      {/* Modal Overlay for Digital Paper from Dashboard */}
      {selectedSoldierForPaper && fieldProfile && (
        <DigitalPaper 
          soldier={selectedSoldierForPaper} 
          fieldProfile={fieldProfile}
          onClose={() => setSelectedSoldierForPaper(null)}
        />
      )}
    </>
  );
};

export default App;
