import { clientFetch } from '@/shared/api';

export interface newTodoState {
  content: string;
  completed: boolean;
}

export const updateTodo = async (
  goalId: string,
  todoId: string,
  newTodoState: newTodoState,
) => {
  const endpoint = `/api/todos/${todoId}`;
  const parsedResponse = await clientFetch.patch(endpoint, {
    goalId,
    ...newTodoState,
  });

  return parsedResponse;
};
