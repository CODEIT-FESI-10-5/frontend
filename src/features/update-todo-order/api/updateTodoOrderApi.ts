import { clientFetch } from '@/shared/api';

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
