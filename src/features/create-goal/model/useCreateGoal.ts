'use client';
import { postCreateGoal } from '@/entities/goal/api/postCreateGoal';
import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export const useCreateGoal = (studyId: number) => {
  const router = useRouter();

  return useCustomMutation({
    mutationFn: postCreateGoal,
    invalidateQueryKeys: [['goal', 'list', studyId]],
    mutationOptions: {
      onSuccess: (res) => {
        const newGoalId = res.data.id;
        router.push(`/dashboard/study/${studyId}/goal/${newGoalId}`);
      },
    },
  });
};
