import { updateStudyImage } from '../api';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useUpdateStudyImageMutation(
  studyId: string,
  close: () => void,
) {
  return useCustomMutation({
    mutationFn: (formData: FormData) => updateStudyImage(studyId, formData),
    invalidateQueryKeys: [['study', 'detail', studyId]],
    successMessage: '이미지가 업데이트되었습니다!',
    mutationOptions: {
      onSuccess: () => {
        close();
      },
    },
  });
}
