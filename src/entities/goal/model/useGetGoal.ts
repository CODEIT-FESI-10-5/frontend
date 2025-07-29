import { useQuery } from '@tanstack/react-query';
import { getGoalList } from '@/entities/goal/api/getGoalList';
import { GoalListResponseApi, goalQueryKeys } from '@/entities/goal';

export const useGetGoal = (
  studyId: number,
  options?: { enabled?: boolean },
) => {
  return useQuery<GoalListResponseApi, Error, GoalListResponseApi['data']>({
    queryKey: goalQueryKeys.list(studyId),
    queryFn: () => getGoalList(studyId),
    select: (response) => response.data,
    enabled: options?.enabled ?? true,
  });
};
