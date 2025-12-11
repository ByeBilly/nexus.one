import React, { useState } from 'react';
import { Search, Book, StickyNote, Code, Star, Copy, ExternalLink, Zap, ArrowRight, Shield } from 'lucide-react';
import { INITIAL_LIBRARY_ITEMS } from '../constants';
import { LibraryItem } from '../types';

const Library: React.FC = () => {
  const [items, setItems] = useState<LibraryItem[]>(INITIAL_LIBRARY_ITEMS);
  const [filter, setFilter] = useState<'all' | 'official' | 'personal'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleUseNow = (content: string) => {
    navigator.clipboard.writeText(content);
    // In a real app, this might also dispatch an event to the Studio
    alert("PROTOCOL EQUIPPED: Content copied to clipboard. Paste into Notebook LLM or Studio to execute.");
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/30 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-slate-950/50 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" /> 
              The Arsenal
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-2">
              Forget slow courses. This is your instant capability library. 
              <span className="text-cyan-400 font-bold ml-1">Copy. Paste. Dominate.</span>
            </p>
          </div>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors">
            Request Protocol
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search weapons, protocols, or templates..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
          </div>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
            {(['all', 'official', 'personal'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm capitalize transition-all ${
                  filter === f 
                    ? 'bg-slate-700 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative bg-slate-800/50 border border-white/10 rounded-xl p-5 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${
                  item.type === 'notebook' ? 'bg-blue-900/30 text-blue-400' :
                  item.type === 'prompt' ? 'bg-purple-900/30 text-purple-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {item.type === 'notebook' && <Book className="w-5 h-5" />}
                  {item.type === 'prompt' && <Code className="w-5 h-5" />}
                  {item.type === 'note' && <StickyNote className="w-5 h-5" />}
                </div>
                <div className="flex gap-2">
                   {item.category === 'official' && (
                     <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded border border-yellow-500/20">
                       <Star className="w-3 h-3 fill-yellow-400" /> Elite Tier
                     </span>
                   )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              
              {/* Content Preview */}
              <div className="bg-slate-950/50 rounded-lg p-3 mb-4 h-24 overflow-hidden relative border border-white/5">
                 <p className="text-slate-400 text-sm font-mono whitespace-pre-wrap opacity-70">{item.content}</p>
                 <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded-md border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Footer */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
                <button 
                  onClick={() => handleUseNow(item.content)}
                  className="flex-1 bg-cyan-600/10 hover:bg-cyan-600 text-cyan-400 hover:text-white border border-cyan-600/50 hover:border-cyan-600 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  <Zap className="w-4 h-4" /> Equip
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                   <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {/* Contribution Card */}
          <div className="border border-dashed border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center text-slate-500 hover:border-slate-500 hover:text-slate-400 transition-colors cursor-pointer group">
             <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-slate-700 transition-colors">
               <Shield className="w-6 h-6" />
             </div>
             <p className="font-medium">Submit Your Protocol</p>
             <p className="text-xs mt-1 max-w-[150px]">Earn mining rewards for high-impact workflows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;