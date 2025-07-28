import { clientFetch } from '@/shared/api';
import { LoginRequestApi } from '../model';

export const requestLogin = (data: LoginRequestApi) => {
  return clientFetch.post('/api/login', data);
};
