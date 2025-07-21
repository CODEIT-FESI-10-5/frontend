import divideTodoGroup from '@/entities/todo/lib/utils/divideTodoGroup';
import sortTodosByOrderArray from '@/entities/todo/lib/utils/sortTodosByOrderArray';
import { useEffect } from 'react';
import { useGoalStore } from '../store';
import { useGoalQuery } from './useGoal';

export function useTodoGroupInit(todolistId: string) {
  const { data } = useGoalQuery(todolistId);
  const { setGoalId, setAllGroup } = useGoalStore();

  useEffect(() => {
    if (!data) return;

    const ordered = sortTodosByOrderArray(
      data.studyGoal.mytodoList,
      data.studyGoal.order,
    );
    const { newDone, newShared, newPersonal } = divideTodoGroup(ordered);

    setGoalId(data.studyGoal.id);
    setAllGroup(newDone, newShared, newPersonal);
  }, [data, setAllGroup, setGoalId]);
}
