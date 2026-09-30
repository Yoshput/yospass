import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/store';

export async function GET() {
  try {
    const stats = dbStore.getAdminStats();
    const allOrders = dbStore.getAllOrders();
    const inventory = dbStore.getAllInventory();

    return NextResponse.json({
      success: true,
      data: {
        stats,
        orders: allOrders.slice(-20).reverse(), // latest 20
        inventory: inventory.slice(-30).reverse() // latest 30
      }
    });
  } catch (error) {
    console.error('API Admin Stats Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengambil data admin.' }, { status: 500 });
  }
}
