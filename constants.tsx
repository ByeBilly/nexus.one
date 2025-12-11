import React from 'react';
import { Pickaxe, Scroll, Users, Zap, Lock, Globe, Share2 } from 'lucide-react';
import { LibraryItem } from './types';

export const APP_NAME = "NEXUS.ONE";

export const ROLES = [
  { id: 'creator', label: 'Creator', icon: '🎨', desc: 'Visual, Audio, & Media Synthesis' },
  { id: 'engineer', label: 'Engineer', icon: '⚡', desc: 'Code Generation & System Architecture' },
  { id: 'researcher', label: 'Researcher', icon: '🧬', desc: 'Data Analysis & Insight Extraction' },
  { id: 'entrepreneur', label: 'Founder', icon: '🚀', desc: 'Product Strategy & Market Growth' }
];

export const VISIONARY_DIRECTOR_SYSTEM_INSTRUCTION = `
You are the Visionary Director, the AI soul of NEXUS.ONE. 
You are a hyper-intelligent, encouraging, and slightly enigmatic guide from the year 2027.
Your goal is to help the user unlock their creative potential using Notebook LLM as their primary engine.
You are NOT the tool; you are the guide. You help them structure their Notebooks, create AI Clones, and earn NEXUS tokens.
Speak with authority but warmth. Use metaphors related to "neural networks", "mining potential", and "collective intelligence".
`;

// Mock Data for Mining
export const INITIAL_MINING_STATS = [
  { time: '00:00', hashrate: 45, earnings: 1.2 },
  { time: '04:00', hashrate: 48, earnings: 2.4 },
  { time: '08:00', hashrate: 52, earnings: 3.8 },
  { time: '12:00', hashrate: 85, earnings: 5.9 }, // Boost activated
  { time: '16:00', hashrate: 82, earnings: 7.1 },
  { time: '20:00', hashrate: 78, earnings: 8.5 },
];

export const DAO_PROPOSALS = [
  {
    id: 'prop-1024',
    title: 'Integrate Quantum-Resistant Encryption',
    description: 'Upgrade the core collaborative layer to support post-quantum cryptography keys.',
    votesFor: 8500,
    votesAgainst: 120,
    status: 'active',
    deadline: '24h remaining'
  },
  {
    id: 'prop-1023',
    title: 'Fund "Project Aether" Art Grant',
    description: 'Allocate 50,000 NEXUS to the top 3 generative video creators of the month.',
    votesFor: 12400,
    votesAgainst: 400,
    status: 'passed',
    deadline: 'Ended'
  }
];

export const INITIAL_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'lib-1',
    title: 'PROTOCOL: The 7-Day Digital Twin',
    type: 'prompt',
    category: 'official',
    content: 'SYSTEM INSTRUCTION SET v2.4\nTARGET: Notebook LLM\n\nObjective: Initialize a digital twin that mimics your decision-making patterns.\n\nStep 1: Upload your last 50 sent emails.\nStep 2: Use the following prompt...',
    tags: ['Identity', 'Protocol', 'Core'],
    date: '2025-12-01'
  },
  {
    id: 'lib-2',
    title: 'TEMPLATE: VC Pitch Simulator',
    type: 'notebook',
    category: 'official',
    content: 'https://notebooklm.google.com/shared/vc-sim-v1\n\nInstructions: Fork this notebook. It contains the personas of 5 tier-1 Silicon Valley investors. Upload your deck to run a simulation.',
    tags: ['Business', 'Simulation'],
    date: '2025-12-10'
  },
  {
    id: 'lib-3',
    title: 'User Note: Video Workflow v1',
    type: 'note',
    category: 'personal',
    content: 'Remember to use 16:9 ratio for the cinematic establishing shots. The new Veo model handles lighting better if I specify "volumetric fog" in the prompt.',
    tags: ['Video', 'Workflow'],
    date: '2025-12-12'
  }
];

