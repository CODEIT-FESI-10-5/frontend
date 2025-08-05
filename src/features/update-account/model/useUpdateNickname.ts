'use client';

import { useMutation } from '@tanstack/react-query';
import { updateNickname } from '@/entities/profile/api';
import { UpdateNicknameSchema } from './update-account.schema';
import toast from 'react-hot-toast';
import { UpdateNicknameRequestApi } from '@/entities/profile/model';

export function useUpdateNickname() {
  return useMutation({
    mutationFn: (data: UpdateNicknameSchema) => {
      const requestData: UpdateNicknameRequestApi = {
        nickname: data.nickname,
      };
      return updateNickname(requestData);
    },
    onSuccess: (res) => {
      const nickname = res.data.nickname;
      localStorage.setItem('nickname', nickname);
      toast.success('닉네임이 변경되었습니다.');
    },
    onError: (res) => {
      console.log(res);
      toast.error('닉네임 변경에 실패했습니다.');
    },
  });
}
