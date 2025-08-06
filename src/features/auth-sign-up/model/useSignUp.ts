'use client';

import { useRouter } from 'next/navigation';
import { requestSignup } from '@/entities/auth/api';
import { SignupRequestApi } from '@/entities/auth/model';
import { SignupSchema } from './sign-up.schema';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useSignup() {
  const router = useRouter();

  return useCustomMutation({
    mutationFn: (data: SignupSchema) => {
      const requestData: SignupRequestApi = {
        nickname: data.name,
        email: data.email,
        password: data.password,
      };
      return requestSignup(requestData);
    },
    mutationOptions: {
      onSuccess: () => {
        router.push('/auth/login');
      },
    },
  });
}
