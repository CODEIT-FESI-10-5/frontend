import { useQuery } from '@tanstack/react-query';
import { getGoalList } from '@/entities/goal/api/getGoalList';
import { GoalListResponse, goalQueryKeys } from '@/entities/goal';

export const useGetGoal = () => {
  return useQuery<GoalListResponse>({
    queryKey: goalQueryKeys.list(),
    queryFn: getGoalList,
  });
};
