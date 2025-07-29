import { useMutation } from '@tanstack/react-query';
import { postCreateGoal } from '@/entities/goal/api/postCreateGoal';
import { PostCreateGoalRequest, PostCreateGoalResponse } from '@/entities/goal';

export const useCreateGoal = (
  onSuccess?: (newGoal: { id: number; title: string }) => void,
) => {
  return useMutation<PostCreateGoalResponse, Error, PostCreateGoalRequest>({
    mutationFn: postCreateGoal,
    onSuccess: (res) => {
      const { id, title } = res.data;
      onSuccess?.({ id, title });
    },
  });
};
