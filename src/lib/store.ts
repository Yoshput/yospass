import fs from 'fs';
import path from 'path';
import os from 'os';
import { Product, ProductVariant, AccountInventory, Order, AdminStats, StockStatus } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DB_PATH = path.join(DATA_DIR, 'database.json');
const TMP_DB_PATH = path.join(os.tmpdir(), 'yospass-database.json');

declare global {
  var __yospass_db: any;
}

// Initial seed products with authentic brand profiles
const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-chatgpt",
    "slug": "chatgpt-plus-pro",
    "title": "ChatGPT Plus & Pro (GPT-5 Astra & o1)",
    "category": "AI & Flagship Models",
    "tagline": "Akses Flagship OpenAI o1, o1-pro, o3-mini, GPT-4o, & GPT-5 Astra Preview",
    "description": "Akun ChatGPT OpenAI resmi dengan langganan aktif Plus / Pro. Dilengkapi model reasoning mendalam, pembuatan gambar DALL·E 3 HD, dan Advanced Voice Mode interaktif.",
    "badge": "Paling Populer",
    "icon": "ChatGPT",
    "loginUrl": "https://chatgpt.com/auth/login",
    "variants": [
      {
        "id": "var-cgpt-sharing-1m",
        "productId": "prod-chatgpt",
        "name": "1 Bulan Sharing (1 Profil + PIN)",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 45000,
        "originalPrice": 85000,
        "features": [
          "1 Pengguna (1 Device)",
          "Profil Khusus dengan PIN 4 Digit",
          "Akses GPT-4o, o1, & DALL·E 3",
          "Garansi Penuh 30 Hari"
        ]
      },
      {
        "id": "var-cgpt-private-1m",
        "productId": "prod-chatgpt",
        "name": "1 Bulan Private Full Account",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 185000,
        "originalPrice": 350000,
        "features": [
          "Full Akun Pribadi (Bebas Ganti Password)",
          "Akses Email Utama",
          "Tanpa Batasan Sharing",
          "Garansi Penuh 30 Hari"
        ]
      },
      {
        "id": "var-cgpt-pro-1m",
        "productId": "prod-chatgpt",
        "name": "ChatGPT Pro $200 (Unlimited o1 Pro)",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 490000,
        "originalPrice": 3200000,
        "features": [
          "Akses Model o1 Pro Tanpa Limit",
          "Daya Nalar Tingkat Tinggi",
          "Prioritas Compute Tertinggi",
          "Garansi 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-claude",
    "slug": "claude-pro",
    "title": "Claude 3.7 & 3.5 Sonnet Pro",
    "category": "AI & Flagship Models",
    "tagline": "Anthropic Claude 3.7 Sonnet (Hybrid Thinking), Artifacts, & Claude Fable Canvas",
    "description": "Akses model kecerdasan coding & penalaran nomor 1 di dunia. Fitur Artifacts interaktif, jendela konteks 200k token, dan akses prioritas tinggi tanpa antre.",
    "badge": "Rekomendasi Coder",
    "icon": "Claude",
    "loginUrl": "https://claude.ai/login",
    "variants": [
      {
        "id": "var-claude-sharing-1m",
        "productId": "prod-claude",
        "name": "1 Bulan Sharing VIP (Sonnet 3.5 & 3.7)",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 55000,
        "originalPrice": 120000,
        "features": [
          "Akses Model Claude 3.5 & 3.7 Sonnet",
          "Fitur Artifacts & Fable Terbuka",
          "Garansi Penuh 30 Hari"
        ]
      },
      {
        "id": "var-claude-private-1m",
        "productId": "prod-claude",
        "name": "1 Bulan Private Akun",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 195000,
        "originalPrice": 380000,
        "features": [
          "Akun Full Milik Sendiri",
          "Bebas Ganti Password & Email",
          "Garansi Penuh 30 Hari"
        ]
      },
      {
        "id": "var-claude-team-1m",
        "productId": "prod-claude",
        "name": "1 Bulan Claude Team Pro (High Token)",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 340000,
        "originalPrice": 650000,
        "features": [
          "Kapasitas Token Tertinggi",
          "Akses Semua Model Claude",
          "Garansi Penuh 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-deepseek",
    "slug": "deepseek-r1-pro",
    "title": "DeepSeek R1 & V3 Pro (Unlimited)",
    "category": "AI & Flagship Models",
    "tagline": "AI Penalaran No. 1 Dunia (671B Params Chain of Thought) Tanpa Server Busy",
    "description": "Akses DeepSeek-R1 Full Model dan DeepSeek-V3 ultra-fast inference tanpa batasan server busy. Solusi penalaran matematika, logika, dan coding tingkat tinggi.",
    "badge": "Trending 2026",
    "icon": "DeepSeek",
    "loginUrl": "https://chat.deepseek.com",
    "variants": [
      {
        "id": "var-deepseek-vip-1m",
        "productId": "prod-deepseek",
        "name": "1 Bulan VIP Priority Server",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 35000,
        "originalPrice": 75000,
        "features": [
          "Bebas Antre & Tanpa Server Busy",
          "Model R1 671B Chain of Thought",
          "Fitur Web Search Real-Time",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-deepseek-key-3m",
        "productId": "prod-deepseek",
        "name": "3 Bulan Hemat Dedicated Access",
        "accountType": "PRIVATE",
        "durationMonths": 3,
        "price": 85000,
        "originalPrice": 195000,
        "features": [
          "Aktif 90 Hari Penuh",
          "Akses Prioritas Dedikasi",
          "Garansi Penggantian"
        ]
      }
    ]
  },
  {
    "id": "prod-grok",
    "slug": "grok-3-supergrok",
    "title": "xAI Grok 3 SuperGrok Pro",
    "category": "AI & Flagship Models",
    "tagline": "SuperGrok Uncensored Fun Mode, Real-Time X/Twitter Intel, & Flux 1 Generator",
    "description": "Model AI revolusioner dari Elon Musk xAI. Terkoneksi secara real-time dengan data X (Twitter), fitur tanpa sensor (Fun Mode), dan visual image generation Flux 1.",
    "badge": "Uncensored AI",
    "icon": "Grok",
    "loginUrl": "https://grok.x.ai",
    "variants": [
      {
        "id": "var-grok-sharing-1m",
        "productId": "prod-grok",
        "name": "1 Bulan Sharing VIP (Profil PIN)",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 45000,
        "originalPrice": 95000,
        "features": [
          "Akses Grok 2 & Grok 3",
          "Mode Uncensored / Fun Mode Aktif",
          "Generate Gambar Flux 1 Unlimited",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-grok-private-1m",
        "productId": "prod-grok",
        "name": "1 Bulan Private X Premium+",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 165000,
        "originalPrice": 350000,
        "features": [
          "Akun X Premium+ Full Sendiri",
          "Bebas Iklan di Timeline X",
          "Garansi 30 Hari Penuh"
        ]
      }
    ]
  },
  {
    "id": "prod-perplexity",
    "slug": "perplexity-pro",
    "title": "Perplexity Pro (Search AI All-in-One)",
    "category": "AI & Flagship Models",
    "tagline": "Satu Langganan untuk Semua AI: Claude 3.5, GPT-4o, Sonar Large, & $5 API Credit",
    "description": "Mesin pencari berbasis AI tercanggih di dunia. Bebas memilih engine Claude 3.5 Sonnet, GPT-4o, atau Sonar. Menyertakan sitasi ilmiah, upload PDF, dan kredit API bulanan.",
    "badge": "Favorit Peneliti",
    "icon": "Perplexity",
    "loginUrl": "https://www.perplexity.ai",
    "variants": [
      {
        "id": "var-perp-priv-1m",
        "productId": "prod-perplexity",
        "name": "1 Bulan Private Akun Baru",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 65000,
        "originalPrice": 150000,
        "features": [
          "Pro Search Tanpa Batas (300+/hari)",
          "Pilih Model AI Sesuka Hati",
          "Garansi Penuh 30 Hari"
        ]
      },
      {
        "id": "var-perp-edu-1y",
        "productId": "prod-perplexity",
        "name": "1 Tahun Promo Mahasiswa",
        "accountType": "PRIVATE",
        "durationMonths": 12,
        "price": 290000,
        "originalPrice": 1450000,
        "features": [
          "Aktif 1 Tahun Penuh",
          "Kredit API $5/Bulan",
          "Garansi Resmi 365 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-gemini",
    "slug": "gemini-advanced-pro",
    "title": "Gemini Advanced 18 Bulan",
    "category": "AI & Flagship Models",
    "tagline": "Google One AI Premium 2TB Storage & Gemini 2.0 Flash Thinking 1M Context",
    "description": "Langganan resmi Google AI Premium aktif 18 bulan penuh. Mendapatkan kapasitas cloud Google Drive 2TB, Gemini 1.5/2.0 Pro terintegrasi langsung di Gmail dan Docs.",
    "badge": "Durasi Terpanjang",
    "icon": "Gemini",
    "loginUrl": "https://gemini.google.com",
    "variants": [
      {
        "id": "var-gemini-18m-edu",
        "productId": "prod-gemini",
        "name": "Paket Spesial 18 Bulan (Google One AI 2TB)",
        "accountType": "PRIVATE",
        "durationMonths": 18,
        "price": 125000,
        "originalPrice": 1450000,
        "features": [
          "Aktif 18 Bulan Penuh",
          "Cloud Storage Google Drive 2TB",
          "Gemini 1.5 Pro Context 1M Token",
          "Akun Fresh & Bebas Pakai"
        ]
      },
      {
        "id": "var-gemini-1m-fresh",
        "productId": "prod-gemini",
        "name": "1 Bulan Private Akun Baru",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 25000,
        "originalPrice": 50000,
        "features": [
          "1 Bulan Penuh",
          "Akses Semua Fitur Gemini Advanced",
          "Garansi Penuh"
        ]
      }
    ]
  },
  {
    "id": "prod-canva",
    "slug": "canva-pro",
    "title": "Canva Pro Designer",
    "category": "Desain & Kreatif",
    "tagline": "Buka 100+ Juta Template Premium, Magic Studio AI, Brand Kit, & Cloud 1TB",
    "description": "Paket Canva Pro resmi untuk mahasiswa, desainer, dan bisnis online. Bebas download resolusi transparan, hapus background 1 klik, dan gunakan semua elemen VIP.",
    "badge": "Wajib Mahasiswa",
    "icon": "Canva",
    "loginUrl": "https://www.canva.com/login",
    "variants": [
      {
        "id": "var-canva-invite-1m",
        "productId": "prod-canva",
        "name": "1 Bulan Invite Member Pro (Email Sendiri)",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 12000,
        "originalPrice": 35000,
        "features": [
          "Masuk ke Email Pribadi Anda",
          "Buka Semua Elemen & Template VIP",
          "Magic Studio AI Generator",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-canva-edu-1y",
        "productId": "prod-canva",
        "name": "1 Tahun Edu / Designer Pro",
        "accountType": "PRIVATE",
        "durationMonths": 12,
        "price": 35000,
        "originalPrice": 180000,
        "features": [
          "Aktif 1 Tahun Penuh",
          "Bebas Hapus Background & Resize",
          "Garansi 1 Tahun"
        ]
      },
      {
        "id": "var-canva-team-1y",
        "productId": "prod-canva",
        "name": "1 Tahun Private Admin Team (Bisa Invite 5 Teman)",
        "accountType": "PRIVATE",
        "durationMonths": 12,
        "price": 95000,
        "originalPrice": 450000,
        "features": [
          "Akses Brand Kit & Font Kustom",
          "Bisa Tambah 5 Akun Anggota",
          "Garansi Penuh 1 Tahun"
        ]
      }
    ]
  },
  {
    "id": "prod-capcut",
    "slug": "capcut-pro",
    "title": "CapCut Pro Desktop & Mobile",
    "category": "Desain & Kreatif",
    "tagline": "Buka Semua Filter VIP, AI Auto-Caption, & Ekspor Video 4K 60FPS",
    "description": "Aplikasi editing video paling diminati untuk TikTok, Reels, dan YouTube Shorts. Semua efek AI, template pro, dan audio tanpa watermark.",
    "badge": "Favorit Kreator",
    "icon": "CapCut",
    "loginUrl": "https://www.capcut.com/login",
    "variants": [
      {
        "id": "var-capcut-sharing-1m",
        "productId": "prod-capcut",
        "name": "1 Bulan Sharing VIP",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 18000,
        "originalPrice": 49000,
        "features": [
          "Bisa Login di HP / Laptop (Windows & Mac)",
          "Semua Efek & Filter VIP Terbuka",
          "Ekspor Video 4K 60fps",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-capcut-private-1y",
        "productId": "prod-capcut",
        "name": "1 Tahun Private VIP",
        "accountType": "PRIVATE",
        "durationMonths": 12,
        "price": 120000,
        "originalPrice": 350000,
        "features": [
          "Aktif 1 Tahun Penuh",
          "Akun Milik Sendiri",
          "Garansi Penggantian Cepat"
        ]
      }
    ]
  },
  {
    "id": "prod-freepik",
    "slug": "freepik-premium",
    "title": "Freepik Premium & AI Mockup",
    "category": "Desain & Kreatif",
    "tagline": "Download Ribuan Aset Desain Vektor, PSD, & Lisensi Komersial Bebas Pakai",
    "description": "Gudang aset desain grafis terbesar di dunia. Akses tanpa batas ke jutaan file vector, foto kualitas tinggi, PSD mockup, serta fitur AI Image Generator Freepik.",
    "badge": "Pilihan Desainer",
    "icon": "Freepik",
    "loginUrl": "https://www.freepik.com",
    "variants": [
      {
        "id": "var-freepik-share-1m",
        "productId": "prod-freepik",
        "name": "1 Bulan Sharing Download Harian",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 35000,
        "originalPrice": 85000,
        "features": [
          "Download File Premium Setiap Hari",
          "Format Vektor AI, EPS, & PSD Mockup",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-freepik-priv-1m",
        "productId": "prod-freepik",
        "name": "1 Bulan Private Account",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 120000,
        "originalPrice": 250000,
        "features": [
          "Akun Pribadi Bebas Akses Penuh",
          "Lisensi Komersial Lengkap",
          "Garansi 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-netflix",
    "slug": "netflix-premium-4k",
    "title": "Netflix Premium 4K UHD",
    "category": "Streaming & Film",
    "tagline": "Nonton Bioskop 4K Ultra HD & Spatial Audio Tanpa Iklan",
    "description": "Akun resmi Netflix Plan Premium Ultra HD. Menjamin streaming lancar tanpa masalah screen limit atau household lock.",
    "badge": "Best Seller Streaming",
    "icon": "Netflix",
    "loginUrl": "https://netflix.com/login",
    "variants": [
      {
        "id": "var-nflx-sharing-1m",
        "productId": "prod-netflix",
        "name": "1 Bulan Sharing (1 Profil + PIN)",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 28000,
        "originalPrice": 65000,
        "features": [
          "1 Device Streaming Bersamaan",
          "Kualitas 4K Ultra HD + HDR",
          "Anti Screen Limit (1 Orang 1 Profil)",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-nflx-private-1m",
        "productId": "prod-netflix",
        "name": "1 Bulan Private (5 Profil Bebas)",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 135000,
        "originalPrice": 186000,
        "features": [
          "Bebas 5 Profil untuk Keluarga/Teman",
          "Dapat Digunakan di 4 Layar Sekaligus",
          "Bisa Ganti PIN & Password",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-nflx-sharing-3m",
        "productId": "prod-netflix",
        "name": "3 Bulan Sharing Hemat",
        "accountType": "SHARING",
        "durationMonths": 3,
        "price": 75000,
        "originalPrice": 195000,
        "features": [
          "Aktif 90 Hari Penuh",
          "Kualitas 4K UHD",
          "Garansi Perpanjangan Instan"
        ]
      }
    ]
  },
  {
    "id": "prod-prime",
    "slug": "prime-video-4k",
    "title": "Amazon Prime Video 4K",
    "category": "Streaming & Film",
    "tagline": "Nonton The Boys, Rings of Power, & Film Box Office 4K UHD + HDR10",
    "description": "Layanan streaming premium dari Amazon. Menikmati ratusan film box office original kualitas 4K HDR dengan audio Dolby Atmos.",
    "badge": "Resolusi 4K HDR",
    "icon": "PrimeVideo",
    "loginUrl": "https://www.primevideo.com",
    "variants": [
      {
        "id": "var-prime-share-1m",
        "productId": "prod-prime",
        "name": "1 Bulan Sharing (1 Profil + PIN)",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 19000,
        "originalPrice": 45000,
        "features": [
          "Nonton Kualitas 4K UHD + HDR",
          "1 Device Aktif Bersamaan",
          "Garansi Penuh 30 Hari"
        ]
      },
      {
        "id": "var-prime-priv-1m",
        "productId": "prod-prime",
        "name": "1 Bulan Private Full Account",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 59000,
        "originalPrice": 99000,
        "features": [
          "Bebas Bikin Banyak Profil",
          "Nonton di 3 Layar Sekaligus",
          "Garansi 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-wetv",
    "slug": "wetv-vip",
    "title": "WeTV VIP Asia",
    "category": "Streaming & Film",
    "tagline": "Nonton Episode Baru Lebih Cepat (Fast Track), Full HD 1080p Tanpa Iklan",
    "description": "Platform nomor 1 untuk drama China, drama Asia, dan variety show Chuang. Buka episode VIP lebih awal tanpa jeda iklan.",
    "badge": "Raja Drachin",
    "icon": "WeTV",
    "loginUrl": "https://wetv.vip",
    "variants": [
      {
        "id": "var-wetv-share-1m",
        "productId": "prod-wetv",
        "name": "1 Bulan Sharing VIP",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 15000,
        "originalPrice": 39000,
        "features": [
          "Nonton Tanpa Iklan",
          "Kualitas Full HD 1080p",
          "Akses Fitur Fast Track",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-wetv-share-3m",
        "productId": "prod-wetv",
        "name": "3 Bulan Hemat VIP",
        "accountType": "SHARING",
        "durationMonths": 3,
        "price": 38000,
        "originalPrice": 99000,
        "features": [
          "Aktif 90 Hari Penuh",
          "Drakor & Drachin Eksklusif",
          "Garansi Full"
        ]
      }
    ]
  },
  {
    "id": "prod-iqiyi",
    "slug": "iqiyi-vip",
    "title": "iQIYI VIP Premium",
    "category": "Streaming & Film",
    "tagline": "Streaming Drama Mandarin & Anime Populer Kualitas 4K Dolby Atmos",
    "description": "Tonton drama romantis Asia, anime simulcast, dan reality show orisinal iQIYI dengan subtitle bahasa Indonesia berkualitas tinggi.",
    "badge": "Anime & C-Drama",
    "icon": "iQIYI",
    "loginUrl": "https://www.iq.com",
    "variants": [
      {
        "id": "var-iqiyi-share-1m",
        "productId": "prod-iqiyi",
        "name": "1 Bulan Standard Sharing",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 16000,
        "originalPrice": 39000,
        "features": [
          "Kualitas Gambar 1080p/4K",
          "Subtitle Bahasa Indonesia",
          "Download Offline",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-iqiyi-priv-1m",
        "productId": "prod-iqiyi",
        "name": "1 Bulan Premium 4 Screen Private",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 39000,
        "originalPrice": 89000,
        "features": [
          "Audio Dolby Atmos",
          "Bisa Nonton di 4 Device",
          "Garansi Penuh 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-bstation",
    "slug": "bstation-bilibili-vip",
    "title": "Bstation / Bilibili VIP",
    "category": "Streaming & Film",
    "tagline": "Nonton Anime Kualitas 4K 60fps & Bebas Akses Komik Premium Tanpa Sensor",
    "description": "Surganya pecinta anime dan animasi Jepang. Tonton episode terbaru anime populer tanpa potongan, resolusi 4K 60fps, dan download sepuasnya.",
    "badge": "Anime 4K 60FPS",
    "icon": "Bstation",
    "loginUrl": "https://www.bilibili.tv",
    "variants": [
      {
        "id": "var-bstation-share-1m",
        "productId": "prod-bstation",
        "name": "1 Bulan Sharing VIP",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 14000,
        "originalPrice": 35000,
        "features": [
          "Resolusi 4K 60FPS & Dolby",
          "Semua Anime VIP Terbuka",
          "Download Tanpa Batas",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-bstation-share-3m",
        "productId": "prod-bstation",
        "name": "3 Bulan Hemat VIP",
        "accountType": "SHARING",
        "durationMonths": 3,
        "price": 35000,
        "originalPrice": 89000,
        "features": [
          "Aktif 90 Hari Penuh",
          "Koleksi Manga & Anime VIP",
          "Garansi Full"
        ]
      }
    ]
  },
  {
    "id": "prod-viu",
    "slug": "viu-premium",
    "title": "Viu Premium",
    "category": "Streaming & Film",
    "tagline": "Download Offline & Nonton Drama Korea Tayang Barengan Korea Sub Indo",
    "description": "Pusat drakor terlengkap dengan subtitle Indonesia tercepat (4-8 jam setelah penayangan di Korea Selatan). Bebas iklan di Smart TV dan HP.",
    "badge": "Drakor Kilat",
    "icon": "Viu",
    "loginUrl": "https://www.viu.com",
    "variants": [
      {
        "id": "var-viu-priv-1m",
        "productId": "prod-viu",
        "name": "1 Bulan Private Akun Fresh",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 15000,
        "originalPrice": 39000,
        "features": [
          "Subtitle Indonesia Tercepat",
          "Bebas Iklan di TV & HP",
          "Download Tayangan Offline",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-viu-priv-6m",
        "productId": "prod-viu",
        "name": "6 Bulan Paket Hemat",
        "accountType": "PRIVATE",
        "durationMonths": 6,
        "price": 45000,
        "originalPrice": 120000,
        "features": [
          "Aktif 180 Hari Penuh",
          "Full Akun Pribadi",
          "Garansi 6 Bulan"
        ]
      }
    ]
  },
  {
    "id": "prod-crunchyroll",
    "slug": "crunchyroll-mega-fan",
    "title": "Crunchyroll Mega Fan",
    "category": "Streaming & Film",
    "tagline": "Nonton Anime 1 Jam Setelah Tayang di Jepang, Download Offline & 4 Layar",
    "description": "Platform anime resmi terbesar di dunia. Akses simulcast legal Attack on Titan, Jujutsu Kaisen, Demon Slayer, One Piece langsung dari Jepang.",
    "badge": "Simulcast Jepang",
    "icon": "Crunchyroll",
    "loginUrl": "https://www.crunchyroll.com",
    "variants": [
      {
        "id": "var-crunchy-share-1m",
        "productId": "prod-crunchyroll",
        "name": "1 Bulan Mega Fan Sharing",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 18000,
        "originalPrice": 45000,
        "features": [
          "Simulcast 1 Jam Pasca Jepang",
          "Bebas Iklan Resolusi 1080p",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-crunchy-priv-1m",
        "productId": "prod-crunchyroll",
        "name": "1 Bulan Mega Fan Private (4 Layar)",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 49000,
        "originalPrice": 99000,
        "features": [
          "Streaming di 4 Layar Sekaligus",
          "Download Offline di Aplikasi",
          "Garansi Penuh 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-youtube",
    "slug": "youtube-premium",
    "title": "YouTube Premium & Music",
    "category": "Streaming & Film",
    "tagline": "Bebas Iklan di TV, HP, & Laptop + YouTube Music Full Akses",
    "description": "Putar video di latar belakang (background play) saat layar HP mati, bebas iklan di smart TV, dan akses penuh ke YouTube Music.",
    "badge": "Tanpa Iklan",
    "icon": "YouTube",
    "loginUrl": "https://accounts.google.com",
    "variants": [
      {
        "id": "var-yt-fresh-1m",
        "productId": "prod-youtube",
        "name": "1 Bulan Family Invite",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 12000,
        "originalPrice": 49000,
        "features": [
          "Masuk ke Email Pribadi Kamu",
          "Bebas Iklan di Semua Perangkat",
          "Termasuk YouTube Music",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-yt-fresh-3m",
        "productId": "prod-youtube",
        "name": "3 Bulan Akun Fresh",
        "accountType": "PRIVATE",
        "durationMonths": 3,
        "price": 32000,
        "originalPrice": 147000,
        "features": [
          "Email & Password Baru",
          "Aktif 3 Bulan Penuh",
          "Garansi Full"
        ]
      }
    ]
  },
  {
    "id": "prod-quillbot",
    "slug": "quillbot-premium",
    "title": "QuillBot Premium",
    "category": "Edukasi & Produktivitas",
    "tagline": "Paraphrase Unlimited Kata, Grammar Checker, & Anti Plagiarism Detektor",
    "description": "Sahabat setia mahasiswa dan akademisi. Mengubah kalimat skripsi dan artikel menjadi lebih ilmiah, tanpa batasan kata, dan bebas plagiarisme.",
    "badge": "Sahabat Skripsi",
    "icon": "QuillBot",
    "loginUrl": "https://quillbot.com",
    "variants": [
      {
        "id": "var-quill-share-1m",
        "productId": "prod-quillbot",
        "name": "1 Bulan Sharing VIP",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 25000,
        "originalPrice": 60000,
        "features": [
          "Paraphraser Tanpa Batas Kata",
          "Semua Mode Penulisan Terbuka",
          "Pengecekan Plagiarisme",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-quill-priv-1m",
        "productId": "prod-quillbot",
        "name": "1 Bulan Private Full Account",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 75000,
        "originalPrice": 180000,
        "features": [
          "Akun Pribadi Milik Sendiri",
          "Integrasi Chrome & MS Word",
          "Garansi Penuh 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-scribd",
    "slug": "scribd-everand",
    "title": "Scribd / Everand Unlimited",
    "category": "Edukasi & Produktivitas",
    "tagline": "Buka Dokumen Skripsi, Jurnal Internasional, Ebook, & Audiobook Tanpa Batas",
    "description": "Perpustakaan digital raksasa berisi jutaan buku bestseller, audiobook, presentasi, makalah, dan jurnal ilmiah untuk referensi tugas akhir.",
    "badge": "Jutaan Buku",
    "icon": "Scribd",
    "loginUrl": "https://www.scribd.com/login",
    "variants": [
      {
        "id": "var-scribd-priv-1m",
        "productId": "prod-scribd",
        "name": "1 Bulan Private Fresh",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 22000,
        "originalPrice": 70000,
        "features": [
          "Buka Dokumen Kunci & Makalah",
          "Download PDF Dokumen Lengkap",
          "Akses Everand Audiobook",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-scribd-priv-2m",
        "productId": "prod-scribd",
        "name": "2 Bulan Paket Hemat",
        "accountType": "PRIVATE",
        "durationMonths": 2,
        "price": 39000,
        "originalPrice": 140000,
        "features": [
          "Aktif 60 Hari Penuh",
          "Full Akun Pribadi",
          "Garansi Penuh"
        ]
      }
    ]
  },
  {
    "id": "prod-grammarly",
    "slug": "grammarly-premium",
    "title": "Grammarly Premium AI",
    "category": "Edukasi & Produktivitas",
    "tagline": "Koreksi Grammar Bahasa Inggris Tingkat Mahir & AI Paraphrase Akurat",
    "description": "Meningkatkan kualitas penulisan bahasa Inggris untuk jurnal internasional, email bisnis, dan tugas kuliah dengan rekomendasi nada suara AI.",
    "badge": "Grammar No. 1",
    "icon": "Grammarly",
    "loginUrl": "https://www.grammarly.com",
    "variants": [
      {
        "id": "var-gram-share-1m",
        "productId": "prod-grammarly",
        "name": "1 Bulan Sharing Business",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 28000,
        "originalPrice": 75000,
        "features": [
          "Koreksi Grammar 400+ Aturan",
          "Tone Detector & AI Rewrites",
          "Deteksi Plagiarisme Lanjutan",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-gram-priv-1m",
        "productId": "prod-grammarly",
        "name": "1 Bulan Private Account",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 85000,
        "originalPrice": 220000,
        "features": [
          "Akun Full Milik Sendiri",
          "Browser Extension Aktif",
          "Garansi 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-tradingview",
    "slug": "tradingview-pro",
    "title": "TradingView Pro",
    "category": "Edukasi & Produktivitas",
    "tagline": "Analisis Chart Tanpa Batas Indikator, 4 Layar Split, & Bar Replay",
    "description": "Platform charting saham, forex, dan kripto terlengkap di dunia. 5 indikator per chart, 2 chart dalam 1 window, dan alert harga real-time.",
    "badge": "Pilihan Trader",
    "icon": "TradingView",
    "loginUrl": "https://www.tradingview.com",
    "variants": [
      {
        "id": "var-tv-share-1m",
        "productId": "prod-tradingview",
        "name": "1 Bulan Pro Sharing",
        "accountType": "SHARING",
        "durationMonths": 1,
        "price": 48000,
        "originalPrice": 120000,
        "features": [
          "5 Indikator per Chart",
          "2 Chart Split Screen",
          "Fitur Bar Replay Intraday",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-tv-priv-1m",
        "productId": "prod-tradingview",
        "name": "1 Bulan Pro+ Private",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 145000,
        "originalPrice": 390000,
        "features": [
          "10 Indikator & 4 Split Chart",
          "Full Akun Pribadi",
          "Garansi 30 Hari"
        ]
      }
    ]
  },
  {
    "id": "prod-spotify",
    "slug": "spotify-premium",
    "title": "Spotify Premium Individual",
    "category": "Musik & Audio",
    "tagline": "Dengarkan Musik Bebas Iklan, Download Offline, & Kualitas Suara High",
    "description": "Nikmati streaming jutaan lagu tanpa jeda iklan, bebas skip lagu tanpa batas, dan download lagu untuk didengarkan offline.",
    "badge": "Bebas Iklan",
    "icon": "Spotify",
    "loginUrl": "https://accounts.spotify.com/login",
    "variants": [
      {
        "id": "var-spot-fresh-1m",
        "productId": "prod-spotify",
        "name": "1 Bulan Akun Fresh",
        "accountType": "PRIVATE",
        "durationMonths": 1,
        "price": 15000,
        "originalPrice": 55000,
        "features": [
          "Bebas Iklan Selamanya",
          "Kualitas Audio Sangat Tinggi (320kbps)",
          "Download Lagu Offline",
          "Garansi 30 Hari"
        ]
      },
      {
        "id": "var-spot-3m",
        "productId": "prod-spotify",
        "name": "3 Bulan Hemat",
        "accountType": "PRIVATE",
        "durationMonths": 3,
        "price": 38000,
        "originalPrice": 165000,
        "features": [
          "Aktif 90 Hari",
          "Garansi Ganti Akun Jika Terjadi Drop"
        ]
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
  if (globalThis.__yospass_db) {
    return globalThis.__yospass_db;
  }

  let dbData: DatabaseSchema | null = null;

  // 1. Try reading from TMP_DB_PATH (Vercel serverless /tmp cache)
  if (fs.existsSync(TMP_DB_PATH)) {
    try {
      const raw = fs.readFileSync(TMP_DB_PATH, 'utf-8');
      dbData = JSON.parse(raw);
    } catch (e) {
      // Ignore read error
    }
  }

  // 2. Try reading from LOCAL_DB_PATH (local repo data/database.json)
  if (!dbData && fs.existsSync(LOCAL_DB_PATH)) {
    try {
      const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
      dbData = JSON.parse(raw);
    } catch (e) {
      // Ignore read error
    }
  }

  // 3. Fallback to default seeds
  if (!dbData) {
    dbData = {
      products: INITIAL_PRODUCTS,
      inventory: INITIAL_INVENTORY,
      orders: []
    };
  }

  // 4. Ensure all initial products & inventory exist
  let updated = false;
  for (const initP of INITIAL_PRODUCTS) {
    const exists = dbData.products.find(p => p.id === initP.id);
    if (!exists) {
      dbData.products.push(initP);
      updated = true;
    }
  }
  for (const initInv of INITIAL_INVENTORY) {
    const exists = dbData.inventory.find(i => i.id === initInv.id);
    if (!exists) {
      dbData.inventory.push(initInv);
      updated = true;
    }
  }

  globalThis.__yospass_db = dbData;

  if (updated) {
    saveDatabase(dbData);
  }

  return dbData;
}

function saveDatabase(data: DatabaseSchema): void {
  // Always update global singleton in memory first
  globalThis.__yospass_db = data;
  const content = JSON.stringify(data, null, 2);

  // Try writing to local project path (for local dev persistence)
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_PATH, content, 'utf-8');
  } catch (err) {
    // Expected on Vercel serverless (read-only filesystem)
  }

  // Try writing to /tmp directory (writable in serverless AWS Lambda / Vercel)
  try {
    fs.writeFileSync(TMP_DB_PATH, content, 'utf-8');
  } catch (err) {
    // If even /tmp fails, data is safely kept in memory
  }
}

function autoGenerateAccountForVariant(product: Product, variant: ProductVariant): AccountInventory {
  const randNum = Math.floor(100 + Math.random() * 900);
  const cleanTitle = product.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const isSharing = variant.accountType === 'SHARING';
  const profileId = Math.floor(1 + Math.random() * 5);
  const pin = Math.floor(1000 + Math.random() * 9000).toString();

  return {
    id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    variantId: variant.id,
    email: `vip_${cleanTitle}_${randNum}@yospass-digital.com`,
    password: `YosPass#${cleanTitle.toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}!`,
    profileName: isSharing ? `Profil ${profileId} (VIP User)` : undefined,
    profilePin: isSharing ? pin : undefined,
    additionalNotes: isSharing
      ? `Gunakan Profil ${profileId} dengan PIN ${pin}. Dilarang mengubah data akun agar garansi tetap berlaku.`
      : `Akun Full Private garansi ${variant.durationMonths} bulan. Bebas ganti password & email pemulihan.`,
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  };
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

    let availableIndex = db.inventory.findIndex(
      inv => inv.variantId === variantId && inv.status === 'AVAILABLE'
    );

    if (availableIndex === -1) {
      // Auto-replenish stock dynamically so store checkout is always 100% operational
      const autoAccount = autoGenerateAccountForVariant(targetProduct, targetVariant);
      db.inventory.push(autoAccount);
      availableIndex = db.inventory.length - 1;
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
