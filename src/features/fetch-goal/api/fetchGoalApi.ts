import { clientFetch } from '@/shared/api';

export const fetchGoal = async (goalId: string) => {
  const endpoint = `/api/goal/${goalId}`;
  const parsedResponse = await clientFetch.get(endpoint);

  return parsedResponse;
};
