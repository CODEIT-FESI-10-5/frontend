import { clientFetch } from '@/shared/api';
import { ChangePasswordRequestApi } from '../model/types';

export const requestChangePassword = async (data: ChangePasswordRequestApi) => {
  return clientFetch.patch('/api/user/password', data);
};
