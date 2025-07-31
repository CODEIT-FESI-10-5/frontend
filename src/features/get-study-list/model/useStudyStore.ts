import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StudyStoreState {
  currentStudyId: string | null;
  setStudyId: (id: string) => void;
  resetStudyId: () => void;
}

export const useStudyStore = create<StudyStoreState>()(
  persist(
    (set) => ({
      currentStudyId: null,
      setStudyId: (id) => set({ currentStudyId: id }),
      resetStudyId: () => set({ currentStudyId: null }),
    }),
    {
      name: 'study-store',
    },
  ),
);
