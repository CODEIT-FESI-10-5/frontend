// 스터디 목록 응답
export interface StudyListResponse {
  studyList: StudyItem[];
}

export interface StudyItem {
  id: string;
  title: string;
  description: string;
  isLeader: boolean;
  studyGoals: string[];
}

// 스터디 생성 응답
export interface CreateStudyResponse {
  studyId: string;
}

// 스터디 목표 생성 응답
export interface CreateGoalResponse {
  studyGoalId: string;
}
