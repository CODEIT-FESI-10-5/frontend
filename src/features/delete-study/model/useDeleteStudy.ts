/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { todolistQueryKeys } from '@/entities/todolist/model';
import { dashboardQueryKeys } from '@/entities/dashboard';
import { deleteStudy } from '../api';
import { studyQueryKeys } from '@/entities/study';
import { goalQueryKeys } from '@/entities/goal';

interface DeleteStudyMutationParams {
  studyId: string;
}
export const useDeleteStudyMutation = (studyId: string) =>
  useCustomMutation<DeleteStudyMutationParams, any>({
    mutationFn: ({ studyId }) => deleteStudy(studyId),
    invalidateQueryKeys: [
      [...dashboardQueryKeys.goal(studyId)],
      [...studyQueryKeys.list()],
      [...goalQueryKeys.list(Number(studyId))],
    ],
    successMessage: '스터디가 삭제되었습니다',
  });
