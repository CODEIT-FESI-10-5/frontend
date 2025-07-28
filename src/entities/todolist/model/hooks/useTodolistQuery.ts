import { useQuery } from '@tanstack/react-query';
import { fetchTodolist } from '../../api/fetchTodolist';
import { FetchTodoListResponse, Todolist } from '../types';
import { todolistQueryKeys } from '../queryKeys';

export const useTodolistQuery = (goalId?: string) => {
  return useQuery<FetchTodoListResponse, Error, Todolist>({
    queryKey: [...todolistQueryKeys.todolist(goalId as string)],
    queryFn: () => fetchTodolist(goalId as string),
    enabled: !!goalId,
    select: (response: FetchTodoListResponse) => {
      const myTodoList = response.data.myTodoList;

      const parsedMyTodoList = myTodoList.map((todo) => ({
        // role: todolist.role,
        id: todo.todoId,
        content: todo.content,
        createdAt: todo.createdAt,
        completedAt: todo.completedAt,
        completed: todo.completed,
        note: todo.note,
        noteId: todo.noteId,
        shared: todo.shared,
        // priorityOrder: todo.priorityOrder,
      }));
      return {
        title: response.data.title ?? null,
        todolist: parsedMyTodoList,
      };
    },
  });
};
