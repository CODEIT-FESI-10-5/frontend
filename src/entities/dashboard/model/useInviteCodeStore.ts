import { create } from 'zustand';

type InviteCodeStore = {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  resetInviteCode: () => void;
};

export const useInviteCodeStore = create<InviteCodeStore>((set) => ({
  inviteCode: '',
  setInviteCode: (code) => set({ inviteCode: code }),
  resetInviteCode: () => set({ inviteCode: '' }),
}));
