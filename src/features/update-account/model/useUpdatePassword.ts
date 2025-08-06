'use client';

import { updatePassword } from '@/entities/profile/api';
import { UpdatePasswordRequestApi } from '@/entities/profile/model';
import { UpdatePasswordSchema } from './update-account.schema';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useUpdatePassword() {
  return useCustomMutation({
    mutationFn: (data: UpdatePasswordSchema) => {
      const requestData: UpdatePasswordRequestApi = {
        currentPassword: data.currentPassword,
        newPassword: data.password,
      };
      return updatePassword(requestData);
    },
    successMessage: '비밀번호가 변경되었습니다.',
  });
}
