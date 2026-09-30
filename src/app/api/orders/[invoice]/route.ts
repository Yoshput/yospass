import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ invoice: string }> }
) {
  try {
    const { invoice } = await params;
    if (!invoice) {
      return NextResponse.json({ success: false, error: 'Nomor invoice diperlukan.' }, { status: 400 });
    }

    const order = dbStore.getOrder(invoice);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Pesanan tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('API Order Get Error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}
