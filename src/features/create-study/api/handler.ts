import { http, HttpResponse } from 'msw';

const studyId = 'study-003';
export const sidebarCreateStudyHandler = [
  http.post('/api/study', () => {
    return HttpResponse.json({ newStudyId: studyId });
  }),
];
