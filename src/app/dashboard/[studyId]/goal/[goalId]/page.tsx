"use client";

import { use } from "react";
import { useDashboard } from "../../../../../features/dashboard/model";
import Dashboard from "../../../../../features/dashboard/Dashboard";

interface DashboardPageProps {
  params: Promise<{
    studyId: string;
    goalId: string;
  }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { studyId, goalId } = use(params);

  const { data: dashboard, isLoading, error } = useDashboard(studyId, goalId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-white">대시보드 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">대시보드를 불러오는 중 에러가 발생했습니다: {error instanceof Error ? error.message : "알 수 없는 에러"}</div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">대시보드를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Dashboard />
    </div>
  );
}
