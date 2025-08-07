'use client';

import { updateNickname } from '@/entities/profile/api';
import { UpdateNicknameSchema } from './update-account.schema';
import {
  UpdateNicknameRequestApi,
  useProfileStore,
} from '@/entities/profile/model';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useUpdateNickname() {
  const setNickname = useProfileStore((state) => state.setNickname);
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
        setNickname(nickname);
      },
    },
  });
}
