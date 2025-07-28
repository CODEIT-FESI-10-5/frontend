import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudyInfo } from '../api';
import toast from 'react-hot-toast';

export function useUpdateStudyInfoMutation(studyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => updateStudyInfo(studyId, title, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study', 'detail', studyId] });
      queryClient.invalidateQueries({ queryKey: ['study'] });
      toast.success('정보가 업데이트되었습니다!');
    },
    onError: () => {
      toast.error('업데이트에 실패했습니다.');
    },
  });
}
