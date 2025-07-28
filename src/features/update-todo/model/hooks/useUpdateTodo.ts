/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { newTodoState, updateTodo } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import { dashboardQueryKeys } from '@/entities/dashboard';

interface UpdateTodoMutationParams {
  todoId: string;
  newTodoState: newTodoState;
}

export const useUpdateTodoMutation = (goalId: string) =>
  useTodoCustomMutation<UpdateTodoMutationParams, any>(
    ({ todoId, newTodoState }) => updateTodo(goalId, todoId, newTodoState),
    [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
  );
