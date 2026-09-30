'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, QrCode, Clock, Search } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface HeroProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: string[];
}

export default function Hero({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categories
}: HeroProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`relative pt-8 pb-10 px-4 text-center overflow-hidden transition-all duration-300 ${
        isLight
          ? 'bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#EFF6FF] text-white'
          : 'bg-transparent text-white'
      }`}
    >
      {/* Dark Mode Ambient Radiance Glow */}
      {!isLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-gradient-to-tr from-blue-600/25 via-indigo-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      )}

      {/* Pill Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 backdrop-blur-md shadow-sm ${
          isLight
            ? 'bg-white/20 border border-white/30 text-white'
            : 'bg-white/[0.04] border border-white/10 text-slate-300'
        }`}
      >
        <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300/30" />
        <span>Self-Service Checkout • Pembelian Otomatis 24/7 Tanpa Antre</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12] drop-shadow-sm"
      >
        Akun Premium Resmi. <br className="hidden sm:block" />
        <span
          className={
            isLight
              ? 'text-white'
              : 'bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent'
          }
        >
          Beli Sekarang, Pakai Detik Ini Juga.
        </span>
      </motion.h1>

      {/* Subhead / Value Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-4 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${
          isLight ? 'text-blue-50 font-medium' : 'text-slate-400'
        }`}
      >
        Akses instan ChatGPT Plus/Pro, Google Gemini 18 Bulan, Netflix 4K, CapCut Pro, hingga Spotify.
        Bayar langsung via QRIS, kredensial login akun tampil seketika di layar dalam &lt; 30 detik.
      </motion.p>

      {/* Feature Badges Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs font-semibold"
      >
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-sm ${
            isLight
              ? 'bg-white/15 border border-white/25 text-white backdrop-blur-sm'
              : 'bg-white/[0.03] border border-white/[0.06] text-slate-300'
          }`}
        >
          <QrCode className="w-3.5 h-3.5 text-emerald-300" />
          <span>QRIS Semua Bank &amp; E-Wallet</span>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-sm ${
            isLight
              ? 'bg-white/15 border border-white/25 text-white backdrop-blur-sm'
              : 'bg-white/[0.03] border border-white/[0.06] text-slate-300'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-sky-200" />
          <span>Fulfillment Instan (0-30 Detik)</span>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-sm ${
            isLight
              ? 'bg-white/15 border border-white/25 text-white backdrop-blur-sm'
              : 'bg-white/[0.03] border border-white/[0.06] text-slate-300'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
          <span>Garansi Full Replacement</span>
        </div>
      </motion.div>

      {/* Search Input and Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 max-w-2xl mx-auto space-y-3.5"
      >
        {/* Apple Style Search Bar */}
        <div className="relative">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
              isLight ? 'text-slate-400' : 'text-slate-400'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari layanan (cth: ChatGPT, Gemini, Netflix, CapCut, Spotify, Claude)..."
            className={`w-full pl-11 pr-16 py-3.5 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none transition-all shadow-lg ${
              isLight
                ? 'bg-white text-slate-900 placeholder-slate-400 border border-slate-200/80 focus:ring-2 focus:ring-blue-600'
                : 'glass-panel text-white placeholder-slate-500 border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-inner'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded-lg transition-colors ${
                isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              Reset
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 no-scrollbar px-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-sm ${
                  isActive
                    ? isLight
                      ? 'bg-white text-blue-700 shadow-md font-extrabold'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : isLight
                    ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
