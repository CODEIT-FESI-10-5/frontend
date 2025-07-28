import { http, HttpResponse } from 'msw';

export const sidebarCreateGoalHandler = [
  http.post('/api/goals', () => {
    return HttpResponse.json({ id: 'goal-005' });
  }),
];
