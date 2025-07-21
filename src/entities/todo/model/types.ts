// 투두 리스트 응답
export interface TodoListResponse {
  myTodoList: TodoData[];
  order: string[];
}

export interface TodoData {
  todoId: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  note: boolean;
  shared: boolean;
}

// 투두 생성 요청
export interface CreateTodoRequest {
  content: string;
  shared: boolean;
}

// 투두 수정 요청
export interface UpdateTodoRequest {
  content?: string;
  completed?: boolean;
}

// 투두 순서 변경 요청
export interface UpdateTodoOrderRequest {
  order: string[];
}

// 투두 생성/수정/삭제 응답 (성공/실패만 확인)
export interface TodoMutationResponse {
  success: boolean;
  message?: string;
}
