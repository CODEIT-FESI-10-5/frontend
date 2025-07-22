import { Todo } from '@/entities/todo/model/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GoalState {
  goalId: string;
  done: Todo[];
  shared: Todo[];
  personal: Todo[];
}

export interface GoalAction {
  setGoalId: (newGoalId: string) => void;
  setDone: (newDone: Todo[]) => void;
  setShared: (newShared: Todo[]) => void;
  setPersonal: (newPersonal: Todo[]) => void;
  setAllGroup: (
    newDone: Todo[],
    newShared: Todo[],
    newPersonal: Todo[],
  ) => void;
  getCurrOrder: () => Array<string>;
}

export const useGoalStore = create<GoalState & GoalAction>()(
  devtools(
    (set, get) => ({
      goalId: '',
      done: [],
      shared: [],
      personal: [],
      setGoalId: (newGoalId: string) => set(() => ({ goalId: newGoalId })),
      setDone: (newDone: Todo[]) => set(() => ({ done: [...newDone] })),
      setShared: (newShared: Todo[]) => set(() => ({ shared: [...newShared] })),
      setPersonal: (newPersonal: Todo[]) =>
        set(() => ({ personal: [...newPersonal] })),
      setAllGroup: (newDone: Todo[], newShared: Todo[], newPersonal: Todo[]) =>
        set(() => ({
          done: [...newDone],
          shared: [...newShared],
          personal: [...newPersonal],
        })),
      getCurrOrder: () => {
        const { done, shared, personal } = get();
        return [...done, ...shared, ...personal].map((todo) => todo.id);
      },
    }),
    {
      name: 'goal-store',
    },
  ),
);
