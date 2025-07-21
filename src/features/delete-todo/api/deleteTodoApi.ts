import { clientFetch } from '@/shared/api';

export const deleteTodo = async (goaldId: string, todoId: string) => {
  const endpoint = `/api/goal/${goaldId}/todo/${todoId}`;
  const parsedResponse = await clientFetch.delete(endpoint);

  return parsedResponse;
};
