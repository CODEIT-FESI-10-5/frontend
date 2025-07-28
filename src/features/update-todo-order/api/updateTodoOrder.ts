import { clientFetch } from '@/shared/api';

export const updateTodoOrder = async ({
  todoId,
  newOrder,
}: {
  todoId: string;
  newOrder: number;
}) => {
  const endpoint = '/api/todos/priority';
  const parsedResponse = await clientFetch.patch(endpoint, {
    todoId,
    priorityOrder: newOrder,
  });

  return parsedResponse;
};
