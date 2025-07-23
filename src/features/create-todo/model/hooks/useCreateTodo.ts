/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { createTodo, newTodoData } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';

interface CreateTodoMutationParams {
  newTodo: newTodoData;
}

export const useCreateTodoMutation = (goalId: string) =>
  useTodoCustomMutation<CreateTodoMutationParams, any>(
    ({ newTodo }) => createTodo(goalId, newTodo),
    [...todolistQueryKeys.todolist(goalId)],
  );
