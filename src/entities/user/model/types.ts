// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 회원가입 요청
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

// 프로필 응답
export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  image: string;
}

// 스터디 목록 응답
export interface StudyListResponse {
  studyList: StudyItem[];
}

export interface StudyItem {
  id: string;
  title: string;
  description: string;
  isLeader: boolean;
  studyGoal: string[];
}

// 스터디 생성 응답
export interface CreateStudyResponse {
  studyId: string;
}

// 스터디 목표 생성 응답
export interface CreateGoalResponse {
  studyGoalId: string;
}
