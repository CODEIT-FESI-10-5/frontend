import { clientFetch } from '@/shared/api';
import { LoginSchema } from '@/features/auth-login';

export const requestLogin = (data: LoginSchema) => {
  return clientFetch.post('/api/auth/login', data);
};
