import { useMutation } from '@tanstack/react-query';
import { postCreateGoal } from '@/entities/goal/api/postCreateGoal';

export const useCreateGoal = (
  onSuccess?: (newGoal: { id: number; title: string }) => void,
) => {
  return useMutation({
    mutationFn: postCreateGoal,
    onSuccess: (res) => {
      const { id, title } = res.data;
      onSuccess?.({ id, title });
    },
  });
};
