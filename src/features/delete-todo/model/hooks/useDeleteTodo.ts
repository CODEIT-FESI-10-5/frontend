/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { deleteTodo } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';

interface DeleteTodoMutationParams {
  todoId: string;
}
export const useDeleteTodoMutation = (goalId: string) =>
  useTodoCustomMutation<DeleteTodoMutationParams, any>(
    ({ todoId }) => deleteTodo(goalId, todoId),
    [...todolistQueryKeys.todolist(goalId)],
  );
