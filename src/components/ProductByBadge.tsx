'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function ProductByBadge() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
      <span className={`font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
        Product by
      </span>

      <a
        href="https://yossikaputra.my.id/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kunjungi Portfolio Resmi Yossika Putra Erlangga"
        className={`group inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all duration-300 shadow-sm ${
          isLight
            ? 'bg-slate-100 hover:bg-slate-200/90 border-slate-200 text-slate-800 shadow-slate-100'
            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] text-white shadow-black/40'
        }`}
      >
        {/* Author Avatar from portfolio webp */}
        <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-500/50 shadow-sm shrink-0">
          <img
            src="/author.webp"
            alt="Yossika Putra Erlangga"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <span className="font-bold tracking-tight text-xs">
          Yossika Putra
        </span>

        <span
          className={`text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-full ${
            isLight
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}
        >
          Dev
        </span>

        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors ml-0.5" />
      </a>

      {/* GitHub Direct Link */}
      <a
        href="https://github.com/Yoshput"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub @Yoshput"
        className={`p-1.5 rounded-full transition-colors ${
          isLight
            ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            : 'text-slate-400 hover:text-white hover:bg-white/10'
        }`}
        title="GitHub Yoshput"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </div>
  );
}
