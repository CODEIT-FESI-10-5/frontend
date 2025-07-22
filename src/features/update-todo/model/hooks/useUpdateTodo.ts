/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { newTodoState, updateTodo } from '../../api';

interface UpdateTodoMutationParams {
  goalId: string;
  todoId: string;
  newTodoState: newTodoState;
}

export const useUpdateTodoMutation = () =>
  useTodoCustomMutation<UpdateTodoMutationParams, any>(
    ({ goalId, todoId, newTodoState }) =>
      updateTodo(goalId, todoId, newTodoState),
    ['todolist'],
  );
