/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { deleteTodo } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';

interface DeleteTodoMutationParams {
  goalId: string;
  todoId: string;
}
export const useDeleteTodoMutation = (goalId: string) =>
  useTodoCustomMutation<DeleteTodoMutationParams, any>(
    ({ goalId, todoId }) => deleteTodo(goalId, todoId),
    [...todolistQueryKeys.todolist(goalId)],
  );
