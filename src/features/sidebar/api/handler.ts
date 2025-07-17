import { http, HttpResponse } from 'msw';
import { mockProfile } from '@/entities/user/model/__mocks__/user.mock';

export const sidebarHandler = [
  http.get('/api/sidebar/profile', () => {
    return HttpResponse.json(mockProfile);
  }),
  //   http.get("/api/sidebar/study-list", () => {
  //     return HttpResponse.json(mockStudyList);
  //   }),
];
