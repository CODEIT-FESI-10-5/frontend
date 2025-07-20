/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteTodo,
  newContent,
  updateTodo,
  updateTodoOrder,
} from '../../api/todolist';

const useTodoCustomMutation = <TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  invalidateQueryKey: Array<string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invalidateQueryKey,
      });
    },
  });
};

interface UpdateTodoMutationParams {
  todolistId: string;
  todoId: string;
  newContent: newContent;
}

export const useUpdateTodoMutation = () =>
  useTodoCustomMutation<UpdateTodoMutationParams, any>(
    ({ todolistId, todoId, newContent }) =>
      updateTodo(todolistId, todoId, newContent),
    ['todolist'],
  );

interface UpdateTodoOrderMutationParams {
  todolistId: string;
  newOrder: Array<string>;
}

export const useUpdateOrderMutation = () =>
  useTodoCustomMutation<UpdateTodoOrderMutationParams, any>(
    ({ todolistId, newOrder }) => updateTodoOrder(todolistId, newOrder),
    ['todolist'],
  );

interface DeleteTodoMutationParams {
  todolistId: string;
  todoId: string;
}
export const useDeleteTodoMutation = () =>
  useTodoCustomMutation<DeleteTodoMutationParams, any>(
    ({ todolistId, todoId }) => deleteTodo(todolistId, todoId),
    ['todolist'],
  );
