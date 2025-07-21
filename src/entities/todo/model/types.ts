export interface Todo {
  id: string; // todo 아이디
  content: string; // todo 내용
  createdAt: Date; // todo 생성 일자
  completed: boolean; // todo 완료 여부
  completedAt?: Date; // todo 완료 일자
  note: boolean; // 노트 내용
  shared: boolean; //  공통 todo 여부
}
