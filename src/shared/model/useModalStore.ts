import { create } from 'zustand';

interface ModalPosition {
  top: number;
  left: number;
}

interface ModalStore {
  content: React.ReactNode | null;
  isOpen: boolean;
  position: ModalPosition | null;
  open: (content: React.ReactNode, position?: ModalPosition | null) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  isOpen: false,
  position: null,
  open: (content, position = null) => set({ isOpen: true, content, position }),
  close: () => set({ isOpen: false, content: null, position: null }),
}));
