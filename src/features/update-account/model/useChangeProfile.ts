import { requestChangeProfile } from '@/entities/profile/api/requestChangeProfile';
import { ChangeProfileRequestApi } from '@/entities/profile/model';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useChangeProfile(
  onSuccessCallback?: (newProfileUrl: string) => void,
) {
  return useMutation({
    mutationFn: (data: ChangeProfileRequestApi) => requestChangeProfile(data),
    onSuccess: (res) => {
      const newProfileUrl = res.data.profileImg;
      onSuccessCallback?.(newProfileUrl);
    },
    onError: () => {
      toast.error('이미지 업로드에 실패했습니다.');
    },
  });
}
