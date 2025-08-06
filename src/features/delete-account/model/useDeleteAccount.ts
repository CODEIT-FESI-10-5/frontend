'use client';

import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { deleteAccount } from '@/entities/profile/api/deleteAccount';

export function useDeleteAccount(callback?: () => void) {
  const router = useRouter();
  return useCustomMutation({
    mutationFn: deleteAccount,
    // success message 필요
    mutationOptions: {
      onSuccess: () => {
        if (callback) {
          callback();
        }
        localStorage.clear();
        router.replace('/auth/sign-up');
      },
      onError: () => {
        if (callback) {
          callback();
        }
      },
    },
  });
}
