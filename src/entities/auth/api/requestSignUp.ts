import { clientFetch } from '@/shared/api';
import { SignUpSchema } from '@/features/auth-sign-up/model';

export const requestSignUp = (data: SignUpSchema) => {
  return clientFetch.post('/api/sign-up', data);
};
