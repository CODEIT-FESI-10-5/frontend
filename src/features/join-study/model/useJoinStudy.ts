'use client';
import { useMutation } from '@tanstack/react-query';
import { postJoinStudy } from '@/entities/study/api';
import { useRouter } from 'next/navigation';

export const useJoinStudy = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postJoinStudy,
    onSuccess: (data: { studyId: string }) => {
      router.push(`/dashboard/study/${data.studyId}/`);
    },
    onError: () => {
      //toast(errorMessage) 예정;
    },
  });
};
