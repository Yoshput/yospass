'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import PaymentModal from '@/components/PaymentModal';
import { Product, ProductVariant } from '@/lib/types';
import { ShieldCheck, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '@/components/ThemeContext';

const CATEGORIES = [
  'Semua',
  'AI & Productivity',
  'Streaming & Movies',
  'Design & Creative',
  'Music & Audio'
];

export default function HomePage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderPaymentData, setOrderPaymentData] = useState<any>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by category & search query
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      activeCategory === 'Semua' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Handle checkout submit
  const handleProceedToPayment = async (
    variant: ProductVariant,
    phone: string,
    email: string,
    method: string
  ) => {
    try {
      setCheckoutLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId: variant.id,
          customerPhone: phone,
          customerEmail: email,
          paymentMethod: method
        })
      });

      const json = await res.json();
      if (json.success) {
        setSelectedProduct(null); // close product modal
        setOrderPaymentData(json.data); // open payment QRIS modal
      } else {
        alert(json.error || 'Gagal memulai pesanan');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white' : 'bg-[#060709] text-white selection:bg-blue-600 selection:text-white'
      }`}
    >
      {/* Floating Apple Cupertino Navbar */}
      <Navbar />

      {/* Hero & Search / Category Bar */}
      <Hero
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={CATEGORIES}
      />

      {/* Product Catalog Grid */}
      <main className="max-w-6xl mx-auto w-full px-4 pt-4 pb-16 flex-1">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {activeCategory === 'Semua' ? 'Katalog Layanan Siap Kirim' : activeCategory}
            </h2>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
              Pilih paket langganan untuk melihat rincian harga hemat dan stok real-time.
            </p>
          </div>
          <button
            onClick={fetchProducts}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Perbarui Stok</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-64 rounded-2xl animate-pulse ${
                  isLight ? 'bg-slate-200' : 'glass-card bg-white/[0.02]'
                }`}
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div
            className={`text-center py-16 px-4 rounded-3xl max-w-md mx-auto my-8 border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-card border-white/10'
            }`}
          >
            <p className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Layanan tidak ditemukan
            </p>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Coba gunakan kata kunci pencarian yang lain.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </motion.div>
        )}

        {/* Value Proposition Section */}
        <section
          className={`mt-16 pt-12 border-t ${
            isLight ? 'border-slate-200' : 'border-white/[0.08]'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2
              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Standar Layanan PremiuminAja
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
              Sistem otomatisasi penuh tanpa perantara manual, bebas antre, dan bergaransi resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className={`p-6 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'glass-card border-white/[0.06]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Auto-Delivery &lt; 30 Detik
              </h3>
              <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Begitu pembayaran QRIS terdeteksi lunas oleh webhook, kredensial akun langsung ditampilkan seketika di layar Anda.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'glass-card border-white/[0.06]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Garansi Full Replacement
              </h3>
              <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Seluruh pesanan dilindungi jaminan garansi penuh selama masa aktif berlangganan dengan penggantian akun otomatis.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'glass-card border-white/[0.06]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Akun Resmi &amp; Legal
              </h3>
              <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Setiap akun didaftarkan melalui saluran resmi yang terjamin keamanannya dan stabil untuk penggunaan harian.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-8 text-center text-xs safe-bottom transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#050608] border-white/[0.06] text-slate-500'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 YosPass. Platform Akun Premium Otomatis &amp; Tercepat.</p>
          <div className="flex items-center gap-4">
            <a
              href="/cek-pesanan"
              className={`transition-colors ${isLight ? 'text-slate-600 hover:text-blue-600' : 'text-slate-400 hover:text-white'}`}
            >
              Cek Pesanan
            </a>
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Layanan Online 24/7
            </span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProceedToPayment={handleProceedToPayment}
        loading={checkoutLoading}
      />

      <PaymentModal
        orderData={orderPaymentData}
        onClose={() => setOrderPaymentData(null)}
      />
    </div>
  );
}
