import { http, HttpResponse } from 'msw';
import { mockStudyListResponseApi } from '@/entities/study/model/__mocks__/study.mock';

export const sidebarStudyHandler = [
  http.get('/api/study', () => {
    return HttpResponse.json(mockStudyListResponseApi);
  }),
];
