import { clientFetch } from '@/shared/api';

export const deleteAccount = () => {
  return clientFetch.delete('/api/user');
};
