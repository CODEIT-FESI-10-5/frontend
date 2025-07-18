import { useQuery } from '@tanstack/react-query';
import { ProfileResponse } from '@/entities/user';
import { userQueryKeys } from '@/entities/user';
import { getProfile } from '@/entities/user/api/getProfile';

export const useGetProfileQuery = () => {
  return useQuery<ProfileResponse>({
    queryKey: userQueryKeys.profile(),
    queryFn: getProfile,
  });
};
