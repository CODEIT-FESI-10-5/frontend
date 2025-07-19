import { clientFetch } from '@/shared/api';
import { ProfileResponse } from '../model';

export const getProfile = async (): Promise<ProfileResponse> => {
  return clientFetch.get<ProfileResponse>('api/sidebar/profile');
};
