/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { updateTodoOrder } from '../../api';
import { dashboardQueryKeys } from '@/entities/dashboard';
import { todolistQueryKeys } from '@/entities/todolist/model';

interface UpdateTodoOrderMutationParams {
  todoId: string;
  newOrder: number;
}

export const useUpdateTodoOrderMutation = (goalId: string) =>
  useTodoCustomMutation<UpdateTodoOrderMutationParams, any>(
    ({ todoId, newOrder }) => updateTodoOrder({ todoId, newOrder }),
    [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
  );
