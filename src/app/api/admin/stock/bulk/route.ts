import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const { variantId, rawData } = await req.json();

    if (!variantId || !rawData) {
      return NextResponse.json(
        { success: false, error: 'Variant ID dan format data akun wajib disertakan.' },
        { status: 400 }
      );
    }

    const lines = rawData.split('\n');
    const result = dbStore.addStockBulk(variantId, lines);

    return NextResponse.json({
      success: true,
      data: result,
      message: `Berhasil menambahkan ${result.added} akun ke stok.${result.failed > 0 ? ` (${result.failed} baris dilewati karena format tidak sesuai)` : ''}`
    });
  } catch (error) {
    console.error('Admin Stock Bulk POST Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal memproses bulk stock' }, { status: 500 });
  }
}
