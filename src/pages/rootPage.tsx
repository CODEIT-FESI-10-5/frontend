'use client';

import { useRedirect } from '@/shared/lib/utils/useRedirect';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  const url = useRedirect('study'); // 스터디/목표 기준 자동 리다이렉트
  useEffect(() => {
    if (url) {
      router.replace(url);
      return; // url이 있으면 리다이렉트하고 loading 상태 유지
    }
  }, [url, router]);

  return <></>;
}
