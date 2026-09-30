'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Order } from '@/lib/types';
import Navbar from '@/components/Navbar';
import confetti from 'canvas-confetti';
import { BrandIcon } from '@/components/BrandLogos';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeContext';
import { useToast } from '@/components/ToastContext';
import {
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Clock,
  RefreshCw,
  Info
} from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoice = params?.invoice as string;
  const { theme } = useTheme();
  const { toast } = useToast();
  const isLight = theme === 'light';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [warrantyClaimed, setWarrantyClaimed] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${invoice}`);
      const json = await res.json();
      if (json.success) {
        setOrder(json.data);
        if (json.data.status === 'PAID') {
          confetti({
            particleCount: 75,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      } else {
        setError(json.error || 'Pesanan tidak ditemukan');
      }
    } catch (err) {
      console.error(err);
      setError('Gagal memuat detail pesanan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invoice) {
      fetchOrder();
    }
  }, [invoice]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} berhasil disalin ke clipboard!`, 'Tersalin');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulateFromPending = async () => {
    try {
      setSimulating(true);
      const res = await fetch('/api/pay-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceNumber: invoice })
      });
      const json = await res.json();
      if (json.success) {
        setOrder(json.data);
        toast.success('Pembayaran QRIS Berhasil! Akun digital Anda telah aktif seketika.', 'Aktivasi Berhasil');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        toast.error(json.error || 'Gagal memproses simulasi pembayaran.', 'Simulasi Gagal');
      }
    } catch (e) {
      console.error(e);
      toast.error('Terjadi kesalahan jaringan.', 'Koneksi Gagal');
    } finally {
      setSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col ${isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#060709] text-white'}`}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-white/10'}`}>
            <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
            <span className="text-sm font-semibold">Memuat data pesanan...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={`min-h-screen flex flex-col ${isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#060709] text-white'}`}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className={`max-w-md w-full rounded-3xl p-6 text-center border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-white/10'}`}>
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold">Pesanan Tidak Ditemukan</h2>
            <p className={`text-xs mt-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Invoice <span className="font-mono font-bold">{invoice}</span> belum terdaftar di sistem.
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-5 py-2.5 rounded-xl apple-btn-primary text-xs font-semibold"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isPaid = order.status === 'PAID';
  const account = order.assignedAccount;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white' : 'bg-[#060709] text-white selection:bg-blue-600 selection:text-white'
      }`}
    >
      <Navbar />

      <main className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">
        {/* Navigation back */}
        <button
          onClick={() => router.push('/')}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-6 transition-colors cursor-pointer ${
            isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </button>

        {/* Order Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`p-6 rounded-3xl border mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isPaid
              ? isLight
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-emerald-500/[0.07] border-emerald-500/30'
              : isLight
              ? 'bg-amber-50 border-amber-200'
              : 'bg-amber-500/[0.07] border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isPaid
                  ? isLight ? 'bg-emerald-600 text-white' : 'bg-emerald-500/20 text-emerald-400'
                  : isLight ? 'bg-amber-500 text-white' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {isPaid ? <CheckCircle2 className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {order.invoiceNumber}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isPaid
                      ? isLight
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isLight
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {isPaid ? 'PEMBAYARAN LUNAS' : 'MENUNGGU PEMBAYARAN'}
                </span>
              </div>
              <h1 className={`text-lg sm:text-xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isPaid ? 'Pesanan Berhasil Diserahkan' : 'Selesaikan Pembayaran QRIS'}
              </h1>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isPaid
                  ? 'Kredensial login Anda telah di-generate secara otomatis dan siap digunakan.'
                  : 'Akun Anda sedang di-lock. Silakan bayar agar akun segera diserahkan.'}
              </p>
            </div>
          </div>

          {!isPaid && (
            <button
              onClick={handleSimulateFromPending}
              disabled={simulating}
              className="apple-btn-primary px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer shadow-md"
            >
              {simulating ? 'Memverifikasi...' : 'Simulasi Bayar Sekarang'}
            </button>
          )}
        </motion.div>

        {/* Unpaid QRIS Presentation Box */}
        {!isPaid && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 sm:p-8 rounded-3xl border mb-6 text-center shadow-lg transition-colors ${
              isLight ? 'bg-white border-slate-200/90 shadow-slate-200/50' : 'glass-panel bg-[#0d0e15] border-white/10'
            }`}
          >
            <div className="max-w-xs mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
                Pindai QRIS Resmi Pakasir
              </span>
              <div className="w-56 h-56 mx-auto bg-white rounded-2xl p-3 border border-slate-200 shadow-inner flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(order.qrisPayload || order.invoiceNumber)}&size=300x300&margin=8`}
                  alt="QRIS Pembayaran"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <p className={`text-xs mt-3 font-semibold ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Buka aplikasi BCA, Mandiri, GoPay, OVO, atau ShopeePay Anda untuk scan QRIS di atas.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-2 text-xs font-mono">
                <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Total:</span>
                <span className={`text-base font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Rp {order.amount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Credentials Box (Only if PAID) */}
        {isPaid && account && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-6 border transition-colors ${
              isLight
                ? 'bg-white border-blue-200 shadow-blue-100/50'
                : 'glass-panel bg-[#0d0e15] border-blue-500/30'
            }`}
          >
            <div className={`flex items-start justify-between pb-5 border-b ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 ${isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
                  <BrandIcon name={order.productTitle} className="w-8 h-8 rounded-lg" />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Kredensial Akun {order.productTitle}
                  </h2>
                  <p className={`text-xs font-semibold ${isLight ? 'text-blue-600' : 'text-blue-300'}`}>{order.variantName}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLight ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                Full Garansi 30 Hari
              </span>
            </div>

            {/* Email & Password Table */}
            <div className="mt-6 space-y-4">
              {/* Email / Username */}
              <div className={`p-4 rounded-2xl flex items-center justify-between border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Email / ID Login
                  </span>
                  <span className={`font-mono text-sm sm:text-base font-bold mt-0.5 block select-all ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {account.email}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(account.email, 'email')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isLight ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-bold">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Password */}
              <div className={`p-4 rounded-2xl flex items-center justify-between border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Kata Sandi (Password)
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`font-mono text-sm sm:text-base font-bold select-all ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {showPassword ? account.password : '••••••••••••••••'}
                    </span>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className={`cursor-pointer ml-1 ${isLight ? 'text-slate-400 hover:text-slate-700' : 'text-slate-400 hover:text-white'}`}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(account.password, 'password')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isLight ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {copiedField === 'password' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-bold">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Profile & PIN (if sharing account) */}
              {account.profileName && (
                <div className={`p-4 rounded-2xl flex items-center justify-between border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
                  <div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Nama Profil Khusus Anda
                    </span>
                    <span className={`text-sm sm:text-base font-bold mt-0.5 block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {account.profileName}
                    </span>
                  </div>
                  {account.profilePin && (
                    <div className="text-right">
                      <span className={`text-[10px] uppercase font-bold tracking-wider block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        PIN Profil
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-blue-600 mt-0.5 block">
                        {account.profilePin}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Important Instructions & Notes */}
              {account.additionalNotes && (
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${isLight ? 'bg-blue-50/70 border-blue-200 text-blue-900' : 'bg-blue-500/[0.06] border-blue-500/20 text-blue-200'}`}>
                  <span className="font-bold block text-blue-600 mb-1">Panduan Penggunaan Akun:</span>
                  {account.additionalNotes}
                </div>
              )}

              {/* Platform Login Guidance */}
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-white/[0.02] border-white/10 text-slate-300'}`}>
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className={`font-bold block mb-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>Informasi Login Platform:</span>
                  Jika platform resmi menampilkan pilihan login via link/kode, pastikan memilih opsi <span className="font-bold underline">"Masuk dengan Kata Sandi"</span>. Untuk simulasi demo tugas kuliah, kredensial di atas di-generate otomatis oleh sistem YosPass. Admin dapat memasukkan akun riil yang sudah terdaftar kapan saja melalui <span className="font-semibold text-blue-500">Vault Control Center</span>.
                </div>
              </div>
            </div>

            {/* Direct Login CTA */}
            <div className={`mt-6 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
              <a
                href={account.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-primary w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Buka Link Login Resmi</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setWarrantyClaimed(true)}
                disabled={warrantyClaimed}
                className={`w-full sm:w-auto px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                  warrantyClaimed
                    ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>
                  {warrantyClaimed ? 'Garansi Terverifikasi Otomatis' : 'Klaim Garansi Jika Ada Kendala'}
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Order Meta details */}
        <div className={`p-6 rounded-3xl border space-y-3 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-white/[0.06]'}`}>
          <h3 className={`text-sm font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Ringkasan Transaksi</h3>
          <div className="flex justify-between text-xs">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Nomor Invoice</span>
            <span className={`font-mono font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{order.invoiceNumber}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Layanan</span>
            <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{order.productTitle}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Varian</span>
            <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{order.variantName}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Metode Bayar</span>
            <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>WhatsApp Pembeli</span>
            <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{order.customerPhone}</span>
          </div>
          <div className={`flex justify-between text-xs pt-3 border-t ${isLight ? 'border-slate-100' : 'border-white/[0.06]'}`}>
            <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Total Bayar</span>
            <span className={`text-base font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
              Rp {order.amount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
