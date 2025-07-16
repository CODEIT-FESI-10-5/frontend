import { clientFetch } from "../../../shared/api";

// StudyGroup 기본 정보 수정 (제목, 설명)
export const updateStudyGroupInfo = async (groupId: string, title: string, description: string) => {
  return clientFetch.patch(`/studygroup/info/${groupId}`, {
    title,
    description
  });
};