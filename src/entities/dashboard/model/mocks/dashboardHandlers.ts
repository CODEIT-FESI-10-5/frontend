import { http, HttpResponse } from 'msw';
import { mockDashboard } from '@/entities/dashboard';

export const dashboardHandlers = [
  //dashboard
  http.get('/dashboard', ({ request }) => {
    const url = new URL(request.url);
    const goalId = url.searchParams.get('goalId');
    if (!goalId) {
      return HttpResponse.json(
        { error: 'goalId is required' },
        { status: 400 },
      );
    }
    // 실제 mockDashboard에서 goalId별 데이터 분기 필요시 여기에 추가
    return HttpResponse.json(mockDashboard);
  }),

  // dashboard 에있는 goal title 수정
];
