import { useQuery } from '@tanstack/react-query';
import { fetchTodolist } from '../../api/fetchTodolist';
import { Todolist } from '../types';
import { todolistQueryKeys } from '../queryKeys';

export const useTodolistQuery = (goalId?: string) => {
  return useQuery<Todolist>({
    queryKey: [todolistQueryKeys.todolist],
    queryFn: () => fetchTodolist(goalId as string),
    enabled: !!goalId,
  });
};
