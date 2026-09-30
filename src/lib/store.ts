import fs from 'fs';
import path from 'path';
import { Product, ProductVariant, AccountInventory, Order, AdminStats, StockStatus } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'database.json');

// Initial seed products with authentic brand profiles
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-chatgpt',
    slug: 'chatgpt-plus-pro',
    title: 'ChatGPT Plus & Pro',
    category: 'AI & Productivity',
    tagline: 'Akses GPT-4o, GPT-4, DALL·E 3, Voice Mode, & Unlimited Reasoning',
    description: 'Akun ChatGPT OpenAI resmi dengan langganan aktif Plus / Pro. Kecepatan maksimal, analisis dokumen besar, dan pembuatan gambar HD tanpa antre.',
    badge: 'Paling Populer',
    icon: 'OpenAI',
    loginUrl: 'https://chatgpt.com/auth/login',
    variants: [
      {
        id: 'var-cgpt-sharing-1m',
        productId: 'prod-chatgpt',
        name: '1 Bulan Sharing (1 Profil + PIN)',
        accountType: 'SHARING',
        durationMonths: 1,
        price: 45000,
        originalPrice: 85000,
        features: ['1 Pengguna (1 Device)', 'Profil Khusus dengan PIN 4 Digit', 'Akses GPT-4o & DALL·E 3', 'Garansi Penuh 30 Hari']
      },
      {
        id: 'var-cgpt-private-1m',
        productId: 'prod-chatgpt',
        name: '1 Bulan Private Full Account',
        accountType: 'PRIVATE',
        durationMonths: 1,
        price: 185000,
        originalPrice: 350000,
        features: ['Full Akun Pribadi (Bebas Ganti Password)', 'Akses Email Utama', 'Tanpa Batasan Sharing', 'Garansi Penuh 30 Hari']
      },
      {
        id: 'var-cgpt-pro-1m',
        productId: 'prod-chatgpt',
        name: 'ChatGPT Pro $200 (Unlimited)',
        accountType: 'PRIVATE',
        durationMonths: 1,
        price: 490000,
        originalPrice: 3200000,
        features: ['Akses Model o1 Pro Tanpa Limit', 'Daya Nalar Tingkat Tinggi', 'Prioritas Compute Tertinggi', 'Garansi 30 Hari']
      }
    ]
  },
  {
    id: 'prod-gemini',
    slug: 'gemini-advanced-pro',
    title: 'Gemini Advanced 18 Bulan',
    category: 'AI & Productivity',
    tagline: 'Google One AI Premium 2TB Storage & Gemini 1.5 Pro 1M Context',
    description: 'Langganan Google AI Premium dengan integrasi langsung di Docs, Gmail, Drive, serta jendela konteks 1–2 juta token untuk analisis video dan repositori kode besar.',
    badge: 'Durasi Terpanjang',
    icon: 'Gemini',
    loginUrl: 'https://gemini.google.com',
    variants: [
      {
        id: 'var-gemini-18m-edu',
        productId: 'prod-gemini',
        name: 'Paket Spesial 18 Bulan (Google One AI 2TB)',
        accountType: 'PRIVATE',
        durationMonths: 18,
        price: 125000,
        originalPrice: 1450000,
        features: ['Aktif 18 Bulan Penuh', 'Cloud Storage Google Drive 2TB', 'Gemini 1.5 Pro Context 1M Token', 'Akun Fresh & Bebas Pakai']
      },
      {
        id: 'var-gemini-1m-fresh',
        productId: 'prod-gemini',
        name: '1 Bulan Private Akun Baru',
        accountType: 'PRIVATE',
        durationMonths: 1,
        price: 25000,
        originalPrice: 50000,
        features: ['1 Bulan Penuh', 'Akses Semua Fitur Gemini Advanced', 'Garansi Penuh']
      }
    ]
  },
  {
    id: 'prod-netflix',
    slug: 'netflix-premium-4k',
    title: 'Netflix Premium 4K UHD',
    category: 'Streaming & Movies',
    tagline: 'Nonton Bioskop 4K Ultra HD & Spatial Audio Tanpa Iklan',
    description: 'Akun resmi Netflix Plan Premium Ultra HD. Menjamin streaming lancar tanpa masalah screen limit atau household lock.',
    badge: 'Best Seller Streaming',
    icon: 'Netflix',
    loginUrl: 'https://netflix.com/login',
    variants: [
      {
        id: 'var-nflx-sharing-1m',
        productId: 'prod-netflix',
        name: '1 Bulan Sharing (1 Profil + PIN)',
        accountType: 'SHARING',
        durationMonths: 1,
        price: 28000,
        originalPrice: 65000,
        features: ['1 Device Streaming Bersamaan', 'Kualitas 4K Ultra HD + HDR', 'Anti Screen Limit (1 Orang 1 Profil)', 'Garansi 30 Hari']
      },
      {
        id: 'var-nflx-private-1m',
        productId: 'prod-netflix',
        name: '1 Bulan Private (5 Profil Bebas)',
        accountType: 'PRIVATE',
        durationMonths: 1,
        price: 135000,
        originalPrice: 186000,
        features: ['Bebas 5 Profil untuk Keluarga/Teman', 'Dapat Digunakan di 4 Layar Sekaligus', 'Bisa Ganti PIN & Password', 'Garansi 30 Hari']
      },
      {
        id: 'var-nflx-sharing-3m',
        productId: 'prod-netflix',
        name: '3 Bulan Sharing Hemat',
        accountType: 'SHARING',
        durationMonths: 3,
        price: 75000,
        originalPrice: 195000,
        features: ['Aktif 90 Hari Penuh', 'Kualitas 4K UHD', 'Garansi Perpanjangan Instan']
      }
    ]
  },
  {
    id: 'prod-capcut',
    slug: 'capcut-pro',
    title: 'CapCut Pro Desktop & Mobile',
    category: 'Design & Creative',
    tagline: 'Buka Semua Filter VIP, AI Auto-Caption, & 4K 60FPS Export',
    description: 'Paket editing video favorit konten kreator TikTok, Reels, dan YouTube Shorts dengan efek AI dan template pro tanpa watermark.',
    badge: 'Favorit Kreator',
    icon: 'CapCut',
    loginUrl: 'https://www.capcut.com/login',
    variants: [
      {
        id: 'var-capcut-sharing-1m',
        productId: 'prod-capcut',
        name: '1 Bulan Sharing VIP',
        accountType: 'SHARING',
        durationMonths: 1,
        price: 18000,
        originalPrice: 49000,
        features: ['Bisa Login di HP / Laptop (Windows & Mac)', 'Semua Efek & Filter VIP Terbuka', 'Ekspor Video 4K 60fps', 'Garansi 30 Hari']
      },
      {
        id: 'var-capcut-private-1y',
        productId: 'prod-capcut',
        name: '1 Tahun Private VIP',
        accountType: 'PRIVATE',
        durationMonths: 12,
        price: 120000,
        originalPrice: 350000,
        features: ['Aktif 1 Tahun Penuh', 'Akun Milik Sendiri', 'Garansi Penggantian Cepat']
      }
    ]
  },
  {
    id: 'prod-spotify',
    slug: 'spotify-premium',
    title: 'Spotify Premium Individual',
    category: 'Music & Audio',
    tagline: 'Dengarkan Musik Bebas Iklan, Download Offline, & Kualitas Suara High',
    description: 'Nikmati streaming jutaan lagu tanpa jeda iklan, bebas skip lagu tanpa batas, dan download lagu untuk didengarkan offline.',
    badge: 'Bebas Iklan',
    icon: 'Spotify',
    loginUrl: 'https://accounts.spotify.com/login',
    variants: [
      {
        id: 'var-spot-fresh-1m',
        productId: 'prod-spotify',
        name: '1 Bulan Akun Fresh',
        accountType: 'PRIVATE',
        durationMonths: 1,
        price: 15000,
        originalPrice: 55000,
        features: ['Bebas Iklan Selamanya', 'Kualitas Audio Sangat Tinggi (320kbps)', 'Download Lagu Offline', 'Garansi 30 Hari']
      },
      {
        id: 'var-spot-3m',
        productId: 'prod-spotify',
        name: '3 Bulan Hemat',
        accountType: 'PRIVATE',
        durationMonths: 3,
        price: 38000,
        originalPrice: 165000,
        features: ['Aktif 90 Hari', 'Garansi Ganti Akun Jika Terjadi Drop']
      }
    ]
  },
  {
    id: 'prod-youtube',
    slug: 'youtube-premium',
    title: 'YouTube Premium & Music',
    category: 'Streaming & Movies',
    tagline: 'Bebas Iklan di TV, HP, & Laptop + YouTube Music Full Akses',
    description: 'Putar video di latar belakang (background play) saat layar HP mati, bebas iklan di smart TV, dan akses penuh ke YouTube Music.',
    badge: 'Tanpa Iklan',
    icon: 'YouTube',
    loginUrl: 'https://accounts.google.com',
    variants: [
      {
        id: 'var-yt-fresh-1m',
        productId: 'prod-youtube',
        name: '1 Bulan Family Invite',
        accountType: 'SHARING',
        durationMonths: 1,
        price: 12000,
        originalPrice: 49000,
        features: ['Masuk ke Email Pribadi Kamu', 'Bebas Iklan di Semua Perangkat', 'Termasuk YouTube Music', 'Garansi 30 Hari']
      },
      {
        id: 'var-yt-fresh-3m',
        productId: 'prod-youtube',
        name: '3 Bulan Akun Fresh',
        accountType: 'PRIVATE',
        durationMonths: 3,
        price: 32000,
        originalPrice: 147000,
        features: ['Email & Password Baru', 'Aktif 3 Bulan Penuh', 'Garansi Full']
      }
    ]
  },
  {
    id: 'prod-claude',
    slug: 'claude-pro',
    title: 'Claude 3.5 Sonnet Pro',
    category: 'AI & Productivity',
    tagline: 'Model AI Coding & Writing No. 1 dengan Fitur Artifacts Interaktif',
    description: 'Akses Claude 3.5 Sonnet & Claude 3 Opus resmi Anthropic. Kapasitas 5x lipat lebih banyak, akses prioritas di jam sibuk, dan kemampuan coding canggih.',
    badge: 'Rekomendasi Coder',
    icon: 'Claude',
    loginUrl: 'https://claude.ai/login',
    variants: [
      {
        id: 'var-claude-sharing-1m',
        productId: 'prod-claude',
        name: '1 Bulan Sharing VIP',
        accountType: 'SHARING',
        durationMonths: 1,
        price: 55000,
        originalPrice: 120000,
        features: ['Akses Model Claude 3.5 Sonnet', 'Fitur Artifacts Terbuka', 'Garansi Penuh 30 Hari']
      },
      {
        id: 'var-claude-private-1m',
        productId: 'prod-claude',
        name: '1 Bulan Private Akun',
        accountType: 'PRIVATE',
        durationMonths: 1,
        price: 195000,
        originalPrice: 380000,
        features: ['Akun Full Milik Sendiri', 'Bebas Ganti Password & Email', 'Garansi Penuh 30 Hari']
      }
    ]
  }
];

