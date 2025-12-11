import React from 'react';
import { AppView, UserState } from '../types';
import { LayoutDashboard, Radio, Cpu, Vote, Users, Library, ShieldCheck } from 'lucide-react';
import { APP_NAME } from '../constants';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  user: UserState;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, user }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { id: AppView.STUDIO, icon: Radio, label: 'Studio' },
    { id: AppView.LIBRARY, icon: Library, label: 'Knowledge Base' },
    { id: AppView.MINING, icon: Cpu, label: 'Mining Hub' },
    { id: AppView.COMMUNITY, icon: Users, label: 'Community' },
    { id: AppView.DAO, icon: Vote, label: 'Governance' },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-white/10 flex flex-col hidden md:flex h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 neon-text">
          {APP_NAME}
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Early Access 2026</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/40 text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Developer Entry Point / User Status */}
      <div className="p-4 border-t border-white/5 space-y-2">
        {/* Secret/Special Admin Entry */}
        <button
           onClick={() => onChangeView(AppView.ADMIN)}
           className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
             currentView === AppView.ADMIN 
               ? 'bg-red-900/20 text-red-400 border border-red-500/30' 
               : 'text-slate-600 hover:text-red-400 hover:bg-red-950/30'
           }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-mono tracking-widest uppercase">Nexus Core (Dev)</span>
        </button>

        <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
             <span className="text-lg">👾</span>
           </div>
           <div className="flex-1 overflow-hidden">
             <div className="text-sm font-bold text-white truncate">{user.name}</div>
             <div className="text-xs text-cyan-400 font-mono truncate">{user.nexusTokens.toFixed(1)} NEXUS</div>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;