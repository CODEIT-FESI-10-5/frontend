"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { StudyGroup as StudyGroupType } from "./types";

// API 함수
const fetchStudyGroup = async (studyId: string): Promise<StudyGroupType> => {
  const response = await fetch(`/api/study-group/${studyId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch study group");
  }
  return response.json();
};

// React Query 훅
const useStudyGroup = (studyId: string) => {
  return useQuery({
    queryKey: ["studyGroup", studyId],
    queryFn: () => fetchStudyGroup(studyId),
    enabled: !!studyId,
  });
};

export default function StudyGroup() {
  const studyId = "study-1"; // 핸들러와 일치하도록 수정

  const { data: studyGroup, isLoading, error } = useStudyGroup(studyId);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  // 에러 처리
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">에러 발생: {error instanceof Error ? error.message : "알 수 없는 에러"}</div>
      </div>
    );
  }

  // 스터디 그룹이 없을 경우 처리
  if (!studyGroup) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">스터디 그룹을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${studyGroup.image})` }}>
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* 컨텐츠 */}
      <div className="relative px-10 py-8 flex flex-col gap-3">
        {/*스터디 제목 */}
        <h1 className="text-2xl font-bold text-white">{studyGroup.name}</h1>
        {/*스터디 내용 */}
        <p className="text-xs font-light text-white">{studyGroup.description}</p>
      </div>
      {/*TODO Progress 바 max-w 어디까지 설정할지 */}
      {/* 팀원 목록 */}
      <div className="flex justify-between items-end">
        <div className="relative px-10 flex items-center gap-2">
          {/* 겹치는 프로필 이미지들 */}
          <div className="flex -space-x-2">
            {studyGroup.members.slice(0, 4).map((member, index) => (
              <div key={member.id} className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden" style={{ zIndex: studyGroup.members.length + index }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23e5e7eb'/%3E%3Ctext x='16' y='16' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='12'%3E👤%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            ))}
            {/* 추가 멤버가 있을 경우 +숫자 표시 */}
            {studyGroup.members.length > 4 && (
              <div className="z-30 relative w-8 h-8 rounded-full border-2 border-white bg-gray-600 flex items-center justify-center">
                <span className="text-white text-xs font-medium">+{studyGroup.members.length - 4}</span>
              </div>
            )}
          </div>
          {/* 멤버 수 텍스트 */}
          <span className="text-white text-sm font-light underline ml-2">{studyGroup.members.length}명 참여중</span>
        </div>

        <div className="flex px-10 justify-center items-baseline gap-1">
          <span className="relative text-white text-xl font-light">{studyGroup.teamProgress}%</span>
          <span className="relative text-white text-sm font-light"> 달성중</span>
        </div>
      </div>
      {/* Progress 바 */}
      <div className="px-10 py-3 pb-8">
        {/* Progress Bar Container */}
        <div className="w-full bg-[#e1e1e1] backdrop-blur-sm rounded-full h-3.5 overflow-hidden">
          {/* Animated Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-[#3a4288] to-[#babee2] rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${studyGroup.teamProgress}%` }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: "easeOut",
            }}
          />
        </div>
      </div>
      {/*초대 링크 */}
      <div className="absolute flex gap-1 right-5 -bottom-5 bg-[#2c336c] rounded-sm px-4 py-2 text-sm font-medium text-[#d5d5d5] ">
        <span className="">초대 코드 {studyGroup.inviteLink}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.13653 17.3145C8.64766 17.3145 8.23387 17.1452 7.89516 16.8065C7.55645 16.4678 7.3871 16.054 7.3871 15.5651V4.54784C7.3871 4.05897 7.55645 3.64518 7.89516 3.30647C8.23387 2.96776 8.64766 2.7984 9.13653 2.7984H17.2506C17.7394 2.7984 18.1532 2.96776 18.4919 3.30647C18.8306 3.64518 19 4.05897 19 4.54784V15.5651C19 16.054 18.8306 16.4678 18.4919 16.8065C18.1532 17.1452 17.7394 17.3145 17.2506 17.3145H9.13653ZM9.13653 15.8629H17.2506C17.3251 15.8629 17.3933 15.8319 17.4552 15.7698C17.5173 15.7078 17.5484 15.6396 17.5484 15.5651V4.54784C17.5484 4.47332 17.5173 4.40509 17.4552 4.34316C17.3933 4.28106 17.3251 4.25001 17.2506 4.25001H9.13653C9.06202 4.25001 8.99379 4.28106 8.93185 4.34316C8.86976 4.40509 8.83871 4.47332 8.83871 4.54784V15.5651C8.83871 15.6396 8.86976 15.7078 8.93185 15.7698C8.99379 15.8319 9.06202 15.8629 9.13653 15.8629ZM5.74944 20.7016C5.26056 20.7016 4.84677 20.5323 4.50806 20.1936C4.16935 19.8549 4 19.4411 4 18.9522V6.48332H5.45161V18.9522C5.45161 19.0267 5.48266 19.0949 5.54476 19.1569C5.60669 19.219 5.67492 19.25 5.74944 19.25H15.3151V20.7016H5.74944Z"
            fill="#D5D5D5"
          />
        </svg>
      </div>
    </div>
  );
}
