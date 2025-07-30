'use client';
import { useDashboardRedirect } from '@/features/redirect/model';

export default function DashboardPage() {
  useDashboardRedirect();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg">대시보드로 이동 중...</div>
    </div>
  );
}
