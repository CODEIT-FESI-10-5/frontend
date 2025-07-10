import { http, HttpResponse } from "msw";
import { mockStudyGroups } from "../../data/index";

export const studyGroupHandlers = [
  // 스터디 그룹 목록 조회 (예시)
  http.get("/api/study-groups", () => {
    return HttpResponse.json({
      studyGroups: mockStudyGroups,
      total: mockStudyGroups.length,
    });
  }),
];
