import { http, HttpResponse } from 'msw';
import { mockGoalList } from '@/entities/goal/model/__mocks__/goal.mock';

export const sidebarGoalHandler = [
  http.get('/api/sidebar/goal-list', () => {
    return HttpResponse.json(mockGoalList);
  }),
];
