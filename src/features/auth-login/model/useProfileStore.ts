import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProfileStoreProps = {
  userId: string;
  name: string;
  email: string;
  profileImage: string;

  setProfile: (profile: {
    userId: string;
    name: string;
    email: string;
    profileImage: string;
  }) => void;

  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStoreProps>()(
  persist(
    (set) => ({
      userId: '',
      name: '',
      email: '',
      profileImage: '',

      setProfile: ({ userId, name, email, profileImage }) =>
        set({ userId, name, email, profileImage }),

      clearProfile: () =>
        set({ userId: '', name: '', email: '', profileImage: '' }),
    }),
    {
      name: 'profile-storage',
    },
  ),
);
