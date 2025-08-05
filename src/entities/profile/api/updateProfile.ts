import { clientFetch } from '@/shared/api';
import { UpdateProfileRequestApi } from '../model/types';

export const updateProfile = async (data: UpdateProfileRequestApi) => {
  const formData = new FormData();
  formData.append('profileImageAction', data.profileImageAction);

  if (data.profileImageAction === 'UPLOAD' && data.newImageFile) {
    formData.append('newImageFile', data.newImageFile);
  }
  console.log(formData);
  return clientFetch.patch('/api/user/profileImg', formData);
};
