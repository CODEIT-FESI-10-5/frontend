// 노트 목록 응답
export interface Note {
  id: number;
  title: string;
  content: string;
  studyGoalId: number;
  todoId: number;
  todoTitle: string;
  createdAt: string;
  updatedAt: string;
}
