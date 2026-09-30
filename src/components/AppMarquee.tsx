'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import {
  ChatGPTLogo,
  GeminiLogo,
  NetflixLogo,
  CapCutLogo,
  SpotifyLogo,
  YouTubeLogo,
  ClaudeLogo
} from './BrandLogos';

interface MarqueeApp {
  name: string;
  badge: string;
  renderIcon: () => React.ReactNode;
}

const APPS: MarqueeApp[] = [
  {
    name: 'ChatGPT Plus & Pro',
    badge: 'OpenAI GPT-4o',
    renderIcon: () => <ChatGPTLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Gemini Advanced',
    badge: 'Google One 2TB',
    renderIcon: () => <GeminiLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Claude 3.5 Sonnet',
    badge: 'Anthropic AI',
    renderIcon: () => <ClaudeLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Netflix Premium 4K',
    badge: 'UHD & Spatial Audio',
    renderIcon: () => <NetflixLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'Spotify Premium',
    badge: 'High-Res Audio',
    renderIcon: () => <SpotifyLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'YouTube Premium',
    badge: 'No Ads & Music',
    renderIcon: () => <YouTubeLogo className="w-5 h-5 rounded-md" />
  },
  {
    name: 'CapCut Pro VIP',
    badge: 'Auto Caption & 4K',
    renderIcon: () => <CapCutLogo className="w-5 h-5 rounded-md" />
  }
];

export default function AppMarquee() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Double list for infinite seamless loop
  const duplicatedApps = [...APPS, ...APPS, ...APPS];

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
