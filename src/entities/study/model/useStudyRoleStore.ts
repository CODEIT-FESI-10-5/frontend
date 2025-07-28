import { create } from 'zustand';

interface StudyRoleState {
  role: boolean;
  setStudyRole: (role: string) => void;
  resetStudyRole: () => void;
}

export const useStudyRoleStore = create<StudyRoleState>((set) => ({
  role: false,
  setStudyRole: (role) => set({ role: role === 'LEADER' }),
  resetStudyRole: () => set({ role: false }),
}));
