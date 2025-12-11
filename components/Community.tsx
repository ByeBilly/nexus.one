import React from 'react';
import { MessageSquare, Heart, Share2, Award } from 'lucide-react';

const Community: React.FC = () => {
  const posts = [
    {
      id: 1,
      author: 'Sarah Jenkins',
      role: 'Creator',
      time: '2h ago',
      content: 'Just finished the "Generative Cinema" track using the new Veo integration. The consistency in character design is unreal. Here is a still from the final project.',
      image: 'https://picsum.photos/800/450',
      likes: 243,
      comments: 42,
      miningBonus: 'Earned 50 NEXUS'
    },
    {
      id: 2,
      author: 'David Chen',
      role: 'Engineer',
      time: '4h ago',
      content: 'Released a new open-source template for automated workflow agents. It connects the Visionary Director API to your local Notion database. Check the "Tools" section!',
      likes: 512,
      comments: 89,
      miningBonus: 'Earned 120 NEXUS'
    }
  ];

  return (
    <div className="p-6 h-full overflow-y-auto max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Community Feed</h2>
        <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-full font-medium transition-colors">
          Create Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                {post.author[0]}
              </div>
              <div>
                <div className="text-white font-semibold flex items-center gap-2">
                  {post.author}
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">{post.role}</span>
                </div>
                <div className="text-xs text-slate-500">{post.time}</div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-xs font-mono text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full border border-yellow-500/20">
                 <Award className="w-3 h-3" />
                 {post.miningBonus}
              </div>
            </div>

            <p className="text-slate-300 mb-4 leading-relaxed">{post.content}</p>
            
            {post.image && (
              <div className="mb-4 rounded-xl overflow-hidden">
                <img src={post.image} alt="Post content" className="w-full h-auto" />
              </div>
            )}

            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
              <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-500 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
