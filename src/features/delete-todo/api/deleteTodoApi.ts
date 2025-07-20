import { clientFetch } from '@/shared/api';

export const deleteTodo = async (todolistId: string, todoId: string) => {
  const endpoint = `/api/todolist/${todolistId}/todo/${todoId}`;
  const parsedResponse = await clientFetch.delete(endpoint);

  return parsedResponse;
};
