import { updateStudyInfo } from '../api';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useUpdateStudyInfoMutation(studyId: string) {
  return useCustomMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => updateStudyInfo(studyId, title, description),
    invalidateQueryKeys: [['study', 'detail', studyId], ['study']],
    successMessage: '정보가 업데이트되었습니다!',
  });
}
