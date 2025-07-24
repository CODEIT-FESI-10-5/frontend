'use client';
import { useMutation } from '@tanstack/react-query';
import { postJoinStudy } from '@/entities/study/api';
import { useRouter } from 'next/navigation';

export const useJoinStudy = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postJoinStudy,
    onSuccess: (data: { studyId: string }) => {
      router.push(`/dashboard/${data.studyId}`);
    },
    onError: (error) => {
      // error 타입 단언 필요
      const err = error as any;
      const errorMessage =
        err?.body?.errorMessage || '참여 코드가 유효하지 않습니다.';
      //toast(errorMessage) 예정;
    },
  });
};
