/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { updateTodoOrder } from '../../api';
import { dashboardQueryKeys } from '@/entities/dashboard';
import { todolistQueryKeys } from '@/entities/todolist/model';

interface UpdateTodoOrderMutationParams {
  todoId: string;
  newOrder: number;
}

export const useUpdateTodoOrderMutation = (goalId: string) =>
  useCustomMutation<UpdateTodoOrderMutationParams, any>({
    mutationFn: ({ todoId, newOrder }) => updateTodoOrder({ todoId, newOrder }),
    invalidateQueryKeys: [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
    successMessage: '투두 순서가 이동되었습니다!',
  });
