import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGoalTitle } from '../api/updateGoalTitle';
import toast from 'react-hot-toast';

export function useUpdateGoalTitleMutation(
  goalId: string,
  setTitle: (title: string) => void,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTitle: string) => updateGoalTitle(goalId, newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', goalId] });
      toast.success('제목이 업데이트되었습니다');
    },
    onError: (error, newTitle) => {
      toast.error('제목 업데이트에 실패했습니다');
      setTitle(newTitle); // 실패 시 원래 제목으로 복구
    },
  });
}
