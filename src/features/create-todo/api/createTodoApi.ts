import { clientFetch } from '@/shared/api';

export interface newTodoData {
  content: string;
  shared: boolean;
}
export const createTodo = async (goalId: string, newTodo: newTodoData) => {
  const endpoint = `/api/goal/${goalId}/todo`;
  const parsedResponse = await clientFetch.post(endpoint, newTodo);

  return parsedResponse;
};
