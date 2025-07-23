export interface Goal {
  studyGoal: {
    id: string; // study 목표 아이디
    order: string[]; // todo order 순서
    title: string; // study 목표(소주제)
    completedCt: string; // mytodoList 완료 횟수 (4/8)
    progress?: number; // 진행도 % 프론트에서 계산
    mytodoList: Todo[]; // todo 목록
    teamProgress: teamProgress[]; // 팀원 진행도
  };
}
export interface Todo {
  id: string; // todo 아이디
  content: string; // todo 내용
  createdAt: Date; // todo 생성 일자
  completed: boolean; // todo 완료 여부
  completedAt?: Date; // todo 완료 일자
  note: boolean; // note 여부
  shared: boolean; //  공통 todo 여부
}

export interface teamProgress {
  name: string; // 팀원 이름
  image: string; // 프로필 이미지
  progress: number; // 진행도 % (40%)
  completedCt: number[]; // todo 완료 횟수 (4/8)
}

export interface GoalListItem {
  id: string;
  title: string;
}

export interface GoalListResponse {
  goalList: GoalListItem[];
}
