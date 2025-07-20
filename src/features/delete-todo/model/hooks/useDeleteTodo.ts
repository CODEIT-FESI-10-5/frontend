/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { deleteTodo } from '../../api';

interface DeleteTodoMutationParams {
  todolistId: string;
  todoId: string;
}
export const useDeleteTodoMutation = () =>
  useTodoCustomMutation<DeleteTodoMutationParams, any>(
    ({ todolistId, todoId }) => deleteTodo(todolistId, todoId),
    ['todolist'],
  );
