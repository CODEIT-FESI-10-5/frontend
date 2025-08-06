'use client';
import { postCreateGoal } from '@/entities/goal/api/postCreateGoal';
import { goalQueryKeys } from '@/entities/goal';
import { useRouter } from 'next/navigation';
import { useStudyStore } from '@/features/get-study-list/model';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';

export const useCreateGoal = () => {
  const router = useRouter();
  const { currentStudyId } = useStudyStore();

  return useCustomMutation({
    mutationFn: postCreateGoal,
    invalidateQueryKeys: [[goalQueryKeys.list(Number(currentStudyId))]],
    mutationOptions: {
      onSuccess: (res) => {
        const newGoalId = res.data.id;
        console.log('rounted');
        router.push(`/dashboard/study/${currentStudyId}/goal/${newGoalId}`);
      },
    },
  });
};
