import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudyImage } from '@/features/update-study-image/api/updateStudyImage';
import { fetchStudy } from '@/entities/study/api/fetchStudy';

const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (params: { groupId: string; formData: FormData }) =>
    updateStudyImage(params.groupId, params.formData),
  onSuccess: (_, variables) => {
    // 성공 시 해당 study 데이터 refetch
    queryClient.invalidateQueries({ queryKey: ['study', variables.groupId] });
  },
});

// 사용 예시
// mutation.mutate({ groupId: studyId, formData });
