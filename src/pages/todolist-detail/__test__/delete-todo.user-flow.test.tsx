import { useTodolistQuery } from '@/entities/todolist/model/hooks';
import { useModalStore } from '@/shared/model/useModalStore';
import { Modal } from '@/shared/ui/Modal';
import Todo from '@/widgets/todo/ui/todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { useDeleteTodoMutation } from '@/features/delete-todo/model/hooks';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));
jest.mock('@/entities/todolist/model/hooks', () => ({
  useTodolistQuery: jest.fn(),
}));
jest.mock('@/features/delete-todo/model/hooks', () => ({
  useDeleteTodoMutation: jest.fn(),
}));

describe.skip('투두 상세 페이지 - 투두 삭제 테스트', () => {
  const queryClient = new QueryClient();
  const deleteMutateMock = jest.fn();
  const todoMock = {
    id: 'test-todo-1',
    content: '테스트 투두',
    createdAt: new Date(Date.now()),
    completed: false,
    completedAt: undefined,
    note: false,
    shared: false,
  };

  beforeEach(() => {
    // 여기서 모킹값 설정
    (useParams as jest.Mock).mockReturnValue({
      goalId: 'goal-1',
    });
    (useTodolistQuery as jest.Mock).mockReturnValue({
      data: {
        title: '테스트 제목',
        todolist: [todoMock],
      },
    });
    (useDeleteTodoMutation as jest.Mock).mockReturnValue({
      mutate: deleteMutateMock,
    });
  });
  test('투두 카드에서 점 버튼을 누르면 투두 삭제가 있는 모달 메뉴가 나타난다.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Todo todo={todoMock} />
        <Modal />
      </QueryClientProvider>,
    );

    const dotsButton = screen.getByLabelText('delete-todo-dropdown-btn');
    expect(dotsButton).toBeInTheDocument();

    fireEvent.click(dotsButton);
    const deleteOption = await screen.findByText('투두 삭제');
    expect(deleteOption).toBeInTheDocument();
  });

  test('모달내 투두 삭제를 누르면 삭제 api를 요청한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Todo todo={todoMock} />
        <Modal />
      </QueryClientProvider>,
    );

    useModalStore.setState({ isOpen: true });
    fireEvent.click(await screen.findByText('투두 삭제'));

    // mutate 호출 됐는지 확인
    expect(deleteMutateMock).toHaveBeenCalled();
  });

  test('삭제 갱신된 투두 목록이 화면에 반영된다', () => {});
});
