import divideTodoGroup from '@/entities/todolist/lib/utils/divideTodoGroup';
import { useEffect } from 'react';
import { Todo } from '../types';
import { useTodolistStore } from '../store';
import findInProgressTodoId from '../../lib/utils/findInProgressTodo';

export function useTodoGroupInit(todolist: Todo[]) {
  const { setAllGroup, setInProgressTodoId } = useTodolistStore();

  useEffect(() => {
    const { newDone, newShared, newPersonal } = divideTodoGroup(todolist);
    setAllGroup(newDone, newShared, newPersonal);

    const inProgressTodoId = findInProgressTodoId([
      ...newDone,
      ...newShared,
      ...newPersonal,
    ]);
    setInProgressTodoId(inProgressTodoId);
  }, [todolist, setAllGroup, setInProgressTodoId]);
}
