import 'cross-fetch/polyfill';
import '@testing-library/jest-dom';

// jest.setup.js
import { server } from './src/shared/mocks/server';

// MSW 서버 시작
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('@/assets/new-todo.svg', () => () => <svg data-testid="svg-mock" />);
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));
