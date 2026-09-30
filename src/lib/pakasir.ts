/**
 * Pakasir.com Payment Gateway Integration Helper
 * URL: https://pakasir.com
 *
 * Dirancang untuk penerimaan pembayaran QRIS otomatis instan di Indonesia
 * bagi perorangan / digital store tanpa syarat PT / CV berbelit-belit.
 */

export interface PakasirConfig {
  apiKey: string;
  merchantCode: string;
  isProduction: boolean;
  webhookSecret?: string;
}

export const PAKASIR_CONFIG: PakasirConfig = {
  apiKey: process.env.PAKASIR_API_KEY || 'demo_pakasir_api_key_2026',
  merchantCode: process.env.PAKASIR_MERCHANT_CODE || 'LUMINA_MERCHANT',
  isProduction: process.env.NODE_ENV === 'production',
  webhookSecret: process.env.PAKASIR_WEBHOOK_SECRET || 'secret_webhook_key'
};

export interface CreateQrisRequest {
  invoiceNumber: string;
  amount: number;
  customerPhone: string;
  customerName?: string;
  productName: string;
}

export interface CreateQrisResponse {
  success: boolean;
  qrString?: string;
  qrImageUrl?: string;
  expiredAt?: string;
  error?: string;
}

export const pakasirClient = {
  /**
   * Request QRIS dinamis baru ke Pakasir
   */
  async createDynamicQRIS(payload: CreateQrisRequest): Promise<CreateQrisResponse> {
    try {
      // In live production with real Pakasir credentials:
      if (process.env.PAKASIR_API_KEY && process.env.PAKASIR_API_KEY !== 'demo_pakasir_api_key_2026') {
        const res = await fetch('https://api.pakasir.com/v1/payment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PAKASIR_CONFIG.apiKey}`
          },
          body: JSON.stringify({
            merchant_code: PAKASIR_CONFIG.merchantCode,
            order_id: payload.invoiceNumber,
            amount: payload.amount,
            customer_phone: payload.customerPhone,
            item_name: payload.productName,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://luminapass.id'}/api/webhook/pakasir`
          })
        });

        const json = await res.json();
        if (json.status === 'success' || json.success) {
          return {
            success: true,
            qrString: json.qr_string || json.data?.qr_string,
            qrImageUrl: json.qr_image_url || json.data?.qr_image_url,
            expiredAt: json.expired_at || json.data?.expired_at
          };
        }
        return { success: false, error: json.message || 'Gagal generate QRIS Pakasir' };
      }

      // Standby / Simulator Mode (Jika belum isi API Key Pakasir asli)
      return {
        success: true,
        qrString: `00020101021226600016ID.CO.PAKASIR.WWW011893600999000000000151440000000000520458125303360540${payload.amount}.005802ID5911LUMINA PASS6009PURWOKERTO62200116${payload.invoiceNumber}630489A1`,
        expiredAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      };
    } catch (err: any) {
      console.error('Pakasir Create QRIS Error:', err);
      return { success: false, error: err.message || 'Koneksi ke Pakasir gagal' };
    }
  }
};
