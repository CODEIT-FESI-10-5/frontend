import { create } from 'zustand';

interface StudyRoleState {
  role: string;
  setStudyRole: (role: string) => void;
  resetStudyRole: () => void;
}

export const useStudyRoleStore = create<StudyRoleState>((set) => ({
  role: '',
  setStudyRole: (role) => set({ role }),
  resetStudyRole: () => set({ role: '' }),
}));
