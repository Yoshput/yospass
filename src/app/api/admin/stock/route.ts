import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { variantId, email, password, profileName, profilePin, notes, bulkText } = body;

    // Support single add or bulk import
    if (bulkText && variantId) {
      // Format per line: email|password|profile|pin|notes
      const lines = bulkText.split('\n').filter((l: string) => l.trim().length > 0);
      let count = 0;
      for (const line of lines) {
        const parts = line.split('|').map((p: string) => p.trim());
        if (parts.length >= 2) {
          const [em, pw, prof, pin, nt] = parts;
          dbStore.addStock(variantId, em, pw, prof || undefined, pin || undefined, nt || undefined);
          count++;
        }
      }
      return NextResponse.json({ success: true, message: `Berhasil menambahkan ${count} akun ke stok.` });
    }

    if (!variantId || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Variant ID, Email, dan Password wajib diisi.' },
        { status: 400 }
      );
    }

    const created = dbStore.addStock(variantId, email, password, profileName, profilePin, notes);
    return NextResponse.json({ success: true, message: 'Akun berhasil ditambahkan ke stok gudang!', data: created });
  } catch (error) {
    console.error('API Admin Stock Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menambahkan stok.' }, { status: 500 });
  }
}
