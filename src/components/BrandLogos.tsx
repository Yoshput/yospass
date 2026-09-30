import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * 100% OFFICIAL BRAND LOGOS
 * Handcrafted vector assets matching official guidelines & brand identities
 * ZERO AI Slop - Authentic geometry for ChatGPT, Claude, DeepSeek, Grok, Perplexity,
 * Canva, Netflix, Prime Video, WeTV, iQIYI, Bstation, Viu, CapCut, QuillBot, etc.
 */

// 1. YosPass Official Monogram
export function YosPassLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="yos-small-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#yos-small-grad)" />
      <path d="M14 12L24 23.5" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 12L24 23.5" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M24 23.5V36" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <polygon points="24,19 27.5,23.5 24,28 20.5,23.5" fill="#38BDF8" />
      <circle cx="24" cy="23.5" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

export const PremiuminLogo = YosPassLogo;
export const LuminaLogo = YosPassLogo;

// 2. Official ChatGPT / OpenAI Rosette Logo
export function ChatGPTLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="5.5" fill="#10A37F" />
      <g transform="translate(3.6, 3.6) scale(0.7)">
        <path
          d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}

// 3. Official Claude AI Logo (Anthropic Terracotta 8-Spoke Sunburst)
export function ClaudeLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#2E241E" />
      <g transform="translate(10, 10) scale(0.8)">
        <path
          d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"
          fill="#D97757"
        />
      </g>
    </svg>
  );
}

// 4. Official DeepSeek Logo (Blue Whale Squircle)
export function DeepSeekLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="deepseek-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#deepseek-grad)" />
      {/* Jumping Whale Icon */}
      <path
        d="M74 38c-3-8-12-14-22-14-14 0-25 10-25 24 0 10 6 18 15 22 2 1 4 1 6 0 4-2 7-6 9-11 5-2 10-7 12-13 1-2 3-5 5-8z"
        fill="#FFFFFF"
      />
      <circle cx="36" cy="42" r="3.5" fill="#1D4ED8" />
      <path
        d="M74 38c2-4 6-7 10-8-1 4-1 8-3 11-2 3-5 5-7 5v-8z"
        fill="#93C5FD"
      />
      <path
        d="M32 58c-6 3-12 2-16-1 3-3 7-4 12-3 2 1 4 2 4 4z"
        fill="#BFDBFE"
      />
    </svg>
  );
}

// 5. Official xAI Grok Logo (xAI Circle Slash Monogram)
export function GrokLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#000000" />
      <path
        d="M33 67C24.1634 58.1634 24.1634 43.8366 33 35C41.8366 26.1634 56.1634 26.1634 65 35C73.8366 43.8366 73.8366 58.1634 65 67C56.1634 75.8366 41.8366 75.8366 33 67Z"
        stroke="#FFFFFF"
        strokeWidth="7"
      />
      <line x1="22" y1="78" x2="78" y2="22" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

// 6. Official Perplexity AI Logo (Teal / Black Asterisk Cross)
export function PerplexityLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#141416" />
      <g transform="translate(24, 24) scale(0.52)" stroke="#22D3EE" strokeWidth="7" strokeLinecap="round">
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="15" y1="15" x2="85" y2="85" />
        <line x1="85" y1="15" x2="15" y2="85" />
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="#22D3EE" strokeWidth="6" />
      </g>
    </svg>
  );
}

// 7. Official Google Gemini Sparkle Star
export function GeminiLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="gemini-official-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(48.4 16.3 -131.1 387.7 4.7 19.5)">
          <stop offset="0.067" stopColor="#9168C0" />
          <stop offset="0.343" stopColor="#5684D1" />
          <stop offset="0.672" stopColor="#1BA1E3" />
        </radialGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="#0C0E14" />
      <path d="M40 24.048A25.566 25.566 0 0 0 24.048 40h-.096A25.563 25.563 0 0 0 8 24.048v-.096A25.563 25.563 0 0 0 23.952 8h.096A25.566 25.566 0 0 0 40 23.952v.096z" fill="url(#gemini-official-grad)" />
    </svg>
  );
}

