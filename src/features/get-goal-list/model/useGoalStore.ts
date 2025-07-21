import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GoalStoreState {
  goalMap: Record<string, string>;
  setLastVisitedGoalId: (currentStudyId: string, currentGoalId: string) => void;
  getLastVisitedGoalId: (studyId: string) => string | undefined;
}

export const useGoalStore = create<GoalStoreState>()(
  persist(
    (set, get) => ({
      goalMap: {},
      setLastVisitedGoalId: (currentStudyId, currentGoalId) =>
        set((state) => ({
          goalMap: { ...state.goalMap, [currentStudyId]: currentGoalId },
        })),
      getLastVisitedGoalId: (currentStudyId) => get().goalMap[currentStudyId],
    }),
    {
      name: 'goal-storage',
    },
  ),
);
