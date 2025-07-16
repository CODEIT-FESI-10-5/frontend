import { clientFetch } from "../../../shared/api";

// StudyGroup 이미지 수정 (FormData 사용)
export const updateStudyGroupImage = async (groupId: string, image: string | File) => {
  const formData = new FormData();
  formData.append("image", image);
  return clientFetch.patch(`/studygroup/image/${groupId}`, formData, {
    headers: {}, // Content-Type은 fetch가 자동으로 multipart/form-data로 설정
  });
};
