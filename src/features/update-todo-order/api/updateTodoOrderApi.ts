import { clientFetch } from '@/shared/api';

export const updateTodoOrder = async (
  goalId: string,
  newOrder: Array<string>,
) => {
  const endpoint = `/api/goal/${goalId}/order`;
  const parsedResponse = await clientFetch.patch(endpoint, {
    newOrder: newOrder,
  });

  return parsedResponse;
};
