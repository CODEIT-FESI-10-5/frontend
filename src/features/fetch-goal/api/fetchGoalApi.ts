import { clientFetch } from '@/shared/api';

export const fetchGoal = async (todolistId: string) => {
  const endpoint = `/api/todolist/${todolistId}`;
  const parsedResponse = await clientFetch.get(endpoint);

  return parsedResponse;
};
