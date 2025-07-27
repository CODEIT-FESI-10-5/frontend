import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { renderWithQueryClient } from './lib/renderWithQueryClient';
import TodolistPanel from '@/widgets/todolist-detail/ui/TodolistPanel';
import { useUpdateTodoMutation } from '@/features/update-todo/model/hooks/useUpdateTodo';

describe('투두 상세 페이지 - 투두 완료 여부 갱신 테스트', () => {
  const mutateMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    // 여기서 모킹값 설정
    (useParams as jest.Mock).mockReturnValue({
      goalId: 'goal-1',
    });
    (useUpdateTodoMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
    });
  });
  afterEach(() => {
    // mutateMock.mockClear();
  });
  test('미완료 투두의 체크박스를 클릭시 완료 상태로 변경을 요청하는 api를 호출한다', async () => {
    // update-todo mutate 호출 여부 추적을 위해 모킹 처리
    renderWithQueryClient(<TodolistPanel />);

    // 마지막 투두 선택 해보기
    const todoCards = await screen.findAllByLabelText('todo-card');
    const lastTodoCard = todoCards[todoCards.length - 1];

    // 마지막 카드 내 체크박스 클릭
    const checkbox = within(lastTodoCard).getByLabelText(
      'update-todo-completion-checkbox',
    );
    fireEvent.click(checkbox);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        todoId: 'todo-6',
        newTodoState: {
          completed: true,
        },
      }),
    );
  });

  test('완료 투두의 체크박스를 클릭시 미완료 상태로 변경을 요청하는 api를 호출한다', async () => {
    //  update-todo mutate 호출 여부 추적을 위해 모킹 처리
    renderWithQueryClient(<TodolistPanel />);

    // 마지막 투두 선택 해보기
    const todoCards = await screen.findAllByLabelText('todo-card');
    const firstCompletedTodoCard = todoCards[0];

    // 마지막 카드 내 체크박스 클릭
    const checkbox = within(firstCompletedTodoCard).getByLabelText(
      'update-todo-completion-checkbox',
    );
    fireEvent.click(checkbox);

    console.log(mutateMock.mock.calls);
    expect(mutateMock).toHaveBeenCalledWith({
      todoId: 'todo-1',
      newTodoState: {
        completed: false,
      },
    });
  });
});
