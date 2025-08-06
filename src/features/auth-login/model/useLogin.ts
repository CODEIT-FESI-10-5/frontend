'use client';

import { LoginSchema } from '@/features/auth-login';
import { requestLogin } from '@/entities/auth/api';
import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useLogin() {
  const router = useRouter();
  return useCustomMutation({
    mutationFn: (data: LoginSchema) => requestLogin(data),
    mutationOptions: {
      onSuccess: (res) => {
        //localStorage에 email, nickname, profileImg 저장
        const { email, nickname, profileImg } = res.data;
        localStorage.setItem('email', email);
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('profileImg', profileImg ?? '');
        router.replace('/dashboard');
      },
    },
  });
}
