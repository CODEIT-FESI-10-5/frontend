import { clientFetch } from '@/shared/api';

export interface newTodoState {
  completed: boolean;
}

export const updateTodo = async (
  goalId: string,
  todoId: string,
  newTodoState: newTodoState,
) => {
  const endpoint = `/api/goal/${goalId}/todo/${todoId}`;
  const parsedResponse = await clientFetch.patch(endpoint, newTodoState);

  return parsedResponse;
};
