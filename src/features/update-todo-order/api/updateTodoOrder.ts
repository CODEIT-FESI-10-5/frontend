import { clientFetch } from '@/shared/api';

export const updateTodoOrder = async (
  goalId: string,
  newOrder: Array<string>,
) => {
  const endpoint = `/api/todos/order`;
  const parsedResponse = await clientFetch.patch(endpoint, {
    goalId,
    newOrder: newOrder,
  });

  return parsedResponse;
};
