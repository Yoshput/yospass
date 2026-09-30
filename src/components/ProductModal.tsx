'use client';

import React, { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types';
import { X, Check, ShieldCheck, Zap, QrCode, Phone, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { BrandIcon } from './BrandLogos';
import { motion } from 'motion/react';
import { useTheme } from './ThemeContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onProceedToPayment: (variant: ProductVariant, phone: string, email: string, method: string) => void;
  loading: boolean;
}

export default function ProductModal({
  product,
  onClose,
  onProceedToPayment,
  loading
}: ProductModalProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!product) return null;

  // Selected variant state (default to first variant)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'BCA_VA' | 'GOPAY'>('QRIS');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = () => {
    setErrorMsg('');
    if (!customerPhone || customerPhone.trim().length < 9) {
      setErrorMsg('Masukkan nomor WhatsApp yang aktif (minimal 9 digit).');
      return;
    }

    if ((selectedVariant.stockCount || 0) <= 0) {
      setErrorMsg('Maaf, varian yang dipilih sedang kehabisan stok.');
      return;
    }

    onProceedToPayment(selectedVariant, customerPhone.trim(), customerEmail.trim(), paymentMethod);
  };

  const isOutOfStock = (selectedVariant.stockCount || 0) <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md transition-opacity">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl z-10 transition-colors ${
          isLight
            ? 'bg-white border border-slate-200 text-slate-900 shadow-slate-300/50'
            : 'glass-panel bg-[#0b0c11]/95 border-white/10 text-white'
        }`}
      >
        {/* Top Header */}
        <div
          className={`flex items-start justify-between pb-4 border-b ${
            isLight ? 'border-slate-100' : 'border-white/[0.08]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 ${
                isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/[0.04] border border-white/[0.08]'
              }`}
            >
              <BrandIcon name={product.title} className="w-8 h-8 rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isLight ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                  }`}
                >
                  {product.category}
                </span>
                {product.badge && (
                  <span className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {product.badge}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                {product.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup dialog pilihan paket"
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Pilih Paket & Varian */}
        <div className="mt-5">
          <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            1. Pilih Varian &amp; Durasi
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.id === v.id;
              const hasStock = (v.stockCount || 0) > 0;

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? isLight
                        ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                        : 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10'
                      : isLight
                      ? 'bg-white border-slate-200 hover:bg-slate-50'
                      : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {v.name}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/5 text-slate-300'}`}>
                        {v.accountType === 'SHARING' ? 'Akun Sharing' : 'Akun Private'}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          hasStock
                            ? isLight ? 'text-emerald-700' : 'text-emerald-400'
                            : 'text-rose-500'
                        }`}
                      >
                        {hasStock ? `${v.stockCount} Akun Ready` : 'Habis'}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-3 pt-2 border-t flex items-baseline justify-between ${
                      isLight ? 'border-slate-100' : 'border-white/[0.05]'
                    }`}
                  >
                    <span className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Rp {v.price.toLocaleString('id-ID')}
                    </span>
                    {v.originalPrice && (
                      <span className={`text-[10px] line-through ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                        Rp {v.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Variant Features list */}
        {selectedVariant.features && selectedVariant.features.length > 0 && (
          <div
            className={`mt-4 p-3 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/[0.05]'
            }`}
          >
            <p className={`text-[11px] font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Fitur Paket Ini:
            </p>
            <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {selectedVariant.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. Informasi Pembeli */}
        <div className="mt-5 space-y-3">
          <label className={`text-xs font-bold uppercase tracking-wider block ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            2. Detail Pengiriman Kredensial
          </label>
          <div>
            <label className={`text-[11px] mb-1 block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Nomor WhatsApp <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="08123456789 (Untuk pengiriman bukti & kredensial)"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                  isLight
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                    : 'bg-white/[0.04] border border-white/10 text-white focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`text-[11px] mb-1 block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Email Pembeli <span className={isLight ? 'text-slate-400' : 'text-slate-500'}>(Opsional untuk backup)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                  isLight
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                    : 'bg-white/[0.04] border border-white/10 text-white focus:border-blue-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* 3. Metode Pembayaran */}
        <div className="mt-5">
          <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            3. Metode Pembayaran Instan
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('QRIS')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                paymentMethod === 'QRIS'
                  ? isLight
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                    : 'bg-blue-600/20 border-blue-500 text-white'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
              <span className="text-xs font-bold block">QRIS</span>
              <span className={`text-[9px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Instant 24/7</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('BCA_VA')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                paymentMethod === 'BCA_VA'
                  ? isLight
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                    : 'bg-blue-600/20 border-blue-500 text-white'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <span className="text-xs font-bold block">BCA VA</span>
              <span className={`text-[9px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Otomatis</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('GOPAY')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                paymentMethod === 'GOPAY'
                  ? isLight
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                    : 'bg-blue-600/20 border-blue-500 text-white'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-sky-500" />
              <span className="text-xs font-bold block">E-Wallet</span>
              <span className={`text-[9px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>GoPay/OVO</span>
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-rose-500 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Total & Action */}
        <div
          className={`mt-6 pt-4 border-t flex items-center justify-between ${
            isLight ? 'border-slate-100' : 'border-white/10'
          }`}
        >
          <div>
            <span className={`text-[11px] uppercase tracking-wider block font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Total Pembayaran
            </span>
            <span className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Rp {selectedVariant.price.toLocaleString('id-ID')}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || isOutOfStock}
            className={`apple-btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              loading || isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span>Memproses...</span>
            ) : isOutOfStock ? (
              <span>Stok Habis</span>
            ) : (
              <>
                <span>Lanjut Bayar</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
