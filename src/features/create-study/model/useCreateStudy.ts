import { postCreateStudy } from '@/entities/study/api';
import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { CreateStudyResponseApi } from '@/entities/study';
import { useQueryClient } from '@tanstack/react-query';
import { goalQueryKeys } from '@/entities/goal';

export const useCreateStudy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useCustomMutation<null, CreateStudyResponseApi, Error>({
    mutationFn: postCreateStudy,
    invalidateQueryKeys: [['study', 'list']],
    mutationOptions: {
      onSuccess: (res) => {
        const studyId = res.data.studyId;
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.list(studyId),
        });
        router.push(`/dashboard/study/${studyId}`);
      },
      onError: () => {
        console.log('onerror');
        router.push(`/dashboard/study`);
      },
    },
  });
};
