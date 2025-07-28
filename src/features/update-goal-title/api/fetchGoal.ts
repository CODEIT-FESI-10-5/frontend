import { clientFetch } from '../../../shared/api';
import { Goal } from '../model';

export const fetchGoal = async (goalId: string): Promise<Goal> => {
  return clientFetch.get<Goal>(`/api/goals/${goalId}`);
};
