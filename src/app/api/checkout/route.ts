import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';
import { pakasirClient } from '@/lib/pakasir';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerPhone, customerEmail, variantId, paymentMethod, voucherCode } = body;

    if (!customerPhone || !variantId) {
      return NextResponse.json(
        { success: false, error: 'Nomor WhatsApp dan varian wajib diisi.' },
        { status: 400 }
      );
    }

    // Validate voucher before creating order
    let voucherDiscount = 0;
    let appliedVoucherCode = '';
    if (voucherCode) {
      // We need to get the variant price first to validate
      const products = dbStore.getProducts();
      let variantPrice = 0;
      for (const p of products) {
        const v = p.variants.find(x => x.id === variantId);
        if (v) { variantPrice = v.price; break; }
      }
      const vResult = dbStore.validateVoucher(voucherCode, variantPrice);
      if (!vResult.valid) {
        return NextResponse.json({ success: false, error: vResult.error }, { status: 400 });
      }
      voucherDiscount = vResult.discount || 0;
      appliedVoucherCode = voucherCode;
    }

    const result = dbStore.createOrder(customerPhone, customerEmail, variantId, paymentMethod || 'QRIS');

    if (result.error || !result.order) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    // Apply voucher discount to order amount
    let finalAmount = result.order.amount;
    if (voucherDiscount > 0) {
      finalAmount = result.order.amount - voucherDiscount;
      if (finalAmount < 0) finalAmount = 0;
      result.order.amount = finalAmount;
      // Mark voucher as used & persist discounted amount to DB
      dbStore.applyVoucher(appliedVoucherCode, result.order.invoiceNumber);
      dbStore.updateOrderAmount(result.order.invoiceNumber, finalAmount);
    }

    // Call Pakasir client to obtain QRIS payload with fallback protection
    let qrisData;
    try {
      qrisData = await pakasirClient.createDynamicQRIS({
        invoiceNumber: result.order.invoiceNumber,
        amount: finalAmount,
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
        amount: finalAmount,
        originalAmount: result.order.amount + voucherDiscount,
        voucherDiscount,
        voucherCode: appliedVoucherCode || undefined,
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
