import { http, HttpResponse } from 'msw';
import { mockDashboard } from '@/entities/dashboard';

export const dashboardHandlers = [
  //dashboard
  http.get('/api/dashboard', ({ request }) => {
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
    // return HttpResponse.json(noneMockDashboard);
  }),

  // dashboard 에있는 goal title 수정
  http.patch('/api/goals/:goalId', async ({ params, request }) => {
    const { goalId } = params;
    let title = '';
    try {
      const body = await request.json();
      if (body && typeof body === 'object' && 'title' in body) {
        title = body.title;
      }
    } catch {
      // body 파싱 실패
    }
    if (!goalId || !title) {
      return HttpResponse.json(
        { error: 'goalId and title are required' },
        { status: 400 },
      );
    }
    // 실제 mockDashboard에서 goalId별 데이터 수정 필요시 여기에 추가
    // goalId에 해당하는 dashboard.data의 title을 변경 (메모리상에서)
    if (
      mockDashboard.data &&
      String(mockDashboard.data.id) === String(goalId)
    ) {
      mockDashboard.data.title = title;
    }
    return HttpResponse.json(mockDashboard);
    // return HttpResponse.json(noneMockDashboard);
  }),
];
