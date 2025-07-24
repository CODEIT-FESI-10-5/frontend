import { useTodolistQuery } from '@/entities/todolist/model/hooks';
import TodolistPanel from '@/widgets/todolist-detail/ui/TodolistPanel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

jest.mock('@/entities/todolist/model/hooks', () => ({
  useTodolistQuery: jest.fn(),
}));

describe.skip('투두 상세 페이지 - 투두 순서 변경 테스트', () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    // 여기서 모킹값 설정
    (useParams as jest.Mock).mockReturnValue({
      goalId: 'goal-1',
    });
    (useTodolistQuery as jest.Mock).mockReturnValue({
      data: {
        title: '테스트 제목',
        todolist: [
          {
            id: 'test-todo-1',
            content: '공통 투두',
            createdAt: new Date(Date.now()),
            completed: false,
            completedAt: new Date(Date.now()),
            note: false,
            shared: true,
          },
          {
            id: 'test-todo-2',
            content: '개인 투두',
            createdAt: new Date(Date.now()),
            completed: false,
            completedAt: undefined,
            note: false,
            shared: false,
          },
          {
            id: 'test-todo-3',
            content: '완료 투두',
            createdAt: new Date(Date.now()),
            completed: true,
            completedAt: undefined,
            note: false,
            shared: false,
          },
        ],
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('투두는 완료/공통/개인 순서로 정렬된다', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TodolistPanel />
      </QueryClientProvider>,
    );

    const todoElements = [
      screen.getByText('완료 투두', { exact: true }),
      screen.getByText('공통 투두', { exact: true }),
      screen.getByText('개인 투두', { exact: true }),
    ];

    const contentsInOrder = todoElements.map((el) => el.textContent);

    expect(contentsInOrder).toEqual(['완료 투두', '공통 투두', '개인 투두']);
  });

  test('완료된 투두는 순서 변경(드래그)이 불가능하다', () => {});

  test('완료되지 않은 투두는 순서 변경(드래그)가 가능하다', () => {});

  test('투두는 같은 타입(공통/개인) 끼리만 순서 변경 가능하다', () => {});
});
