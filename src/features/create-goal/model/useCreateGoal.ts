import { useMutation } from '@tanstack/react-query';
import { postCreateGoal } from '@/entities/goal/api/postCreateGoal';

export const useCreateGoal = (
  onSuccess?: (newGoal: { id: string }) => void,
) => {
  return useMutation({
    mutationFn: postCreateGoal,
    onSuccess,
  });
};