// Initial seed ready-to-deliver accounts
const INITIAL_INVENTORY: AccountInventory[] = [
  // ChatGPT Plus Sharing
  {
    id: 'inv-cgpt-1',
    variantId: 'var-cgpt-sharing-1m',
    email: 'lumina_ai_plus01@vip-premium.id',
    password: 'OpenAI#2026Plus!8',
    profileName: 'Profil 2 (VIP User)',
    profilePin: '7721',
    additionalNotes: 'Harap gunakan Profil 2 saja. Dilarang mengubah password atau nama profil agar garansi 30 hari tetap berlaku.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inv-cgpt-2',
    variantId: 'var-cgpt-sharing-1m',
    email: 'lumina_ai_plus02@vip-premium.id',
    password: 'GPT4o#MegaPro99!',
    profileName: 'Profil 4 (Member)',
    profilePin: '1904',
    additionalNotes: 'Maksimal login di 1 device. Dilarang logout dari perangkat lain.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // ChatGPT Private
  {
    id: 'inv-cgpt-priv-1',
    variantId: 'var-cgpt-private-1m',
    email: 'cgpt_priv_lumina10@member-vip.net',
    password: 'PrivatePass#2026Secure!',
    additionalNotes: 'Akun full private. Anda bebas mengganti password dan menghubungkan ke nomor telepon pribadi Anda.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // ChatGPT Pro
  {
    id: 'inv-cgpt-pro-1',
    variantId: 'var-cgpt-pro-1m',
    email: 'openai_o1_pro_lumina@tech-elite.org',
    password: 'ProO1Model#SuperCompute2026!',
    additionalNotes: 'Akun ChatGPT Pro $200 dengan o1 Pro mode. Akses komputasi mendalam tanpa batas.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // Gemini 18 Bulan
  {
    id: 'inv-gemini-18m-1',
    variantId: 'var-gemini-18m-edu',
    email: 'googleone_ai_18m_01@edu-enterprise.org',
    password: 'Gemini18M#UltraSuper!',
    additionalNotes: 'Google One AI Premium aktif 18 Bulan. Sudah terisi penyimpanan 2TB Drive. Bebas ganti password dan nomor pemulihan.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inv-gemini-18m-2',
    variantId: 'var-gemini-18m-edu',
    email: 'googleone_ai_18m_02@edu-enterprise.org',
    password: 'GoogleAI#2026ProMax!',
    additionalNotes: 'Akun aktif 18 Bulan resmi. Jangan ragu hubungi kami jika butuh bantuan aktivasi di Google Docs/Drive.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inv-gemini-1m-1',
    variantId: 'var-gemini-1m-fresh',
    email: 'gemini_fresh_01@ai-user.net',
    password: 'GeminiPro15#Secure2026!',
    additionalNotes: 'Akun fresh Google AI. Siap pakai untuk analisis dokumen dan video 1 juta token.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // Netflix Sharing
  {
    id: 'inv-nflx-1',
    variantId: 'var-nflx-sharing-1m',
    email: 'nflx_premium_4k_01@cinema-stream.tv',
    password: 'NflxUltra#4K2026!',
    profileName: 'Profil 3 (VIP Room)',
    profilePin: '3819',
    additionalNotes: 'Gunakan Profil 3 dengan PIN 3819. Dilarang menambah profil baru atau mengubah email/password agar garansi aktif.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inv-nflx-2',
    variantId: 'var-nflx-sharing-1m',
    email: 'nflx_premium_4k_02@cinema-stream.tv',
    password: 'StreamPass#Nflx990!',
    profileName: 'Profil 1 (Movie Lover)',
    profilePin: '8241',
    additionalNotes: 'Kualitas otomatis 4K HDR. Nikmati tontonan favoritmu.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // Netflix Private
  {
    id: 'inv-nflx-priv-1',
    variantId: 'var-nflx-private-1m',
    email: 'nflx_private_home01@stream-pass.tv',
    password: 'PrivateNflx#MasterKey1!',
    additionalNotes: 'Akun Private 5 Profil bebas pakai untuk keluarga/teman. Bisa ganti password dan atur PIN masing-masing profil.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // CapCut Pro
  {
    id: 'inv-capcut-1',
    variantId: 'var-capcut-sharing-1m',
    email: 'capcut_pro_vip01@editor-space.com',
    password: 'CapcutVIP#2026Creator!',
    additionalNotes: 'Bisa digunakan di aplikasi CapCut Desktop (Windows/Mac) maupun HP (Android/iOS). Nikmati semua efek pro!',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'inv-capcut-priv-1y',
    variantId: 'var-capcut-private-1y',
    email: 'capcut_1year_priv01@editor-space.com',
    password: 'Capcut1Year#PersonalPro26!',
    additionalNotes: 'Akun CapCut Pro 1 Tahun Private. Bebas ganti password.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // Spotify Premium
  {
    id: 'inv-spotify-1',
    variantId: 'var-spot-fresh-1m',
    email: 'spotify_premium_user01@music-vibes.fm',
    password: 'SpotifySound#HighRes99!',
    additionalNotes: 'Akun fresh individual. Bebas download lagu offline kualitas 320kbps tanpa jeda iklan.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // YouTube Premium
  {
    id: 'inv-yt-1',
    variantId: 'var-yt-fresh-1m',
    email: 'yt_premium_invite01@media-hub.net',
    password: 'YoutubeAdFree#2026Pass!',
    additionalNotes: 'Silakan login dan nikmati streaming YouTube bebas iklan serta YouTube Music kualitas premium.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  },
  // Claude Pro
  {
    id: 'inv-claude-1',
    variantId: 'var-claude-sharing-1m',
    email: 'claude_vip_sonnet01@claude-dev.net',
    password: 'Anthropic#Sonnet35Pro!',
    profileName: 'Profil VIP Claude',
    profilePin: '5512',
    additionalNotes: 'Akun Claude 3.5 Sonnet Pro. Gunakan dengan bijak untuk kebutuhan coding dan analisa dokumen.',
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  }
];

interface DatabaseSchema {
  products: Product[];
  inventory: AccountInventory[];
  orders: Order[];
}

function ensureDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      inventory: INITIAL_INVENTORY,
      orders: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed: DatabaseSchema = JSON.parse(raw);
    
    // Merge any missing initial products or icons if needed
    let updated = false;
    for (const initP of INITIAL_PRODUCTS) {
      const exists = parsed.products.find(p => p.id === initP.id);
      if (!exists) {
        parsed.products.push(initP);
        updated = true;
      }
    }
    for (const initInv of INITIAL_INVENTORY) {
      const exists = parsed.inventory.find(i => i.id === initInv.id);
      if (!exists) {
        parsed.inventory.push(initInv);
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(DB_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
    }

    return parsed;
  } catch (error) {
    console.error('Error reading database, resetting to initial', error);
    const initialData: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      inventory: INITIAL_INVENTORY,
      orders: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDatabase(data: DatabaseSchema): void {
  ensureDatabase();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const dbStore = {
  getProducts(): Product[] {
    const db = ensureDatabase();
    return db.products.map(product => ({
      ...product,
      variants: product.variants.map(variant => {
        const count = db.inventory.filter(
          inv => inv.variantId === variant.id && inv.status === 'AVAILABLE'
        ).length;
        return {
          ...variant,
          stockCount: count
        };
      })
    }));
  },

  getProductBySlug(slug: string): Product | null {
    const products = this.getProducts();
    return products.find(p => p.slug === slug) || null;
  },

  // PRODUCT CRUD
  addProduct(newProd: Omit<Product, 'id'> & { id?: string }): Product {
    const db = ensureDatabase();
    const id = newProd.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const product: Product = {
      id,
      slug: newProd.slug || id,
      title: newProd.title,
      category: newProd.category,
      tagline: newProd.tagline,
      description: newProd.description,
      badge: newProd.badge || '',
      icon: newProd.icon || 'YosPass',
      loginUrl: newProd.loginUrl || 'https://google.com',
      variants: (newProd.variants || []).map((v, idx) => ({
        ...v,
        id: v.id || `var-${id}-${idx + 1}`,
        productId: id
      }))
    };

    db.products.push(product);
    saveDatabase(db);
    return product;
  },

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const db = ensureDatabase();
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    db.products[index] = {
      ...db.products[index],
      ...updates
    };

    saveDatabase(db);
    return db.products[index];
  },

  deleteProduct(id: string): boolean {
    const db = ensureDatabase();
    const initialLen = db.products.length;
    db.products = db.products.filter(p => p.id !== id);
    // Also remove associated inventory
    const productVariantIds = new Set(
      (db.products.find(p => p.id === id)?.variants || []).map(v => v.id)
    );
    if (productVariantIds.size > 0) {
      db.inventory = db.inventory.filter(inv => !productVariantIds.has(inv.variantId));
    }

    saveDatabase(db);
    return db.products.length < initialLen;
  },

  // VARIANT CRUD
  addVariant(productId: string, variant: Omit<ProductVariant, 'id' | 'productId'>): ProductVariant | null {
    const db = ensureDatabase();
    const prod = db.products.find(p => p.id === productId);
    if (!prod) return null;

    const newVar: ProductVariant = {
      ...variant,
      id: `var-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId
    };

    prod.variants.push(newVar);
    saveDatabase(db);
    return newVar;
  },

  updateVariant(productId: string, variantId: string, updates: Partial<ProductVariant>): ProductVariant | null {
    const db = ensureDatabase();
    const prod = db.products.find(p => p.id === productId);
    if (!prod) return null;

    const vIdx = prod.variants.findIndex(v => v.id === variantId);
    if (vIdx === -1) return null;

    prod.variants[vIdx] = {
      ...prod.variants[vIdx],
      ...updates
    };

    saveDatabase(db);
    return prod.variants[vIdx];
  },

  deleteVariant(productId: string, variantId: string): boolean {
    const db = ensureDatabase();
    const prod = db.products.find(p => p.id === productId);
    if (!prod) return false;

    prod.variants = prod.variants.filter(v => v.id !== variantId);
    saveDatabase(db);
    return true;
  },

  // ORDER MANAGEMENT
  createOrder(customerPhone: string, customerEmail: string | undefined, variantId: string, paymentMethod: 'QRIS' | 'BCA_VA' | 'MANDIRI_VA' | 'GOPAY' = 'QRIS'): { order: Order | null; error?: string } {
    const db = ensureDatabase();
    
    let targetVariant: ProductVariant | null = null;
    let targetProduct: Product | null = null;

    for (const prod of db.products) {
      const v = prod.variants.find(item => item.id === variantId);
      if (v) {
        targetVariant = v;
        targetProduct = prod;
        break;
      }
    }

    if (!targetVariant || !targetProduct) {
      return { order: null, error: 'Varian produk tidak ditemukan.' };
    }

    const availableIndex = db.inventory.findIndex(
      inv => inv.variantId === variantId && inv.status === 'AVAILABLE'
    );

    if (availableIndex === -1) {
      return { order: null, error: 'Maaf, stok untuk varian ini sedang habis.' };
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const invoiceNumber = `YOS-${dateStr}-${randDigits}`;

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins
    const nowIso = new Date().toISOString();
    const orderId = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Soft lock the stock
    db.inventory[availableIndex].status = 'RESERVED';
    db.inventory[availableIndex].reservedUntil = expiresAt;
    db.inventory[availableIndex].orderId = orderId;

    const newOrder: Order = {
      id: orderId,
      invoiceNumber,
      customerPhone,
      customerEmail: customerEmail || '',
      variantId,
      productId: targetProduct.id,
      productTitle: targetProduct.title,
      variantName: targetVariant.name,
      amount: targetVariant.price,
      status: 'PENDING',
      paymentMethod,
      qrisPayload: `00020101021226600016ID.CO.YOSPASS.WWW011893600999000000000151440000000000520458125303360540${targetVariant.price}.005802ID5911YOSPASS6009PURWOKERTO62200116${invoiceNumber}630489A1`,
      assignedAccountId: db.inventory[availableIndex].id,
      createdAt: nowIso,
      expiresAt
    };

    db.orders.push(newOrder);
    saveDatabase(db);

    return { order: newOrder };
  },

  simulatePayment(invoiceNumber: string): { success: boolean; order?: Order; error?: string } {
    const db = ensureDatabase();
    const orderIndex = db.orders.findIndex(o => o.invoiceNumber === invoiceNumber);

    if (orderIndex === -1) {
      return { success: false, error: 'Pesanan tidak ditemukan.' };
    }

    const order = db.orders[orderIndex];
    if (order.status === 'PAID') {
      return { success: true, order: this.getOrder(invoiceNumber) || undefined };
    }

    const invIndex = db.inventory.findIndex(i => i.id === order.assignedAccountId);
    if (invIndex === -1) {
      return { success: false, error: 'Akun inventaris tidak ditemukan.' };
    }

    const paidAt = new Date().toISOString();

    db.inventory[invIndex].status = 'SOLD';
    db.inventory[invIndex].soldAt = paidAt;
    delete db.inventory[invIndex].reservedUntil;

    db.orders[orderIndex].status = 'PAID';
    db.orders[orderIndex].paidAt = paidAt;

    saveDatabase(db);

    return { success: true, order: this.getOrder(invoiceNumber) || undefined };
  },

  getOrder(invoiceNumber: string): Order | null {
    const db = ensureDatabase();
    const order = db.orders.find(o => o.invoiceNumber === invoiceNumber);
    if (!order) return null;

    if (order.status === 'PAID' && order.assignedAccountId) {
      const inv = db.inventory.find(i => i.id === order.assignedAccountId);
      const prod = db.products.find(p => p.id === order.productId);
      if (inv) {
        return {
          ...order,
          assignedAccount: {
            email: inv.email,
            password: inv.password,
            profileName: inv.profileName,
            profilePin: inv.profilePin,
            additionalNotes: inv.additionalNotes,
            loginUrl: prod ? prod.loginUrl : 'https://google.com'
          }
        };
      }
    }

    return order;
  },

  lookupOrdersByPhone(phone: string): Order[] {
    const db = ensureDatabase();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const matched = db.orders.filter(o => {
      const orderPhone = o.customerPhone.replace(/[^0-9]/g, '');
      return orderPhone.includes(cleanPhone) || cleanPhone.includes(orderPhone);
    });

    return matched.map(o => this.getOrder(o.invoiceNumber) || o);
  },

  // INVENTORY & STOCK
  addStock(variantId: string, email: string, password: string, profileName?: string, profilePin?: string, notes?: string): AccountInventory {
    const db = ensureDatabase();
    const newInv: AccountInventory = {
      id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      variantId,
      email,
      password,
      profileName,
      profilePin,
      additionalNotes: notes,
      status: 'AVAILABLE',
      createdAt: new Date().toISOString()
    };

    db.inventory.push(newInv);
    saveDatabase(db);
    return newInv;
  },

  addStockBulk(variantId: string, lines: string[]): { added: number; failed: number } {
    const db = ensureDatabase();
    let added = 0;
    let failed = 0;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // format: email:password:profileName:profilePin:notes or email|password|pin
      const parts = line.includes('|') ? line.split('|') : line.split(':');
      if (parts.length >= 2) {
        const [email, password, profileName, profilePin, notes] = parts.map(p => p.trim());
        db.inventory.push({
          id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          variantId,
          email,
          password,
          profileName: profileName || undefined,
          profilePin: profilePin || undefined,
          additionalNotes: notes || undefined,
          status: 'AVAILABLE',
          createdAt: new Date().toISOString()
        });
        added++;
      } else {
        failed++;
      }
    }

    saveDatabase(db);
    return { added, failed };
  },

  deleteInventoryItem(id: string): boolean {
    const db = ensureDatabase();
    const beforeLen = db.inventory.length;
    db.inventory = db.inventory.filter(i => i.id !== id);
    saveDatabase(db);
    return db.inventory.length < beforeLen;
  },

  updateInventoryStatus(id: string, status: StockStatus): boolean {
    const db = ensureDatabase();
    const item = db.inventory.find(i => i.id === id);
    if (!item) return false;
    item.status = status;
    saveDatabase(db);
    return true;
  },

  getAdminStats(): AdminStats {
    const db = ensureDatabase();
    const paidOrders = db.orders.filter(o => o.status === 'PAID');
    const totalRevenue = paidOrders.reduce((acc, curr) => acc + curr.amount, 0);
    const availableStock = db.inventory.filter(i => i.status === 'AVAILABLE').length;
    const soldStock = db.inventory.filter(i => i.status === 'SOLD').length;

    return {
      totalRevenue,
      totalOrders: db.orders.length,
      paidOrders: paidOrders.length,
      availableStock,
      soldStock
    };
  },

  getAllInventory(): AccountInventory[] {
    const db = ensureDatabase();
    return db.inventory;
  },

  getAllOrders(): Order[] {
    const db = ensureDatabase();
    return db.orders.map(o => this.getOrder(o.invoiceNumber) || o);
  }
};
