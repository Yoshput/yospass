import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const { code, amount } = await req.json();
    if (!code) return NextResponse.json({ valid: false, error: 'Kode voucher wajib diisi.' }, { status: 400 });
    const result = dbStore.validateVoucher(code, amount || 0);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ valid: false, error: err?.message || 'Gagal validasi voucher.' }, { status: 500 });
  }
}
