import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DeleteModalState {
  activateTodoId: string;
  modalPosition: { top: number; left: number };
}

export interface DeleteModalAction {
  setActivateTodoId: (todoId: string) => void;
  setModalPosition: ({
    newTop,
    newLeft,
  }: {
    newTop: number;
    newLeft: number;
  }) => void;
  reset: () => void;
}

const initialState: DeleteModalState = {
  activateTodoId: '',
  modalPosition: { top: 0, left: 0 },
};

export const useDeleteModalStore = create<
  DeleteModalState & DeleteModalAction
>()(
  devtools(
    (set) => ({
      ...initialState,
      setActivateTodoId: (todoId: string) =>
        set(() => ({ activateTodoId: todoId })),
      setModalPosition: ({
        newTop,
        newLeft,
      }: {
        newTop: number;
        newLeft: number;
      }) => set(() => ({ modalPosition: { top: newTop, left: newLeft } })),
      reset: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'delete-modal-store',
    },
  ),
);
