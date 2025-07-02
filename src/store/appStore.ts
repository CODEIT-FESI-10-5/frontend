import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, "increment"),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, "decrement"),
      reset: () => set({ count: 0 }, false, "reset"),
    }),
    {
      name: "app-store",
    }
  )
);
