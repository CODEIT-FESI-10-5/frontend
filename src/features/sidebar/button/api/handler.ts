import { http, HttpResponse } from 'msw';
const studyId = 'study-003';
export const sidebarButtonHandler = [
  http.post('/api/study/create', () => {
    return HttpResponse.json({ newStudyId: studyId });
  }),
];
