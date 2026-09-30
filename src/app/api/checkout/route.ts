import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';
import { pakasirClient } from '@/lib/pakasir';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerPhone, customerEmail, variantId, paymentMethod } = body;

    if (!customerPhone || !variantId) {
      return NextResponse.json(
        { success: false, error: 'Nomor WhatsApp dan varian wajib diisi.' },
        { status: 400 }
      );
    }

    const result = dbStore.createOrder(customerPhone, customerEmail, variantId, paymentMethod || 'QRIS');

    if (result.error || !result.order) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    // Call Pakasir client to obtain QRIS payload with fallback protection
    let qrisData;
    try {
      qrisData = await pakasirClient.createDynamicQRIS({
        invoiceNumber: result.order.invoiceNumber,
        amount: result.order.amount,
        customerPhone,
        productName: `${result.order.productTitle} (${result.order.variantName})`
      });
    } catch (pakasirErr) {
      console.warn('[Checkout API] Pakasir QRIS creation warning, using fallback QRIS:', pakasirErr);
      const rawQr = result.order.qrisPayload || '';
      qrisData = {
        success: true,
        qrString: rawQr,
        qrImageUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(rawQr)}&size=340x340&margin=8`,
        expiredAt: result.order.expiresAt
      };
    }

    const finalQrString = qrisData?.qrString || result.order.qrisPayload || '';
    const finalQrImage = qrisData?.qrImageUrl || `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(finalQrString)}&size=340x340&margin=8`;

    return NextResponse.json({
      success: true,
      data: {
        invoiceNumber: result.order.invoiceNumber,
        amount: result.order.amount,
        productTitle: result.order.productTitle,
        variantName: result.order.variantName,
        paymentMethod: result.order.paymentMethod,
        qrisPayload: finalQrString,
        qrImageUrl: finalQrImage,
        expiresAt: qrisData?.expiredAt || result.order.expiresAt
      }
    });
  } catch (error: any) {
    console.error('API Checkout Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Terjadi kesalahan sistem saat checkout.' },
      { status: 500 }
    );
  }
}
