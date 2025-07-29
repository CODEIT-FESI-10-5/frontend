import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import TodolistPanel from '../../../widgets/todolist-detail/ui/TodolistPanel';
import { useParams } from 'next/navigation';
import { useCreateTodoStore } from '@/features/create-todo/model/store';
import CreateTodoForm from '@/features/create-todo/ui/CreateTodoForm';
import { useCreateTodoMutation } from '@/features/create-todo/model/hooks';
import { useTodolistStore } from '@/entities/todolist/model/store';
import { renderWithQueryClient } from './lib/renderWithQueryClient';

jest.mock('@/features/create-todo/model/hooks', () => {
  const originalModule = jest.requireActual(
    '@/features/create-todo/model/hooks',
  );
  return {
    __esModule: true,
    ...originalModule,
    useCreateTodoMutation: jest.fn((...args) =>
      originalModule.useCreateTodoMutation(...args),
    ),
  };
});

describe.skip('투두 상세 페이지 - 새 투두 생성 테스트', () => {
  beforeEach(() => {
    // 테스트 전체 적용 모킹값 설정
    (useParams as jest.Mock).mockReturnValue({
      goalId: 'goal-1',
    });

    useCreateTodoStore.setState({ isCreateMode: false });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('새 투두 생성 버튼 클릭시 입력 폼이 나타난다', async () => {
    renderWithQueryClient(<TodolistPanel />);
    await waitFor(() => {
      const openCreateTodoFormButton = screen.getByText('세부 투두 생성');
      fireEvent.click(openCreateTodoFormButton);
    });

    expect(screen.getByPlaceholderText('입력하세요...')).toBeInTheDocument();
  });

  test('투두가 10개일 경우 입력폼이 열리지 않는다', async () => {
    renderWithQueryClient(<TodolistPanel />);

    await screen.findByText('피그마 툴 익히기');
    act(() => {
      useTodolistStore.setState({
        personal: Array.from({ length: 10 }, (_, i) => ({
          id: `todo-${i + 1}`,
          content: `테스트 투두 내용 ${i + 1}`,
          createdAt: new Date(),
          completed: true,
          completedAt: undefined,
          note: false,
          shared: false,
        })),
      });
    });
    // 입력 폼 열기 버튼 클릭
    fireEvent.click(await screen.findByText('세부 투두 생성'));
    expect(
      screen.queryByPlaceholderText('입력하세요...'),
    ).not.toBeInTheDocument();
  });

  test('스터디 관리자인 경우에 공통 투두 선택 체크박스가 표시된다', () => {});

  test('스터디 팀원인 경우 공통 투두 선택 체크박스가 표시되지 않는다', () => {});

  test('입력 없이 완료 버튼을 클릭하면 경고 스타일이 적용된다', () => {
    // create todo mutation 훅 호출 여부 확인을 위한 모킹
    const mutateMock = jest.fn();
    (useCreateTodoMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
    });

    render(<CreateTodoForm />);
    const input = screen.getByPlaceholderText('입력하세요...');
    const button = screen.getByRole('button', { name: /완료/i });

    // 입력 없이 버튼 클릭
    fireEvent.click(button);

    // mutate 호출 안 됐는지 확인
    expect(mutateMock).not.toHaveBeenCalled();

    // 입력값 유효성 검사에 걸려 경고 적용 되는지 확인
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('유효한 투두 입력 후 제출시 API 호출, 폼이 닫히며 성공시 투두 목록이 갱신된다', async () => {
    // create todo mutation 훅 호출 여부 확인을 위한 모킹
    const actual = jest.requireActual('@/features/create-todo/model/hooks');
    const mutateSpy = jest.fn();

    // 실제 훅 실행 결과에서 mutate만 감싸기
    (useCreateTodoMutation as jest.Mock).mockImplementation((...args) => {
      const result = actual.useCreateTodoMutation(...args);
      const originalMutate = result.mutate;

      return {
        ...result,
        mutate: (mArgs: {
          newTodo: {
            content: '새로운 투두';
            shared: false;
          };
        }) => {
          mutateSpy(mArgs);
          return originalMutate(mArgs);
        },
      };
    });

    renderWithQueryClient(<TodolistPanel />);

    // 입력 폼 열기
    act(() => {
      useCreateTodoStore.setState({ isCreateMode: true });
    });

    //입력 후 완료 버튼 누르기
    const input = await screen.findByPlaceholderText('입력하세요...');
    fireEvent.change(input, { target: { value: '새로운 투두' } });

    const button = screen.getByRole('button', { name: /완료/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(input).not.toBeInTheDocument();
    });

    // create-todo mutate api호출 확인
    expect(mutateSpy).toHaveBeenCalledWith({
      newTodo: {
        content: '새로운 투두',
        shared: false,
      },
    });

    // 추가된 투두가 있는지 확인
    await waitFor(() => {
      expect(screen.getByText('새로운 투두')).toBeInTheDocument();
    });
  });
});
