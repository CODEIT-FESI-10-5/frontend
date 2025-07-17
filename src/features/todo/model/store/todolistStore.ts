import { TodoData } from '@/entities/todo/ui/TodoCard';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TodolistState {
  todolist: TodoData[];
  personal: TodoData[];
  shared: TodoData[];
  done: TodoData[];
  order: string[];
}

export interface TodolistAction {
  setTodolist: (newPersonal: TodolistState['todolist']) => void;
  setPersonal: (newPersonal: TodolistState['personal']) => void;
  setShared: (newShared: TodolistState['shared']) => void;
  setDone: (newDone: TodolistState['done']) => void;
  setOrder: (newOrder: string[]) => void;
}

export const useTodolistStore = create<TodolistState & TodolistAction>()(
  devtools(
    (set) => ({
      todolist: [],
      personal: [],
      shared: [],
      done: [],
      setTodolist: (newTodolist: TodoData[]) =>
        set(() => ({ todolist: [...newTodolist] })),
      setPersonal: (newPersonal: TodoData[]) =>
        set(() => ({ personal: [...newPersonal] })),
      setShared: (newShared: TodoData[]) =>
        set(() => ({ shared: [...newShared] })),
      setDone: (newDone: TodoData[]) => set(() => ({ done: [...newDone] })),
      setOrder: (newOrder: string[]) => set(() => ({ order: [...newOrder] })),
    }),
    {
      name: 'todo-list-store',
    },
  ),
);
