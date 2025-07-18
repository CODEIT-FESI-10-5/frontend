import { clientFetch } from '@/shared/api';
import { GoalListResponse } from '../model';

export const getGoalList = async (): Promise<GoalListResponse> => {
  return clientFetch.get('api/sidebar/goal-list');
};
