import { useMutation } from '@tanstack/react-query';
import { postCreateStudy } from '@/entities/study/api/postCreateStudy';
import { CreateStudyResponseApi } from '@/entities/study/model/types';

export const useCreateStudy = (
  onSuccess?: (newStudyId: number) => void,
  onError?: (error: unknown) => void,
) => {
  return useMutation<CreateStudyResponseApi, unknown, void>({
    mutationFn: postCreateStudy,
    onSuccess: (res) => {
      if (res.httpStatusCode === 200 && res.errorCode === 'SUCCESS') {
        onSuccess?.(res.data.studyId);
      }
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};
