import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GoalStoreState {
  currentGoalId: string | null;
  setGoalId: (id: string) => void;
  resetGoalId: () => void;
}

export const useGoalStore = create<GoalStoreState>()(
  persist(
    (set) => ({
      currentGoalId: null,
      setGoalId: (id) => set({ currentGoalId: id }),
      resetGoalId: () => set({ currentGoalId: null }),
    }),
    {
      name: 'goal-store',
    },
  ),
);
