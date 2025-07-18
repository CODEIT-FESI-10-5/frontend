import { useQuery } from '@tanstack/react-query';
import { getStudyList } from '@/entities/study/api/getStudyList';
import { StudyListResponse, studyQueryKeys } from '@/entities/study';

export const useGetStudy = () => {
  return useQuery<StudyListResponse>({
    queryKey: studyQueryKeys.all,
    queryFn: getStudyList,
  });
};
