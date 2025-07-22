import { create } from 'zustand';
import type { ReactNode, RefObject } from 'react';

interface ModalPosition {
  top: number;
  left: number;
}

interface ModalStore {
  content: ReactNode | null;
  isOpen: boolean;
  position: ModalPosition | null;
  open: (
    content: ReactNode,
    ref?: RefObject<HTMLElement | null>,
    position?: ModalPosition | null,
  ) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  isOpen: false,
  position: null,
  open: (content, ref, position = null) => {
    let finalPosition = null;
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      finalPosition = {
        top: rect.top + window.scrollY + rect.height + (position?.top ?? 0),
        left: rect.left + window.scrollX + (position?.left ?? 0),
      };
    } else if (position) {
      finalPosition = position;
    }
    set({ isOpen: true, content, position: finalPosition });
  },
  close: () => set({ isOpen: false, content: null, position: null }),
}));
