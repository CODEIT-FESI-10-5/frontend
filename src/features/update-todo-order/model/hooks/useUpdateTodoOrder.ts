/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { updateTodoOrder } from '../../api';
import { dashboardQueryKeys } from '@/entities/dashboard';
import { todolistQueryKeys } from '@/entities/todolist/model';

interface UpdateTodoOrderMutationParams {
  todoId: string;
  newOrder: number;
}

export const useUpdateTodoOrderMutation = (goalId: string) =>
  useTodoCustomMutation<UpdateTodoOrderMutationParams, any>({
    mutationFn: ({ todoId, newOrder }) => updateTodoOrder({ todoId, newOrder }),
    invalidateQueryKeys: [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
  });
