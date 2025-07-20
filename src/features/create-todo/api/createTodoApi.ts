import { clientFetch } from '@/shared/api';

export interface newTodoData {
  content: string;
  shared: boolean;
}
export const createTodo = async (todolistId: string, newTodo: newTodoData) => {
  const endpoint = `/api/todolist/${todolistId}/todo`;
  const parsedResponse = await clientFetch.post(endpoint, newTodo);

  return parsedResponse;
};
