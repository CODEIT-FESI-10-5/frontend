import { clientFetch } from '@/shared/api';

export const requestLogout = () => {
  return clientFetch.post('/api/user/logout');
};
