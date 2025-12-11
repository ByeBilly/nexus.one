import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Sparkles, Loader2, Bot, BookOpen } from 'lucide-react';
import { generateVisionaryResponse, generateNexusImage } from '../services/geminiService';
import { ChatMessage, ModelType } from '../types';

const AIStudio: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'system',
      text: 'I am the Visionary Director. I have access to your Notebook LLM context. What shall we create today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'image'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (mode === 'chat') {
        const responseText = await generateVisionaryResponse(userMsg.text);
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: responseText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        // Image Mode
        const { imageUrl, text } = await generateNexusImage(userMsg.text);
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: text || "Here is the visualization of your concept.",
          imageUrl: imageUrl || undefined,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/30 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center">
             <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Visionary Director</h2>
            <p className="text-xs text-cyan-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              ONLINE • GEMINI 2.5 FLASH
            </p>
          </div>
        </div>

        {/* Notebook Context Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-900/20 border border-blue-500/30 rounded-full">
          <BookOpen className="w-3 h-3 text-blue-400" />
          <span className="text-xs text-blue-300 font-mono">NOTEBOOK LLM CONTEXT: ACTIVE</span>
        </div>
        
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
           <button 
             onClick={() => setMode('chat')}
             className={`px-4 py-1.5 rounded-md text-sm transition-all ${mode === 'chat' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             Text
           </button>
           <button 
             onClick={() => setMode('image')}
             className={`px-4 py-1.5 rounded-md text-sm transition-all ${mode === 'image' ? 'bg-purple-900/50 text-purple-200 border border-purple-500/30' : 'text-slate-400 hover:text-white'}`}
           >
             Image
           </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              {msg.role === 'model' && (
                <div className="text-xs font-bold text-cyan-500 mb-1 uppercase tracking-wider mb-2">Director's Log</div>
              )}
              
              {msg.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden border border-slate-600">
                  <img src={msg.imageUrl} alt="Generated" className="w-full h-auto object-cover" />
                </div>
              )}
              
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none p-4 flex items-center gap-3">
               <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
               <span className="text-sm text-slate-400 animate-pulse">Syncing with Notebook Knowledge Graph...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/10 bg-slate-950">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {mode === 'image' ? (
              <ImageIcon className="w-5 h-5 text-purple-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-cyan-400" />
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'image' ? "Describe the visual you want to manifest..." : "Ask the Visionary Director for guidance..."}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-4 pl-12 pr-14 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-500"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg px-4 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="text-center mt-3 text-xs text-slate-600 font-mono">
           POWERED BY GEMINI 2.5 • NEXUS PROTOCOL v1.0.4
        </div>
      </div>
    </div>
  );
};

export default AIStudio;