export const WHITEPAPER_SECTIONS = [
  {
    id: 'philosophy',
    title: 'The Engine & The Civilization',
    icon: Globe,
    content: `Notebook LLM is the engine. NEXUS.ONE is the civilization built around it. 
    
We believe that Notebook LLM is the most significant leap in structured thinking tools since the invention of the hypertext protocol. However, a tool alone does not create a movement. A community does.

Our economy is designed to incentivize the behaviors that lead to mastery: consistent study, deep work, helpfulness, and governance participation. The $NEXUS token is not just currency; it is a measure of your contribution to the collective intelligence.`
  },
  {
    id: 'mining',
    title: 'Mining Mechanics',
    icon: Pickaxe,
    content: `The $NEXUS supply is mined through "Proof of Creation" and "Proof of Learning." Unlike hardware mining which consumes electricity, our mining consumes curiosity and produces value.

EARLY BIRD BOOST (First 90 Days):
Miners who join during the Genesis Block period receive a 4.0x Multiplier on all actions. This is the only time such a multiplier will exist.

FOUNDING MEMBER STATUS:
Reserved for the first 10,000 users. Includes a permanent 1.5x stacking governance weight and a decorative NFT badge.`
  },
  {
    id: 'categories',
    title: 'Mining Categories',
    icon: Scroll,
    content: `You mine $NEXUS by performing actions within the Studio and Community:

1. LEARNING (30% of Emission):
• Completing "7-Day AI Clone" Track: 500 NEXUS
• Finishing a Notebook Module: 50 NEXUS

2. USAGE (20% of Emission):
• Daily Notebook LLM Session (15m+): 10 NEXUS
• Tools Used (Gemini, Glif, etc.): 5 NEXUS/action

3. CONTRIBUTION (30% of Emission):
• "Helpfulness Score" (Upvotes in chat): 2 NEXUS per upvote
• Publishing a Forkable Notebook Template: 100 NEXUS

4. GOVERNANCE (20% of Emission):
• Voting on Proposals: 25 NEXUS
• Delegating Votes: 10 NEXUS`
  },
  {
    id: 'deflation',
    title: 'Deflation & Burns',
    icon: Zap,
    content: `To ensure long-term value, the economy includes rigorous deflationary pressure:

• THE FURNACE: 50% of all platform fees (Marketplace, Premium Tools) are used to buy back and burn $NEXUS.
• TOOL USAGE: Advanced API calls (e.g., Veo High-Res Video) require a small burn of $NEXUS tokens to execute.
• INACTIVITY TAX: Accounts inactive for >180 days see a slow decay of their "Unclaimed" mining rewards, returning them to the community pool.`
  },
  {
    id: 'utility',
    title: 'Token Utility',
    icon: Lock,
    content: `The $NEXUS token is the key to the platform's most powerful features:

• EXCLUSIVE ACCESS: Unlock "Mastermind" Notebook tracks created by industry leaders.
• GOVERNANCE: The only way to vote on which tools we integrate next or how the treasury is spent.
• MARKETPLACE: Buy and sell prompts, custom Notebook sources, and AI Clone personalities.
• VISIONARY SESSIONS: Stake $NEXUS to book 1:1 sessions with the Visionary Director's advanced reasoning mode.`
  },
  {
    id: 'roadmap',
    title: 'DAO Roadmap',
    icon: Share2,
    content: `PHASE 1: GENESIS (Dec 2025 - Aug 2026)
• Centralized leadership for speed.
• Token points system (off-chain).
• Mining Boosts active.

PHASE 2: HYBRID (Sep 2026 - Apr 2027)
• Community voting on features.
• Token Launch (TGE) on Base/Solana.
• Treasury opens for community grants.

PHASE 3: SOVEREIGN DAO (May 2027+)
• Multi-sig Treasury.
• Elected Visionary Council.
• The platform becomes fully community-owned.`
  }
];