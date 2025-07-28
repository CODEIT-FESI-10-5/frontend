import { useMutation } from '@tanstack/react-query';
import { postCreateGoal } from '@/entities/goal/api/postCreateGoal';

export const useCreateGoal = (
  onSuccess?: (newGoal: { id: string }) => void,
) => {
  return useMutation<{ id: string }, Error, { title: string; studyId: number }>(
    {
      mutationFn: postCreateGoal,
      onSuccess,
    },
  );
};
