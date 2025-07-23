/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { createTodo, newTodoData } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';

interface CreateTodoMutationParams {
  todolistId: string;
  newTodo: newTodoData;
}

export const useCreateTodoMutation = (goalId: string) =>
  useTodoCustomMutation<CreateTodoMutationParams, any>(
    ({ todolistId, newTodo }) => createTodo(todolistId, newTodo),
    [...todolistQueryKeys.todolist(goalId)],
  );
