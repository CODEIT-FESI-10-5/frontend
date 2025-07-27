export interface Todo {
  id: string; // todo 아이디
  content: string; // todo 내용
  createdAt: string; // todo 생성 일자
  completed: boolean; // todo 완료 여부
  completedAt?: string; // todo 완료 일자
  note: string; // note 여부
  noteId: string; // 노트 아이디
  shared: boolean; //  공통 todo 여부
}
