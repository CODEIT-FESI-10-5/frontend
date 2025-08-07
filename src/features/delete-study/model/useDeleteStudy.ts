/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { dashboardQueryKeys } from '@/entities/dashboard';
import { deleteStudy } from '../api';
import { studyQueryKeys } from '@/entities/study';
import { goalQueryKeys } from '@/entities/goal';
import { useRouter } from 'next/navigation';

interface DeleteStudyMutationParams {
  studyId: string;
}
export const useDeleteStudyMutation = (studyId: string) => {
  const router = useRouter();

  return useCustomMutation<DeleteStudyMutationParams, any>({
    mutationFn: ({ studyId }) => deleteStudy(studyId),
    invalidateQueryKeys: [
      //대시보드 쿼리 무효화
      [...dashboardQueryKeys.goal(studyId)],
      //스터디 리스트 쿼리 무효화
      [...studyQueryKeys.list()],
      //목표 리스트 쿼리 무효화
      [...goalQueryKeys.list(Number(studyId))],
    ],
    successMessage: '스터디가 삭제되었습니다',
    mutationOptions: {
      onSuccess: () => {
        router.push('/');
      },
    },
  });
};
