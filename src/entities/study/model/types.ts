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

export interface Dashboard {
  studyGoal: {
    id: string; // study 목표 아이디
    title: string; // study 목표(소주제)
    completedCt: string; // mytodoList 완료 횟수 (4/8)
    progress?: number; // 진행도 % 프론트에서 계산
    mytodoList: Todo[]; // todo 목록
    teamProgress: teamProgress[]; // 팀원 진행도
  };
}

export interface members {
  id: string; // 팀원 아이디
  name: string; // 팀원 이름
  image: string; // 프로필 이미지
}

export interface Todo {
  id: string; // todo 아이디
  content: string; // todo 내용
  createdAt: Date; // todo 생성 일자
  completed: boolean; // todo 완료 여부
  completedAt?: Date; // todo 완료 일자
  note: string; // 노트 내용
  order: number; // 순서 정보
  shared: boolean; //  공통 todo 여부
}

export interface teamProgress {
  name: string; // 팀원 이름
  image: string; // 프로필 이미지
  progress: number; // 진행도 % (40%)
  completedCt: number[]; // todo 완료 횟수 (4/8)
}