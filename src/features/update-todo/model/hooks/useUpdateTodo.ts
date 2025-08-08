/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { newTodoState, updateTodo } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import { dashboardQueryKeys } from '@/entities/dashboard';

interface UpdateTodoMutationParams {
  todoId: string;
  newTodoState: newTodoState;
}

export const useUpdateTodoMutation = (goalId: string) =>
  useCustomMutation<UpdateTodoMutationParams, any>({
    mutationFn: ({ todoId, newTodoState }) =>
      updateTodo(todoId, goalId, newTodoState),
    invalidateQueryKeys: [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
    successMessage: '투두 상태가 저장되었습니다!',
  });
