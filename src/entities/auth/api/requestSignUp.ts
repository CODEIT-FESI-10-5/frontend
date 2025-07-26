import { clientFetch } from '@/shared/api';
import { SignupRequestApi } from '../model/types';

export const requestSignup = (data: SignupRequestApi) => {
  return clientFetch.post('/api/user/signup', data);
};
