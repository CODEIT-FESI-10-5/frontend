import { useQuery } from "@tanstack/react-query";
import type { StudyGroup } from "../../../entities/dashboard";
import { fetchStudyGroup } from "../api";

// StudyGroup React Query 훅
export const useStudyGroup = (studyId: string) => {
  return useQuery<StudyGroup>({
    queryKey: ["studyGroup", studyId],
    queryFn: () => fetchStudyGroup(studyId),
    enabled: !!studyId,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 방지
  });
};
