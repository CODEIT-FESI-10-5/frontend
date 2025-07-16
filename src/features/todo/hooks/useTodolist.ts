import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  fetchTodolistSeperateOrder,
  newContent,
  newTodoData,
  updateTodo,
  updateTodoOrder,
} from '../api/todolist';

export const useTodolistSeperateOrderQuery = (todolistId: string) => {
  return useQuery({
    queryKey: ['todolistSeperateOrder', todolistId],
    queryFn: () => fetchTodolistSeperateOrder(todolistId),
  });
};

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todolistId,
      newTodo,
    }: {
      todolistId: string;
      newTodo: newTodoData;
    }) => createTodo(todolistId, newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todolistSeperateOrder'],
      });
    },
  });
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todolistId,
      todoId,
      newContent,
    }: {
      todolistId: string;
      todoId: string;
      newContent: newContent;
    }) => updateTodo(todolistId, todoId, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todolistSeperateOrder'],
      });
    },
  });
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todolistId,
      newOrder,
    }: {
      todolistId: string;
      newOrder: Array<string>;
    }) => updateTodoOrder(todolistId, newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todolistSeperateOrder'],
      });
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todolistId,
      todoId,
    }: {
      todolistId: string;
      todoId: string;
    }) => deleteTodo(todolistId, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todolistSeperateOrder'],
      });
    },
  });
};
