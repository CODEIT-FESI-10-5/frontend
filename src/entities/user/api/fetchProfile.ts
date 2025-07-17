import { useQuery } from '@tanstack/react-query';
import { ProfileResponse } from '../model';
import { userQueryKeys } from '../model';
import { clientFetch } from '@/shared/api';

export const useProfileQuery = () => {
  return useQuery<ProfileResponse>({
    queryKey: userQueryKeys.profile(),
    queryFn: () => clientFetch.get<ProfileResponse>('api/sidebar/profile'),
  });
};
