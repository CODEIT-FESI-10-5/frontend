'use client';

import { postJoinStudy } from '@/entities/study/api';
import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { goalQueryKeys } from '@/entities/goal';
import { useQueryClient } from '@tanstack/react-query';

export const useJoinStudy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useCustomMutation({
    mutationFn: postJoinStudy,
    mutationOptions: {
      onSuccess: (res) => {
        const studyId = res.data.studyId;
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.list(studyId),
        });
        router.push(`/dashboard/study/${studyId}`);
      },
    },
  });
};
