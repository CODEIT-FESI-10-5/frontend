import { clientFetch } from '@/shared/api';

export interface newTodoState {
  content: string;
  completed: boolean;
}

export const updateTodo = async (
  todoId: string,
  newTodoState: newTodoState,
) => {
  const endpoint = `/api/todos/${todoId}`;
  const parsedResponse = await clientFetch.patch(endpoint, newTodoState);

  return parsedResponse;
};
