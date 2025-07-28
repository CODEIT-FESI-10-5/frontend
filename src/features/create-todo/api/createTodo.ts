import { clientFetch } from '@/shared/api';

export interface newTodoData {
  content: string;
  shared: boolean;
}
export const createTodo = async (goalId: string, newTodo: newTodoData) => {
  const endpoint = `/api/todos`;
  const parsedResponse = await clientFetch.post(endpoint, {
    goalId,
    ...newTodo,
  });

  return parsedResponse;
};
