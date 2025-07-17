import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface EditTodoState {
  isEditMode: boolean;
  content: string;
  isShared: boolean;
  isInvalid: boolean;
}

export interface EditTodoAction {
  resetField: () => void;
  toggleEditMode: () => void;
  setContent: (input: string) => void;
  toggleIsShared: () => void;
  setIsInvalid: (invalid: boolean) => void;
}

const initialField: Omit<EditTodoState, 'isEditMode'> = {
  content: '',
  isShared: false,
  isInvalid: false,
};

export const useEditTodoStore = create<EditTodoState & EditTodoAction>()(
  devtools(
    (set, get) => ({
      isEditMode: false,
      ...initialField,
      resetField: () => set(initialField),
      toggleEditMode: () => set(() => ({ isEditMode: !get().isEditMode })),
      setContent: (input: string) => set(() => ({ content: input })),
      toggleIsShared: () => set(() => ({ isShared: !get().isShared })),
      setIsInvalid: (invalid: boolean) => set(() => ({ isInvalid: invalid })),
    }),
    {
      name: 'edit-todo-store',
    },
  ),
);
