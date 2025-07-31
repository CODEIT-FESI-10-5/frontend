import { http, HttpResponse } from 'msw';

const studyId = '3';
export const sidebarCreateStudyHandler = [
  http.post('/api/study', () => {
    return HttpResponse.json({ newStudyId: studyId });
  }),
];
