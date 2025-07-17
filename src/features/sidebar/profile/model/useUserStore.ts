import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  UserId: string;
  setStudyId: (id: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      UserId: '',
      setStudyId: (id) => set({ UserId: id }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
