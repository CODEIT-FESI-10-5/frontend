import { clientFetch } from '@/shared/api';
import { GoalListResponseApi } from '../model';

export const getGoalList = async (
  studyId: number,
): Promise<GoalListResponseApi> => {
  return clientFetch.get(`/api/studies/${studyId}/goals`);
};
