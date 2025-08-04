'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { requestChangePassword } from '@/entities/profile/api';
import { ChangePasswordRequestApi } from '@/entities/profile/model';
import { ChangePasswordSchema } from './update-profile.schema';
import toast from 'react-hot-toast';

export function useChangePassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ChangePasswordSchema) => {
      const requestData: ChangePasswordRequestApi = {
        currentPassword: data.currentPassword,
        password: data.password,
        confirmPassword: data.password,
      };
      return requestChangePassword(requestData);
    },
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
    },
    onError: (err) => {
      console.error(err);
      alert('비밀번호 변경에 실패했습니다.');
    },
  });
}
