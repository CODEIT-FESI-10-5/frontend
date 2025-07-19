import { clientFetch } from '../../../shared/api';
import { Goal } from '../model';

export const fetchGoal = async (
  groupId: string,
  goalId: string,
): Promise<Goal> => {
  return clientFetch.get<Goal>('/goal', {
    params: { groupId, goalId },
  });
};
