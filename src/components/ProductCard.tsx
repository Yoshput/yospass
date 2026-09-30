'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { ArrowRight, Check } from 'lucide-react';
import { BrandIcon } from './BrandLogos';
import { motion } from 'motion/react';
import { useTheme } from './ThemeContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Find lowest price and original price for discount comparison
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const variantWithLowest = product.variants.find((v) => v.price === lowestPrice);
  const originalPrice = variantWithLowest?.originalPrice;

  // Calculate total available stock across variants
  const totalStock = product.variants.reduce((acc, curr) => acc + (curr.stockCount || 0), 0);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(product)}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
        isLight
          ? 'bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-8px_rgba(37,99,235,0.15)] hover:border-blue-400'
          : 'glass-card border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.05]'
      }`}
    >
      {/* Top row: Official Brand Icon + Badges */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform duration-300 ${
              isLight ? 'bg-slate-50 border border-slate-100' : 'bg-white/[0.04] border border-white/[0.08]'
            }`}
          >
            <BrandIcon name={product.title} className="w-8 h-8 rounded-lg object-contain" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {product.badge && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isLight
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                }`}
              >
                {product.badge}
              </span>
            )}
            {/* Live Stock indicator */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
              {totalStock > 0 ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>
                    {totalStock} Akun Siap
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  <span className="text-rose-500">Restock Segera</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <div className="mt-3.5">
          <h3
            className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-300'
            }`}
          >
            {product.title}
          </h3>
          <p
            className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
              isLight ? 'text-slate-600 font-medium' : 'text-slate-400'
            }`}
          >
            {product.tagline}
          </p>
        </div>

        {/* Variant chips preview */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {product.variants.slice(0, 3).map((v) => (
            <span
              key={v.id}
              className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                isLight
                  ? 'bg-slate-100 text-slate-700 border border-slate-200'
                  : 'bg-white/[0.04] text-slate-300 border border-white/[0.06]'
              }`}
            >
              {v.name.split('(')[0].trim()}
            </span>
          ))}
          {product.variants.length > 3 && (
            <span className={`text-[10px] px-1.5 py-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              +{product.variants.length - 3} paket
            </span>
          )}
        </div>
      </div>

      {/* Bottom row: Price & Action CTA */}
      <div
        className={`mt-5 pt-3.5 flex items-center justify-between border-t ${
          isLight ? 'border-slate-100' : 'border-white/[0.06]'
        }`}
      >
        <div>
          <span
            className={`text-[10px] uppercase tracking-wider block font-bold ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Mulai Dari
          </span>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-base sm:text-lg font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Rp {lowestPrice.toLocaleString('id-ID')}
            </span>
            {originalPrice && (
              <span
                className={`text-[11px] line-through ${
                  isLight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Rp {originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>

        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            isLight
              ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
              : 'bg-white/[0.08] text-white group-hover:bg-blue-600 group-hover:text-white'
          }`}
        >
          <span>Pilih Paket</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
