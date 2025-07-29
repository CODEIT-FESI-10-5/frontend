import { Modal } from '@/shared/ui/Modal';
import {
  act,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { useParams } from 'next/navigation';
import { useDeleteTodoMutation } from '@/features/delete-todo/model/hooks';
import { renderWithQueryClient } from './lib/renderWithQueryClient';
import TodolistPanel from '@/widgets/todolist-detail/ui/TodolistPanel';

jest.mock('@/features/delete-todo/model/hooks', () => {
  const originalModule = jest.requireActual(
    '@/features/delete-todo/model/hooks',
  );
  return {
    __esModule: true,
    ...originalModule,
    useDeleteTodoMutation: jest.fn((...args) =>
      originalModule.useDeleteTodoMutation(...args),
    ),
  };
});

describe.skip('투두 상세 페이지 - 투두 삭제 테스트', () => {
  beforeEach(() => {
    // 여기서 모킹값 설정
    (useParams as jest.Mock).mockReturnValue({
      goalId: 'goal-1',
    });
  });
  test('투두 카드에서 점 버튼을 누르면 투두 삭제가 있는 모달 메뉴가 나타난다.', async () => {
    renderWithQueryClient(
      <>
        <TodolistPanel />
        <Modal />
      </>,
    );

    const dotsButtons = await screen.findAllByLabelText(
      'delete-todo-dropdown-btn',
    );
    const dotsButton = dotsButtons[0];
    expect(dotsButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(dotsButton);
    });
    const deleteOption = await screen.findByText('투두 삭제');
    expect(deleteOption).toBeInTheDocument();
  });

  test('모달내 투두 삭제를 누르면 삭제 api를 요청하고 성공시 화면에 반영된다.', async () => {
    // Delete Mutation 을 추적하기
    const actual = jest.requireActual('@/features/delete-todo/model/hooks');
    const mutateSpy = jest.fn();

    (useDeleteTodoMutation as jest.Mock).mockImplementation((...args) => {
      const result = actual.useDeleteTodoMutation(...args);
      const originalMutate = result.mutate;

      return {
        ...result,
        mutate: (mArgs: { todoId: string }) => {
          mutateSpy(mArgs);
          return originalMutate(mArgs);
        },
      };
    });

    renderWithQueryClient(
      <>
        <TodolistPanel />
        <Modal />
      </>,
    );

    // 투두 중 첫번째를 선택
    const todoCards = await screen.findAllByLabelText('todo-card');
    const firstTodoCard = todoCards[0];
    const content: string =
      within(firstTodoCard)
        .getByLabelText('todo-content')
        .textContent?.trim() ?? '';

    // 점 버튼 찾아서 클릭
    const dotsButton = within(firstTodoCard).getByLabelText(
      'delete-todo-dropdown-btn',
    );

    expect(dotsButton).toBeInTheDocument();
    fireEvent.click(dotsButton);

    // 드랍다운에서 투두 삭제 클릭
    const deleteButton = await screen.findByText('투두 삭제');
    fireEvent.click(deleteButton);

    // mutate 호출 됐는지 확인
    expect(mutateSpy).toHaveBeenCalled();

    // 삭제된 두투가 제거되었는지 확인
    await waitFor(() => {
      expect(screen.queryByText(content)).not.toBeInTheDocument();
    });
  });
});