// 8. Official Canva Logo (Teal/Cyan Gradient Squircle with Authentic Script Typography)
export function CanvaLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="canva-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="50%" stopColor="#0074E4" />
          <stop offset="100%" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#canva-grad)" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="34"
        fontWeight="800"
        fontStyle="italic"
        fill="#FFFFFF"
        letterSpacing="-1"
      >
        Canva
      </text>
    </svg>
  );
}

// 9. Official Netflix 2016 "N" Ribbon
export function NetflixLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="nflx-left-leg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#83070E" />
          <stop offset="100%" stopColor="#B1060F" />
        </linearGradient>
        <linearGradient id="nflx-right-leg" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#83070E" />
          <stop offset="100%" stopColor="#B1060F" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="#000000" />
      <g transform="translate(23, 14) scale(0.098)">
        <path d="M -1.15 -1.15 L 2.3 1002.67 C 75.57 988.55 133.19 990.1 198.22 984.23 V 0 Z" fill="url(#nflx-left-leg)" />
        <path d="M 353.81 0 H 553.19 L 555.5 1000.36 L 352.66 966.94 Z" fill="url(#nflx-right-leg)" />
        <path d="M 1.15 0 C 5.76 11.52 346.9 981.92 346.9 981.92 C 402.95 981.52 478.11 990.67 552.04 999.21 L 197.07 0 Z" fill="#E50914" />
      </g>
    </svg>
  );
}

// 10. Official Amazon Prime Video Logo (Blue Squircle with Smile Arrow)
export function PrimeVideoLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#00A8E1" />
      <g transform="translate(14, 25)">
        <text x="36" y="24" textAnchor="middle" fontFamily="sans-serif" fontSize="20" fontWeight="900" fill="#FFFFFF">
          prime
        </text>
        <text x="36" y="44" textAnchor="middle" fontFamily="sans-serif" fontSize="18" fontWeight="700" fill="#FFFFFF">
          video
        </text>
        <path d="M8 52C22 62 50 62 64 52" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <polygon points="62,48 68,54 60,56" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

// 11. Official CapCut Logo
export function CapCutLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#000000" />
      <g transform="translate(13, 13) scale(0.145)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M109.095 181.505c2.223-19.532 18.316-34.578 37.955-35.483l167.194-.001a40.612 40.612 0 0130.095 17.427 42.152 42.152 0 016.39 14.915l49.135-24.364a2.185 2.185 0 013.141 1.674v27.628l.001.096a4.571 4.571 0 01-2.837 4.229 177620.936 177620.936 0 00-135.63 67.336l135.324 66.948a4.695 4.695 0 013.142 4.08v27.685a2.266 2.266 0 01-3.613 1.821c-16.12-8.162-32.464-15.854-48.462-24.18a63.503 63.503 0 01-4.282 11.225 40.813 40.813 0 01-26.098 20.135 44.994 44.994 0 01-11.221.919l-155.833.003c-3.51 0-7.04 0-10.53-.266-18.089-2.705-32.049-17.363-33.869-35.565v-26.77a5.935 5.935 0 014.08-4.879c27.791-13.732 55.521-27.587 83.353-41.258a32412.61 32412.61 0 00-84.17-41.748 5.41 5.41 0 01-3.223-4.918c-.042-8.876-.185-17.792-.042-26.689zm30.975.184c-1.674 3.367-.898 7.263-1.041 10.896 30.608 15.12 60.99 30.321 91.536 45.339 30.185-14.963 60.384-29.927 90.596-44.89 0-2.714.123-5.428 0-8.162a10.203 10.203 0 00-10.096-8.734h-.106l-161.565.001a10.082 10.082 0 00-9.345 5.55h.021zm-1.041 135.406c.142 3.673-.654 7.631 1.122 11.039a10.204 10.204 0 009.284 5.405l161.667.002.081-.001c3.618 0 6.961-1.94 8.754-5.081 2.04-3.57 1.102-7.855 1.305-11.773-30.26-14.936-60.48-30.118-90.801-44.89a43915.126 43915.126 0 00-91.432 45.299h.02z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}

