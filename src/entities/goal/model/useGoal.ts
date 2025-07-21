import { useQuery } from '@tanstack/react-query';
import { fetchGoal } from '../api';
import { Goal } from './types';
import { goalQueryKeys } from './queryKeys';

// Goal React Query 훅
export const useGoal = (groupId: string, goalId: string) => {
  return useQuery<Goal>({
    queryKey: goalQueryKeys.detail(goalId),
    queryFn: () => fetchGoal(groupId, goalId),
    enabled: !!groupId && !!goalId,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 방지
  });
};
