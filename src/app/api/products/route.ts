import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function GET() {
  try {
    const products = dbStore.getProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('API Products Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}
