'use client';

import { updateNickname } from '@/entities/profile/api';
import { UpdateNicknameSchema } from './update-account.schema';
import { UpdateNicknameRequestApi } from '@/entities/profile/model';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useUpdateNickname() {
  return useCustomMutation({
    mutationFn: (data: UpdateNicknameSchema) => {
      const requestData: UpdateNicknameRequestApi = {
        nickname: data.nickname,
      };
      return updateNickname(requestData);
    },
    successMessage: '닉네임이 변경되었습니다.',
    mutationOptions: {
      onSuccess: (res) => {
        const nickname = res.data.nickname;
        localStorage.setItem('nickname', nickname);
      },
    },
  });
}
