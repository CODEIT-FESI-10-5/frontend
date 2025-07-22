import divideTodoGroup from '@/entities/todolist/lib/utils/divideTodoGroup';
import { useEffect } from 'react';
import { Todo } from '../types';
import { useTodolistStore } from '../store';

export function useTodoGroupInit(todolist: Todo[]) {
  const { setAllGroup } = useTodolistStore();

  useEffect(() => {
    const { newDone, newShared, newPersonal } = divideTodoGroup(todolist);

    setAllGroup(newDone, newShared, newPersonal);
  }, [todolist, setAllGroup]);
}
