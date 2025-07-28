import { clientFetch } from '@/shared/api';

export const postCreateGoal = async (data: {
  title: string;
  studyId: number;
}): Promise<{ id: string }> => {
  return clientFetch.post('/api/goals', data);
};
