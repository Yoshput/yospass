import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';
import { PAKASIR_CONFIG } from '@/lib/pakasir';

/**
 * Webhook Handler untuk Pakasir.com (Official API v2)
 * Dipanggil secara otomatis oleh server Pakasir begitu dana QRIS terverifikasi masuk.
 * Endpoint URL: https://yospass.vercel.app/api/webhook/pakasir
 */
export async function POST(req: Request) {
  try {
    // 1. Verifikasi Header X-Secret dari Pakasir
    const incomingSecret =
      req.headers.get('x-secret') ||
      req.headers.get('X-Secret') ||
      req.headers.get('x-webhook-secret');

    if (PAKASIR_CONFIG.webhookSecret && incomingSecret) {
      if (incomingSecret !== PAKASIR_CONFIG.webhookSecret) {
        console.warn(`[PAKASIR WEBHOOK v2] Secret mismatch! Received: ${incomingSecret}`);
        return NextResponse.json(
          { success: false, message: 'Invalid webhook signature / secret' },
          { status: 401 }
        );
      }
    }

    const body = await req.json();
    console.log('[PAKASIR WEBHOOK v2] Received payload:', body);

    // 2. Ambil order id / invoice number dari payload Pakasir v2
    const invoiceNumber =
      body.order_id ||
      body.invoice ||
      body.merchant_ref ||
      body.data?.order_id ||
      body.data?.invoice;

    const status = (body.status || body.data?.status || '').toLowerCase();

    if (!invoiceNumber) {
      return NextResponse.json(
        { success: false, message: 'Missing order_id in webhook payload' },
        { status: 400 }
      );
    }

    // 3. Cek apakah status pembayaran sukses / lunas ("completed" pada API v2)
    const isPaid =
      status === 'completed' ||
      status === 'paid' ||
      status === 'success' ||
      body.payment_status === 'PAID';

    if (isPaid) {
      // Selesaikan pesanan & serahkan kredensial akun secara instan
      const settleResult = dbStore.simulatePayment(invoiceNumber);
      if (settleResult.success) {
        console.log(`[PAKASIR WEBHOOK v2] Pesanan ${invoiceNumber} BERHASIL DILUNASKAN via Webhook Otomatis!`);
        return NextResponse.json({
          success: true,
          message: `Order ${invoiceNumber} marked as PAID and digital account credentials released.`
        });
      } else {
        console.error(`[PAKASIR WEBHOOK v2] Gagal settle order ${invoiceNumber}: ${settleResult.error}`);
        // Tetap return 200 jika order sudah lunas sebelumnya agar Pakasir tidak retry tanpa henti
        return NextResponse.json({ success: true, message: settleResult.error });
      }
    }

    // Status pending / expired acknowledged
    return NextResponse.json({ success: true, message: `Status ${status} received.` });
  } catch (error: any) {
    console.error('Pakasir Webhook Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal webhook error' },
      { status: 500 }
    );
  }
}
