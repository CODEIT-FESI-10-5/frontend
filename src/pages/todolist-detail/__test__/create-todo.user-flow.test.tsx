import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import TodolistPanel from '../../../widgets/todolist-detail/ui/TodolistPanel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useTodolistQuery } from '@/entities/todolist/model/hooks';
import { useCreateTodoStore } from '@/features/create-todo/model/store';
import CreateTodoForm from '@/features/create-todo/ui/CreateTodoForm';
import { useCreateTodoMutation } from '@/features/create-todo/model/hooks';
import Todolist from '../../../widgets/todolist-detail/ui/Todolist';

jest.mock('@/entities/todolist/model/hooks', () => ({
  useTodolistQuery: jest.fn(),
}));
jest.mock('@/features/create-todo/model/hooks', () => ({
  useCreateTodoMutation: jest.fn(),
}));

describe.skip('투두 상세 페이지 - 새 투두 생성 테스트', () => {
  const queryClient = new QueryClient();
  const mutateMock = jest.fn();
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
            id: 'todo-1',
            content: '테스트 투두 내용',
          },
        ],
      },
    });
    (useCreateTodoMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
    });
    useCreateTodoStore.setState({ isCreateMode: false });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('새 투두 생성 버튼 클릭시 입력 폼이 나타난다', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TodolistPanel />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByText('세부 투두 생성'));
    expect(screen.getByPlaceholderText('입력하세요...')).toBeInTheDocument();
  });

  test('투두가 10개일 경우 입력폼이 열리지 않는다', () => {
    (useTodolistQuery as jest.Mock).mockReturnValue({
      data: {
        title: '테스트 제목',
        todolist: Array.from({ length: 10 }, (_, i) => ({
          id: `todo-${i + 1}`,
          content: `테스트 투두 내용 ${i + 1}`,
        })),
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <TodolistPanel />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByText('세부 투두 생성'));
    expect(
      screen.queryByPlaceholderText('입력하세요...'),
    ).not.toBeInTheDocument();
  });

  test('스터디 관리자인 경우에 공통 투두 선택 체크박스가 표시된다', () => {});

  test('입력 없이 완료 버튼을 클릭하면 경고 스타일이 적용된다', () => {
    render(<CreateTodoForm />);
    const input = screen.getByPlaceholderText('입력하세요...');
    const button = screen.getByRole('button', { name: /완료/i });

    // 입력 없이 버튼 클릭
    fireEvent.click(button);

    // mutate 호출 안 됐는지 확인
    expect(mutateMock).not.toHaveBeenCalled();

    // 에러 스타일 적용 확인 (Tailwind class 기준)
    expect(input).toHaveClass('placeholder:text-red-300');
  });

  test('유효한 투두 입력 후 제출하면 API 호출 후 폼이 닫힌다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Todolist />
      </QueryClientProvider>,
    );
    // 입력 폼 열기
    act(() => {
      useCreateTodoStore.setState({ isCreateMode: true });
    });

    //입력 후 완료 버튼 누르기
    const input = screen.getByPlaceholderText('입력하세요...');
    fireEvent.change(input, { target: { value: '새로운 투두' } });
    const button = screen.getByRole('button', { name: /완료/i });
    fireEvent.click(button);

    // 폼이 닫혔는지 확인
    await waitFor(() => {
      expect(input).not.toBeInTheDocument();
    });

    // create-todo mutate api호출 확인
    expect(mutateMock).toHaveBeenCalled();
  });

  test('투두 생성 후 갱신 시 새로고침 없이 목록에 반영된다', () => {});
});
