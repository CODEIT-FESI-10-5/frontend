import { StudyGroupResponse } from '../model/types';
import { clientFetch } from '../../../shared/api';

// StudyGroup 조회 API
export const fetchStudy = async (
  studyId: string,
): Promise<StudyGroupResponse> => {
  return clientFetch.get<StudyGroupResponse>(`/study/${studyId}`);
};
