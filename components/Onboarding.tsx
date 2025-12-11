import React, { useState, useEffect } from 'react';
import { ROLES } from '../constants';
import { UserState } from '../types';
import { ChevronRight, Cpu, Sparkles, Terminal, Activity } from 'lucide-react';

interface OnboardingProps {
  onComplete: (user: Partial<UserState>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [typedText, setTypedText] = useState('');
  const [loading, setLoading] = useState(false);

  // Typing effect for the intro
  useEffect(() => {
    if (step === 1) {
      const text = "Welcome to NEXUS.ONE. The year is 2026. Decentralization is inevitable. Your journey begins now.";
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(text.slice(0, i + 1));
        i++;
        if (i > text.length) clearInterval(timer);
      }, 40);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    // Simulate "Mining Boost" activation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const finishOnboarding = () => {
    onComplete({
      role: selectedRole,
      name: 'Visionary',
      isFoundingMember: true,
      nexusTokens: 500, // Early bird bonus
      miningRate: 4.0 // 4x Boost
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="relative z-10 max-w-2xl w-full p-8">
        
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <div className="flex justify-center mb-8">
              <Cpu className="w-16 h-16 text-cyan-400 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 min-h-[120px]">
              {typedText}
              <span className="animate-blink">|</span>
            </h1>
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setStep(2)}
                className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-md"
              >
                <span className="text-lg font-medium tracking-wide">Initialize Neural Link</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
            <h2 className="text-3xl font-bold text-center mb-2">Identify Your Protocol</h2>
            <p className="text-center text-slate-400 mb-8">Select your primary function to optimize your AI toolchain.</p>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                 <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-cyan-400 font-mono text-sm">CALIBRATING MINING ALGORITHMS...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="flex flex-col items-start p-6 bg-slate-900/50 hover:bg-cyan-900/20 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all duration-300 group text-left"
                  >
                    <span className="text-3xl mb-3">{role.icon}</span>
                    <span className="text-lg font-bold text-slate-200 group-hover:text-cyan-400">{role.label}</span>
                    <span className="text-sm text-slate-500 group-hover:text-slate-300">{role.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
             <div className="flex justify-center">
               <div className="relative">
                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur opacity-75 animate-pulse"></div>
                 <div className="relative bg-black rounded-full p-4">
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                 </div>
               </div>
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white mb-2">Founding Member Status Detected</h2>
               <div className="inline-block bg-yellow-500/20 border border-yellow-500/50 px-4 py-1 rounded-full text-yellow-300 font-mono text-sm mb-6">
                 EARLY BIRD MINING BOOST: 4X ACTIVE
               </div>
               <p className="text-slate-300 max-w-md mx-auto">
                 Your workspace is ready. The Visionary Director is online. 
                 500 $NEXUS tokens have been deposited to your vault.
               </p>
             </div>
             <button
                onClick={finishOnboarding}
                className="w-full max-w-xs mx-auto py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-lg font-bold tracking-wider shadow-lg shadow-cyan-900/50 transition-all transform hover:-translate-y-1"
              >
                ENTER STUDIO
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
