'use client';
import { useMutation } from '@tanstack/react-query';
import { postJoinStudy } from '@/entities/study/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useJoinStudy = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postJoinStudy,
    onSuccess: (data: { studyId: string }) => {
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
