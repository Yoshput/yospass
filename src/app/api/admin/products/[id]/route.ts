import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = dbStore.updateProduct(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Produk tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Admin Product PUT Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal memperbarui produk' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = dbStore.deleteProduct(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Produk gagal dihapus atau tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Produk dan stok terkait berhasil dihapus.' });
  } catch (error) {
    console.error('Admin Product DELETE Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menghapus produk' }, { status: 500 });
  }
}
