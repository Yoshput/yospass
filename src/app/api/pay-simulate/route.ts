import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { invoiceNumber } = body;

    if (!invoiceNumber) {
      return NextResponse.json({ success: false, error: 'Invoice number diperlukan.' }, { status: 400 });
    }

    const result = dbStore.simulatePayment(invoiceNumber);

    if (!result.success || !result.order) {
      return NextResponse.json({ success: false, error: result.error || 'Gagal memproses pembayaran.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Pembayaran berhasil diverifikasi secara instan!',
      data: result.order
    });
  } catch (error) {
    console.error('API Pay Simulate Error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
