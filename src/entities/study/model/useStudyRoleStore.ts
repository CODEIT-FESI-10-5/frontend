import { create } from 'zustand';

interface StudyRoleState {
  roles: Record<number, string>;
  setStudyRole: (studyId: number, role: string) => void;
  getStudyRole: (studyId: number) => string;
  resetStudyRoles: () => void;
}

export const useStudyRoleStore = create<StudyRoleState>((set, get) => ({
  roles: {},
  setStudyRole: (studyId, role) =>
    set((state) => ({
      roles: { ...state.roles, [studyId]: role },
    })),
  getStudyRole: (studyId) => get().roles[studyId] || '',
  resetStudyRoles: () => set({ roles: {} }),
}));
