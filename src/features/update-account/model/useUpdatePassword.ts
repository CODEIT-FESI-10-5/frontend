'use client';

import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/entities/profile/api';
import { UpdatePasswordRequestApi } from '@/entities/profile/model';
import { UpdatePasswordSchema } from './update-account.schema';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data: UpdatePasswordSchema) => {
      const requestData: UpdatePasswordRequestApi = {
        currentPassword: data.currentPassword,
        newPassword: data.password,
      };
      return updatePassword(requestData);
    },
    onSuccess: (res) => {
      toast.success('비밀번호가 변경되었습니다.');
    },
    onError: () => {
      toast.error('비밀번호 변경에 실패했습니다.');
    },
  });
}
