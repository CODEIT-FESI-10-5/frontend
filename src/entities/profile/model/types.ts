export interface UpdatePasswordRequestApi {
  currentPassword: string;
  newPassword: string;
}

// 닉네임 변경
export interface UpdateNicknameRequestApi {
  nickname: string;
}

export interface UpdateNicknameResponseApi {
  httpStatusCode: number;
  errorCode: string;
  data: {
    nickname: string;
  };
  errorMessage: string;
  fieldErors: {
    field: string;
    message: string;
  }[];
}

// 프로필 이미지 변경
export interface UpdateProfileRequestApi {
  profileImageAction: 'UPLOAD' | 'RESET' | 'NONE';
  newImageFile?: File;
}

export interface UpdateProfileResponseApi {
  httpStatusCode: number;
  errorCode: string;
  data: {
    profileImg: string;
  };
  errorMessage: string;
  fieldErors: {
    field: string;
    message: string;
  }[];
}
