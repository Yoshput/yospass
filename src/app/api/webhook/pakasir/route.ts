import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

/**
 * Webhook Handler untuk Pakasir.com
 * Dipanggil secara otomatis oleh server Pakasir begitu dana QRIS terverifikasi masuk.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Ambil order id / invoice number dari payload Pakasir
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

    // Cek apakah status pembayaran sukses / lunas
    const isPaid =
      status === 'paid' ||
      status === 'success' ||
      status === 'completed' ||
      body.payment_status === 'PAID';

    if (isPaid) {
      // Selesaikan pesanan & serahkan kredensial akun secara instan
      const settleResult = dbStore.simulatePayment(invoiceNumber);
      if (settleResult.success) {
        console.log(`[PAKASIR WEBHOOK] Pesanan ${invoiceNumber} berhasil dilunaskan via webhook.`);
        return NextResponse.json({
          success: true,
          message: `Order ${invoiceNumber} marked as PAID and credentials released.`
        });
      } else {
        console.error(`[PAKASIR WEBHOOK] Gagal settle order: ${settleResult.error}`);
        return NextResponse.json({ success: false, error: settleResult.error }, { status: 404 });
      }
    }

    // Jika status masih pending atau expired
    return NextResponse.json({ success: true, message: `Status ${status} acknowledged.` });
  } catch (error: any) {
    console.error('Pakasir Webhook Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal webhook error' },
      { status: 500 }
    );
  }
}
