'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreateGoal } from '@/entities/goal/api/postCreateGoal';
import {
  goalQueryKeys,
  PostCreateGoalRequest,
  PostCreateGoalResponse,
} from '@/entities/goal';
import { useRouter } from 'next/navigation';
import { useStudyStore } from '@/features/get-study-list/model';

export const useCreateGoal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { currentStudyId } = useStudyStore();
  return useMutation<PostCreateGoalResponse, Error, PostCreateGoalRequest>({
    mutationFn: postCreateGoal,
    onSuccess: (res) => {
      const newGoalId = res.data.id;
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.list(Number(currentStudyId)),
      });
      router.push(`/dashboard/study/${currentStudyId}/goal/${newGoalId}`);
    },
  });
};
