interface MyTodolists {
  goalId: string;
  goalTitle: string;
  userRole: string;
  order: string[];
  todolist: Array<{
    todoId: string;
    content: string;
    createdAt: string;
    completed: boolean;
    completedAt: string | undefined;
    note: string;
    noteId: string;
    shared: boolean;
  }>;
}

export const myTodolists: MyTodolists[] = [
  {
    goalId: 'goal-1',
    goalTitle: '피그마 툴 익히기',
    userRole: 'LEADER',
    order: ['todo-1', 'todo-2', 'todo-3', 'todo-4', 'todo-5', 'todo-6'],
    todolist: [
      {
        todoId: 'todo-1',
        content: '1.튜토리얼 영상 1-3 시청',
        createdAt: '2025-01-10T09:00:00Z',
        completed: true,
        completedAt: '2025-01-10T19:00:00Z',
        note: '1번 투두 노트 테스트',
        noteId: '1',
        shared: true,
      },
      {
        todoId: 'todo-2',
        content: '2.사용자 인터뷰 실습 준비',
        createdAt: '2025-01-10T10:00:00Z',
        completed: false,
        completedAt: undefined,
        note: '',
        noteId: '2',
        shared: true,
      },
      {
        todoId: 'todo-3',
        content: '3.프로토타입 제작',
        createdAt: '2025-01-10T10:00:00Z',
        completed: false,
        completedAt: undefined,
        note: '',
        noteId: '3',
        shared: true,
      },
      {
        todoId: 'todo-4',
        content: '4.주요 단축키 정리 노션에 업로드',
        createdAt: '2025-01-10T10:00:00Z',
        completedAt: undefined,
        completed: false,
        note: '',
        noteId: '4',
        shared: false,
      },
      {
        todoId: 'todo-5',
        content: '5.키 인사이트 3개 도출해서 슬랙에 공유',
        createdAt: '2025-01-10T10:00:00Z',
        completedAt: undefined,
        completed: false,
        note: '',
        noteId: '5',
        shared: false,
      },
      {
        todoId: 'todo-6',
        content: '6.간단한 모바일 UI 따라 그리기',
        createdAt: '2025-01-10T10:00:00Z',
        completedAt: undefined,
        completed: false,
        note: '',
        noteId: '6',
        shared: false,
      },
    ],
  },
  {
    goalId: 'goal-2',
    goalTitle: 'Husky 익히기',
    userRole: 'MEMBER',
    order: [],
    todolist: [],
  },
];
