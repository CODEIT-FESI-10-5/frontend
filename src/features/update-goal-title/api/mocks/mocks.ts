import { Goal } from './types';

export const mockGoal: Goal = {
  studyGoal: {
    id: 'goal-1',
    title: '피그마 툴 익히기',
    completedCt: '1/4',
    mytodoList: [
      {
        id: 'todo-1',
        content: '튜토리얼 영상 1-3 시청',
        createdAt: new Date('2025-01-10T09:00:00Z'),
        completed: true,
        completedAt: new Date('2025-01-10T19:00:00Z'),
        note: '테스트 노트 내용 1',
        order: 1,
        shared: true,
      },
      {
        id: 'todo-2',
        content: '사용자 인터뷰 실습 준비',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        completed: false,
        completedAt: new Date('2025-01-11T14:00:00Z'),
        note: '',
        order: 2,
        shared: false,
      },
    ],
    teamProgress: [
      {
        name: '닉네임1',
        image: '/images/study-background.jpg',
        progress: 80,
        completedCt: [8, 10],
      },
      {
        name: '닉네임2',
        image: '/images/study-background.jpg',
        progress: 70,
        completedCt: [7, 10],
      },
      {
        name: '닉네임3',
        image: '/images/study-background.jpg',
        progress: 90,
        completedCt: [9, 10],
      },
      {
        name: '닉네임4',
        image: '/images/study-background.jpg',
        progress: 60,
        completedCt: [6, 10],
      },
    ],
  },
};

export const mockGoalNone: Goal = {
  studyGoal: {
    id: 'goal-1',
    title: '',
    completedCt: '0/0',
    mytodoList: [],
    teamProgress: [],
  },
};
