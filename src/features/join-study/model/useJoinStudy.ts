'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postJoinStudy } from '@/entities/study/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { studyQueryKeys } from '@/entities/study';
import { goalQueryKeys } from '@/entities/goal';

export const useJoinStudy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: postJoinStudy,
    onSuccess: (data: { studyId: string }) => {
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.list(Number(data.studyId)),
      });
      router.push(`/dashboard/study/${data.studyId}`);
    },
    onError: (err: unknown) => {
      const error = err as Error & {
        status?: number;
        body?: {
          errorCode?: string;
          errorMessage?: string;
        };
      };
      const errorMessage = error.body?.errorMessage;

      toast.error(errorMessage ?? '알 수 없는 오류가 발생했습니다.');
    },
  });
};
