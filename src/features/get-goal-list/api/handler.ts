import { mockGoalList } from '@/entities/goal/model/__mocks__/goal.mock';
import { http, HttpResponse } from 'msw';

export const sidebarGoalHandler = [
  http.get('/api/studies/:studyId/goals', ({ params }) => {
    const { studyId } = params;
    if (isNaN(Number(studyId))) {
      return HttpResponse.json({ message: 'Invalid studyId' }, { status: 400 });
    }
    return HttpResponse.json(mockGoalList);
  }),
];
