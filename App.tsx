import React, { useState, useEffect } from 'react';
import { AppView, UserState } from './types';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
import MiningDashboard from './components/MiningDashboard';
import AIStudio from './components/AIStudio';
import DAO from './components/DAO';
import Community from './components/Community';
import Library from './components/Library';
import AdminConsole from './components/AdminConsole';
import { Menu } from 'lucide-react';

const USER_STORAGE_KEY = 'nexus_user_state';

const App: React.FC = () => {
  // Initialize User State from localStorage
  const [user, setUser] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load user state", e);
    }
    return {
      name: 'Guest',
      role: '',
      nexusTokens: 0,
      miningRate: 0,
      isFoundingMember: false,
      onboardingComplete: false
    };
  });

  // Initialize View based on user state
  const [currentView, setCurrentView] = useState<AppView>(() => {
    return user.onboardingComplete ? AppView.STUDIO : AppView.ONBOARDING;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persist User State
  useEffect(() => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const handleOnboardingComplete = (userData: Partial<UserState>) => {
    setUser(prev => ({ ...prev, ...userData, onboardingComplete: true }));
    setCurrentView(AppView.STUDIO);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.MINING:
      case AppView.DASHBOARD: // Dashboard shares Mining view for now
        return <MiningDashboard user={user} />;
      case AppView.STUDIO:
        return <AIStudio />;
      case AppView.DAO:
        return <DAO />;
      case AppView.COMMUNITY:
        return <Community />;
      case AppView.LIBRARY:
        return <Library />;
      case AppView.ADMIN:
        return <AdminConsole />;
      default:
        return <AIStudio />;
    }
  };

  if (!user.onboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex h-screen bg-black text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        user={user} 
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur border-b border-white/10 z-40 flex items-center justify-between px-4">
        <span className="font-bold text-white neon-text">NEXUS.ONE</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white">
          <Menu />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 p-4 md:hidden flex flex-col items-center justify-center space-y-6">
           <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 text-white p-2">✕</button>
           {[AppView.STUDIO, AppView.MINING, AppView.COMMUNITY, AppView.DAO, AppView.LIBRARY].map(view => (
             <button 
               key={view}
               onClick={() => { setCurrentView(view); setMobileMenuOpen(false); }}
               className="text-2xl font-bold text-white uppercase tracking-widest"
             >
               {view}
             </button>
           ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative bg-gradient-to-br from-slate-950 via-[#0a0a1a] to-slate-900 overflow-hidden md:rounded-l-3xl shadow-[inset_10px_0_30px_-10px_rgba(0,0,0,0.8)] border-l border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        <div className="h-full pt-16 md:pt-0">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;