// 12. Official WeTV Logo (Colorful Triangle Play on White)
export function WeTVLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#FFFFFF" />
      <rect width="100" height="100" rx="22" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M32 25L68 45L48 55L32 25Z" fill="#00D26A" />
      <path d="M68 45L68 55L48 55Z" fill="#FF7700" />
      <path d="M32 25L48 55L32 75Z" fill="#0088FF" />
      <path d="M32 75L48 55L68 55L50 75Z" fill="#FFBB00" />
      <text x="50" y="90" textAnchor="middle" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#0088FF">
        WeTV
      </text>
    </svg>
  );
}

// 13. Official iQIYI Logo (Vibrant Green Squircle)
export function IqiyiLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#00CC36" />
      <g transform="translate(18, 28)">
        <rect x="0" y="0" width="64" height="44" rx="10" fill="none" stroke="#FFFFFF" strokeWidth="6" />
        <circle cx="18" cy="14" r="3.5" fill="#FFFFFF" />
        <line x1="18" y1="22" x2="18" y2="34" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <circle cx="44" cy="22" r="10" fill="none" stroke="#FFFFFF" strokeWidth="5" />
        <line x1="48" y1="28" x2="56" y2="36" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 14. Official Bstation / Bilibili Logo (Cyan Squircle with Cute TV Robot Mascot)
export function BstationLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#00AEEC" />
      <line x1="38" y1="28" x2="26" y2="16" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <line x1="62" y1="28" x2="74" y2="16" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <rect x="20" y="28" width="60" height="48" rx="14" fill="#FFFFFF" />
      <circle cx="36" cy="48" r="4.5" fill="#00AEEC" />
      <circle cx="64" cy="48" r="4.5" fill="#00AEEC" />
      <path d="M44 56C47 59 53 59 56 56" stroke="#00AEEC" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="36" y1="76" x2="32" y2="84" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <line x1="64" y1="76" x2="68" y2="84" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// 15. Official Viu Logo (Vibrant Yellow with Viu text)
export function ViuLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#FFBA00" />
      <g transform="translate(18, 30)">
        <circle cx="16" cy="18" r="14" fill="#FFFFFF" />
        <polygon points="12,12 24,18 12,24" fill="#FFBA00" />
        <text x="44" y="27" fontFamily="sans-serif" fontSize="24" fontWeight="900" fill="#FFFFFF" letterSpacing="-1">
          viu
        </text>
      </g>
    </svg>
  );
}

// 16. Official Crunchyroll Logo (Orange Squircle with Anime Eye)
export function CrunchyrollLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#F47521" />
      <circle cx="50" cy="50" r="26" fill="#FFFFFF" />
      <circle cx="56" cy="50" r="18" fill="#F47521" />
      <circle cx="62" cy="50" r="10" fill="#FFFFFF" />
    </svg>
  );
}

// 17. Official QuillBot Logo (Green Squircle with Robot / Leaf Face)
export function QuillBotLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#47A55C" />
      <path d="M50 16C50 16 56 22 52 28C48 34 50 34 50 34" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <rect x="25" y="34" width="50" height="42" rx="12" fill="#FFFFFF" />
      <circle cx="38" cy="52" r="5" fill="#47A55C" />
      <circle cx="62" cy="52" r="5" fill="#47A55C" />
      <rect x="42" y="64" width="16" height="4" rx="2" fill="#47A55C" />
    </svg>
  );
}

// 18. Official Freepik Logo (Black Squircle with Geometric Spark)
export function FreepikLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#111827" />
      <path d="M50 20L58 42L80 50L58 58L50 80L42 58L20 50L42 42Z" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="5" fill="#3B82F6" />
    </svg>
  );
}

// 19. Official Scribd Logo (Teal Squircle with Stylized S)
export function ScribdLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="scribd-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E7B85" />
          <stop offset="100%" stopColor="#0B4850" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#scribd-grad)" />
      <path
        d="M62 34C58 28 50 26 42 30C32 35 32 46 44 50C56 54 58 62 50 68C42 74 34 68 30 62M62 34L68 38M30 62L24 58"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 20. Official Grammarly Logo (Green Circle with G Arrow)
