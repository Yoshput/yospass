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

    // Call Pakasir client to obtain QRIS payload
    const qrisData = await pakasirClient.createDynamicQRIS({
      invoiceNumber: result.order.invoiceNumber,
      amount: result.order.amount,
      customerPhone,
      productName: `${result.order.productTitle} (${result.order.variantName})`
    });

    return NextResponse.json({
      success: true,
      data: {
        invoiceNumber: result.order.invoiceNumber,
        amount: result.order.amount,
        productTitle: result.order.productTitle,
        variantName: result.order.variantName,
        paymentMethod: result.order.paymentMethod,
        qrisPayload: qrisData.qrString || result.order.qrisPayload,
        qrImageUrl: qrisData.qrImageUrl,
        expiresAt: qrisData.expiredAt || result.order.expiresAt
      }
    });
  } catch (error) {
    console.error('API Checkout Error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan sistem saat checkout.' }, { status: 500 });
  }
}
