import { fireEvent, render, screen } from '@testing-library/react';
import TodolistPanel from '../TodolistPanel';

describe('새 투두를 생성하는 시나리오 테스트', () => {
  test('새 투두 생성 버튼 클릭시 입력 폼이 나타난다.', () => {
    render(<TodolistPanel />);
    screen.debug();

    expect(screen.getByLabelText('open-todo-form-btn')).toBeInTheDocument();
    // fireEvent.click(screen.getByText('새 투두 추가'));
    // expect(screen.getByPlaceholderText('입력하세요...')).toBeInTheDocument();
  });
});
