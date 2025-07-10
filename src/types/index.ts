// Todo 상세 정보
export interface Todo {
  id: string; // todo 아이디
  title: string; // todo 제목
  completed: boolean; // todo 완료 여부
  createdAt: Date; // todo 생성 일자
  completedAt?: Date; // todo 완료 일자
  note: string; // 노트 내용
  order: number; // 순서 정보 (중간에 데이터 처리 방식은 논의 필요)
  shared: boolean; // 공통 todo 여부
}

// TodoList 소주제 전체 묶음 - 예) 타입스크립트 공부하기
export interface TodoList {
  id: string; // todoList 아이디
  title: string; // todoList 제목
  todos: Todo[]; // todo 목록
  progress: number; // 성취도 (프론트에서 todos.completed 기반으로 계산)
}

// 유저 정보
export interface User {
  id: string; // user 아이디
  name: string; // user 이름
  email: string; // user 이메일
  profileImg: string; // user 프로필 이미지
  todoLists: TodoList[]; // user 개인 todo list 목록
}

// 스터디 그룹
export interface StudyGroup {
  id: string; // study 아이디
  name: string; // study 이름
  description: string; // study 설명
  members: User[]; // study 유저 목록
  createdAt: Date; // study 생성 일자
}
