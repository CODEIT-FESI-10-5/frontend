import '@testing-library/jest-dom';

// jest.setup.js
import { server } from './src/shared/mocks/server';

// MSW 서버 시작
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 테스트에서 사용할 함수 전역 모킹
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('@/assets/new-todo.svg', () => {
  const MockedSvg = () => <svg data-testid="svg-mock" />;
  MockedSvg.displayName = 'MockedSvg';
  return MockedSvg;
});
jest.mock('@/entities/todolist/model/hooks', () => {
  const originalModule = jest.requireActual('@/entities/todolist/model/hooks');
  return {
    __esModule: true,
    ...originalModule,
    useTodolistQuery: jest.fn((...args) =>
      originalModule.useTodolistQuery(...args),
    ),
  };
});
jest.mock('@/features/update-todo/model/hooks/useUpdateTodo', () => ({
  useUpdateTodoMutation: jest.fn(),
}));
