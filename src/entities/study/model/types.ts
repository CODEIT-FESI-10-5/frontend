export interface StudyGroupResponse {
  httpStatusCode: number;
  errorCode: string;
  errorMessage: string;
  fieldErrors: { field: string; message: string }[];
  data: {
    studyId: number | string;
    title: string;
    description: string;
    createAt: string;
    studyImageDir: string;
    inviteCode: string;
    teamProgress: number;
    members: {
      userId: number | string;
      name: string;
      userImageDir: string;
    }[];
  };
}

export interface StudyGroup {
  id: string; //study 아이디
  title: string; //study 이름
  description: string; //study 설명
  createdAt: Date; // study 생성 일자
  image: string; // study 백그라운드 이미지
  teamProgress: number; // 팀 전체 진행도 - 모든 스터디 목표 평균 진행도
  inviteLink: string; //초대 링크
  members: members[]; // 팀원 목록
}

export interface members {
  id: string; // 팀원 아이디
  name: string; // 팀원 이름
  image: string; // 프로필 이미지
}

// 스터디 목록 응답
export interface StudyListResponse {
  studyList: StudyItem[];
}

export interface StudyItem {
  id: string;
  title: string;
  description: string;
  role: 'LEADER' | 'MEMBER';
}

export interface StudyListResponseApi {
  data: {
    totalCount: number;
    recentStudyId: number;
    studyList: StudyItemApi[];
  };
}

export interface StudyItemApi {
  studyId: number;
  role: 'LEADER' | 'MEMBER';
  title: string;
  description: string;
}

// 스터디 생성 응답
export interface CreateStudyResponse {
  studyId: string;
}
