import { DashboardResponse } from '@/entities/dashboard';

export const mockDashboard: DashboardResponse = {
  httpStatusCode: 200,
  errorCode: 'string',
  errorMessage: 'string',
  fieldErrors: [
    {
      field: 'string',
      message: 'string',
    },
  ],
  data: {
    goal: {
      id: '1',
      title: '스프링 부트 마스터하기',
      completedCt: '4/8',
      progress: 50,
      recentCompletedTodo: {
        id: '1',
        content:
          'JPA 실습 과제 제출1231231231231233214234234234234234234234234234234234',
        createdAt: '2024-02-01T09:00:00',
        completed: true,
        completedAt: '2024-02-01T18:00:00',
        note: 'JPA 실습 과제에서 발생한 이슈 정리',
        noteId: '2',
        shared: true,
      },
      inProgressTodo: {
        id: '2',
        content: '스프링 시큐리티 문서 읽기13123123123213',
        createdAt: '2024-02-02T10:00:00',
        completed: false,
        completedAt: undefined,
        note: '스프링 시큐리티 공식 문서 요약 정리',
        noteId: '3',
        shared: false,
      },
      teamProgress: [
        {
          name: '김철수',
          image: '/images/default-profile.png',
          progress: 75,
          completedCt: '6/8',
        },
        {
          name: '이영희',
          image: '/images/default-profile.png',
          progress: 50,
          completedCt: '4/8',
        },
        {
          name: '박민수',
          image: '/images/default-profile.png',
          progress: 25,
          completedCt: '2/8',
        },
        {
          name: '최지우',
          image: '/images/default-profile.png',
          progress: 100,
          completedCt: '8/8',
        },
        {
          name: '홍길동',
          image: '/images/default-profile.png',
          progress: 0,
          completedCt: '0/8',
        },
      ],
    },
  },
};

export const noneMockDashboard: DashboardResponse = {
  httpStatusCode: 200,
  errorCode: 'DASHBOARD_NOT_FOUND',
  data: {
    goal: {
      id: '',
      title: '',
      completedCt: '',
      progress: 0,
      recentCompletedTodo: null,
      inProgressTodo: null,
      teamProgress: [],
    },
  },
  errorMessage: '대시보드가 존재하지 않습니다.',
  fieldErrors: [],
};
