'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, QrCode, Clock, CheckCircle2, ShieldCheck, Zap, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeContext';
import { useToast } from './ToastContext';

interface PaymentModalProps {
  orderData: {
    invoiceNumber: string;
    amount: number;
    productTitle: string;
    variantName: string;
    paymentMethod: string;
    qrisPayload?: string;
    qrImageUrl?: string;
    expiresAt: string;
  } | null;
  onClose: () => void;
}

export default function PaymentModal({ orderData, onClose }: PaymentModalProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const { toast } = useToast();
  const isLight = theme === 'light';

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [simulating, setSimulating] = useState(false);
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  useEffect(() => {
    if (!orderData) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [orderData]);

  if (!orderData) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSimulatePayment = async () => {
    try {
      setSimulating(true);
      const res = await fetch('/api/pay-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceNumber: orderData.invoiceNumber })
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Pembayaran berhasil dikonfirmasi! Mengalihkan ke dashboard akun...', 'Pembayaran Sukses');
        router.push(`/order/${orderData.invoiceNumber}`);
      } else {
        toast.error(json.error || 'Gagal memproses simulasi pembayaran', 'Simulasi Gagal');
        setSimulating(false);
      }
    } catch (e) {
      console.error(e);
      toast.error('Terjadi kesalahan koneksi server.', 'Koneksi Gagal');
      setSimulating(false);
    }
  };

  const copyInvoice = () => {
    navigator.clipboard.writeText(orderData.invoiceNumber);
    setCopiedInvoice(true);
    toast.success(`Invoice ${orderData.invoiceNumber} berhasil disalin ke clipboard!`, 'Tersalin');
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl text-center transition-colors ${
          isLight
            ? 'bg-white border border-slate-200 text-slate-900 shadow-slate-300/50'
            : 'glass-panel bg-[#0b0c11]/95 border-white/10 text-white'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup jendela pembayaran"
          className={`absolute right-4 top-4 p-1.5 rounded-full transition-colors cursor-pointer ${
            isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Tag */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isLight
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Menunggu Pembayaran QRIS Otomatis</span>
        </div>

        {/* Invoice & Product Info */}
        <div className="mt-3">
          <h2 className={`text-2xl font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
            Rp {orderData.amount.toLocaleString('id-ID')}
          </h2>
          <div className="flex items-center justify-center gap-1 text-xs mt-1">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>No. Tagihan:</span>
            <span className={`font-mono font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              {orderData.invoiceNumber}
            </span>
            <button
              onClick={copyInvoice}
              className={`ml-1 cursor-pointer ${isLight ? 'text-slate-400 hover:text-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              {copiedInvoice ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className={`text-xs font-semibold mt-1 ${isLight ? 'text-blue-600' : 'text-blue-300'}`}>
            {orderData.productTitle} • {orderData.variantName}
          </p>
        </div>

        {/* QR Code Presentation Box */}
        <div
          className={`mt-5 p-4 rounded-2xl max-w-[260px] mx-auto shadow-xl flex flex-col items-center border ${
            isLight ? 'bg-white border-slate-200/90 shadow-slate-200/60' : 'bg-[#0f1118] border-white/10 shadow-black/60'
          }`}
        >
          <div className="relative w-full aspect-square bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden border border-slate-200/80 shadow-inner">
            {orderData.qrImageUrl ? (
              <img
                src={orderData.qrImageUrl}
                alt="QRIS Pakasir Official"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : orderData.qrisPayload ? (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(orderData.qrisPayload)}&size=300x300&margin=8`}
                alt="QRIS Pakasir Official"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-slate-950 flex items-center justify-center">
                <span className="text-white font-mono text-xs">Generating QRIS...</span>
              </div>
            )}
          </div>
          <span
            className={`text-[11px] font-bold mt-2.5 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            Scan via BCA, Mandiri, GoPay, OVO, Shopee
          </span>
        </div>

        {/* Expiry Countdown */}
        <div
          className={`mt-4 flex items-center justify-center gap-1.5 text-xs ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Selesaikan pembayaran dalam</span>
          <span className="font-mono font-bold text-amber-600">{timeFormatted}</span>
        </div>

        {/* Automated Simulation Button */}
        <div className="mt-5 space-y-2">
          <button
            onClick={handleSimulatePayment}
            disabled={simulating}
            className="apple-btn-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            {simulating ? (
              <span>Memverifikasi Pembayaran...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Simulasikan Pembayaran Lunas (Coba Beli)</span>
              </>
            )}
          </button>
          <p className={`text-[10px] ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
            Kredensial login akun akan langsung muncul otomatis di layar setelah pembayaran diverifikasi.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
