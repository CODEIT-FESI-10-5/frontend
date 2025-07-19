import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StudyStore = {
  currentStudyId: string;
  setStudyId: (id: string) => void;
};

export const useStudyStore = create<StudyStore>()(
  persist(
    (set) => ({
      currentStudyId: '',
      setStudyId: (id) => set({ currentStudyId: id }),
    }),
    {
      name: 'study-storage',
    },
  ),
);
