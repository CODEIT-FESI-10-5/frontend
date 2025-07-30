import TodolistPanel from '@/widgets/todolist-detail/ui/TodolistPanel';
import { useParams } from 'next/navigation';
import { renderWithQueryClient } from './lib/renderWithQueryClient';
import { screen } from '@testing-library/react';

describe.skip('투두 상세 페이지 - 투두 순서 변경 테스트', () => {
  beforeEach(() => {
    // 여기서 모킹값 설정
    (useParams as jest.Mock).mockReturnValue({
      goalId: 'goal-1',
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('투두는 완료/공통/개인 순서로 정렬된다', async () => {
    renderWithQueryClient(<TodolistPanel />);
    // 투두 카드 불러오기
    const todoCards = await screen.findAllByLabelText('todo-card');

    // 각 카드의 텍스트 콘텐츠 추출
    const cardTexts = todoCards.map((card) => card.textContent ?? '');

    // 카드에 점수 부여: 낮을수록 우선순위 높음
    const getPriority = (text: string) => {
      if (text.includes('완료일시')) return 1;
      if (text.includes('[공통]')) return 2;
      return 3;
    };
    // 실제 카드들의 우선순위 배열
    const actualPriorities = cardTexts.map(getPriority);

    // 복사본 정렬 후 기대 우선순위와 비교
    const expectedPriorities = [...actualPriorities].sort((a, b) => a - b);

    expect(actualPriorities).toEqual(expectedPriorities);
  });

  test('완료된 투두는 순서 변경(드래그)이 불가능하다', () => {});

  test('완료되지 않은 투두는 순서 변경(드래그)가 가능하다', () => {});

  test('투두는 같은 타입(공통/개인) 끼리만 순서 변경 가능하다', () => {});
});
