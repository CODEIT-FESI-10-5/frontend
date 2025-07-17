import { useMutation } from '@tanstack/react-query';
import { postCreateStudy } from '@/entities/study/api/postCreateStudy';

export const useCreateStudyMutation = (
  onSuccess?: (data: { newStudyId: string }) => void,
) => {
  return useMutation({
    mutationFn: postCreateStudy,
    onSuccess,
  });
};
