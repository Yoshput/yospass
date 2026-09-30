'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Search, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { Order } from '@/lib/types';
import { BrandIcon } from '@/components/BrandLogos';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeContext';

export default function CekPesananPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    try {
      setLoading(true);
      setSearched(true);
      const res = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() })
      });
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col pb-16 transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white' : 'bg-[#060709] text-white selection:bg-blue-600 selection:text-white'
      }`}
    >
      <Navbar />

      <main className="max-w-2xl mx-auto w-full px-4 pt-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Search className="w-6 h-6" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Lacak Pesanan Akun
          </h1>
          <p className={`text-xs sm:text-sm mt-1.5 max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Masukkan nomor WhatsApp yang Anda gunakan saat checkout untuk melihat seluruh status pembayaran dan kredensial akun Anda.
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className={`p-4 rounded-2xl border shadow-xl ${
            isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'glass-panel border-white/10'
          }`}
        >
          <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            Nomor WhatsApp Pembeli
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 08123456789 atau 628123..."
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                  isLight
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600'
                    : 'bg-white/[0.04] border border-white/10 text-white focus:border-blue-500'
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="apple-btn-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>{loading ? 'Mencari...' : 'Lacak'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <div className="mt-8 space-y-3">
            {orders && orders.length > 0 ? (
              orders.map((o) => {
                const isPaid = o.status === 'PAID';
                return (
                  <motion.div
                    key={o.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border flex items-center justify-between gap-3 ${
                      isLight
                        ? 'bg-white border-slate-200 shadow-sm'
                        : 'glass-card border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-1.5 shrink-0 ${isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
                        <BrandIcon name={o.productTitle} className="w-7 h-7 rounded-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                            {o.invoiceNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isPaid
                                ? isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300'
                                : isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {isPaid ? 'LUNAS' : 'MENUNGGU BAYAR'}
                          </span>
                        </div>
                        <h4 className={`text-sm font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {o.productTitle} • {o.variantName}
                        </h4>
                        <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          Rp {o.amount.toLocaleString('id-ID')} • {new Date(o.createdAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`/order/${o.invoiceNumber}`}
                      className="apple-btn-primary px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm"
                    >
                      <span>Lihat Akun</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                );
              })
            ) : (
              <div
                className={`text-center py-10 p-4 rounded-2xl border ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-white/[0.06]'
                }`}
              >
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                  Tidak ada pesanan ditemukan
                </p>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Pastikan nomor telepon sama persis dengan yang Anda gunakan saat memesan.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
