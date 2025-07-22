import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Todo } from '../types';

export interface TodolistState {
  done: Todo[];
  shared: Todo[];
  personal: Todo[];
}

export interface TodolistAction {
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

export const useTodolistStore = create<TodolistState & TodolistAction>()(
  devtools(
    (set, get) => ({
      done: [],
      shared: [],
      personal: [],
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
