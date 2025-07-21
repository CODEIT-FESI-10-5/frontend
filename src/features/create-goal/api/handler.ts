import { http, HttpResponse } from 'msw';

export const sidebarCreateGoalHandler = [
  http.post('/api/goal/create', () => {
    return HttpResponse.json({ id: 'goal-005' });
  }),
];
