import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Nomor WhatsApp diperlukan.' }, { status: 400 });
    }

    const orders = dbStore.lookupOrdersByPhone(phone);
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error('API Orders Lookup Error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
