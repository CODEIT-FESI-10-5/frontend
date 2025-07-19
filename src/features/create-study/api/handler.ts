import { http, HttpResponse } from 'msw';

const studyId = 'study-003';
export const sidebarCreateStudyHandler = [
  http.get('/api/study/create', () => {
    return HttpResponse.json({ newStudyId: studyId });
  }),
];
