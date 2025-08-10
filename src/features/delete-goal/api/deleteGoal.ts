import { clientFetch } from '@/shared/api';

export const deleteGoals = async (goalId: string) => {
  const parsedResponse = await clientFetch.delete(`/api/goals/${goalId}`);

  return parsedResponse;
};
