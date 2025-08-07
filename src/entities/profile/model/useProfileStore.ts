import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileStoreState {
  currentNickname: string;
  currentEmail: string;
  currentProfileImg: string;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setProfileImg: (img: string) => void;
  setProfile: (nickname: string, email: string, profileImg: string) => void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set) => ({
      currentNickname: '',
      currentEmail: '',
      currentProfileImg: '',
      setNickname: (nickname) => set({ currentNickname: nickname }),
      setEmail: (email) => set({ currentEmail: email }),
      setProfileImg: (img) => set({ currentProfileImg: img }),
      setProfile: (nickname, email, profileImg) =>
        set({
          currentNickname: nickname,
          currentEmail: email,
          currentProfileImg: profileImg,
        }),
    }),
    {
      name: 'profile-store',
    },
  ),
);
