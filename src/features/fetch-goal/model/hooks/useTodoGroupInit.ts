import { useEffect } from 'react';
import { useGoalStore } from '../store';
import { useGoalQuery } from './useGoal';
import sortTodosByOrderArray from '../../lib/utils/sortTodosByOrderArray';
import divideTodoGroup from '../../lib/utils/divideTodoGroup';

export function useTodoGroupInit(todolistId: string) {
  const { data } = useGoalQuery(todolistId);
  const { setGoalId, setAllGroup } = useGoalStore();

  useEffect(() => {
    if (!data) return;
    // console.log(data);

    const ordered = sortTodosByOrderArray(data.todolist, data.order);
    const { newDone, newShared, newPersonal } = divideTodoGroup(ordered);

    setGoalId(data.todolistId);
    setAllGroup(newDone, newShared, newPersonal);
  }, [data, setAllGroup, setGoalId]);
}
