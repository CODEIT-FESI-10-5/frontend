import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface CreateTodoState {
  isCreateMode: boolean;
  content: string;
  isShared: boolean;
  isInvalid: boolean;
}

export interface CreateTodoAction {
  resetField: () => void;
  toggleEditMode: () => void;
  setContent: (input: string) => void;
  toggleIsShared: () => void;
  setIsInvalid: (invalid: boolean) => void;
}

const initialField: Omit<CreateTodoState, 'isCreateMode'> = {
  content: '',
  isShared: false,
  isInvalid: false,
};

export const useCreateTodoStore = create<CreateTodoState & CreateTodoAction>()(
  devtools(
    (set, get) => ({
      isCreateMode: false,
      ...initialField,
      resetField: () => set(initialField),
      toggleEditMode: () => set(() => ({ isCreateMode: !get().isCreateMode })),
      setContent: (input: string) => set(() => ({ content: input })),
      toggleIsShared: () => set(() => ({ isShared: !get().isShared })),
      setIsInvalid: (invalid: boolean) => set(() => ({ isInvalid: invalid })),
    }),
    {
      name: 'edit-todo-store',
    },
  ),
);