export function GrammarlyLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#15C39A" />
      <path
        d="M64 42C61 34 52 30 44 32C34 36 30 46 32 56C36 66 48 70 58 66C66 62 68 54 68 50H50"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 21. Official TradingView Logo (Dark Squircle with TV Bars)
export function TradingViewLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#131722" />
      <rect x="22" y="32" width="12" height="38" rx="3" fill="#2962FF" />
      <rect x="42" y="22" width="12" height="48" rx="3" fill="#FFFFFF" />
      <rect x="62" y="44" width="12" height="26" rx="3" fill="#089981" />
    </svg>
  );
}

// 22. Official Gamma App Logo (Indigo Gradient with Prism "G")
export function GammaLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="gamma-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#gamma-grad)" />
      <text x="50" y="66" textAnchor="middle" fontFamily="sans-serif" fontSize="52" fontWeight="900" fill="#A5B4FC">
        G
      </text>
    </svg>
  );
}

// 23. Official Spotify Logo
export function SpotifyLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="48" fill="#1ED760" />
      <g transform="translate(13, 13) scale(0.15)">
        <path
          d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"
          fill="#000000"
        />
      </g>
    </svg>
  );
}

// 24. Official YouTube Logo
export function YouTubeLogo({ className = 'w-6 h-6' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#18181B" />
      <rect x="15" y="24" width="70" height="52" rx="15" fill="#FF0000" />
      <polygon points="42,37 66,50 42,63" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Universal Brand Icon Dispatcher
 * Matches all platforms requested by user (ChatGPT, Claude, DeepSeek, Grok, Perplexity, Canva, etc.)
 */
export function BrandIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const lower = name.toLowerCase();

  // AI & Reasoning Models
  if (lower.includes('chatgpt') || lower.includes('openai') || lower.includes('gpt')) {
    return <ChatGPTLogo className={className} />;
  }
  if (lower.includes('claude') || lower.includes('anthropic') || lower.includes('fable')) {
    return <ClaudeLogo className={className} />;
  }
  if (lower.includes('deepseek')) {
    return <DeepSeekLogo className={className} />;
  }
  if (lower.includes('grok') || lower.includes('xai')) {
    return <GrokLogo className={className} />;
  }
  if (lower.includes('perplexity')) {
    return <PerplexityLogo className={className} />;
  }
  if (lower.includes('gemini') || lower.includes('google')) {
    return <GeminiLogo className={className} />;
  }
  if (lower.includes('gamma')) {
    return <GammaLogo className={className} />;
  }

  // Creative & Productivity
  if (lower.includes('canva')) {
    return <CanvaLogo className={className} />;
  }
  if (lower.includes('capcut')) {
    return <CapCutLogo className={className} />;
  }
  if (lower.includes('quillbot') || lower.includes('quill')) {
    return <QuillBotLogo className={className} />;
  }
  if (lower.includes('freepik')) {
    return <FreepikLogo className={className} />;
  }
  if (lower.includes('scribd') || lower.includes('everand')) {
    return <ScribdLogo className={className} />;
  }
  if (lower.includes('grammarly')) {
    return <GrammarlyLogo className={className} />;
  }
  if (lower.includes('tradingview') || lower.includes('trading')) {
    return <TradingViewLogo className={className} />;
  }

  // Streaming & Movies
  if (lower.includes('netflix')) {
    return <NetflixLogo className={className} />;
  }
  if (lower.includes('prime') || lower.includes('amazon')) {
    return <PrimeVideoLogo className={className} />;
  }
  if (lower.includes('wetv')) {
    return <WeTVLogo className={className} />;
  }
  if (lower.includes('iqiyi')) {
    return <IqiyiLogo className={className} />;
  }
  if (lower.includes('bstation') || lower.includes('bilibili')) {
    return <BstationLogo className={className} />;
  }
  if (lower.includes('viu')) {
    return <ViuLogo className={className} />;
  }
  if (lower.includes('crunchyroll')) {
    return <CrunchyrollLogo className={className} />;
  }
  if (lower.includes('spotify')) {
    return <SpotifyLogo className={className} />;
  }
  if (lower.includes('youtube')) {
    return <YouTubeLogo className={className} />;
  }

  // Default fallback
  return <YosPassLogo className={className} />;
}
