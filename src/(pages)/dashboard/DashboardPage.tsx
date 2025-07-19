import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // 기본 스터디 그룹과 목표로 리다이렉트
    router.replace('/dashboard/study-1/goal-1');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg">대시보드로 이동 중...</div>
    </div>
  );
}
