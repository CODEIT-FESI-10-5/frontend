import { clientFetch } from '@/shared/api';
import {
  UpdateNicknameRequestApi,
  UpdateNicknameResponseApi,
} from '@/entities/profile/model';

export const updateNickname = async (data: UpdateNicknameRequestApi) => {
  return clientFetch.patch<UpdateNicknameResponseApi>(
    '/api/user/nickname',
    data,
  );
};
