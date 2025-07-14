"use client";

import { useQuery } from "@tanstack/react-query";
import { Dashboard as DashboardType } from "./types";
import TodoList from "./component/todolist";

// API 함수
const fetchDashboard = async (groupId: string, goalId: string): Promise<DashboardType> => {
  const response = await fetch(`/api/dashboard?groupId=${groupId}&goalId=${goalId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard");
  }
  return response.json();
};

// React Query 훅
const useDashboard = (groupId: string, goalId: string) => {
  return useQuery<DashboardType>({
    queryKey: ["dashboard", groupId, goalId],
    queryFn: () => fetchDashboard(groupId, goalId),
    enabled: !!groupId && !!goalId,
  });
};

export default function Dashboard() {
  const groupId = "study-1"; // 실제로는 props나 params에서 가져올 것
  const goalId = "goal-1"; // 실제로는 props나 params에서 가져올 것

  const { data: dashboard, isLoading, error } = useDashboard(groupId, goalId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">대시보드 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">에러 발생: {error instanceof Error ? error.message : "알 수 없는 에러"}</div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">대시보드 데이터를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col items-start justify-center gap-2">
      <h2 className="text-[#d4d4d4] font-semibold text-xl ml-2">스터디 현황</h2>
      <TodoList dashboard={dashboard} />
    </div>
  );
}
