'use client';

import { LoginSchema } from '@/features/auth-login';
import { requestLogin } from '@/entities/auth/api';
import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { useProfileStore } from '@/entities/profile/model';

export function useLogin() {
  const router = useRouter();
  const { setProfile } = useProfileStore();
  return useCustomMutation({
    mutationFn: (data: LoginSchema) => requestLogin(data),
    mutationOptions: {
      onSuccess: (res) => {
        //localStorage에 email, nickname, profileImg 저장
        const { email, nickname, profileImg } = res.data;
        setProfile(nickname, email, profileImg);
        router.replace('/redirect');
      },
    },
  });
}
