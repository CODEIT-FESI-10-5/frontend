'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { dashboardQueryKeys } from '@/entities/dashboard';
import { deleteGoals } from '../api';
import { goalQueryKeys } from '@/entities/goal';
import { useRouter } from 'next/navigation';

interface DeleteGoalMutationParams {
  goalId: string;
  studyId: string;
}
export const useDeleteGoalMutation = (goalId: string, studyId: string) => {
  const router = useRouter();

  return useCustomMutation<DeleteGoalMutationParams, any>({
    mutationFn: ({ goalId }) => deleteGoals(goalId),
    invalidateQueryKeys: [
      //대시보드 쿼리 무효화
      [...dashboardQueryKeys.goal(goalId)],
      //목표 리스트 쿼리 무효화
      [...goalQueryKeys.list(Number(studyId))],
    ],
    successMessage: '목표가 삭제되었습니다',
    mutationOptions: {
      onSuccess: () => {
        router.replace('/redirect');
      },
    },
  });
};
