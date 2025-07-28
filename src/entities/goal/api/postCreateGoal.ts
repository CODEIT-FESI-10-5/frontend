import { clientFetch } from '@/shared/api';
import { PostCreateGoalResponse } from '../model';

export const postCreateGoal = async (data: {
  title: string;
  studyId: number;
}): Promise<PostCreateGoalResponse> => {
  return clientFetch.post('/api/goals', data);
};
