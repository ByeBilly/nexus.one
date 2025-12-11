import React, { useState } from 'react';
import { ShieldCheck, Send, Radio, FileUp, Globe, AlertTriangle, Zap, Database } from 'lucide-react';

const AdminConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deploy' | 'system'>('deploy');
  const [deployType, setDeployType] = useState<'announcement' | 'protocol' | 'template'>('announcement');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert("ARSENAL UPDATED: Capability successfully injected into the Nexus Network.");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden">
       {/* Background Grid for "Tech" feel */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.9)_2px,transparent_2px),linear-gradient(90deg,rgba(15,23,42,0.9)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="p-6 border-b border-red-900/30 bg-red-950/10 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-500 tracking-tight uppercase">Nexus Core // God Mode</h2>
            <p className="text-red-400/60 text-xs font-mono">AUTHORIZED PERSONNEL ONLY • MEDIA BARON ACCESS</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={() => setActiveTab('deploy')}
             className={`px-4 py-2 rounded border transition-all ${activeTab === 'deploy' ? 'bg-red-900/30 border-red-500 text-red-100' : 'border-transparent text-red-400/50 hover:text-red-300'}`}
           >
             Arsenal Deployment
           </button>
           <button 
             onClick={() => setActiveTab('system')}
             className={`px-4 py-2 rounded border transition-all ${activeTab === 'system' ? 'bg-red-900/30 border-red-500 text-red-100' : 'border-transparent text-red-400/50 hover:text-red-300'}`}
           >
             System Health
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 relative z-10">
        {activeTab === 'deploy' ? (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="glass-panel border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
               <div className="absolute -right-10 -top-10 bg-red-500/10 w-40 h-40 rounded-full blur-3xl"></div>
               
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                 <Radio className="w-5 h-5 text-red-400" /> Broadcast Power-Up
               </h3>

               <div className="space-y-6 relative z-10">
                 <div>
                   <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Payload Type</label>
                   <div className="flex gap-4">
                     {(['announcement', 'protocol', 'template'] as const).map(type => (
                       <button
                         key={type}
                         onClick={() => setDeployType(type)}
                         className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium capitalize transition-all ${
                           deployType === type 
                             ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                             : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'
                         }`}
                       >
                         {type}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div>
                   <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Capability Title</label>
                   <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors" placeholder="e.g., The 7-Day Clone Protocol v2..." />
                 </div>

                 <div>
                   <label className="block text-xs font-mono text-slate-500 mb-2 uppercase">Data / Prompt / Link</label>
                   <textarea rows={6} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono text-sm" placeholder="Paste the exact prompt or Notebook URL here..." />
                 </div>

                 <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                   <button 
                     onClick={handleDeploy}
                     disabled={isDeploying}
                     className="flex-1 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white py-3 rounded-lg font-bold tracking-wide flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-wait"
                   >
                     {isDeploying ? 'INJECTING PAYLOAD...' : 'DEPLOY TO ARSENAL'}
                     {!isDeploying && <Zap className="w-4 h-4 fill-white" />}
                   </button>
                   <button className="px-6 py-3 border border-slate-600 hover:border-white text-slate-400 hover:text-white rounded-lg transition-colors">
                     Save to Drafts
                   </button>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="glass-panel border-white/5 p-4 rounded-xl flex items-center gap-4">
                 <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400"><Database className="w-6 h-6" /></div>
                 <div>
                   <div className="text-2xl font-bold text-white">482</div>
                   <div className="text-xs text-slate-500">Items in Arsenal</div>
                 </div>
               </div>
               <div className="glass-panel border-white/5 p-4 rounded-xl flex items-center gap-4">
                 <div className="p-3 bg-green-900/20 rounded-lg text-green-400"><Globe className="w-6 h-6" /></div>
                 <div>
                   <div className="text-2xl font-bold text-white">100%</div>
                   <div className="text-xs text-slate-500">Network Uptime</div>
                 </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <AlertTriangle className="w-16 h-16 mb-4 text-red-900" />
            <h3 className="text-xl font-mono">SYSTEM DIAGNOSTICS RESTRICTED</h3>
            <p>Please connect to the physical terminal.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConsole;