import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudyImage } from '../api';
import toast from 'react-hot-toast';

export function useUpdateStudyImageMutation(
  studyId: string,
  close: () => void,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateStudyImage(studyId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study', 'detail', studyId] });
      toast.success('이미지가 업데이트되었습니다!');
      close();
    },
    onError: () => {
      toast.error('이미지 업데이트에 실패했습니다.');
    },
  });
}
