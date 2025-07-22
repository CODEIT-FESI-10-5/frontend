/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { createTodo, newTodoData } from '../../api';

interface CreateTodoMutationParams {
  todolistId: string;
  newTodo: newTodoData;
}

export const useCreateTodoMutation = () =>
  useTodoCustomMutation<CreateTodoMutationParams, any>(
    ({ todolistId, newTodo }) => createTodo(todolistId, newTodo),
    ['todolist'],
  );
