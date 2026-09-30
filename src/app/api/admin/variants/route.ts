import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, name, accountType, durationMonths, price, originalPrice, features } = body;

    if (!productId || !name || !price) {
      return NextResponse.json(
        { success: false, error: 'Product ID, nama varian, dan harga wajib diisi.' },
        { status: 400 }
      );
    }

    const newVariant = dbStore.addVariant(productId, {
      name,
      accountType: accountType || 'SHARING',
      durationMonths: Number(durationMonths) || 1,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      features: Array.isArray(features) ? features : (typeof features === 'string' ? features.split(',').map((f: string) => f.trim()) : [])
    });

    if (!newVariant) {
      return NextResponse.json({ success: false, error: 'Produk induk tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: newVariant });
  } catch (error) {
    console.error('Admin Variant POST Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menambahkan varian' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { productId, variantId, updates } = body;

    if (!productId || !variantId) {
      return NextResponse.json({ success: false, error: 'Product ID dan Variant ID wajib diisi.' }, { status: 400 });
    }

    const updated = dbStore.updateVariant(productId, variantId, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Varian tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Admin Variant PUT Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal memperbarui varian' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    const variantId = searchParams.get('variantId');

    if (!productId || !variantId) {
      return NextResponse.json({ success: false, error: 'Product ID dan Variant ID wajib disertakan.' }, { status: 400 });
    }

    const ok = dbStore.deleteVariant(productId, variantId);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('Admin Variant DELETE Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menghapus varian' }, { status: 500 });
  }
}
