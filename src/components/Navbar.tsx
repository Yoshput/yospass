'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Sun, Moon } from 'lucide-react';
import { PremiuminLogo } from './BrandLogos';
import { motion } from 'motion/react';
import { useTheme } from './ThemeContext';
import ProductByBadge from './ProductByBadge';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-xl border-b ${
        isLight
          ? 'bg-white/95 border-slate-200/90 shadow-sm'
          : 'bg-[#060709]/95 border-white/[0.08] shadow-black/50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* YosPass Brand Monogram */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <PremiuminLogo className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className={`font-black text-sm sm:text-base tracking-tight transition-colors ${
                  isLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-300'
                }`}
              >
                YOS
              </span>
              <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-blue-600 text-white shadow-sm">
                PASS
              </span>
            </div>
            <p className={`text-[9px] sm:text-[10px] font-semibold hidden md:block -mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              The Purest Gateway to Premium Apps
            </p>
          </div>
        </Link>

        {/* Product by Yossika Putra - Top Navbar Badge matching reference screenshot */}
        <div className="flex items-center justify-center shrink-0">
          <ProductByBadge />
        </div>

        {/* Navigation & Theme Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Lacak Pesanan Button */}
          <Link
            href="/cek-pesanan"
            aria-label="Lacak Pesanan Akun Digital"
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200'
                : 'glass-button text-slate-200 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">Lacak Pesanan</span>
            <span className="sm:hidden text-xs">Lacak</span>
          </Link>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label={isLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang'}
            className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200'
                : 'glass-button text-slate-200 hover:text-white'
            }`}
            title={isLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang'}
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-blue-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
