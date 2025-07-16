import { StudyGroup } from "../model/types";
import { clientFetch } from "../../../shared/api";

// StudyGroup 조회 API
export const fetchStudyGroup = async (groupId: string): Promise<StudyGroup> => {
  return clientFetch.get<StudyGroup>(`/study-group/${groupId}`);
};