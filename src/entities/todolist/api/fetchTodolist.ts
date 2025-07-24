import { clientFetch } from '@/shared/api';
import { Todolist } from '../model';

export const fetchTodolist = async (goalId: string) => {
  const endpoint = '/api/todos';
  const parsedResponse = await clientFetch.get<Todolist>(endpoint, {
    params: { goalId },
  });

  return parsedResponse;
};
