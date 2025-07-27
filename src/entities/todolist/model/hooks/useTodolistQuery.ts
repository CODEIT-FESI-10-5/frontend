import { useQuery } from '@tanstack/react-query';
import { fetchTodolist } from '../../api/fetchTodolist';
import { Todolist } from '../types';
import { todolistQueryKeys } from '../queryKeys';

export const useTodolistQuery = (goalId?: string) => {
  const enabled = !!goalId;

  return useQuery<Todolist>({
    queryKey: goalId ? [...todolistQueryKeys.todolist(goalId)] : [],
    queryFn: () => fetchTodolist(goalId!), // goalId는 enabled가 true일 때만 실행됨
    enabled,
  });
};
