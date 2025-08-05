import { updateProfile } from '@/entities/profile/api';
import { UpdateProfileRequestApi } from '@/entities/profile/model';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateProfileRequestApi) => updateProfile(data),
    onSuccess: (res) => {
      const newProfileUrl = res.data.profileImg;
      localStorage.setItem('profileImg', newProfileUrl);
      toast.success('이미지가 변경되었습니다.');
    },
    onError: () => {
      toast.error('이미지 업로드에 실패했습니다.');
    },
  });
}
