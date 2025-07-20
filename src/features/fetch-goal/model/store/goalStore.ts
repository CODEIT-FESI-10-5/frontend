import { TodoData } from '@/entities/todo/model/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GoalState {
  goalId: string;
  done: TodoData[];
  shared: TodoData[];
  personal: TodoData[];
}

export interface GoalAction {
  setGoalId: (newGoalId: string) => void;
  setDone: (newDone: TodoData[]) => void;
  setShared: (newShared: TodoData[]) => void;
  setPersonal: (newPersonal: TodoData[]) => void;
  setAllGroup: (
    newDone: TodoData[],
    newShared: TodoData[],
    newPersonal: TodoData[],
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
      setDone: (newDone: TodoData[]) => set(() => ({ done: [...newDone] })),
      setShared: (newShared: TodoData[]) =>
        set(() => ({ shared: [...newShared] })),
      setPersonal: (newPersonal: TodoData[]) =>
        set(() => ({ personal: [...newPersonal] })),
      setAllGroup: (
        newDone: TodoData[],
        newShared: TodoData[],
        newPersonal: TodoData[],
      ) =>
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
