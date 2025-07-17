/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  fetchTodolist,
  newContent,
  newTodoData,
  updateTodo,
  updateTodoOrder,
} from '../../api/todolist';

export const useTodolistQuery = (todolistId: string) => {
  return useQuery({
    queryKey: ['todolist', todolistId],
    queryFn: () => fetchTodolist(todolistId),
  });
};

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

interface CreateTodoMutationParams {
  todolistId: string;
  newTodo: newTodoData;
}

export const useCreateTodoMutation = () =>
  useTodoCustomMutation<CreateTodoMutationParams, any>(
    ({ todolistId, newTodo }) => createTodo(todolistId, newTodo),
    ['todolist'],
  );

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
