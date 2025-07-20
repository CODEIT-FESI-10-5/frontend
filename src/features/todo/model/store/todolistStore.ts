// import { TodoData } from '@/entities/todo/model/types';
// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

// export interface TodolistState {
//   todolistId: string;
//   done: TodoData[];
//   shared: TodoData[];
//   personal: TodoData[];
// }

// export interface TodolistAction {
//   setTodolistId: (newTodolistId: string) => void;
//   setDone: (newDone: TodolistState['done']) => void;
//   setShared: (newShared: TodolistState['shared']) => void;
//   setPersonal: (newPersonal: TodolistState['personal']) => void;
//   setAllGroup: (
//     newDone: TodolistState['done'],
//     newShared: TodolistState['shared'],
//     newPersonal: TodolistState['personal'],
//   ) => void;
//   getCurrOrder: () => Array<string>;
// }

// export const useTodolistStore = create<TodolistState & TodolistAction>()(
//   devtools(
//     (set, get) => ({
//       todolistId: '',
//       done: [],
//       shared: [],
//       personal: [],
//       setTodolistId: (newTodolistId: string) =>
//         set(() => ({ todolistId: newTodolistId })),
//       setDone: (newDone: TodoData[]) => set(() => ({ done: [...newDone] })),
//       setShared: (newShared: TodoData[]) =>
//         set(() => ({ shared: [...newShared] })),
//       setPersonal: (newPersonal: TodoData[]) =>
//         set(() => ({ personal: [...newPersonal] })),
//       setAllGroup: (
//         newDone: TodoData[],
//         newShared: TodoData[],
//         newPersonal: TodoData[],
//       ) =>
//         set(() => ({
//           done: [...newDone],
//           shared: [...newShared],
//           personal: [...newPersonal],
//         })),
//       getCurrOrder: () => {
//         const { done, shared, personal } = get();
//         return [...done, ...shared, ...personal].map((todo) => todo.id);
//       },
//     }),
//     {
//       name: 'todo-list-store',
//     },
//   ),
// );
