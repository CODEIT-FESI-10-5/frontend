import { clientFetch } from '@/shared/api';

export const fetchTodolist = async (goalId: string) => {
  const endpoint = `/api/goal/${goalId}/todolist`;
  const parsedResponse = await clientFetch.get(endpoint);

  return parsedResponse;
};
