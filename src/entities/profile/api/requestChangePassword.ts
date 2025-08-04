import { clientFetch } from '@/shared/api';
import { ChangePasswordRequestApi } from '../model/types';

export const requestChangePassword = (data: ChangePasswordRequestApi) => {
  return clientFetch.post('/api/user/password', data);
};
