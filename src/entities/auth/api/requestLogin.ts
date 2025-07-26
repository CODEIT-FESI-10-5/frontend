import { clientFetch } from '@/shared/api';
import { LoginRequestApi, LoginResponseApi } from '../model';

export const requestLogin = (data: LoginRequestApi) => {
  return clientFetch.post<LoginResponseApi>('/api/auth/login', data);
};
