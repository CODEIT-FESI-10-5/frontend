import { useQuery } from '@tanstack/react-query';
import { fetchGoal } from '../../api/fetchGoalApi';

export const useGoalQuery = (goalId: string) => {
  return useQuery({
    queryKey: ['todolist', goalId],
    queryFn: () => fetchGoal(goalId),
  });
};
