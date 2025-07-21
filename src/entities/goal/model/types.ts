// 스터디 목표 생성 요청
export interface CreateGoalRequest {
  title: string;
  description?: string;
}

// 스터디 목표 생성 응답
export interface CreateGoalResponse {
  studyGoalId: string;
}

export interface GoalListResponse {
  goalList: Goal[];
}

export interface Goal {
  id: string;
  title: string;
}

// 스터디 목표 상세 응답
export interface GoalDetailResponse {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  studyId: string;
  progress: number;
  todoCount: number;
  completedTodoCount: number;
}

// 스터디 목표 수정 요청
export interface UpdateGoalRequest {
  title?: string;
  description?: string;
}
