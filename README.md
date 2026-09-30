# YosPass — Apple Cupertino Digital Accounts Platform

<div align="center">
  <img src="public/icon.svg" width="96" height="96" alt="YosPass Monogram" />
  <h3>The Purest Gateway to Premium Apps</h3>
  <p><strong>Platform Jual Beli Akun Digital Otomatis Paling Rikat & Resmi</strong></p>
</div>

---

## ⚡ Ikhtisar (Overview)

**YosPass** adalah platform e-commerce digital goods otomatis berstandar industri dengan estetika desain Apple Cupertino (*Zero AI Slop*), mendukung dual-theme dinamis (PulseAi Light Mode & Midnight Obsidian Dark Mode), serta sistem pembayaran mandiri (*self-service checkout*) berbasis QRIS dinamis via **Pakasir (pakasir.com)**.

### ✨ Fitur Unggulan
1. **Self-Service Checkout (< 30 Detik)**: Pembeli memilih varian (sharing/private), memasukkan nomor WhatsApp, scan QRIS dinamis, dan kredensial login (Email + Password + PIN Profil) langsung tampil seketika di layar setelah pembayaran diverifikasi webhook.
2. **Dual-Theme Apple Cupertino**:
   - **Light Mode**: Royal electric blue gradient top header, floating frosted pill navbar, dan crisp white product cards.
   - **Dark Mode**: Midnight obsidian (`#060709`), subtle glassmorphism cards (`bg-white/[0.03]`), dan glowing sapphire accents.
3. **100% Authentic Brand Logos**:
   - OpenAI ChatGPT (6-petal interlocking knot)
   - Google Gemini (4-point radial gradient star)
   - Netflix (3-piece ribbon dimensional gradient)
   - CapCut (trapezoid film blades)
   - Spotify (green disc & 3 curved soundwaves)
   - YouTube (red squircle play button)
   - Claude Anthropic (terracotta 8-spoke sunburst)
   - YosPass (futuristic Apple-style "Y" crystal diamond monogram)
4. **Stealth Vault Admin**:
   - URL: `/vault-control-center`
   - Master PIN Otorisasi: `889922`
   - Fitur: Manajemen katalog produk & varian lengkap (CRUD), bulk input stok akun, monitor pesanan, dan analytics omset real-time.
   - **Zero Public Link**: Tautan admin tersembunyi total dari navbar dan footer publik.
5. **Pakasir Payment Gateway**:
   - Integrasi resmi Pakasir API v2 untuk generate QRIS instan.
   - Webhook otomatis di `/api/webhook/pakasir` untuk auto-settlement dan pelepasan akun seketika.
6. **Lacak Pesanan Mandiri**:
   - Akses di `/cek-pesanan` menggunakan nomor WhatsApp tanpa perlu chat admin manual.

---

## 🚀 Panduan Menjalankan Lokal

```bash
# Install dependensi
npm install

# Build untuk produksi
npm run build

# Jalankan server
npm start -- -p 3005
```

Akses aplikasi di browser:
- **Toko Publik**: `http://localhost:3005`
- **Lacak Pesanan**: `http://localhost:3005/cek-pesanan`
- **Stealth Vault Control**: `http://localhost:3005/vault-control-center` *(PIN: 889922)*

---

## 🌐 Panduan Deploy ke Vercel & Beli Domain

1. **Push ke GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete YosPass rebranding and official assets"
   git push origin main
   ```
2. **Import ke Vercel**:
   - Kunjungi [vercel.com](https://vercel.com) -> **Add New Project** -> Pilih repositori GitHub Anda.
   - Framework preset: **Next.js**.
   - Klik **Deploy**.
3. **Konfigurasi Webhook di Pakasir (pakasir.com)**:
   - Buat proyek di Pakasir Dashboard.
   - Masukkan Webhook URL: `https://[domain-anda.vercel.app]/api/webhook/pakasir`
4. **Domain Kustom**:
   - Beli domain pilihan Anda (cth: `yospass.com` atau `yospass.id` di Hostinger / Niagahoster / Rumahweb).
   - Sambungkan DNS A-Record atau CNAME ke Vercel sesuai instruksi di Vercel Dashboard -> Settings -> Domains.

---

© 2026 YosPass. Hak Cipta Dilindungi.
