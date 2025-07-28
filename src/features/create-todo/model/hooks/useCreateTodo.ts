/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTodoCustomMutation } from '@/shared/lib/utils/useTodoCustomMutation';
import { createTodo, newTodoData } from '../../api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import toast from 'react-hot-toast';

interface CreateTodoMutationParams {
  newTodo: newTodoData;
}

export const useCreateTodoMutation = (goalId: string) =>
  useTodoCustomMutation<CreateTodoMutationParams, any>(
    ({ newTodo }) => createTodo(goalId, newTodo),
    [[...todolistQueryKeys.todolist(goalId)]],
    {
      onSuccess: () => {
        toast.success('투두 생성에 성공했습니다');
      },
      onError: () => {
        toast.error('투두 생성에 실패했습니다');
      },
    },
  );
