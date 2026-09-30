import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { ToastProvider } from "@/components/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://yospass.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "YosPass — Platform Akun Premium Instan & Tercepat | Apple Cupertino Grade",
    template: "%s | YosPass"
  },
  description:
    "Platform jual beli akun digital resmi otomatis paling rikat: ChatGPT Plus & Pro, Google Gemini 18 Bulan, Netflix 4K UHD, CapCut Pro, Spotify, YouTube. Pengiriman instan < 30 detik via QRIS otomatis.",
  keywords: [
    "yospass",
    "akun premium",
    "beli chatgpt plus",
    "chatgpt pro murah",
    "google gemini 18 bulan",
    "netflix 4k uhd",
    "capcut pro resmi",
    "spotify premium murah",
    "youtube premium tanpa iklan",
    "qris otomatis",
    "auto delivery digital accounts"
  ],
  authors: [{ name: "YosPass" }],
  creator: "YosPass",
  publisher: "YosPass",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: APP_URL,
    siteName: "YosPass",
    title: "YosPass — Platform Akun Premium Instan & Tercepat",
    description: "Beli akun digital premium otomatis via QRIS. Akses instan < 30 detik bergaransi resmi.",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "YosPass Monogram"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "YosPass — Platform Akun Premium Instan & Tercepat",
    description: "Beli akun digital premium otomatis via QRIS. Kredensial muncul seketika di layar Anda.",
    images: ["/icon.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "YosPass"
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563EB" },
    { media: "(prefers-color-scheme: dark)", color: "#060709" }
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration error', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
