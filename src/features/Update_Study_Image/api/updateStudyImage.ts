import { clientFetch } from '../../../shared/api';

// StudyGroup 이미지 수정 (FormData 사용)
export const updateStudyImage = async (groupId: string, formData: FormData) => {
  return clientFetch.patch(`/studygroup/image/${groupId}`, formData);
};
