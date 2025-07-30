/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { newTodoState, updateTodo } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import toast from 'react-hot-toast';
import { dashboardQueryKeys } from '@/entities/dashboard';

interface UpdateTodoMutationParams {
  todoId: string;
  newTodoState: newTodoState;
}

export const useUpdateTodoMutation = (goalId: string) =>
  useTodoCustomMutation<UpdateTodoMutationParams, any>(
    ({ todoId, newTodoState }) => updateTodo(todoId, newTodoState),
    [
      [...dashboardQueryKeys.goal(goalId)],
      [...todolistQueryKeys.todolist(goalId)],
    ],
    {
      onSuccess: () => {
        toast.success('투두 갱신에 성공했습니다');
      },
      onError: () => {
        toast.error('투두 갱신에 실패했습니다');
      },
    },
  );
