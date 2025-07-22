import { create } from 'zustand';

interface ModalPosition {
  top: number;
  left: number;
}

interface ModalOptions {
  position?: ModalPosition | null;
  ref?: React.RefObject<HTMLElement | null>;
}

interface ModalStore {
  content: React.ReactNode | null;
  isOpen: boolean;
  position: ModalPosition | null;
  open: (content: React.ReactNode, options?: ModalOptions) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  isOpen: false,
  position: null,
  open: (content, options = {}) => {
    let position = options.position ?? null;
    if (!position && options.ref?.current) {
      const rect = options.ref.current.getBoundingClientRect();
      position = {
        top: rect.top + window.scrollY + rect.height + 8,
        left: rect.left + window.scrollX,
      };
    }
    set({ isOpen: true, content, position });
  },
  close: () => set({ isOpen: false, content: null, position: null }),
}));
