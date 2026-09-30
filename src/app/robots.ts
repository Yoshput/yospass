import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yospass.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/vault-control-center', '/admin', '/api/admin/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
