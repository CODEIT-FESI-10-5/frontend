/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { deleteTodo } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import { dashboardQueryKeys } from '@/entities/dashboard';

interface DeleteTodoMutationParams {
  todoId: string;
}
export const useDeleteTodoMutation = (goalId: string) =>
  useCustomMutation<DeleteTodoMutationParams, any>({
    mutationFn: ({ todoId }) => deleteTodo(todoId),
    invalidateQueryKeys: [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
    successMessage: '투두가 삭제되었습니다',
  });
