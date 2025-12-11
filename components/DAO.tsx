import React from 'react';
import { DAO_PROPOSALS } from '../constants';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const DAO: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">DAO Governance</h2>
        <p className="text-slate-400">Phase 2: Hybrid Governance (Decentralization Progress: 35%)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {DAO_PROPOSALS.map((prop) => {
           const total = prop.votesFor + prop.votesAgainst;
           const percentFor = Math.round((prop.votesFor / total) * 100);
           
           return (
            <div key={prop.id} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  prop.status === 'active' ? 'bg-green-900/30 text-green-400 border border-green-500/20' : 
                  prop.status === 'passed' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/20' : 'bg-red-900/30 text-red-400'
                }`}>
                  {prop.status}
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {prop.deadline}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{prop.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{prop.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> For</span>
                  <span className="text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" /> Against</span>
                </div>
                
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="bg-green-500 h-full" style={{ width: `${percentFor}%` }}></div>
                  <div className="bg-red-500 h-full" style={{ width: `${100 - percentFor}%` }}></div>
                </div>
                
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>{prop.votesFor.toLocaleString()} NEXUS</span>
                  <span>{prop.votesAgainst.toLocaleString()} NEXUS</span>
                </div>
              </div>

              {prop.status === 'active' && (
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 py-3 bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 rounded-lg transition-colors font-semibold">
                    Vote For
                  </button>
                  <button className="flex-1 py-3 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 rounded-lg transition-colors font-semibold">
                    Vote Against
                  </button>
                </div>
              )}
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default DAO;
