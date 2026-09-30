'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import {
  ChatGPTLogo,
  GeminiLogo,
  ClaudeLogo,
  DeepSeekLogo,
  GrokLogo,
  PerplexityLogo,
  CanvaLogo,
  NetflixLogo,
  PrimeVideoLogo,
  CapCutLogo,
  WeTVLogo,
  IqiyiLogo,
  BstationLogo,
  ViuLogo,
  CrunchyrollLogo,
  QuillBotLogo,
  FreepikLogo,
  ScribdLogo,
  SpotifyLogo,
  YouTubeLogo,
  GrammarlyLogo,
  TradingViewLogo
} from './BrandLogos';

interface MarqueeApp {
  name: string;
  badge: string;
  renderIcon: () => React.ReactNode;
}

const APPS: MarqueeApp[] = [
  {
    name: 'ChatGPT Plus & Pro',
    badge: 'GPT-5 Astra & o1 Pro',
    renderIcon: () => <ChatGPTLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Claude 3.7 & Fable',
    badge: 'Sonnet 3.5 & Artifacts',
    renderIcon: () => <ClaudeLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'DeepSeek R1 & V3',
    badge: '671B Chain of Thought',
    renderIcon: () => <DeepSeekLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'xAI Grok 3 SuperGrok',
    badge: 'Uncensored & Real-time X',
    renderIcon: () => <GrokLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Perplexity Pro',
    badge: 'Claude & GPT-4o Search',
    renderIcon: () => <PerplexityLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Gemini Advanced 18M',
    badge: 'Google One 2TB & 2.0 Flash',
    renderIcon: () => <GeminiLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Canva Pro Designer',
    badge: 'Magic Studio AI & Brand Kit',
    renderIcon: () => <CanvaLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Netflix Premium 4K',
    badge: 'UHD & Spatial Audio',
    renderIcon: () => <NetflixLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Prime Video HDR',
    badge: 'Amazon Originals 4K',
    renderIcon: () => <PrimeVideoLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'CapCut Pro VIP',
    badge: 'Auto Caption & 4K 60FPS',
    renderIcon: () => <CapCutLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'WeTV VIP',
    badge: 'Drama Asia & Fast Track',
    renderIcon: () => <WeTVLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'iQIYI VIP Premium',
    badge: 'C-Drama & Anime 4K',
    renderIcon: () => <IqiyiLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Bstation Bilibili VIP',
    badge: 'Anime 4K 60fps & No Ads',
    renderIcon: () => <BstationLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Viu Premium',
    badge: 'Drakor Kilat 4 Jam',
    renderIcon: () => <ViuLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Crunchyroll Mega Fan',
    badge: 'Simulcast Anime Jepang',
    renderIcon: () => <CrunchyrollLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'QuillBot Premium',
    badge: 'Paraphrase Unlimited',
    renderIcon: () => <QuillBotLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Freepik Premium',
    badge: 'Vector & PSD Mockups',
    renderIcon: () => <FreepikLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Scribd / Everand',
    badge: 'Jutaan Ebook & Riset',
    renderIcon: () => <ScribdLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Spotify Premium',
    badge: 'High-Res 320kbps Audio',
    renderIcon: () => <SpotifyLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'YouTube Premium',
    badge: 'No Ads & Music Offline',
    renderIcon: () => <YouTubeLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Grammarly Premium',
    badge: 'Advanced AI Tone Rewrites',
    renderIcon: () => <GrammarlyLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'TradingView Pro',
    badge: 'Unlimited Chart Indicators',
    renderIcon: () => <TradingViewLogo className="w-5 h-5 rounded-md" />
  }
];

export default function AppMarquee() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Double list for infinite seamless loop
  const duplicatedApps = [...APPS, ...APPS];

  return (
    <div className="relative w-full py-4 overflow-hidden border-y transition-colors">
      <div
        className={`absolute inset-y-0 left-0 w-16 sm:w-28 z-10 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-r from-[#EFF6FF] via-[#EFF6FF]/70 to-transparent'
            : 'bg-gradient-to-r from-[#060709] via-[#060709]/70 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-16 sm:w-28 z-10 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-l from-[#EFF6FF] via-[#EFF6FF]/70 to-transparent'
            : 'bg-gradient-to-l from-[#060709] via-[#060709]/70 to-transparent'
        }`}
      />

      <div className="animate-marquee flex items-center gap-3">
        {duplicatedApps.map((app, index) => (
          <div
            key={index}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all duration-200 select-none shadow-sm ${
              isLight
                ? 'bg-white/90 border border-slate-200/90 text-slate-800 shadow-slate-100 hover:border-blue-300 hover:shadow-md'
                : 'glass-card border border-white/[0.08] text-slate-200 hover:border-blue-500/40 hover:text-white'
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              {app.renderIcon()}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight whitespace-nowrap">
                {app.name}
              </span>
              <span className={`text-[10px] font-medium leading-none ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {app.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
