import { clientFetch } from '@/shared/api';

export const deleteTodo = async (todoId: string) => {
  const endpoint = `/api/todos/${todoId}`;
  const parsedResponse = await clientFetch.delete(endpoint);

  return parsedResponse;
};
