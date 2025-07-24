import { useUpdateTodoMutation } from '@/features/update-todo/model/hooks';
import Todo from '@/widgets/todo/ui/todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

jest.mock('@/features/update-todo/model/hooks', () => ({
  useUpdateTodoMutation: jest.fn(),
}));

describe('투두 상세 페이지 - 투두 완료 여부 갱신 테스트', () => {
  const queryClient = new QueryClient();
  const updateMutateMock = jest.fn();
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
    (useUpdateTodoMutation as jest.Mock).mockReturnValue({
      mutate: updateMutateMock,
    });
  });
  test('미완료 투두의 체크박스를 누르면 완료 상태로 변경 요청을 보낸다', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Todo todo={todoMock} />
      </QueryClientProvider>,
    );

    const checkbox = screen.getByLabelText('update-todo-completion-checkbox');
    fireEvent.click(checkbox);

    // create-todo mutate api호출 확인
    expect(updateMutateMock).toHaveBeenCalled();
  });

  test('완료 투두의 체크박스를 누르면 미완료 상태로 변경 요청을 보낸다', () => {});
});
