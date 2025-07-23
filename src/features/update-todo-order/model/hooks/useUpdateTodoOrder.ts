/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { updateTodoOrder } from '../../api';

interface UpdateTodoOrderMutationParams {
  goalId: string;
  newOrder: Array<string>;
}

export const useUpdateTodoOrderMutation = () =>
  useTodoCustomMutation<UpdateTodoOrderMutationParams, any>(
    ({ goalId, newOrder }) => updateTodoOrder(goalId, newOrder),
  );
