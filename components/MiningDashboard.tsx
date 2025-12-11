import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Zap, TrendingUp, Users, Cpu, FileText, Activity } from 'lucide-react';
import { UserState } from '../types';
import { INITIAL_MINING_STATS, WHITEPAPER_SECTIONS } from '../constants';

interface Props {
  user: UserState;
}

const MiningDashboard: React.FC<Props> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'whitepaper'>('live');

  return (
    <div className="flex flex-col h-full bg-slate-950/50">
      {/* Header & Tabs */}
      <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Mining Hub</h2>
          <p className="text-slate-400 text-sm">Network Participation & Token Economy</p>
        </div>
        
        <div className="flex bg-slate-800 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'live' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Activity className="w-4 h-4" /> Live Network
          </button>
          <button 
             onClick={() => setActiveTab('whitepaper')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'whitepaper' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" /> Whitepaper
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {activeTab === 'live' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 bg-cyan-500/20 w-24 h-24 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-800 rounded-lg"><Zap className="w-6 h-6 text-yellow-400" /></div>
                  <span className="text-xs text-slate-500 font-mono">RATE</span>
                </div>
                <div className="text-3xl font-bold text-white">{user.miningRate}x</div>
                <div className="text-sm text-slate-400">Early Bird Boost Active</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 bg-purple-500/20 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-800 rounded-lg"><Cpu className="w-6 h-6 text-purple-400" /></div>
                  <span className="text-xs text-slate-500 font-mono">BALANCE</span>
                </div>
                <div className="text-3xl font-bold text-white">{user.nexusTokens} <span className="text-sm font-normal text-slate-400">NEXUS</span></div>
                <div className="text-sm text-slate-400">Available to Stake</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 bg-pink-500/20 w-24 h-24 rounded-full blur-2xl group-hover:bg-pink-500/30 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-800 rounded-lg"><TrendingUp className="w-6 h-6 text-pink-400" /></div>
                  <span className="text-xs text-slate-500 font-mono">DAILY EARNINGS</span>
                </div>
                <div className="text-3xl font-bold text-white">+124.5</div>
                <div className="text-sm text-slate-400">Top 5% of Creators</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 bg-blue-500/20 w-24 h-24 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-800 rounded-lg"><Users className="w-6 h-6 text-blue-400" /></div>
                  <span className="text-xs text-slate-500 font-mono">NETWORK</span>
                </div>
                <div className="text-3xl font-bold text-white">4.2k</div>
                <div className="text-sm text-slate-400">Active Miners Online</div>
              </div>
            </div>

            {/* Chart */}
            <div className="glass-panel p-6 rounded-2xl h-80 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-6">Network Hashrate vs. Your Earnings</h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={INITIAL_MINING_STATS}>
                  <defs>
                    <linearGradient id="colorHash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="hashrate" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorHash)" />
                  <Area type="monotone" dataKey="earnings" stroke="#06b6d4" fillOpacity={1} fill="url(#colorEarn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

             {/* Tasks */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Daily Mining Tasks</h3>
              <ul className="space-y-4">
                {[
                  { task: 'Complete "AI Logic" Module', reward: '50 NEXUS', done: true },
                  { task: 'Generate 5 Images in Studio', reward: '20 NEXUS', done: false },
                  { task: 'Vote on DAO Proposal #1024', reward: '100 NEXUS', done: false },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${item.done ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'}`}>
                        {item.done && <span className="text-black text-xs">✓</span>}
                      </div>
                      <span className={item.done ? 'text-slate-500 line-through' : 'text-slate-300'}>{item.task}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">{item.reward}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-16">
            <div className="text-center mb-12">
               <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                 $NEXUS Token Economy
               </h1>
               <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                 A sustainable, deflationary model designed to incentivize the world's first community-owned AI power network.
               </p>
            </div>

            {WHITEPAPER_SECTIONS.map((section, idx) => (
              <div key={section.id} className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                   <section.icon className="w-32 h-32" />
                 </div>
                 
                 <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-900 to-slate-900 flex items-center justify-center border border-cyan-500/30">
                       <section.icon className="w-6 h-6 text-cyan-400" />
                     </div>
                     <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                   </div>
                   
                   <div className="prose prose-invert max-w-none">
                     <p className="text-slate-300 leading-relaxed whitespace-pre-wrap font-light text-lg">
                       {section.content}
                     </p>
                   </div>
                 </div>
              </div>
            ))}

            <div className="glass-panel p-8 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 border border-cyan-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Mining?</h3>
              <p className="text-slate-300 mb-6">
                Every action you take in the Studio and Community contributes to your future ownership.
              </p>
              <button 
                onClick={() => setActiveTab('live')}
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiningDashboard;