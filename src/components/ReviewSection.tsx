'use client';

import React from 'react';
import { Star, ShieldCheck, CheckCircle2, UserCheck, Sparkles, MessageSquareQuote } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion } from 'motion/react';

interface Review {
  id: string;
  name: string;
  role: string;
  product: string;
  rating: number;
  timeAgo: string;
  comment: string;
  initials: string;
  avatarGrad: string;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Dimas Arya P.',
    role: 'Mahasiswa Teknik Informatika ITB',
    product: 'ChatGPT Plus (1 Bulan Sharing)',
    rating: 5,
    timeAgo: '15 menit yang lalu',
    comment:
      'Gokil prosesnya beneran rikat! Scan QRIS Pakasir pake BCA, langsung keluar email sama password + PIN profil di layar. Ga sampe 20 detik udah bisa dipake buat skripsi dan koding Python.',
    initials: 'DA',
    avatarGrad: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'rev-2',
    name: 'Sarah Nabila',
    role: 'Content Creator & Video Editor',
    product: 'CapCut Pro VIP Desktop & Mobile',
    rating: 5,
    timeAgo: '1 jam yang lalu',
    comment:
      'Fitur auto-caption sama remove background 4K kebuka semua di PC. Harganya miring banget dibanding beli kartu kredit resmi bulanan. YosPass penyelamat deadline konten!',
    initials: 'SN',
    avatarGrad: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'rev-3',
    name: 'Fajar Ramadhan',
    role: 'Data Analyst & AI Researcher',
    product: 'Gemini Advanced 18 Bulan',
    rating: 5,
    timeAgo: '3 jam yang lalu',
    comment:
      'Awalnya agak ragu paket 18 bulan semurah ini, ternyata langsung dapet akses Google One 2TB storage + Gemini 1.5 Pro 1 juta token. Garansi tertera jelas di invoice.',
    initials: 'FR',
    avatarGrad: 'from-purple-600 to-blue-700'
  },
  {
    id: 'rev-4',
    name: 'Bagas Prakoso',
    role: 'Freelance Designer',
    product: 'Netflix Premium 4K UHD Private',
    rating: 5,
    timeAgo: 'Kemarin',
    comment:
      'Beli akun private buat sekeluarga nonton di Smart TV ruang tamu. Bebas ganti password, profile 5 slot aman ga pernah kena household warning. Auto langganan terus di sini.',
    initials: 'BP',
    avatarGrad: 'from-rose-600 to-red-800'
  },
  {
    id: 'rev-5',
    name: 'Kevin Hendrawan',
    role: 'Full-stack Developer',
    product: 'Claude 3.5 Sonnet Pro',
    rating: 5,
    timeAgo: '2 hari yang lalu',
    comment:
      'Claude 3.5 Sonnet terbaik buat refactor kode dan generate React components. Kredensial akun aman sentosa, support live 24/7 beneran jalan.',
    initials: 'KH',
    avatarGrad: 'from-amber-600 to-orange-700'
  },
  {
    id: 'rev-6',
    name: 'Amanda Wijaya',
    role: 'UI/UX Designer',
    product: 'Spotify Premium Individual',
    rating: 5,
    timeAgo: '3 hari yang lalu',
    comment:
      'Audio lossless high-res tanpa jeda iklan pas lagi fokus desain. Murah meriah, proses tanpa antre WhatsApp, sat-set langsung dengerin lagu favorit.',
    initials: 'AW',
    avatarGrad: 'from-cyan-600 to-blue-800'
  }
];

export default function ReviewSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className="mt-16 pt-12 border-t transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm ${
              isLight
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Rating 4.9 / 5.0 • Dari 3.420+ Transaksi Terverifikasi</span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Ulasan Nyata Pelanggan YosPass
          </h2>
          <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Bukti kepuasan ribuan mahasiswa, kreator konten, desainer, dan profesional yang mengandalkan akun digital resmi otomatis kami.
          </p>
        </div>

        {/* Stats Summary Bar */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl mb-8 border shadow-sm transition-all ${
            isLight
              ? 'bg-white border-slate-200 shadow-slate-100 text-slate-900'
              : 'glass-panel border-white/[0.08] text-white'
          }`}
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-blue-600">3.420+</div>
            <div className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Pesanan Selesai
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-emerald-600">&lt; 30 Detik</div>
            <div className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Rata-rata Pengiriman
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-indigo-600">100%</div>
            <div className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Garansi Full Replace
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-amber-500">4.9 / 5.0</div>
            <div className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Skor Kepuasan
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300'
                  : 'glass-card border-white/[0.07] hover:border-blue-500/30'
              }`}
            >
              <div>
                {/* Top: Stars + Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isLight
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Pembeli Terverifikasi</span>
                  </div>
                </div>

                {/* Product Tag */}
                <div className="mb-2.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isLight
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-white/[0.06] text-slate-300'
                    }`}
                  >
                    {rev.product}
                  </span>
                </div>

                {/* Comment */}
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Bottom: Reviewer Profile */}
              <div
                className={`mt-4 pt-3 flex items-center justify-between border-t ${
                  isLight ? 'border-slate-100' : 'border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarGrad} text-white font-bold text-xs flex items-center justify-center shadow-sm`}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {rev.name}
                    </div>
                    <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {rev.role}
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {rev.timeAgo}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
