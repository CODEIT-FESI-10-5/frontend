import { clientFetch } from '@/shared/api';

export interface newContent {
  content: string;
  completed: boolean;
}

export const updateTodo = async (
  todolistId: string,
  todoId: string,
  newContent: newContent,
) => {
  const endpoint = `/api/todolist/${todolistId}/todo/${todoId}`;
  const parsedResponse = await clientFetch.patch(endpoint, newContent);

  return parsedResponse;
};

export const updateTodoOrder = async (
  todolistId: string,
  newOrder: Array<string>,
) => {
  const endpoint = `/api/todolist/${todolistId}/order`;
  const parsedResponse = await clientFetch.patch(endpoint, {
    newOrder: newOrder,
  });

  return parsedResponse;
};

export const deleteTodo = async (todolistId: string, todoId: string) => {
  const endpoint = `/api/todolist/${todolistId}/todo/${todoId}`;
  const parsedResponse = await clientFetch.delete(endpoint);

  return parsedResponse;
};
