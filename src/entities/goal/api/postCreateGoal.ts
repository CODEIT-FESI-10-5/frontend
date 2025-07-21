import { clientFetch } from '@/shared/api';

export const postCreateGoal = async (): Promise<{ id: string }> => {
  return clientFetch.post('api/goal/create');
};
