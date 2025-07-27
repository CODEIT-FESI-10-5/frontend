import { useQuery } from '@tanstack/react-query';
import {
  Dashboard,
  dashboardQueryKeys,
  DashboardResponse,
} from '@/entities/dashboard';
import { fetchDashboard } from '@/entities/dashboard';

// Goal React Query 훅
export const useDashboard = (goalId: string) => {
  return useQuery<DashboardResponse, Error, Dashboard>({
    queryKey: dashboardQueryKeys.goal(goalId),
    queryFn: () => fetchDashboard(goalId),
    enabled: !!goalId,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 방지
    select: (response: DashboardResponse) => {
      const data = response.data;
      return {
        ...data,
      };
    },
  });
};
