import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreateStudy } from '@/entities/study/api';
import { useRouter } from 'next/navigation';
import { studyQueryKeys } from '@/entities/study';
import { goalQueryKeys } from '@/entities/goal';

export const useCreateStudy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: postCreateStudy,
    onSuccess: (res) => {
      const studyId = res.data.studyId;
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.list(studyId),
      });
      router.push(`/dashboard/study/${studyId}`);
    },
    onError: () => {
      router.push(`/dashboard/study`);
    },
  });
};
