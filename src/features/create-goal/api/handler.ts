import { http, HttpResponse } from 'msw';

export const sidebarCreateGoalHandler = [
  http.post('/api/goals', () => {
    return HttpResponse.json({ id: 5, title: '스터디 목표 생성 테스트' });
  }),
];
