import { clientFetch } from '@/shared/api';
import {
  ChangeNicknameRequestApi,
  ChangeNicknameResponseApi,
} from '../model/types';

export const requestChangeNickname = async (data: ChangeNicknameRequestApi) => {
  return clientFetch.patch<ChangeNicknameResponseApi>(
    '/api/user/nickname',
    data,
  );
};
