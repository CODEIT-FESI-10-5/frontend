export interface DashboardResponse {
  httpStatusCode: number;
  errorCode: string;
  errorMessage: string;
  fieldErrors: { field: string; message: string }[];
  data: {
    goal: Dashboard;
  };
}

export interface Dashboard {
  id: string; // study 아이디
  title: string; // study 이름
  completedCt: string; // 완료 횟수 (4/8)
  progress: number; // 진행도 % (40%)
  recentCompletedTodo: Todo | null; // 최근 완료된 todo
  inProgressTodo: Todo | null; // 진행 중인 todo
  teamProgress: teamProgress[]; // 팀원 진행도
}

export interface Todo {
  id: string; // todo 아이디
  content: string; // todo 내용
  createdAt: string; // todo 생성 일자
  completed: boolean; // todo 완료 여부
  completedAt?: string; // todo 완료 일자
  noteId: string;
  note: string; // note 여부
  shared: boolean; //  공통 todo 여부
}
export interface teamProgress {
  name: string; // 팀원 이름
  image: string; // 프로필 이미지
  progress: number; // 진행도 % (40%)
  completedCt: string; // todo 완료 횟수 (4/8)
}
