/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { deleteTodo } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import { dashboardQueryKeys } from '@/entities/dashboard';

interface DeleteTodoMutationParams {
  todoId: string;
}
export const useDeleteTodoMutation = (goalId: string) =>
  useTodoCustomMutation<DeleteTodoMutationParams, any>(
    ({ todoId }) => deleteTodo(todoId),
    [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
  );
