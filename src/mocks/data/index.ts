import { Todo, TodoList, User, StudyGroup } from "../../types";

// Todo 목 데이터
export const mockTodos: Todo[] = [
  {
    id: "todo-1",
    title: "interface 공부",
    completed: true,
    createdAt: new Date("2025-07-01"),
    completedAt: new Date("2025-07-05"),
    note: "TypeScript interface 기본 문법과 사용법을 학습했습니다.",
    order: 1,
    shared: false,
  },
  {
    id: "todo-2",
    title: "타입 종류 공부",
    completed: false,
    createdAt: new Date("2025-07-02"),
    note: "primitive 타입, object 타입, union 타입 등을 정리 중입니다.",
    order: 2,
    shared: false,
  },
  {
    id: "todo-3",
    title: "Generic 개념 이해",
    completed: false,
    createdAt: new Date("2025-07-03"),
    note: "Generic의 활용 방법과 실제 예시를 찾아보고 있습니다.",
    order: 3,
    shared: true,
  },
  {
    id: "todo-4",
    title: "React + TypeScript 실습",
    completed: false,
    createdAt: new Date("2025-07-04"),
    note: "Props 타입 정의와 컴포넌트 타입 안전성을 실습할 예정입니다.",
    order: 4,
    shared: true,
  },
];

// TodoList 목 데이터
export const mockTodoLists: TodoList[] = [
  {
    id: "todolist-1",
    title: "타입스크립트 공부하기",
    todos: [mockTodos[0], mockTodos[1], mockTodos[2]],
    progress: 33, // 3개 중 1개 완료 (33%)
  },
  {
    id: "todolist-2",
    title: "React 심화 학습",
    todos: [mockTodos[3]],
    progress: 0, // 1개 중 0개 완료 (0%)
  },
];

// User 목 데이터
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "김개발",
    email: "kim.dev@example.com",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=kim",
    todoLists: [mockTodoLists[0]],
  },
  {
    id: "user-2",
    name: "이코딩",
    email: "lee.coding@example.com",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=lee",
    todoLists: [mockTodoLists[1]],
  },
  {
    id: "user-3",
    name: "박프론트",
    email: "park.frontend@example.com",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=park",
    todoLists: [],
  },
];

// StudyGroup 목 데이터
export const mockStudyGroups: StudyGroup[] = [
  {
    id: "study-1",
    name: "코드잇 프론트엔드 10기 5조",
    description: "함께 성장하는 프론트엔드 개발자들의 모임입니다. TypeScript, React, Next.js를 중심으로 학습합니다.",
    members: [mockUsers[0], mockUsers[1]],
    createdAt: new Date("2025-07-01"),
  },
  {
    id: "study-2",
    name: "TypeScript 마스터 그룹",
    description: "TypeScript를 깊이 있게 학습하고 실무에 적용하는 스터디 그룹입니다.",
    members: [mockUsers[1], mockUsers[2]],
    createdAt: new Date("2025-06-15"),
  },
];
