import { http, HttpResponse } from 'msw';
import { mockStudyList } from '@/entities/study/model/__mocks__/study.mock';

export const sidebarStudyHandler = [
  http.get('/api/sidebar/study-list', () => {
    return HttpResponse.json(mockStudyList);
  }),
];
