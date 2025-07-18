import { TodoData } from '@/entities/todo/model/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TodolistState {
  done: TodoData[];
  shared: TodoData[];
  personal: TodoData[];
  order: string[];
}

export interface TodolistAction {
  setDone: (newDone: TodolistState['done']) => void;
  setShared: (newShared: TodolistState['shared']) => void;
  setPersonal: (newPersonal: TodolistState['personal']) => void;
  setAllGroup: (
    newDone: TodolistState['done'],
    newShared: TodolistState['shared'],
    newPersonal: TodolistState['personal'],
  ) => void;
  setOrder: (newOrder: string[]) => void;
}

export const useTodolistStore = create<TodolistState & TodolistAction>()(
  devtools(
    (set) => ({
      done: [],
      shared: [],
      personal: [],
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
      setOrder: (newOrder: string[]) => set(() => ({ order: [...newOrder] })),
    }),
    {
      name: 'todo-list-store',
    },
  ),
);
