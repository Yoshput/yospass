'use client';

import React from 'react';
import { Zap, ShieldCheck, Lock, CheckCircle2, QrCode, Headphones, RefreshCw, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion } from 'motion/react';

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
  badge: string;
  accentColor: string;
  bgLight: string;
  bgDark: string;
}

const BENEFITS: BenefitItem[] = [
  {
    icon: Zap,
    title: 'Pengiriman Otonom < 30 Detik',
    description:
      'Sistem webhook kami langsung mendeteksi pembayaran QRIS dari semua bank & e-wallet. Kredensial akun (email, password, PIN) langsung muncul di layar tanpa menunggu balasan admin.',
    badge: '100% Otomatis',
    accentColor: 'text-blue-500',
    bgLight: 'bg-blue-50 border-blue-200 text-blue-700',
    bgDark: 'bg-blue-500/10 border-blue-500/20 text-blue-400'
  },
  {
    icon: ShieldCheck,
    title: 'Garansi Penggantian Penuh',
    description:
      'Setiap akun dilindungi jaminan garansi penuh selama masa aktif. Jika terjadi logout tak terduga atau limit, klaim garansi 1-klik untuk menerima akun pengganti seketika.',
    badge: 'Garansi 30-365 Hari',
    accentColor: 'text-emerald-500',
    bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    bgDark: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
  },
  {
    icon: Lock,
    title: 'Akun Resmi & Profil Privat Ber-PIN',
    description:
      'Semua akun didaftarkan melalui langganan resmi (bukan metode carding ilegal). Varian sharing dilengkapi profil khusus ber-PIN 4 digit agar riwayat chat & tontonan Anda tetap privat.',
    badge: 'Privasi Terjamin',
    accentColor: 'text-indigo-500',
    bgLight: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    bgDark: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
  },
  {
    icon: Headphones,
    title: 'Layanan Mandiri 24/7 & Bantuan CS',
    description:
      'Beli kapan saja bahkan jam 2 malam sekalipun, sistem tetap melayani dan mengirimkan akun seketika. Tim customer support siap membantu via WhatsApp jika Anda butuh panduan khusus.',
    badge: 'Online 24 Jam',
    accentColor: 'text-amber-500',
    bgLight: 'bg-amber-50 border-amber-200 text-amber-700',
    bgDark: 'bg-amber-500/10 border-amber-500/20 text-amber-400'
  }
];

export default function BenefitSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className="mt-16 pt-12 border-t transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm ${
              isLight
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Keunggulan Platform YosPass</span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Kenapa Beli Akun Premium di YosPass?
          </h2>
          <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Dirancang dengan arsitektur e-commerce otonom untuk memberi pengalaman transaksi tercepat, termudah, dan teraman di Indonesia.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 shadow-sm ${
                  isLight
                    ? 'bg-white border-slate-200 hover:shadow-lg hover:border-blue-300'
                    : 'glass-card border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-inner ${
                        isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/[0.04] border border-white/[0.08]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${b.accentColor}`} />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isLight ? b.bgLight : b.bgDark
                      }`}
                    >
                      {b.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold tracking-tight mb-2 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {b.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {b.description}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3.5 flex items-center gap-1.5 text-[11px] font-bold border-t ${
                    isLight ? 'border-slate-100 text-blue-600' : 'border-white/[0.06] text-blue-400'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Standar Resmi Teruji</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
