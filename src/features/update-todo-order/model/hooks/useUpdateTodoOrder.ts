/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { updateTodoOrder } from '../../api';

interface UpdateTodoOrderMutationParams {
  todolistId: string;
  newOrder: Array<string>;
}

export const useUpdateTodoOrderMutation = () =>
  useTodoCustomMutation<UpdateTodoOrderMutationParams, any>(
    ({ todolistId, newOrder }) => updateTodoOrder(todolistId, newOrder),
    ['todolist'],
  );
