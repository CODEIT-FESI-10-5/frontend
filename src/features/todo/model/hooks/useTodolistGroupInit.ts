import { useEffect } from 'react';
import { useTodolistStore } from '../store/todolistStore';
import { useTodolistQuery } from './useTodolist';
import sortTodolistByOrderArray from '../../lib/utils/sortTodolistByOrderArray';
import divideTodolistGroup from '../../lib/utils/divideTodolistGroup';

export function useTodolistGroupInit(todolistId: string) {
  const { data } = useTodolistQuery(todolistId);
  const { setTodolistId, setAllGroup } = useTodolistStore();

  useEffect(() => {
    if (!data) return;
    // console.log(data);

    const ordered = sortTodolistByOrderArray(data.todolist, data.order);
    const { newShared, newPersonal, newDone } = divideTodolistGroup(ordered);

    setTodolistId(data.todolistId);
    setAllGroup(newDone, newShared, newPersonal);
  }, [data, setAllGroup, setTodolistId]);
}
