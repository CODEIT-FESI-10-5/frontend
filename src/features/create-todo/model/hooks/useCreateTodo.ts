/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { createTodo, newTodoData } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import { dashboardQueryKeys } from '@/entities/dashboard';

interface CreateTodoMutationParams {
  newTodo: newTodoData;
}

export const useCreateTodoMutation = (goalId: string) =>
  useCustomMutation<CreateTodoMutationParams, any>({
    mutationFn: ({ newTodo }) => createTodo(goalId, newTodo),
    invalidateQueryKeys: [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
    successMessage: '투두가 생성되었습니다!',
  });
