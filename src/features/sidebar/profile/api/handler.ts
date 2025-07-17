import { http, HttpResponse } from 'msw';
import { mockProfile } from '@/entities/user/model/__mocks__/user.mock';

export const sidebarProfileHandler = [
  http.get('/api/sidebar/profile', () => {
    return HttpResponse.json(mockProfile);
  }),
];
