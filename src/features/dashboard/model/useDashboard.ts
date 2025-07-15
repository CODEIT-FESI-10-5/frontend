import { useQuery } from "@tanstack/react-query";
import type { Dashboard } from "../../../entities/dashboard";
import { fetchDashboard } from "../api";

// Dashboard React Query 훅
export const useDashboard = (groupId: string, goalId: string) => {
  return useQuery<Dashboard>({
    queryKey: ["dashboard", groupId, goalId],
    queryFn: () => fetchDashboard(groupId, goalId),
    enabled: !!groupId && !!goalId,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 방지
  });
};
