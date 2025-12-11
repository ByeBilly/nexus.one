export enum AppView {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  STUDIO = 'STUDIO',
  COMMUNITY = 'COMMUNITY',
  MINING = 'MINING',
  DAO = 'DAO',
  LIBRARY = 'LIBRARY',
  ADMIN = 'ADMIN'
}

export interface UserState {
  name: string;
  role: string;
  nexusTokens: number;
  miningRate: number; // Tokens per hour
  isFoundingMember: boolean;
  onboardingComplete: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  imageUrl?: string;
  isThinking?: boolean;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  deadline: string;
}

export enum ModelType {
  TEXT = 'gemini-2.5-flash',
  REASONING = 'gemini-3-pro-preview',
  IMAGE = 'gemini-2.5-flash-image', // Using flash-image for generation as per prompt guidelines mapping
  VIDEO = 'veo-3.1-fast-generate-preview'
}

export interface MiningStat {
  time: string;
  hashrate: number;
  earnings: number;
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'notebook' | 'prompt' | 'note';
  category: 'official' | 'personal';
  content: string;
  tags: string[];
  date: string;
}