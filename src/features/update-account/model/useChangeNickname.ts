'use client';

import { useMutation } from '@tanstack/react-query';
import { requestChangeNickname } from '@/entities/profile/api';
import { ChangeNicknameSchema } from './update-profile.schema';
import toast from 'react-hot-toast';
import { ChangeNicknameRequestApi } from '@/entities/profile/model';

export function useChangeNickname() {
  return useMutation({
    mutationFn: (data: ChangeNicknameSchema) => {
      const requestData: ChangeNicknameRequestApi = {
        nickname: data.nickname,
      };
      return requestChangeNickname(requestData);
    },
    onSuccess: () => {
      toast.success('닉네임이 변경되었습니다.');
    },
    onError: () => {
      toast.error('닉네임 변경에 실패했습니다.');
    },
  });
}
