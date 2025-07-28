import { useQuery } from '@tanstack/react-query';
import {
  StudyGroup,
  StudyGroupResponse,
  studyQueryKeys,
} from '@/entities/study';
import { fetchStudy } from '@/entities/study/api';

// StudyGroup React Query 훅
export const useStudyGroup = (studyId: string) => {
  return useQuery<StudyGroupResponse, Error, StudyGroup>({
    queryKey: studyQueryKeys.detail(studyId),
    queryFn: () => fetchStudy(studyId),
    enabled: !!studyId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (response: StudyGroupResponse) => {
      const d = response.data;
      return {
        userRole: d.userRole,
        id: String(d.studyId),
        title: d.title,
        description: d.description,
        createdAt: new Date(d.createAt),
        image: d.studyImageDir,
        teamProgress: d.teamProgress,
        inviteLink: d.inviteCode,
        members: d.members.map((m) => ({
          id: String(m.userId),
          name: m.name,
          image: m.userImageDir,
        })),
      };
    },
  });
};
