import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function GET() {
  try {
    const products = dbStore.getProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Admin Products GET Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, category, tagline, description, badge, icon, loginUrl, variants } = body;

    if (!title || !category || !tagline) {
      return NextResponse.json(
        { success: false, error: 'Judul, kategori, dan tagline wajib diisi.' },
        { status: 400 }
      );
    }

    const createdProduct = dbStore.addProduct({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      tagline,
      description: description || tagline,
      badge: badge || '',
      icon: icon || 'Lumina',
      loginUrl: loginUrl || 'https://google.com',
      variants: variants || []
    });

    return NextResponse.json({ success: true, data: createdProduct });
  } catch (error) {
    console.error('Admin Products POST Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menambahkan produk baru' }, { status: 500 });
  }
}
