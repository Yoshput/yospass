import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function GET() {
  return NextResponse.json({ vouchers: dbStore.getAllVouchers() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, discountType, discountValue, maxUsage, isActive, description, minPurchase, maxDiscount, validFrom, validUntil } = body;
    if (!code || !discountType || !discountValue) {
      return NextResponse.json({ error: 'Code, discountType, discountValue wajib.' }, { status: 400 });
    }
    const voucher = dbStore.createVoucher({
      code, discountType, discountValue: Number(discountValue),
      maxUsage: Number(maxUsage) || 0, isActive: isActive !== false,
      description: description || '', minPurchase: Number(minPurchase) || undefined,
      maxDiscount: Number(maxDiscount) || undefined,
      validFrom: validFrom || undefined, validUntil: validUntil || undefined
    });
    return NextResponse.json({ success: true, voucher });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Gagal buat voucher.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const ok = dbStore.deleteVoucher(id);
  return NextResponse.json({ success: ok });
}

export async function PATCH(req: NextRequest) {
  const { id } = await req.json();
  const v = dbStore.toggleVoucher(id);
  return NextResponse.json({ success: !!v, voucher: v });
}
