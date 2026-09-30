'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Secretly route to the protected vault
    router.replace('/vault-control-center');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050608] flex items-center justify-center text-slate-500 text-xs font-mono">
      Redirecting to secure console...
    </div>
  );
}
