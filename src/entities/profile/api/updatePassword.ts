import { clientFetch } from '@/shared/api';
import { UpdatePasswordRequestApi } from '../model';

export const requestChangePassword = async (data: UpdatePasswordRequestApi) => {
  return clientFetch.patch('/api/user/password', data);
};
