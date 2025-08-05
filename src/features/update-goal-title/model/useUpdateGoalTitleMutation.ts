import { updateGoalTitle } from '../api/updateGoalTitle';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export function useUpdateGoalTitleMutation(
  studyId: number,
  goalId: string,
  setTitle: (title: string) => void,
) {
  return useCustomMutation({
    mutationFn: (newTitle: string) => updateGoalTitle(goalId, newTitle),
    invalidateQueryKeys: [
      ['dashboard', goalId],
      ['goal', 'list', studyId],
      ['todolist', goalId],
    ],
    successMessage: '제목이 업데이트되었습니다',
    mutationOptions: {
      onError: (error, newTitle) => {
        setTitle(newTitle); // 실패 시 원래 제목으로 복구
      },
    },
  });
}
