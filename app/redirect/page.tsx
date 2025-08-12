'use client';

import { useRedirect } from '@/shared/lib/utils/useRedirect';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();
  const targetUrl = useRedirect();

  useEffect(() => {
    if (targetUrl) {
      router.replace(targetUrl);
    }
  }, [targetUrl, router]);

  return null;
}
