'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  DollarSign,
  ShoppingCart,
  Boxes,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Key,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles,
  Package,
  Sun,
  Moon
} from 'lucide-react';
import { AdminStats, AccountInventory, Order, Product, ProductVariant } from '@/lib/types';
import { BrandIcon, YosPassLogo } from '@/components/BrandLogos';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/components/ThemeContext';

const ADMIN_PIN = '889922'; // Master Stealth PIN

export default function VaultControlCenter() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'inventory' | 'orders' | 'bulk'>('products');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<AccountInventory[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Filter & Search states
  const [inventoryFilter, setInventoryFilter] = useState<string>('ALL');
  const [searchProduct, setSearchProduct] = useState('');

  // Modals for CRUD
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isAddVariantOpen, setIsAddVariantOpen] = useState(false);
  const [targetProductId, setTargetProductId] = useState<string>('');

  // Add Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'AI & Productivity' | 'Streaming & Movies' | 'Design & Creative' | 'Music & Audio'>('AI & Productivity');
  const [newTagline, setNewTagline] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newBadge, setNewBadge] = useState('');
  const [newIcon, setNewIcon] = useState('OpenAI');
  const [newLoginUrl, setNewLoginUrl] = useState('');
  // First variant for new product
  const [varName, setVarName] = useState('1 Bulan Private');
  const [varAccountType, setVarAccountType] = useState<'SHARING' | 'PRIVATE'>('PRIVATE');
  const [varDuration, setVarDuration] = useState('1');
  const [varPrice, setVarPrice] = useState('');
  const [varOriginalPrice, setVarOriginalPrice] = useState('');
  const [varFeatures, setVarFeatures] = useState('Garansi Penuh 30 Hari, Akses Resmi, Instant Delivery');

  // Add Variant Form State
  const [newVarName, setNewVarName] = useState('');
  const [newVarType, setNewVarType] = useState<'SHARING' | 'PRIVATE'>('SHARING');
  const [newVarDuration, setNewVarDuration] = useState('1');
  const [newVarPrice, setNewVarPrice] = useState('');
  const [newVarOriginalPrice, setNewVarOriginalPrice] = useState('');
  const [newVarFeatures, setNewVarFeatures] = useState('');

  // Add Stock Form State
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [stockEmail, setStockEmail] = useState('');
  const [stockPassword, setStockPassword] = useState('');
  const [stockProfile, setStockProfile] = useState('');
  const [stockPin, setStockPin] = useState('');
  const [stockNotes, setStockNotes] = useState('');

  // Bulk Stock State
  const [bulkVariantId, setBulkVariantId] = useState('');
  const [bulkText, setBulkText] = useState('');

  // Password visibility map
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: string]: boolean }>({});

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Check session storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('yospass_vault_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === 'admin123' || pinInput === 'yospass2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('yospass_vault_auth', 'true');
      setPinError('');
      fetchDashboardData();
    } else {
      setPinError('PIN Otorisasi salah. Akses ditolak.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('yospass_vault_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [resStats, resProd] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/products')
      ]);

      const jsonStats = await resStats.json();
      const jsonProd = await resProd.json();

      if (jsonStats.success) {
        setStats(jsonStats.data.stats);
        setInventory(jsonStats.data.inventory);
        setOrders(jsonStats.data.orders);
      }

      if (jsonProd.success) {
        setProducts(jsonProd.data);
        if (jsonProd.data.length > 0 && jsonProd.data[0].variants.length > 0) {
          if (!selectedVariantId) setSelectedVariantId(jsonProd.data[0].variants[0].id);
          if (!bulkVariantId) setBulkVariantId(jsonProd.data[0].variants[0].id);
        }
      }
    } catch (e) {
      console.error(e);
      notify('Gagal menyinkronkan data vault', 'error');
    } finally {
      setLoading(false);
    }
  };

  // CREATE PRODUCT
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !varPrice) {
      notify('Judul dan harga varian awal wajib diisi', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          tagline: newTagline || `Akun ${newTitle} resmi bergaransi`,
          description: newDescription || `Akun ${newTitle} resmi dengan serah terima otomatis.`,
          badge: newBadge,
          icon: newIcon,
          loginUrl: newLoginUrl || 'https://google.com',
          variants: [
            {
              name: varName,
              accountType: varAccountType,
              durationMonths: Number(varDuration) || 1,
              price: Number(varPrice),
              originalPrice: Number(varOriginalPrice) || Number(varPrice) * 1.5,
              features: varFeatures ? varFeatures.split(',').map((s) => s.trim()) : ['Garansi Penuh', 'Instant Delivery']
            }
          ]
        })
      });

      const json = await res.json();
      if (json.success) {
        notify('Layanan baru berhasil ditambahkan!');
        setIsAddProductOpen(false);
        // reset form
        setNewTitle('');
        setNewTagline('');
        setVarPrice('');
        fetchDashboardData();
      } else {
        notify(json.error || 'Gagal membuat produk', 'error');
      }
    } catch (e) {
      notify('Terjadi kesalahan koneksi', 'error');
    }
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingProduct.title,
          category: editingProduct.category,
          tagline: editingProduct.tagline,
          description: editingProduct.description,
          badge: editingProduct.badge,
          icon: editingProduct.icon,
          loginUrl: editingProduct.loginUrl
        })
      });

      const json = await res.json();
      if (json.success) {
        notify('Informasi layanan berhasil diperbarui!');
        setIsEditProductOpen(false);
        setEditingProduct(null);
        fetchDashboardData();
      } else {
        notify(json.error || 'Gagal update produk', 'error');
      }
    } catch (e) {
      notify('Terjadi kesalahan koneksi', 'error');
    }
  };

  // DELETE PRODUCT
  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Hapus layanan "${title}" beserta seluruh varian dan stok akunnya?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        notify(`Layanan "${title}" telah dihapus.`);
        fetchDashboardData();
      }
    } catch (e) {
      notify('Gagal menghapus produk', 'error');
    }
  };

  // CREATE VARIANT
  const handleCreateVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProductId || !newVarName || !newVarPrice) {
      notify('Lengkapi data varian', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: targetProductId,
          name: newVarName,
          accountType: newVarType,
          durationMonths: Number(newVarDuration) || 1,
          price: Number(newVarPrice),
          originalPrice: Number(newVarOriginalPrice) || Number(newVarPrice) * 1.5,
          features: newVarFeatures ? newVarFeatures.split(',').map((s) => s.trim()) : ['Garansi Penuh']
        })
      });

      const json = await res.json();
      if (json.success) {
        notify('Varian baru berhasil ditambahkan!');
        setIsAddVariantOpen(false);
        setNewVarName('');
        setNewVarPrice('');
        fetchDashboardData();
      } else {
        notify(json.error || 'Gagal menambah varian', 'error');
      }
    } catch (e) {
      notify('Terjadi kesalahan koneksi', 'error');
    }
  };

  // DELETE VARIANT
  const handleDeleteVariant = async (productId: string, variantId: string) => {
    if (!confirm('Hapus varian ini? Stok yang terkait akan ikut terhapus.')) return;

    try {
      const res = await fetch(`/api/admin/variants?productId=${productId}&variantId=${variantId}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        notify('Varian berhasil dihapus.');
        fetchDashboardData();
      }
    } catch (e) {
      notify('Gagal menghapus varian', 'error');
    }
  };

  // ADD SINGLE STOCK
  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariantId || !stockEmail || !stockPassword) {
      notify('Pilih varian, isi email dan password', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId: selectedVariantId,
          email: stockEmail,
          password: stockPassword,
          profileName: stockProfile,
          profilePin: stockPin,
          notes: stockNotes
        })
      });

      const json = await res.json();
      if (json.success) {
        notify('Akun baru berhasil ditambahkan ke inventaris ready!');
        setStockEmail('');
        setStockPassword('');
        setStockProfile('');
        setStockPin('');
        fetchDashboardData();
      } else {
        notify(json.error || 'Gagal menambah akun', 'error');
      }
    } catch (e) {
      notify('Terjadi kesalahan koneksi', 'error');
    }
  };

  // BULK STOCK IMPORT
  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkVariantId || !bulkText.trim()) {
      notify('Pilih varian dan isi data akun', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/stock/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId: bulkVariantId,
          rawData: bulkText
        })
      });

      const json = await res.json();
      if (json.success) {
        notify(json.message);
        setBulkText('');
        fetchDashboardData();
      } else {
        notify(json.error || 'Gagal bulk import', 'error');
      }
    } catch (e) {
      notify('Terjadi kesalahan koneksi', 'error');
    }
  };

  // DELETE INVENTORY ITEM
  const handleDeleteInventory = async (id: string) => {
    if (!confirm('Hapus akun ini dari database inventaris?')) return;

    try {
      const res = await fetch(`/api/admin/stock/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        notify('Akun berhasil dihapus dari inventaris.');
        fetchDashboardData();
      }
    } catch (e) {
      notify('Gagal menghapus stok', 'error');
    }
  };

  // SIMULATE PAYMENT FROM ADMIN
  const handleAdminSimulatePay = async (invoiceNumber: string) => {
    try {
      const res = await fetch('/api/pay-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceNumber })
      });
      const json = await res.json();
      if (json.success) {
        notify(`Pesanan ${invoiceNumber} telah dilunaskan dan akun diserahkan!`);
        fetchDashboardData();
      }
    } catch (e) {
      notify('Gagal memproses pembayaran', 'error');
    }
  };

  // TOGGLE PASSWORD VISIBILITY
  const togglePassVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // If not authenticated, render Stealth PIN Gate
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
          isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#040507] text-white'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-md w-full rounded-3xl p-8 border shadow-2xl text-center transition-all ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-slate-200/60 text-slate-900'
              : 'glass-panel bg-[#090a10]/95 border-white/10 shadow-black/80 text-white'
          }`}
        >
          {/* Top Theme Switcher on Gate */}
          <div className="flex justify-end mb-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4 text-blue-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          </div>

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
              isLight ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
            }`}
          >
            <Lock className="w-7 h-7" />
          </div>

          <h1 className={`text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Stealth Vault Access
          </h1>
          <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Portal administratif YosPass dienkripsi. Masukkan Master PIN Otorisasi untuk membuka kontrol inventaris &amp; layanan.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN (Default: 889922)"
                autoFocus
                className={`w-full text-center tracking-widest text-lg font-mono py-3 rounded-xl border focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white'
                    : 'bg-white/[0.04] border-white/10 text-white placeholder-slate-600 focus:border-blue-500'
                }`}
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-500 flex items-center justify-center gap-1 font-medium">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{pinError}</span>
              </p>
            )}

            <button
              type="submit"
              className="apple-btn-primary w-full py-3 rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-blue-500/20"
            >
              Buka Kunci Vault
            </button>

            <p className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              URL ini tidak ditautkan di halaman publik untuk mencegah probing &amp; scraping.
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  // Filtered inventory
  const filteredInventory = inventory.filter((inv) => {
    if (inventoryFilter === 'ALL') return true;
    return inv.status === inventoryFilter;
  });

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white'
          : 'bg-[#050608] text-white selection:bg-blue-600 selection:text-white'
      }`}
    >
      {/* Vault Top Bar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b px-4 py-3 transition-colors ${
          isLight
            ? 'bg-white/95 border-slate-200/90 shadow-xs'
            : 'bg-[#08090e]/95 border-white/[0.08] shadow-black/50'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <YosPassLogo className="w-7 h-7" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-sm font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  YOSPASS VAULT CONTROL
                </h1>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  STEALTH ACTIVE
                </span>
              </div>
              <p className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Enterprise Product &amp; Fulfillment Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang'}
              className={`p-2 rounded-xl transition-all cursor-pointer border ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200/90 text-slate-700 border-slate-200'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10'
              }`}
              title={isLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang'}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-blue-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Refresh Button */}
            <button
              onClick={fetchDashboardData}
              className={`p-2 rounded-xl transition-all cursor-pointer border ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200/90 text-slate-700 border-slate-200'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10'
              }`}
              title="Perbarui Data Real-time"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Lock / Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 text-xs font-bold transition-colors cursor-pointer border border-rose-500/20"
            >
              Kunci Vault
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 right-4 z-50 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto w-full px-4 py-6 space-y-6 flex-1">
        {/* Metric Overview Row */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200/90 shadow-sm shadow-slate-100'
                  : 'glass-card border-white/[0.06]'
              }`}
            >
              <div className={`flex items-center justify-between text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Total Omzet Lunas</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <p className={`text-xl sm:text-2xl font-black mt-2 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Rp {stats.totalRevenue.toLocaleString('id-ID')}
              </p>
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200/90 shadow-sm shadow-slate-100'
                  : 'glass-card border-white/[0.06]'
              }`}
            >
              <div className={`flex items-center justify-between text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Total Pesanan Masuk</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <p className={`text-xl sm:text-2xl font-black mt-2 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {stats.totalOrders}{' '}
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">({stats.paidOrders} Lunas)</span>
              </p>
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200/90 shadow-sm shadow-slate-100'
                  : 'glass-card border-white/[0.06]'
              }`}
            >
              <div className={`flex items-center justify-between text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Stok Akun Ready</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Boxes className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
              <p className={`text-xl sm:text-2xl font-black mt-2 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {stats.availableStock}{' '}
                <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Akun</span>
              </p>
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200/90 shadow-sm shadow-slate-100'
                  : 'glass-card border-white/[0.06]'
              }`}
            >
              <div className={`flex items-center justify-between text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Total Akun Terjual</span>
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                </div>
              </div>
              <p className={`text-xl sm:text-2xl font-black mt-2 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {stats.soldStock}{' '}
                <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Diserahkan</span>
              </p>
            </div>
          </div>
        )}

        {/* Tab Navigation Controls */}
        <div
          className={`flex items-center gap-1.5 p-1.5 rounded-2xl border overflow-x-auto no-scrollbar transition-colors ${
            isLight
              ? 'bg-slate-200/70 border-slate-300/80 shadow-inner'
              : 'bg-white/[0.03] border-white/[0.08]'
          }`}
        >
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Katalog &amp; Varian Layanan ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'inventory'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Kelola Inventaris Akun ({inventory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Pesanan &amp; Transaksi ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'bulk'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-white/80'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Import Massal (Bulk Stock)</span>
          </button>
        </div>

        {/* ================= TAB 1: PRODUCT & VARIANT CRUD ================= */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Daftar Layanan Digital
                </h2>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Tambah layanan baru, atur varian (durasi, private/sharing), dan ubah harga secara real-time.
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="apple-btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Layanan Baru</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    isLight
                      ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                      : 'glass-card border-white/[0.08]'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className={`flex items-start justify-between gap-2 pb-3 border-b ${isLight ? 'border-slate-100' : 'border-white/[0.06]'}`}>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center p-1.5 border ${
                            isLight
                              ? 'bg-slate-100 border-slate-200/80 shadow-xs'
                              : 'bg-white/[0.04] border-white/[0.08]'
                          }`}
                        >
                          <BrandIcon name={p.title} className="w-7 h-7 rounded-lg" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                isLight
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                                  : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                              }`}
                            >
                              {p.category}
                            </span>
                            {p.badge && (
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                                  isLight
                                    ? 'bg-slate-100 text-slate-600 border border-slate-200'
                                    : 'bg-white/5 text-slate-400 border border-white/10'
                                }`}
                              >
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <h3 className={`text-base font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {p.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsEditProductOpen(true);
                          }}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isLight
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                          }`}
                          title="Edit Info Produk"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.title)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 transition-colors cursor-pointer"
                          title="Hapus Layanan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {p.tagline}
                    </p>

                    {/* Variants list */}
                    <div className="mt-4 space-y-2">
                      <div className={`flex items-center justify-between text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <span>Varian &amp; Harga Paket:</span>
                        <button
                          onClick={() => {
                            setTargetProductId(p.id);
                            setIsAddVariantOpen(true);
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Varian</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {p.variants.map((v) => (
                          <div
                            key={v.id}
                            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                              isLight
                                ? 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-100/60'
                                : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                  {v.name}
                                </span>
                                <span
                                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                    v.accountType === 'PRIVATE'
                                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20'
                                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20'
                                  }`}
                                >
                                  {v.accountType}
                                </span>
                              </div>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                Stok: {v.stockCount ?? 0} Akun Ready
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={`font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                Rp {v.price.toLocaleString('id-ID')}
                              </span>
                              <button
                                onClick={() => handleDeleteVariant(p.id, v.id)}
                                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer p-1"
                                title="Hapus Varian"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-[10px] font-mono ${
                      isLight ? 'border-slate-100 text-slate-400' : 'border-white/[0.05] text-slate-500'
                    }`}
                  >
                    <span>slug: {p.slug}</span>
                    <span className="truncate max-w-[200px]">login: {p.loginUrl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INVENTORY MANAGEMENT ================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Quick Add Single Stock Card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'glass-card border-white/[0.08]'
              }`}
            >
              <h3 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Tambah Akun Tunggal ke Stok
              </h3>
              <p className={`text-xs mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Masukkan detail akun yang baru dibeli/di-generate untuk langsung siap auto-deliver ke pembeli.
              </p>

              <form onSubmit={handleAddStock} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className={`text-[11px] font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Target Varian Layanan
                  </label>
                  <select
                    value={selectedVariantId}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white focus:border-blue-500'
                    }`}
                  >
                    {products.map((prod) => (
                      <optgroup key={prod.id} label={prod.title} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                        {prod.variants.map((v) => (
                          <option key={v.id} value={v.id} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                            {prod.title} - {v.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Email / ID Login
                  </label>
                  <input
                    type="text"
                    value={stockEmail}
                    onChange={(e) => setStockEmail(e.target.value)}
                    placeholder="email@akun.com"
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Password
                  </label>
                  <input
                    type="text"
                    value={stockPassword}
                    onChange={(e) => setStockPassword(e.target.value)}
                    placeholder="PasswordRahasia123!"
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Nama Profil (Opsional Sharing)
                  </label>
                  <input
                    type="text"
                    value={stockProfile}
                    onChange={(e) => setStockProfile(e.target.value)}
                    placeholder="Profil 2"
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    PIN Profil (Opsional Sharing)
                  </label>
                  <input
                    type="text"
                    value={stockPin}
                    onChange={(e) => setStockPin(e.target.value)}
                    placeholder="8821"
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="apple-btn-primary w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    + Simpan ke Stok Ready
                  </button>
                </div>
              </form>
            </div>

            {/* Inventory List Table */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'glass-card border-white/[0.08]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Daftar Akun Inventaris
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Total {inventory.length} akun tercatat di database vault.
                  </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-1.5">
                  {['ALL', 'AVAILABLE', 'SOLD', 'RESERVED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setInventoryFilter(st)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                        inventoryFilter === st
                          ? 'bg-blue-600 text-white'
                          : isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st === 'ALL' ? 'Semua' : st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b ${isLight ? 'border-slate-200 text-slate-500 font-bold' : 'border-white/10 text-slate-400'}`}>
                      <th className="pb-2.5">Email / Akun</th>
                      <th className="pb-2.5">Password</th>
                      <th className="pb-2.5">Profil / PIN</th>
                      <th className="pb-2.5">Status</th>
                      <th className="pb-2.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-slate-100 text-slate-800' : 'divide-white/[0.05] text-slate-200'}`}>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className={isLight ? 'hover:bg-slate-50/80 transition-colors' : 'hover:bg-white/[0.02] transition-colors'}>
                        <td className={`py-3 font-mono font-medium select-all ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {item.email}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1 font-mono">
                            <span>
                              {visiblePasswords[item.id] ? item.password : '••••••••••••'}
                            </span>
                            <button
                              onClick={() => togglePassVisibility(item.id)}
                              className={`p-1 rounded transition-colors ${
                                isLight ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-slate-300'
                              }`}
                              title={visiblePasswords[item.id] ? 'Sembunyikan' : 'Tampilkan Password'}
                            >
                              {visiblePasswords[item.id] ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-3">
                          {item.profileName ? (
                            <span className="font-medium">
                              {item.profileName} {item.profilePin && `(PIN: ${item.profilePin})`}
                            </span>
                          ) : (
                            <span className={isLight ? 'text-slate-400' : 'text-slate-500'}>-</span>
                          )}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === 'AVAILABLE'
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : item.status === 'SOLD'
                                ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteInventory(item.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 transition-colors cursor-pointer"
                            title="Hapus dari stok"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div
            className={`p-6 rounded-2xl border space-y-4 transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'glass-card border-white/[0.08]'
            }`}
          >
            <div>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Riwayat Transaksi Masuk
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Semua invoice yang dibuat pembeli secara mandiri di halaman katalog.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b ${isLight ? 'border-slate-200 text-slate-500 font-bold' : 'border-white/10 text-slate-400'}`}>
                    <th className="pb-2.5">Invoice</th>
                    <th className="pb-2.5">Layanan &amp; Varian</th>
                    <th className="pb-2.5">WhatsApp Pembeli</th>
                    <th className="pb-2.5">Nominal</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5 text-right">Aksi Vault</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/[0.05]'}`}>
                  {orders.map((ord) => {
                    const isPaid = ord.status === 'PAID';
                    return (
                      <tr key={ord.id} className={isLight ? 'hover:bg-slate-50/80 transition-colors' : 'hover:bg-white/[0.02] transition-colors'}>
                        <td className="py-3 font-mono font-bold">
                          <a
                            href={`/order/${ord.invoiceNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 font-bold"
                          >
                            <span>{ord.invoiceNumber}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </td>
                        <td className="py-3">
                          <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>{ord.productTitle}</span>
                          <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{ord.variantName}</span>
                        </td>
                        <td className={`py-3 font-mono font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{ord.customerPhone}</td>
                        <td className={`py-3 font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          Rp {ord.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isPaid
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          {!isPaid ? (
                            <button
                              onClick={() => handleAdminSimulatePay(ord.invoiceNumber)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                            >
                              Tandai Lunas
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Selesai</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: BULK STOCK IMPORT ================= */}
        {activeTab === 'bulk' && (
          <div
            className={`p-6 rounded-2xl border max-w-2xl mx-auto space-y-4 transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'glass-card border-white/[0.08]'
            }`}
          >
            <div>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Import Massal Akun (Bulk Stock)
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Punya 20 atau 50 akun sekaligus dari supplier? Masukkan satu baris per akun dengan format:
                <br />
                <code className="text-blue-600 dark:text-blue-300 font-mono text-[11px] font-bold">email:password:nama_profil:pin_profil:catatan</code>
                <br />
                atau cukup: <code className="text-blue-600 dark:text-blue-300 font-mono text-[11px] font-bold">email:password</code>
              </p>
            </div>

            <form onSubmit={handleBulkImport} className="space-y-4">
              <div>
                <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Target Varian Layanan
                </label>
                <select
                  value={bulkVariantId}
                  onChange={(e) => setBulkVariantId(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white focus:border-blue-500'
                  }`}
                >
                  {products.map((prod) => (
                    <optgroup key={prod.id} label={prod.title} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                      {prod.variants.map((v) => (
                        <option key={v.id} value={v.id} className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                          {prod.title} - {v.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Data Akun (1 baris per akun)
                </label>
                <textarea
                  rows={8}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder="akun01@gmail.com:Pass123!&#10;akun02@gmail.com:Pass456!:Profil 1:1234&#10;akun03@gmail.com:Pass789!"
                  className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600 placeholder-slate-400'
                      : 'bg-white/[0.04] border-white/10 text-white focus:border-blue-500 placeholder-slate-600'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="apple-btn-primary w-full py-3 rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-blue-500/20"
              >
                Proses Import Massal
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ================= MODAL: ADD PRODUCT ================= */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md">
          <div
            className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 shadow-2xl space-y-4 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'glass-panel bg-[#0d0e15] border-white/10 text-white'
            }`}
          >
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Tambah Layanan Baru
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Nama Layanan / Aplikasi
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="cth: Claude 3.5 Sonnet, Midjourney, Canva Pro"
                  required
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-900 border-white/10 text-white'
                    }`}
                  >
                    <option value="AI & Productivity">AI &amp; Productivity</option>
                    <option value="Streaming & Movies">Streaming &amp; Movies</option>
                    <option value="Design & Creative">Design &amp; Creative</option>
                    <option value="Music & Audio">Music &amp; Audio</option>
                  </select>
                </div>
                <div>
                  <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Badge Promosi
                  </label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="cth: Paling Laris, Garansi 100%"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Tagline Singkat
                </label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="cth: Akses Fitur Premium Penuh Tanpa Limit"
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div
                className={`p-3.5 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                }`}
              >
                <p className="font-bold text-blue-600 dark:text-blue-300">Varian Paket Awal:</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={varName}
                    onChange={(e) => setVarName(e.target.value)}
                    placeholder="Nama Varian (cth: 1 Bulan Private)"
                    className={`px-3 py-1.5 rounded-lg border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  />
                  <select
                    value={varAccountType}
                    onChange={(e: any) => setVarAccountType(e.target.value)}
                    className={`px-3 py-1.5 rounded-lg border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900'
                        : 'bg-slate-900 border-white/10 text-white'
                    }`}
                  >
                    <option value="PRIVATE">PRIVATE (Akun Sendiri)</option>
                    <option value="SHARING">SHARING (1 Profil + PIN)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={varPrice}
                    onChange={(e) => setVarPrice(e.target.value)}
                    placeholder="Harga Jual (cth: 45000)"
                    required
                    className={`px-3 py-1.5 rounded-lg border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  />
                  <input
                    type="number"
                    value={varOriginalPrice}
                    onChange={(e) => setVarOriginalPrice(e.target.value)}
                    placeholder="Harga Asli Coret (cth: 90000)"
                    className={`px-3 py-1.5 rounded-lg border ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className={`px-4 py-2 rounded-xl transition-colors font-medium ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  Batal
                </button>
                <button type="submit" className="apple-btn-primary px-5 py-2 rounded-xl font-bold shadow-md shadow-blue-500/20">
                  Simpan Layanan Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD VARIANT ================= */}
      {isAddVariantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md">
          <div
            className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl space-y-4 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'glass-panel bg-[#0d0e15] border-white/10 text-white'
            }`}
          >
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Tambah Varian Baru
            </h3>

            <form onSubmit={handleCreateVariant} className="space-y-3 text-xs">
              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Nama Varian
                </label>
                <input
                  type="text"
                  value={newVarName}
                  onChange={(e) => setNewVarName(e.target.value)}
                  placeholder="cth: 3 Bulan Sharing Hemat"
                  required
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Tipe Akun
                  </label>
                  <select
                    value={newVarType}
                    onChange={(e: any) => setNewVarType(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-900 border-white/10 text-white'
                    }`}
                  >
                    <option value="SHARING">SHARING</option>
                    <option value="PRIVATE">PRIVATE</option>
                  </select>
                </div>
                <div>
                  <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Durasi (Bulan)
                  </label>
                  <input
                    type="number"
                    value={newVarDuration}
                    onChange={(e) => setNewVarDuration(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Harga Jual (Rp)
                  </label>
                  <input
                    type="number"
                    value={newVarPrice}
                    onChange={(e) => setNewVarPrice(e.target.value)}
                    placeholder="35000"
                    required
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Harga Coret (Rp)
                  </label>
                  <input
                    type="number"
                    value={newVarOriginalPrice}
                    onChange={(e) => setNewVarOriginalPrice(e.target.value)}
                    placeholder="75000"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Fitur Paket (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={newVarFeatures}
                  onChange={(e) => setNewVarFeatures(e.target.value)}
                  placeholder="4K Ultra HD, Anti Hold, Garansi 90 Hari"
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddVariantOpen(false)}
                  className={`px-4 py-2 rounded-xl transition-colors font-medium ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  Batal
                </button>
                <button type="submit" className="apple-btn-primary px-5 py-2 rounded-xl font-bold shadow-md shadow-blue-500/20">
                  Simpan Varian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT PRODUCT ================= */}
      {isEditProductOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md">
          <div
            className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl space-y-4 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'glass-panel bg-[#0d0e15] border-white/10 text-white'
            }`}
          >
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Edit Layanan: {editingProduct.title}
            </h3>

            <form onSubmit={handleUpdateProduct} className="space-y-3 text-xs">
              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Judul
                </label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Tagline
                </label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Badge
                </label>
                <input
                  type="text"
                  value={editingProduct.badge || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Login URL
                </label>
                <input
                  type="text"
                  value={editingProduct.loginUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, loginUrl: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600'
                      : 'bg-white/[0.04] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditProductOpen(false)}
                  className={`px-4 py-2 rounded-xl transition-colors font-medium ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  Batal
                </button>
                <button type="submit" className="apple-btn-primary px-5 py-2 rounded-xl font-bold shadow-md shadow-blue-500/20">
                  Perbarui Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
