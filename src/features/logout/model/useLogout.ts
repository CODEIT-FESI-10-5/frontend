'use client';

import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { requestLogout } from '@/entities/auth/api/requestLogout';

export function useLogout(callback?: () => void) {
  const router = useRouter();
  return useCustomMutation({
    mutationFn: requestLogout,
    // success message 필요
    mutationOptions: {
      onSuccess: () => {
        if (callback) {
          callback();
        }
        localStorage.clear();
        router.replace('/auth/login');
      },
      onError: () => {
        if (callback) {
          callback();
        }
      },
    },
  });
}
