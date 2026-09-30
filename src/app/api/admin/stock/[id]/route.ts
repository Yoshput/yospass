import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = dbStore.deleteInventoryItem(id);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('Admin Stock DELETE Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menghapus stok akun' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    const ok = dbStore.updateInventoryStatus(id, status);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('Admin Stock PATCH Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal memperbarui status akun' }, { status: 500 });
  }
}
