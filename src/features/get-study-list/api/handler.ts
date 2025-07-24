import { http, HttpResponse } from 'msw';
import { mockStudyListResponseApi } from '@/entities/study/model/__mocks__/study.mock';

export const sidebarStudyHandler = [
  http.get('/api/sidebar/study-list', () => {
    return HttpResponse.json(mockStudyListResponseApi);
  }),
];
