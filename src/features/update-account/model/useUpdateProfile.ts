'use client';

import { updateProfile } from '@/entities/profile/api';
import { UpdateProfileRequestApi } from '@/entities/profile/model';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useUpdateProfile() {
  return useCustomMutation({
    mutationFn: (data: UpdateProfileRequestApi) => updateProfile(data),
    successMessage: '이미지가 변경되었습니다.',
    mutationOptions: {
      onSuccess: (res) => {
        const newProfileUrl = res.data.profileImg;
        localStorage.setItem('profileImg', newProfileUrl);
      },
    },
  });
}
