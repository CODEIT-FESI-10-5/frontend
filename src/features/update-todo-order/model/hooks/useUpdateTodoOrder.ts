/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { updateTodoOrder } from '../../api';

interface UpdateTodoOrderMutationParams {
  todoId: string;
  newOrder: number;
}

export const useUpdateTodoOrderMutation = () =>
  useTodoCustomMutation<UpdateTodoOrderMutationParams, any>(
    ({ todoId, newOrder }) => updateTodoOrder({ todoId, newOrder }),
  );
